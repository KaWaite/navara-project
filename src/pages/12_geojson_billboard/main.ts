import ThreeView from "@navara/three";
import { fetchGeoJSON } from "../../utils";

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

const geojson = await fetchGeoJSON("point.geojson");

