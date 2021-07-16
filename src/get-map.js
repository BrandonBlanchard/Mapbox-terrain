import { TextureLoader } from 'three';

const access_token =
  'access_token=pk.eyJ1IjoiZWxpbmRpZSIsImEiOiJja3IxbWJrYngxZmVoMm5vN2Mxcm54Nzc5In0.p8on3QMuXzYw7qwDXOFdkA';

export const latLonToTile = (zoom, lat, lon) => {
  console.log(zoom, lat, lon);
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const y = Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
  console.log(zoom, x, y)
  return [ zoom, x, y ];
};

export const getMapBox = (
  zoom = 1,
  x = 0,
  y = 0,
  dataset = 'mapbox.terrain-rgb'
) =>
  new TextureLoader().load(
    `https://api.mapbox.com/v4/${dataset}/${zoom}/${x}/${y}@2x.pngraw?${access_token}`
  );
export const getMapBoxSatellite = (
  zoom = 1,
  x = 0,
  y = 0,
  dataset = 'mapbox.satellite'
) => getMapBox(zoom, x, y, dataset);
