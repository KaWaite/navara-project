import {
  type LayerDescription,
  JAPAN_GSI_ELEVATION_DECODER,
} from "@navara/three";
import { Layer, useViewContext } from "@navara/three_react";
import { useMemo, type FC } from "react";

import { useDefaultLayers } from "./hooks";

export const Layers: FC = () => {
  const { view } = useViewContext();

  const defaultLayers = useDefaultLayers(view);

  // Descriptions
  const baseTiles = useMemo<LayerDescription>(
    () => ({
      type: "tiles",
      data: { url: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg" },
      raster_tile: { min_zoom: 2, max_zoom: 18 },
    }),
    [],
  );

  const terrain = useMemo<LayerDescription>(
    () => ({
      type: "terrain",
      data: { url: "https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png" },
      raster_terrain: {
        min_zoom: 6,
        max_zoom: 15,
        elevation_decoder: JAPAN_GSI_ELEVATION_DECODER(),
        cast_shadow: true,
        receive_shadow: true,
      },
    }),
    [],
  );

  const chiyoda3d = useMemo<LayerDescription>(
    () => ({
      type: "cesium3dtiles",
      data: {
        url: "https://assets.cms.plateau.reearth.io/assets/db/070026-aa27-431b-8d53-7cc6b03244f8/13101_chiyoda-ku_pref_2023_citygml_1_op_bldg_3dtiles_13101_chiyoda-ku_lod2_no_texture/tileset.json",
      },
      model: {
        show: true,
        id_property: "gml_id",
        color: 0xffffff,
        metalness: 0,
        roughness: 1,
        cast_shadow: true,
        receive_shadow: true,
        height: -50,
      },
    }),
    [],
  );

  const chuo3d = useMemo<LayerDescription>(
    () => ({
      type: "cesium3dtiles",
      data: {
        url: "https://assets.cms.plateau.reearth.io/assets/4c/f2436a-e2be-40e2-83da-f1781f36e30b/13102_chuo-ku_pref_2023_citygml_1_op_bldg_3dtiles_13102_chuo-ku_lod2_no_texture/tileset.json",
      },
      model: {
        show: true,
        id_property: "gml_id",
        color: 0xffffff,
        metalness: 0,
        roughness: 1,
        cast_shadow: true,
        receive_shadow: true,
        height: -50,
      },
    }),
    [],
  );

  const cloudsEffect = useMemo<LayerDescription>(
    () => ({
      type: "effect",
      clouds: {},
    }),
    [],
  );

  return (
    <>
      <Layer config={baseTiles} />
      <Layer config={terrain} />
      <Layer config={chiyoda3d} />
      <Layer config={chuo3d} />
      {defaultLayers && <Layer config={cloudsEffect} />}
    </>
  );
};
