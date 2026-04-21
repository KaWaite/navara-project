import ThreeView, { TERRARIUM_ELEVATION_DECODER } from "@navara/three";
import { DefaultDeclarations, DefaultPlugin } from "@navara/three_default_plugin";

const view = new ThreeView<DefaultDeclarations>();

// Plugins

const defaultPlugin = new DefaultPlugin();
view.addPlugin(defaultPlugin);

// Initialization

await view.init();

// Setup scene

view.atmosphere.date.setHours(8);

defaultPlugin.addDefaultPhotorealLayers();

// Layer declarations

view.addLayer({
  type: "tiles",
  data: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  rasterTile: {
    maxZoom: 18,
  },
});

view.addLayer({
  type: "terrain",
  data: {
    url: "https://tiles.mapterhorn.com/{z}/{x}/{y}.webp",
  },
  rasterTerrain: {
    maxZoom: 15,
    minZoom: 5,
    elevationDecoder: TERRARIUM_ELEVATION_DECODER(),
    castShadow: true,
    receiveShadow: true,
    tileSize: 512,
  },
});
