import ThreeView, { TERRARIUM_ELEVATION_DECODER } from "@navara/three";
import { DefaultDescriptions, DefaultPlugin } from "@navara/three_default_plugin";
import { drawAttributions } from "./attribution";

const view = new ThreeView<DefaultDescriptions>();

// Plugins

const defaultPlugin = new DefaultPlugin();
view.addPlugin(defaultPlugin);

// Initialization

await view.init();

// Setup scene
defaultPlugin.addDefaultPhotorealScene();

view.atmosphere.date.setHours(8);
view.toneMappingExposure = 10;

// Layer declarations

view.addLayer({
  type: "tiles",
  data: {
    url: "https://tiles.maps.eox.at/wmts?layer=s2cloudless-2020_3857&style=default" +
      "&tilematrixset=g&Service=WMTS&Request=GetTile" +
      "&Version=1.0.0&Format=image%2Fjpeg" +
      "&TileMatrix={z}&TileCol={x}&TileRow={y}",
  },
  rasterTile: {
    maxZoom: 16,
  },
});

view.addLayer({
  type: "tiles",
  data: {
    url: "https://tiles.mapterhorn.com/{z}/{x}/{y}.webp",
  },
  rasterTile: {
    maxZoom: 17,
    minZoom: 5,
  },
  hillshade: {
    elevationDecoder: TERRARIUM_ELEVATION_DECODER(),
  },
});

view.addLayer({
  type: "terrain",
  data: {
    url: "https://tiles.mapterhorn.com/{z}/{x}/{y}.webp",
  },
  rasterTerrain: {
    maxZoom: 17,
    minZoom: 5,
    elevationDecoder: TERRARIUM_ELEVATION_DECODER(),
    tileSize: 512,
  },
});

drawAttributions([
  {
    url: "https://www.openstreetmap.org/copyright",
    html: `<a href="https://s2maps.eu">Sentinel-2 cloudless 2020</a> by <a href="https://eox.at">EOX IT Services GmbH</a> (contains modified Copernicus Sentinel data 2020)`
  },
  {
    url: "https://mapterhorn.com/attribution",
    label: "© Mapterhorn"
  },
])
