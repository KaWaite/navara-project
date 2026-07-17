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
const PREFECTURES_OUT_PATH = path.join(
  ROOT,
  "public",
  "data",
  "prefectures.json",
);

const N02_ZIP_URL =
  "https://nlftp.mlit.go.jp/ksj/gml/data/N02/N02-25/N02-25_GML.zip";
const MT3D_RAILWAYS_URL =
  "https://raw.githubusercontent.com/nagix/mini-tokyo-3d/master/data/railways.json";
// Simplified prefecture polygons (properties: nam_ja, id = JIS code 1..47).
// Simplification tolerance is on the order of a few hundred meters, which
// only matters for segments hugging a prefecture border — acceptable for
// show/hide toggling.
const PREF_BOUNDARIES_URL =
  "https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson";

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

async function loadPrefectures() {
  const cached = path.join(CACHE_DIR, "japan.geojson");
  if (!fs.existsSync(cached)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    await download(PREF_BOUNDARIES_URL, cached);
  }
  return JSON.parse(fs.readFileSync(cached, "utf8"));
}

// --- Prefecture assignment ---------------------------------------------------

function pointInRing([x, y], ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointInPolygon(pt, [outer, ...holes]) {
  if (!pointInRing(pt, outer)) return false;
  return !holes.some((hole) => pointInRing(pt, hole));
}

function pointInGeometry(pt, geometry) {
  if (geometry.type === "Polygon") return pointInPolygon(pt, geometry.coordinates);
  return geometry.coordinates.some((poly) => pointInPolygon(pt, poly));
}

function geometryBbox(geometry) {
  const bbox = [180, 90, -180, -90];
  const polys =
    geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  for (const [outer] of polys) {
    for (const [x, y] of outer) {
      if (x < bbox[0]) bbox[0] = x;
      if (y < bbox[1]) bbox[1] = y;
      if (x > bbox[2]) bbox[2] = x;
      if (y > bbox[3]) bbox[3] = y;
    }
  }
  return bbox;
}

/**
 * Builds a segment -> prefecture-code assigner. Each segment is voted on by
 * up to 7 evenly-sampled vertices (bbox pre-filter, then point-in-polygon);
 * ties go to the first majority hit. Segments with no vertex inside any
 * polygon (offshore bridges/tunnels) fall back to the prefecture whose bbox
 * center is nearest to the segment's midpoint.
 */
function makePrefAssigner(prefFeatures) {
  const prefs = prefFeatures.map((f) => ({
    code: f.properties.id,
    geometry: f.geometry,
    bbox: geometryBbox(f.geometry),
  }));

  return (coordinates) => {
    const step = Math.max(1, Math.floor(coordinates.length / 7));
    const votes = new Map();
    for (let i = 0; i < coordinates.length; i += step) {
      const pt = coordinates[i];
      for (const { code, geometry, bbox } of prefs) {
        if (pt[0] < bbox[0] || pt[0] > bbox[2] || pt[1] < bbox[1] || pt[1] > bbox[3])
          continue;
        if (pointInGeometry(pt, geometry)) {
          votes.set(code, (votes.get(code) ?? 0) + 1);
          break;
        }
      }
    }
    if (votes.size > 0) {
      return [...votes.entries()].sort((a, b) => b[1] - a[1])[0][0];
    }
    const [mx, my] = coordinates[Math.floor(coordinates.length / 2)];
    let best, bestDist = Infinity;
    for (const { code, bbox } of prefs) {
      const dx = (bbox[0] + bbox[2]) / 2 - mx;
      const dy = (bbox[1] + bbox[3]) / 2 - my;
      const d = dx * dx + dy * dy;
      if (d < bestDist) {
        bestDist = d;
        best = code;
      }
    }
    return best;
  };
}

const n02Path = await resolveN02Path();
const railways = await loadMt3dRailways();
const prefBoundaries = await loadPrefectures();
const n02 = JSON.parse(fs.readFileSync(n02Path, "utf8"));
console.log(`${n02.features.length} railroad sections from ${n02Path}`);

const assignPref = makePrefAssigner(prefBoundaries.features);

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

// One feature per line × prefecture, so prefecture toggling can show/hide
// pieces without cutting geometry mid-track (N02 segments are short, so
// segment-level assignment tracks the border closely). `lid` stays stable
// across the pieces of one line for line-level styling/highlighting.
let officialCount = 0;
const features = [];
for (const g of groups.values()) {
  const official = officialColor(g.op, g.line);
  if (official) officialCount++;
  const byPref = new Map();
  for (const segment of g.segments) {
    const pref = assignPref(segment);
    let segs = byPref.get(pref);
    if (!segs) byPref.set(pref, (segs = []));
    segs.push(segment);
  }
  for (const [pref, segments] of byPref) {
    features.push({
      type: "Feature",
      properties: {
        lid: `${g.op}|${g.line}`,
        op: g.op,
        line: g.line,
        cat: g.cat,
        pref,
        color: official ?? CATEGORY_COLORS[g.cat] ?? DEFAULT_COLOR,
        official: official ? 1 : 0,
      },
      geometry: { type: "MultiLineString", coordinates: segments },
    });
  }
}

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
  const { op, color, lid } = f.properties;
  let o = operators.get(op);
  if (!o) {
    // `lines` counts distinct lids: a line split across prefectures is still
    // one line.
    o = { op, lines: new Set(), colors: new Map(), bbox: [180, 90, -180, -90] };
    operators.set(op, o);
  }
  o.lines.add(lid);
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
    lines: lines.size,
    color: [...colors].sort((a, b) => b[1] - a[1])[0][0],
    bbox: bbox.map((v) => Math.round(v * 1e4) / 1e4),
  }))
  .sort((a, b) => b.lines - a.lines || a.op.localeCompare(b.op, "ja"));
fs.writeFileSync(OPERATORS_OUT_PATH, JSON.stringify(operatorList));

// Prefecture sidecar for the UI: JIS code, Japanese name, distinct line
// count, and the bbox of the prefecture's rail pieces (not the boundary
// polygon), so zoom-to frames the actual network.
const prefEntries = new Map(
  prefBoundaries.features.map((f) => [
    f.properties.id,
    {
      code: f.properties.id,
      name: f.properties.nam_ja,
      lines: new Set(),
      bbox: [180, 90, -180, -90],
    },
  ]),
);
for (const f of features) {
  const entry = prefEntries.get(f.properties.pref);
  if (!entry) continue;
  entry.lines.add(f.properties.lid);
  for (const line of f.geometry.coordinates) {
    for (const [lng, lat] of line) {
      if (lng < entry.bbox[0]) entry.bbox[0] = lng;
      if (lat < entry.bbox[1]) entry.bbox[1] = lat;
      if (lng > entry.bbox[2]) entry.bbox[2] = lng;
      if (lat > entry.bbox[3]) entry.bbox[3] = lat;
    }
  }
}
const prefectureList = [...prefEntries.values()]
  .map(({ code, name, lines, bbox }) => ({
    code,
    name,
    lines: lines.size,
    bbox: bbox.map((v) => Math.round(v * 1e4) / 1e4),
  }))
  .sort((a, b) => a.code - b.code);
fs.writeFileSync(PREFECTURES_OUT_PATH, JSON.stringify(prefectureList));

const size = (fs.statSync(OUT_PATH).size / 1024 / 1024).toFixed(1);
console.log(
  `wrote ${OUT_PATH}: ${features.length} line×prefecture pieces, ` +
    `${groups.size} lines (${officialCount} with official colors), ${size} MB`,
);
console.log(`wrote ${OPERATORS_OUT_PATH}: ${operatorList.length} operators`);
console.log(
  `wrote ${PREFECTURES_OUT_PATH}: ${prefectureList.length} prefectures`,
);
