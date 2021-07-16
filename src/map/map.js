import { buildMapTile } from './map-tile';
import { getMapBox, getMapBoxSatellite } from '../get-map';

const TILE_START = 0;
const TILE_END = 1;
const TILE_COUNT = TILE_END - TILE_START;

// Prepopulate with empty objects. This is a work around for iterators skipping null/empty.
export const mapTileMeshes = new Array(TILE_COUNT).fill(
  new Array(TILE_COUNT).fill({})
);

export const initMap = (scene) => {
  mapTileMeshes.forEach((row, xOffset) =>
    row.forEach((_, yOffset) => {
      console.log(`initializing tile (${xOffset}, ${yOffset})`);
      
      const tileMesh = buildMapTile(xOffset, yOffset);
      mapTileMeshes[xOffset][yOffset] = tileMesh;
      scene.add(tileMesh);
    })
  );

  return mapTileMeshes;
};

export const updateMapMaps = (zoom, x, y) =>
  mapTileMeshes.forEach((row, xOffset) =>
    row.forEach((mesh, yOffset) => {
      // Todo - adjust for min max tile counts.
      console.log(`updating tile (${xOffset}, ${yOffset})`);

      const adjustedX = x + xOffset;
      const adjustedY = y + yOffset;

      const heightMap = getMapBox(zoom, adjustedX, adjustedY);
      const colorMap = getMapBoxSatellite(zoom, adjustedX, adjustedY);

      mesh.material.uniforms.colorMap.value = colorMap;
      mesh.material.uniforms.heightMap.value = heightMap;
      mesh.material.uniforms.colorMap.value.needsUpdate = true;
      mesh.material.uniforms.heightMap.value.needsUpdate = true;
    })
  );
