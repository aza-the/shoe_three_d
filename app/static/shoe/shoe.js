import * as THREE from './node_modules/three/build/three.module.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from './node_modules/three/examples/jsm/libs/tween.module.min.js';
import Stats from './node_modules/three/examples/jsm/libs/stats.module.js';

const canvas = document.querySelector('#model'); // finding a canvas by id
 
const renderer = new THREE.WebGLRenderer({ canvas }); // creating a renderer instance
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// creating params of camera and camera itself
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// setting camera z position
let z_pos = 30;
camera.position.set(60, z_pos, -60);

// creating a scene
const scene = new THREE.Scene();

// controls which gives an ability to round the camera
let controls;
controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 45;
controls.maxDistance = 100;

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.3;
controls.panSpeed = 0.8;
controls.enableDamping = true
controls.dampingFactor = 0.05;

controls.target = new THREE.Vector3(0, 15, 0);
controls.update();

// adding a picture to the background
scene.background = new THREE.Color(0xffffff);

// making a platform for the shoe
const size = 750;
const planeGeometry = new THREE.PlaneGeometry(size, size);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xc2c2c2}); //0xa9a9a9
planeMaterial.metalness = 0.5;
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x += -Math.PI/2;
plane.receiveShadow = true;

scene.add(plane);

// making a stats of scene > fps, etc.
let stats;
stats = new Stats();
document.body.appendChild( stats.dom );

// function to see the contents of the model (tree structure)
function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}


// external frame of the shoe
let ext_frame;
extFrameSet();

// names of parts in shoe for choosing a part
const nameContainer = []; // filled in the loader function

/* 
  * Materials will be loaded from this arrays
  - each array contains it's list of available materials for named part

  * Material are stored as jpg files (material + material normal) and named according to this rule:
  - nameOfMaterial.jpg
  - nameOfMaterialNormal.jpg
*/
const yazik = [
  'biegeLeather',
  'blackLeather',
  'brownLeather',
  'leatherType1',
  'lightBrownLeather',
];
const vnutr = [
  'blueFabric',
  'darkGrayFabric',
  'grayFabric',
  'grayFabric2',
  'pixeledFabric',
];
const shnurki = [
  'darkGrayFabric',
  'grayFabric',
  'grayFabric2',
  'pixeledFabric',
  'blackPlastic',
];
const obod = [
  'biegeLeather',
  'blackLeather',
  'brownLeather',
  'leatherType1',
  'lightBrownLeather',
];
const zadniy_karkas = [
  'biegeLeather',
  'blackLeather',
  'brownLeather',
  'leatherType1',
  'lightBrownLeather',
];
const podoshva = [
  'blackPlastic',
  'brownPlastic',
  'grayPlastic',
];
const verhniy_karkas = [
  'biegeLeather',
  'blackLeather',
  'brownLeather',
  'leatherType1',
  'lightBrownLeather',
];
const stelka = [
  'blueFabric',
  'darkGrayFabric',
  'grayFabric',
  'grayFabric2',
  'pixeledFabric',
  'blackPlastic',
];
const vnesh = [
  'biegeLeather',
  'blackLeather',
  'brownLeather',
  'leatherType1',
  'lightBrownLeather',
];
const shvi = [
  'darkGrayFabric',
  'grayFabric',
  'grayFabric2',
  'pixeledFabric',
  'blackPlastic',
];import { DRACOLoader } from './node_modules/three/examples/jsm/loaders/DRACOLoader.js'

// left arrow click for choosing previous element of shoe
const leftArrowPress = document.getElementById('leftArrow');
leftArrowPress.onclick = function() {
  if(!ext_frame)
    return;
  let counter;
  for(let i = 0; i < nameContainer.length; i++){
    if( nameContainer[i] == ext_frame.name )
    {
      counter = i;
      break;
    }
  }
  if(counter - 1 < 0)
    counter = nameContainer.length-1
  else
    counter = counter - 1;
  if(!model)
    return;
  model.traverse(function(o){
    if(o.isMesh){
      if(o.name == nameContainer[counter])
      {
        ext_frame = o;
      }
    }
  })
  colorize(ext_frame);
  extFrameSet();
};

// right arrow click for choosing previous element of shoe
const rightArrowPress = document.getElementById('rightArrow');
rightArrowPress.onclick = function() {
  if(!ext_frame)
    return;
  let counter;
  for(let i = 0; i < nameContainer.length; i++){
    if( nameContainer[i] == ext_frame.name )
    {
      counter = i;
      break;
    }
  }
  counter = (counter + 1) % nameContainer.length;
  if(!model)
    return;
  model.traverse(function(o){
    if(o.isMesh){
      if(o.name == nameContainer[counter])
      {
        ext_frame = o;
      }
    }
  })
  colorize(ext_frame);
  extFrameSet();
};

// This function creates an image-button and adds it to the table
function createButton(path){
    const img = document.createElement('input');
    img.type = 'image';
    img.className = 'material';
    img.id = path;
    img.alt = path;
    const src = '/textures/' + path + '/' + path + '.jpg';
    img.src = src;
    img.onclick = function() {
      if(ext_frame){
        changeMaterial(ext_frame, path);
      }
    };
    let container = document.getElementById('materialTable');
    container.appendChild(img);
}

// calls creating image-button using arrays of materials
function addImage(pathArray){
  for(let i of pathArray){
    createButton(i);
  }
}

// table of materials for distinct element of shoe
let table = document.getElementById('materialTable');

// this function sets own list of materials available for chosen element of shoe
function extFrameSet(){
  if(!ext_frame){
    return;
  }
  
  if(table){
    table.remove();
  }
  
  const place = document.getElementById('materialDiv');
  table = document.createElement('table');
  table.id = 'materialTable';
  place.appendChild(table);

  if(ext_frame.name == 'язык'){
    addImage(yazik, table);
  }
  else if(ext_frame.name == 'внутр'){
    addImage(vnutr, table);
  }
  else if(ext_frame.name == 'обод'){
    addImage(obod, table);
  }
  else if(ext_frame.name == 'шнурки'){
    addImage(shnurki, table);
  }
  else if(ext_frame.name == 'верхний_каркас'){
    addImage(verhniy_karkas, table);
  }
  else if(ext_frame.name == 'стелька'){
    addImage(stelka, table);
  }
  else if(ext_frame.name == 'задний_каркас'){
    addImage(zadniy_karkas, table);
  }
  else if(ext_frame.name == 'подошва'){
    addImage(podoshva, table);
  }
  else if(ext_frame.name == 'внешн'){
    addImage(vnesh, table);
  }
  else if(ext_frame.name == 'швы'){
    addImage(shvi, table);
  }

  const materialText = document.getElementById('materialText');
  materialText.textContent = ext_frame.name;

  console.log('extFrameSet' + ext_frame.name);
}

// function that changes material of given mesh with given source
function changeMaterial(ext_frame, src){
  let newTexture = new THREE.TextureLoader().load('/textures/' + src + '/' + src + '.jpg');
  newTexture.wrapS = THREE.RepeatWrapping;
  newTexture.wrapT = THREE.RepeatWrapping;
  newTexture.repeat.set( 1, 1 );
  let textureNormalMap = new THREE.TextureLoader().load('/textures/' + src + '/' + src + 'Normal.jpg')
  ext_frame.material = new THREE.MeshStandardMaterial({map: newTexture, normalMap: textureNormalMap});
}

// loading the 3d model
let model;
const loader = new GLTFLoader();  // basic gltf loader
const percent_info = document.getElementById('materialText'); // to show how much model is loaded (in percent)

// shoe loader
loader.load(
  'shoe.glb',
  function ( gltf ){
    model = gltf.scene; // actual 3d object
    
    // setting the position of the model
    model.position.set( -25, 28.25, 0);
    model.scale.set( 0.3, 0.3, 0.3 );
    model.rotation.x = -1.575;
    model.rotation.y= 0.4;

    console.log(dumpObject(model).join('\n')); // loggin the model's tree structure

    model.traverse(function(o){
      if(o.isMesh){
        nameContainer.push(o.name);
        // setting initial textures for the model
        if(o.name == "подошва")
        {
          changeMaterial(o, 'brownPlastic');
          o.castShadow=true; // making a shadow using this part of shoe
          console.log("Shadow casted");
        }
        else if(o.name == 'язык'){
          changeMaterial(o, 'brownLeather');
        }
        else if(o.name == 'внутр'){
          changeMaterial(o, 'grayFabric2');
        }
        else if(o.name == 'обод'){
          changeMaterial(o, 'brownLeather');
        }
        else if(o.name == 'шнурки'){
          changeMaterial(o, 'blackPlastic');
        }
        else if(o.name == 'верхний_каркас'){
          changeMaterial(o, 'brownLeather');
        }
        else if(o.name == 'стелька'){
          changeMaterial(o, 'brownPlastic');
        }
        else if(o.name == 'задний_каркас'){
          changeMaterial(o, 'brownLeather');
        }
        else if(o.name == 'внешн'){
          changeMaterial(o, 'brownLeather');
        }
        else if(o.name == 'швы'){
          changeMaterial(o, 'brownPlastic');
        }
      }
    })

    scene.add(model);
  },
  function ( xhr ){
    let loaded = ( xhr.loaded / xhr.total * 100 );
    console.log( loaded.toFixed(0) + '% loaded' );
    percent_info.textContent = loaded.toFixed(0) + '% loaded';
  },
  function( error ){
    console.log( error );
  }
);

// this function creates ligth for the scene
function createLight(color, x, y, z , t_x=0, t_y=0, t_z=0, shadow = false) {
  const light = new THREE.DirectionalLight(color, 1 );
  light.position.set(x,y,z);
  light.target.position.set(t_x, t_y, t_z);
  light.target.updateMatrixWorld(); 
  light.castShadow = shadow;
  if(shadow){
    light.shadow.mapSize.width = 2048; // default
    light.shadow.mapSize.height = 2048; // default

    light.shadow.camera.left = -100;
    light.shadow.camera.right = 100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
  }
  return light;
}

// array of created lights
let light_arr = [
  createLight(0xffffff,-40, 79, 0),  
  createLight(0xffffff,40,79, 0, 0, 0, 0, true),
  createLight(0xffffff,0, 25, -20, 0, 25, 0),
  createLight(0xffffff,0, 25, 20, 0, 25, 0),
  createLight(0xffffff,0, -5, 0)
];

light_arr.forEach(item => scene.add(item));

// rendering (drawing) the scene and camera
renderer.render(scene, camera);

// setting size to display for renderer
function resizeRendererToDisplaySize(renderer){
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio; // for hi dpi
  const width = canvas.clientWidth * pixelRatio | 0;
  const height = canvas.clientHeight * pixelRatio | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if(needResize){
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Picking a part of shoe
class PickHelper{
  constructor(){
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
  }
  pick(normalizedPosition, scene, camera){
    // If needed to know num of triangles
    // console.log("Number of Triangles :", renderer.info.render.triangles);

    this.raycaster.setFromCamera(normalizedPosition, camera);
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);

    if(intersectedObjects.length){

      if(this.pickedObject){
        this.pickedObject = undefined;
      }
      this.pickedObject = intersectedObjects[0];
      colorize(this.pickedObject.object);
      ext_frame = this.pickedObject.object;
      console.log(ext_frame.name);
      clearPickPosition();
      extFrameSet();
    }
  }
}

//  this function highlights the chosen element (mesh)
function colorize(frame){
  const color1 = new THREE.Color(0x000000);
      const tween = new TWEEN.Tween({ x: 0 })
        .to({ x: 0.3 }, 500)
        .onUpdate((coords) => {
          color1.setRGB(0, 0, coords.x)
          frame.material.emissive = color1;
        });
      tween.start();
      const tween2 = new TWEEN.Tween({ x: 0.3 })
        .to({ x: 0 }, 500)
        .onUpdate((coords) => {
          color1.setRGB(0, 0, coords.x)
          frame.material.emissive = color1;
        });
      tween.chain(tween2);
}

// pickhelper instance
const pickHelper = new PickHelper();

const pickPosition = { x: 0, y: 0 };
clearPickPosition();

// list of functions that do the job for picking
function getCanvasRelativePostion(event){
  const rect = canvas.getBoundingClientRect();
  return{
    x: (event.clientX - rect.left) * canvas.width / rect.width,
    y: (event.clientY - rect.top) * canvas.height / rect.height,
  };
}

function setPickPosition(event){
  const pos = getCanvasRelativePostion(event);
  pickPosition.x = (pos.x / canvas.width) * 2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;
}

function clearPickPosition(){
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}

window.addEventListener('mousedown', setPickPosition)
window.addEventListener('mouseup', clearPickPosition);

window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});
 
window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});
 
window.addEventListener('touchend', clearPickPosition);

// animating the scene
function render(time){
  
  // fixing bad quality pic (in condition)
  if(resizeRendererToDisplaySize(renderer)){
    // checking for the width and height of the canvas (fixing stretchy problem)
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  controls.update(); // function to controls to work

  stats.update(); // stats for the scene (fps, etc)

  TWEEN.update(time);
  if(model)
    pickHelper.pick(pickPosition, model, camera, time); // pick function

  renderer.render(scene, camera);

  requestAnimationFrame(render); // actual function that call the render (animation)
}

requestAnimationFrame(render); // calling to start the animation



