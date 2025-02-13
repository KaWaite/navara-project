import ThreeView, { JAPAN_GSI_ELEVATION_DECODER } from "@navara/three";

const view = new ThreeView({});
await view.init();

view.addLayer({
  type: "tiles",
  data: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  raster_tile: {
    max_zoom: 23,
  },
});

view.addLayer({
  type: "terrain",
  data: {
    url: "https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png",
  },
  raster_terrain: {
    elevation_decoder: JAPAN_GSI_ELEVATION_DECODER(),
  },
});
