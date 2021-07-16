import { PerspectiveCamera, Scene, WebGLRenderer, PointLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { latLonToTile } from './get-map';
import { locationPresets } from './locations';
import { initMap, updateMapMaps } from './map/map';
import { buildLocationPanel } from './location-panel';

const initializeTHREE = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const gl = new WebGLRenderer();
  gl.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, gl.domElement);

  camera.position.set(20, 20, 100);
  controls.update();

  document.body.style = 'margin: 0';
  document.body.appendChild(gl.domElement);

  return { gl, scene, camera, controls };
};

const setupLights = (scene) => {
  const fillLight = new PointLight(0x636363, 0.6, 100);
  const keyLight = new PointLight(0xcdcdcd, 1, 100);
  keyLight.castShadow = true;

  keyLight.position.set(50, 500, 0);
  fillLight.position.set(-20, 50, 20);
  scene.add(fillLight, keyLight);

  return { keyLight, fillLight };
};

const renderLoop = (scene, camera, controls, gl) => {
  controls.update();
  gl.render(scene, camera);

  window.requestAnimationFrame(() => renderLoop(scene, camera, controls, gl));
};

const { gl, scene, camera, controls } = initializeTHREE();
const { keyLight, fillLight } = setupLights(scene);
const map = initMap(scene);

renderLoop(scene, camera, controls, gl);

buildLocationPanel((zoom, lat, lon) => {
  const [z, la, lo] = latLonToTile(zoom, lat, lon);
  updateMapMaps(z, la, lo);
});

// // Placeholder
const [zoom, x, y] = latLonToTile(...locationPresets.rainier);
updateMapMaps(zoom, x, y);
