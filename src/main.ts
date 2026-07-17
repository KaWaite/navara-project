import ThreeView, { Color, type FeatureEvaluator } from "@navara/three";
// Used by the commented-out photoreal-scene block below:
// import type {
//   SkyMeshDesc,
//   StarsDesc,
//   SkyLightProbeDesc,
//   SunLightDesc,
//   AerialPerspectiveEffectDesc,
//   LensFlareEffectDesc,
//   ToneMappingEffectDesc,
//   SMAAEffectDesc,
// } from "@navara/three_default_descs";
import {
  DefaultDescriptions,
  DefaultPlugin,
} from "@navara/three_default_plugin";
import type { SelectiveBloomEffectDesc } from "@navara/three_default_descs";
import { AttributionPlugin } from "@navara/three_plugins";

import { createCameraHud } from "./cameraHud";
import {
  createFilterWidget,
  type Prefecture,
  type RailOperator,
  type RestMode,
} from "./filterWidget";

// const view = new ThreeView<DefaultDescriptions>();
const view = new ThreeView<DefaultDescriptions>({
  useNormal: true,
  atmosphere: {
    date: new Date("2024-06-21T12:00:00"),
  },
});

// Plugins

const attribution = new AttributionPlugin();
view.addPlugin(attribution);

const defaultPlugin = new DefaultPlugin();
view.addPlugin(defaultPlugin);

// Initialization

await view.init();

// Setup scene
// defaultPlugin.addDefaultPhotorealScene();

// PhotorealScene default settings - start
// Meshes
// const sky = view.addMesh<SkyMeshDesc>({ sky: {} });
// const stars = view.addMesh<StarsDesc>({ stars: {} });

// // Lights
// const skyLightProbe = view.addLight<SkyLightProbeDesc>({ skyLightProbe: {} });
// const sun = view.addLight<SunLightDesc>({ sun: {} });
view.addMesh({ sky: {} });
view.addLight({ sun: {} });

// // Effects
// const aerialPerspective = view.addEffect<AerialPerspectiveEffectDesc>({
//   aerialPerspective: {},
// });
// const lensFlare = view.addEffect<LensFlareEffectDesc>({ lensFlare: {} }); // skipped on mobile
// const toneMapping = view.addEffect<ToneMappingEffectDesc>({ toneMapping: {} });
// const antialiasing = view.addEffect<SMAAEffectDesc>({ smaa: {} }); // FXAA instead on mobile
// PhotorealScene default settings - end

// view.atmosphere.date.setHours(5, 30, 0, 0); // 5:30 JST, sunrise over Tokyo
view.toneMappingExposure = 10;

// Layer declarations

// const raster = view.addSource({
//   type: "raster-tile",
//   url: "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//   maxZoom: 18,
// });

const raster = view.addSource({
  type: "raster-tile",
  url:
    "https://tiles.maps.eox.at/wmts?layer=s2cloudless-2020_3857&style=default" +
    "&tilematrixset=g&Service=WMTS&Request=GetTile" +
    "&Version=1.0.0&Format=image%2Fjpeg" +
    "&TileMatrix={z}&TileCol={x}&TileRow={y}",
  maxZoom: 16,
});

view.addLayer({
  type: "raster",
  source: raster,
  raster: {},
});

// const terrain = view.addSource({
//   type: "quantized-mesh",
//   url: "https://terrain.reearth.land/cesium-mesh/ellipsoid/{z}/{x}/{y}.terrain",
//   maxZoom: 18,
//   requestVertexNormals: true,
//   requestWaterMask: true,
// });

// view.addLayer({
//   type: "terrain",
//   source: terrain,
//   terrain: {},
// });

// Rail network (MLIT KSJ N02), one MultiLineString feature per line with a
// `color` property resolved by scripts/prepare-rail-data.mjs.

view.addEffect<SelectiveBloomEffectDesc>({
  id: "railBloom",
  selectiveBloom: {
    strength: 1.2,
    radius: 0.3,
    threshold: 0,
  },
});

// Dataset can be overridden for debugging, e.g. ?rail=/data/rail-tokyo.geojson
const railDataUrl =
  new URLSearchParams(location.search).get("rail") ??
  "/data/rail-network.geojson";

const railNetwork = view.addSource({
  type: "geojson",
  url: railDataUrl,
});

const railLayer = view.addLayer({
  type: "vector",
  source: railNetwork,
  polyline: {
    // clampToGround drapes lines into 512px-per-tile textures, which is far
    // too coarse at flyover altitude; render as real geometry instead.
    // Polylines ignore the depth buffer, so terrain never occludes them.
    // clampToGround: false,
    // Chunk the nationwide network into XYZ tiles; unchunked, the huge
    // MultiLineString batches crash the worker pipeline.
    tiled: true,
    height: 200,
    width: 4,
    maxWidth: 4,
    emissiveIntensity: 2.5,
    effectIds: ["railBloom"],
  },
});

// Widget focus state mirrored for the evaluator; features are re-styled
// against it via forceUpdate() -> featureUpdated. Non-focused companies are
// de-emphasized per restMode: "dim" keeps their color recognizable but thins
// the line and softens the glow (the bloom source is the evaluated color ×
// emissiveIntensity), "hide" removes them from the globe.
const focusedOperators = new Set<string>();
let restMode: RestMode = "dim";
const DIM_FACTOR = 0.55;

// Selected prefectures (JIS codes). Empty = no prefecture filtering. Features
// carry a `pref` tag from prepare-rail-data.mjs; pieces outside the selection
// are hidden entirely (prefecture filtering cuts, operator focus dims).
const selectedPrefs = new Set<number>();

// Intro reveal: prefectures "come online" one after another in JIS-code
// order (北海道 → 沖縄, a north-to-south sweep). While the intro runs,
// features stay hidden until their prefecture is revealed; the most recently
// revealed prefecture renders over-bright for one step (a bloom pop) before
// settling. Features created mid-intro (the GeoJSON parses asynchronously)
// are evaluated against the current reveal state, so they slot in correctly.
// Skippable with ?noIntro.
const revealedPrefs = new Set<number>();
let introRunning = !new URLSearchParams(location.search).has("noIntro");
let glowingPref: number | undefined;
const INTRO_STEP_MS = 100;
const INTRO_POP_SCALE = 1.9;

const runIntroReveal = (codes: number[]) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i >= codes.length) {
      clearInterval(timer);
      glowingPref = undefined;
      introRunning = false;
      railLayer.forceUpdate();
      return;
    }
    revealedPrefs.add(codes[i]);
    glowingPref = codes[i];
    i++;
    railLayer.forceUpdate();
  }, INTRO_STEP_MS);
};

// Navara's Color has no channel arithmetic; our colors are always #rrggbb
// (from prepare-rail-data.mjs), so parse and scale the channels directly.
const railColor = (hex: string, scale: number) => {
  const v = parseInt(hex.slice(1), 16);
  return new Color().setRGB(
    (((v >> 16) & 255) / 255) * scale,
    (((v >> 8) & 255) / 255) * scale,
    ((v & 255) / 255) * scale,
  );
};

const applyRailStyle = ({ evaluator }: { evaluator: FeatureEvaluator }) => {
  evaluator.evaluate(
    ({ properties }) => {
      const pref = properties?.pref as number | undefined;
      // pref === undefined covers debug datasets without prefecture tags.
      if (introRunning && pref !== undefined && !revealedPrefs.has(pref)) {
        return { show: false };
      }
      if (
        selectedPrefs.size > 0 &&
        pref !== undefined &&
        !selectedPrefs.has(pref)
      ) {
        return { show: false };
      }
      const op = properties?.op as string;
      const deemphasized =
        focusedOperators.size > 0 &&
        !focusedOperators.has(op) &&
        restMode !== "all";
      if (deemphasized && restMode === "hide") return { show: false };
      const popScale =
        introRunning && pref === glowingPref ? INTRO_POP_SCALE : 1;
      return {
        color: railColor(
          (properties?.color as string) ?? "#8899aa",
          (deemphasized ? DIM_FACTOR : 1) * popScale,
        ),
        width: 4,
        show: true,
      };
    },
    { filters: ["op", "color", "pref"] },
  );
};
railLayer.on("featureCreated", applyRailStyle);
railLayer.on("featureUpdated", applyRailStyle);

// Fly the camera to fit a [west, south, east, north] bbox.
const flyToBbox = ([west, south, east, north]: [
  number,
  number,
  number,
  number,
]) => {
  const lat = (south + north) / 2;
  // Height that fits the bbox's larger side (~111.32 km per degree,
  // longitude shrunk by cos(lat)), with margin and sane bounds.
  const extent =
    111_320 *
    Math.max(north - south, (east - west) * Math.cos((lat * Math.PI) / 180));
  const height = Math.min(Math.max(extent * 1.4, 30_000), 2_500_000);
  view.flyTo(
    { lng: (west + east) / 2, lat, height, pitch: -90, heading: 0 },
    1_500,
  );
};

// Combined filter widget (companies + prefectures tabs), fed by the sidecars
// written by scripts/prepare-rail-data.mjs. Each fetch fails independently so
// one missing sidecar only hides its tab, not the whole widget.
const loadJson = async <T>(url: string): Promise<T | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.error(`${url} failed:`, err);
    return null;
  }
};

Promise.all([
  loadJson<RailOperator[]>("/data/rail-operators.json"),
  loadJson<Prefecture[]>("/data/prefectures.json"),
]).then(([operators, prefectures]) => {
  if (operators || prefectures) {
    document.body.appendChild(
      createFilterWidget({
        operators: operators ?? [],
        prefectures: prefectures ?? [],
        onRailChange: ({ focused, restMode: mode }) => {
          focusedOperators.clear();
          for (const op of focused) focusedOperators.add(op);
          restMode = mode;
          railLayer.forceUpdate();
        },
        onPrefChange: (selected) => {
          selectedPrefs.clear();
          for (const code of selected) selectedPrefs.add(code);
          railLayer.forceUpdate();
        },
        onZoom: flyToBbox,
      }),
    );
  }
  if (prefectures) {
    if (introRunning) {
      // Small delay so the first tiles/features are on screen when the
      // sweep begins.
      setTimeout(() => runIntroReveal(prefectures.map((p) => p.code)), 600);
    }
  } else {
    // Without the prefecture list the intro could never finish revealing;
    // fail open and show everything.
    introRunning = false;
    railLayer.forceUpdate();
  }
});

// Default camera: over Japan. Looking straight down, screen-up is decided
// entirely by heading, so pin it to 0 (north) explicitly.
view.setCamera({
  lng: 141.0965,
  lat: 38.0547,
  height: 1_380_000,
  pitch: -85.3,
  heading: 334.2,
  roll: -49.2,
});

// Camera HUD (bottom left)
document.body.appendChild(createCameraHud(view.camera));

// Attribution

attribution.show([
  // Match the active raster source: EOX satellite. When switching back to
  // CARTO dark matter, swap in:
  //   { attributionHtml: `© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>` },
  {
    attributionHtml: `<a href="https://s2maps.eu">Sentinel-2 cloudless 2020</a> by <a href="https://eox.at">EOX IT Services GmbH</a> (contains modified Copernicus Sentinel data 2020)`,
    attributionUrl: "https://www.openstreetmap.org/copyright",
  },
  {
    attribution: "国土数値情報（鉄道データ）",
    attributionUrl:
      "https://nlftp.mlit.go.jp/ksj/gml/datalist/KsjTmplt-N02-v2_3.html",
  },
  // Terrain is currently disabled; restore these with the terrain layer:
  // { attribution: "© Re:Earth Terrain", attributionUrl: "https://terrain.reearth.land/" },
  // { attribution: "© Mapterhorn", attributionUrl: "https://mapterhorn.com/" },
]);
