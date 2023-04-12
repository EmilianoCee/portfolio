import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// controls
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.y = 5;

// light 
const light = new THREE.PointLight();
scene.add(light);
const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper)
light.position.y = 10;

// box
const boxGeo = new THREE.BoxGeometry( 25, 25, 25 );
const boxMat = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    side: THREE.DoubleSide,
} );
const box = new THREE.Mesh( boxGeo, boxMat );
scene.add( box );

// cube 
const cubeGeo = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMat = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    // side: THREE.DoubleSide,
} );
const cube = new THREE.Mesh( cubeGeo, cubeMat );
scene.add( cube );

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate()