// Builds public/data/rail-network.geojson from MLIT KSJ N02 railway data.
//
// Usage:
//   node scripts/prepare-rail-data.mjs [path/to/N02-XX_RailroadSection.geojson]
//
// When no path is given, the N02 zip is downloaded from nlftp.mlit.go.jp and
// extracted into .cache/. Official line colors for the Tokyo area are taken
// from mini-tokyo-3d's railway data (MIT licensed); everything else falls back
// to a per-category color.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = path.join(ROOT, ".cache");
const OUT_PATH = path.join(ROOT, "public", "data", "rail-network.geojson");
const OPERATORS_OUT_PATH = path.join(
  ROOT,
  "public",
  "data",
  "rail-operators.json",
);

const N02_ZIP_URL =
  "https://nlftp.mlit.go.jp/ksj/gml/data/N02/N02-25/N02-25_GML.zip";
const MT3D_RAILWAYS_URL =
  "https://raw.githubusercontent.com/nagix/mini-tokyo-3d/master/data/railways.json";

// N02_004 operator name -> mini-tokyo-3d railway id prefix. A line color is
// only borrowed from mini-tokyo-3d when both the line name and the operator
// prefix match, so same-named lines in other regions keep the fallback color.
const OPERATOR_TO_MT3D = {
  東日本旅客鉄道: "JR-East",
  東海旅客鉄道: "JR-Central",
  東京地下鉄: "TokyoMetro",
  東京都: "Toei",
  京王電鉄: "Keio",
  京浜急行電鉄: "Keikyu",
  京成電鉄: "Keisei",
  東武鉄道: "Tobu",
  西武鉄道: "Seibu",
  小田急電鉄: "Odakyu",
  東急電鉄: "Tokyu",
  相模鉄道: "Sotetsu",
  北総鉄道: "Hokuso",
  埼玉高速鉄道: "SaitamaRailway",
  東葉高速鉄道: "ToyoRapid",
  ゆりかもめ: "Yurikamome",
  多摩都市モノレール: "TamaMonorail",
  東京臨海高速鉄道: "TWR",
  首都圏新都市鉄道: "TsukubaExpress",
  横浜市: "YokohamaMunicipal",
  横浜高速鉄道: "Minatomirai",
  東京モノレール: "TokyoMonorail",
};

// Fallback colors by N02_002 category code.
const CATEGORY_COLORS = {
  1: "#dceeff", // Shinkansen: bright white-blue
  2: "#3aa655", // JR conventional lines: green
  3: "#e06666", // Municipal (public) operators: red
  4: "#f2a444", // Private railways: amber
  5: "#a685e2", // Third-sector railways: violet
};
const DEFAULT_COLOR = "#8899aa";

async function download(url, dest) {
  console.log(`downloading ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

async function resolveN02Path() {
  const argPath = process.argv[2];
  if (argPath) return argPath;

  const cached = path.join(
    CACHE_DIR,
    "n02",
    "N02-25_GML",
    "UTF-8",
    "N02-25_RailroadSection.geojson",
  );
  if (!fs.existsSync(cached)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const zipPath = path.join(CACHE_DIR, "N02-25_GML.zip");
    if (!fs.existsSync(zipPath)) await download(N02_ZIP_URL, zipPath);
    execFileSync("unzip", ["-o", "-q", zipPath, "-d", path.join(CACHE_DIR, "n02")]);
  }
  return cached;
}

async function loadMt3dRailways() {
  const cached = path.join(CACHE_DIR, "mt3d-railways.json");
  if (!fs.existsSync(cached)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    await download(MT3D_RAILWAYS_URL, cached);
  }
  return JSON.parse(fs.readFileSync(cached, "utf8"));
}

const n02Path = await resolveN02Path();
const railways = await loadMt3dRailways();
const n02 = JSON.parse(fs.readFileSync(n02Path, "utf8"));
console.log(`${n02.features.length} railroad sections from ${n02Path}`);

// Group sections into one MultiLineString feature per operator + line.
const groups = new Map();
for (const f of n02.features) {
  const { N02_002: cat, N02_003: line, N02_004: op } = f.properties;
  const key = `${op}|${line}`;
  let g = groups.get(key);
  if (!g) {
    g = { op, line, cat, segments: [] };
    groups.set(key, g);
  }
  g.segments.push(f.geometry.coordinates);
}

function officialColor(op, line) {
  const prefix = OPERATOR_TO_MT3D[op];
  if (!prefix) return undefined;
  const hit = railways.find(
    (r) => r.color && r.id.startsWith(`${prefix}.`) && r.title?.ja === line,
  );
  return hit?.color;
}

let officialCount = 0;
const features = [...groups.values()].map((g) => {
  const official = officialColor(g.op, g.line);
  if (official) officialCount++;
  return {
    type: "Feature",
    properties: {
      op: g.op,
      line: g.line,
      cat: g.cat,
      color: official ?? CATEGORY_COLORS[g.cat] ?? DEFAULT_COLOR,
      official: official ? 1 : 0,
    },
    geometry: { type: "MultiLineString", coordinates: g.segments },
  };
});

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(
  OUT_PATH,
  JSON.stringify({ type: "FeatureCollection", features }),
);

// Small sidecar with one entry per operator, so the UI can list companies
// without fetching/parsing the full network. The swatch color is the
// operator's most frequent line color; bbox is [west, south, east, north]
// over the operator's whole network, for zoom-to.
const operators = new Map();
for (const f of features) {
  const { op, color } = f.properties;
  let o = operators.get(op);
  if (!o) {
    o = { op, lines: 0, colors: new Map(), bbox: [180, 90, -180, -90] };
    operators.set(op, o);
  }
  o.lines++;
  o.colors.set(color, (o.colors.get(color) ?? 0) + 1);
  for (const line of f.geometry.coordinates) {
    for (const [lng, lat] of line) {
      if (lng < o.bbox[0]) o.bbox[0] = lng;
      if (lat < o.bbox[1]) o.bbox[1] = lat;
      if (lng > o.bbox[2]) o.bbox[2] = lng;
      if (lat > o.bbox[3]) o.bbox[3] = lat;
    }
  }
}
const operatorList = [...operators.values()]
  .map(({ op, lines, colors, bbox }) => ({
    op,
    lines,
    color: [...colors].sort((a, b) => b[1] - a[1])[0][0],
    bbox: bbox.map((v) => Math.round(v * 1e4) / 1e4),
  }))
  .sort((a, b) => b.lines - a.lines || a.op.localeCompare(b.op, "ja"));
fs.writeFileSync(OPERATORS_OUT_PATH, JSON.stringify(operatorList));

const size = (fs.statSync(OUT_PATH).size / 1024 / 1024).toFixed(1);
console.log(
  `wrote ${OUT_PATH}: ${features.length} lines (${officialCount} with official colors), ${size} MB`,
);
console.log(`wrote ${OPERATORS_OUT_PATH}: ${operatorList.length} operators`);
