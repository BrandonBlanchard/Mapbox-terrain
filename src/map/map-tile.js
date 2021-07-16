import {
  DataTexture,
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  Texture,
  UniformsLib,
} from 'three';
import { mapTileVS, mapTileFS } from '../shader';

// Tile Scale
export const tileSize = 124;
export const verticalScale = 100;
export const detailAmount = 512;

export const buildMapTile = (offsetX = 0, offsetZ = 0) => {
  const geo = new PlaneBufferGeometry(
    tileSize,
    tileSize,
    detailAmount,
    detailAmount
  );
  geo.rotateX(Math.PI / -2);

  const mat = new ShaderMaterial({
    fragmentShader: mapTileFS,
    vertexShader: mapTileVS,
    uniforms: {
      ...UniformsLib.common,
      ...UniformsLib.specularmap,
      ...UniformsLib.envmap,
      ...UniformsLib.aomap,
      ...UniformsLib.lightmap,
      ...UniformsLib.emissivemap,
      ...UniformsLib.fog,
      ...UniformsLib.lights,
      heightMap: { value: new DataTexture() },
      colorMap: { value: new DataTexture() },
      verticalScale: { value: verticalScale },
    },
    defines: {
      USE_UV: '',
      USE_FOG: '',
      USE_LIGHTS: '',
      USE_SHADOWS: '',
    },
    lights: true,
  });

  const mesh = new Mesh(geo, mat);

  mesh.frustumCulled = false;
  mesh.position.x = offsetX * tileSize;
  mesh.position.z = offsetZ * tileSize;

  return mesh;
};

