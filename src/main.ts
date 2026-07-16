import ThreeView, { Color, type FeatureEvaluator } from "@navara/three";
import {
  DefaultDescriptions,
  DefaultPlugin,
} from "@navara/three_default_plugin";
// import type { SelectiveBloomEffectDesc } from "@navara/three_default_descs";
import { AttributionPlugin } from "@navara/three_plugins";

import { createCameraHud } from "./cameraHud";
import {
  createRailCompanyWidget,
  type RailOperator,
} from "./railCompanyWidget";

const view = new ThreeView<DefaultDescriptions>();

// Plugins

const attribution = new AttributionPlugin();
view.addPlugin(attribution);

const defaultPlugin = new DefaultPlugin();
view.addPlugin(defaultPlugin);

// Initialization

await view.init();

// Setup scene
defaultPlugin.addDefaultPhotorealScene();

view.atmosphere.date.setHours(17);
// view.atmosphere.date.setHours(4, 30, 0, 0); // 4:30 JST, sunrise over Tokyo
view.toneMappingExposure = 10;

// Layer declarations

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

const terrain = view.addSource({
  type: "quantized-mesh",
  url: "https://terrain.reearth.land/cesium-mesh/ellipsoid/{z}/{x}/{y}.terrain",
  maxZoom: 18,
  requestVertexNormals: true,
  requestWaterMask: true,
});

view.addLayer({
  type: "terrain",
  source: terrain,
  terrain: {},
});

// Rail network (MLIT KSJ N02), one MultiLineString feature per line with a
// `color` property resolved by scripts/prepare-rail-data.mjs.

// view.addEffect<SelectiveBloomEffectDesc>({
//   id: "railBloom",
//   selectiveBloom: {
//     strength: 1.2,
//     radius: 0.3,
//     threshold: 0,
//   },
// });

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
    emissiveIntensity: 1.5,
    // effectIds: ["railBloom"],
  },
});

// Operators unchecked in the company widget; features are re-styled against
// this set via forceUpdate() -> featureUpdated.
const hiddenOperators = new Set<string>();

const applyRailStyle = ({ evaluator }: { evaluator: FeatureEvaluator }) => {
  evaluator.evaluate(
    ({ properties }) => ({
      color: new Color().setStyle((properties?.color as string) ?? "#8899aa"),
      show: !hiddenOperators.has(properties?.op as string),
    }),
    { filters: ["op", "color"] },
  );
};
railLayer.on("featureCreated", applyRailStyle);
railLayer.on("featureUpdated", applyRailStyle);

// Company toggle widget, fed by the operator sidecar written by
// scripts/prepare-rail-data.mjs.
fetch("/data/rail-operators.json")
  .then((res) => {
    if (!res.ok) throw new Error(`rail-operators.json: HTTP ${res.status}`);
    return res.json();
  })
  .then((operators: RailOperator[]) => {
    document.body.appendChild(
      createRailCompanyWidget({
        operators,
        onChange: (hidden) => {
          hiddenOperators.clear();
          for (const op of hidden) hiddenOperators.add(op);
          railLayer.forceUpdate();
        },
        onZoom: ([west, south, east, north]) => {
          const lat = (south + north) / 2;
          // Height that fits the bbox's larger side (~111.32 km per degree,
          // longitude shrunk by cos(lat)), with margin and sane bounds.
          const extent =
            111_320 *
            Math.max(
              north - south,
              (east - west) * Math.cos((lat * Math.PI) / 180),
            );
          const height = Math.min(Math.max(extent * 1.4, 30_000), 2_500_000);
          view.flyTo(
            { lng: (west + east) / 2, lat, height, pitch: -90, heading: 0 },
            1_500,
          );
        },
      }),
    );
  })
  .catch((err) => console.error("rail company widget disabled:", err));

// Default camera: over Japan. Looking straight down, screen-up is decided
// entirely by heading, so pin it to 0 (north) explicitly.
view.setCamera({
  lng: 140.2061,
  lat: 30.0036,
  height: 1_500_000,
  pitch: -60,
  heading: 351.9,
  roll: -49.2,
});

// Camera HUD (bottom left)
document.body.appendChild(createCameraHud(view.camera));

// Attribution

attribution.show([
  {
    attributionHtml: `<a href="https://s2maps.eu">Sentinel-2 cloudless 2020</a> by <a href="https://eox.at">EOX IT Services GmbH</a> (contains modified Copernicus Sentinel data 2020)`,
    attributionUrl: "https://www.openstreetmap.org/copyright",
  },
  {
    attribution: "© Re:Earth Terrain",
    attributionUrl: "https://terrain.reearth.land/",
  },
  {
    attribution: "© Mapterhorn",
    attributionUrl: "https://mapterhorn.com/",
  },
]);
