import ThreeView from "@navara/three";

const view = new ThreeView({});
await view.init();

view.addLayer({
  type: "tiles",
  data: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  rasterTile: {
    maxZoom: 23,
  },
});

