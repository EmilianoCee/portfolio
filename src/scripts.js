import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

// controls
const controls = new OrbitControls( camera, renderer.domElement );

// light 
const light = new THREE.PointLight();
light.position.y = 10;
scene.add(light);

// light helper
const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper)

// box
const boxGeo = new THREE.BoxGeometry( 25, 25, 25 );
const boxMat = new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    side: THREE.DoubleSide,
} );
const box = new THREE.Mesh( boxGeo, boxMat );
scene.add( box );

// cube 
const cubeGeo = new THREE.SphereGeometry( );
const cubeMat = new THREE.MeshBasicMaterial( { 
    color: 0xff00ff,
    // side: THREE.DoubleSide,
} );
const cube = new THREE.Mesh( cubeGeo, cubeMat );
scene.add( cube );




document.getElementById("test").addEventListener("click", () => {
    console.log(document.body.getBoundingClientRect().top * -0.001)
    cube.position.y = document.body.getBoundingClientRect().top * -0.001
})

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate()

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}