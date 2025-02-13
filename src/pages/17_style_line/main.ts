import ThreeView from "@navara/three";

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
  type: "mvt",
  data: {
    url: "https://assets.cms.plateau.reearth.io/assets/67/b5b3c6-71d8-405c-88c8-4ead72890b2b/21201_gifu-shi_city_2023_citygml_1_op_tran_mvt_lod0/{z}/{x}/{y}.mvt",
  },
  polyline: {},
});
