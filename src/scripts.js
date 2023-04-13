import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 1;

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
const boxGeo = new THREE.BoxGeometry( 25, 100, 25 );
const boxMat = new THREE.MeshPhongMaterial( { 
    color: 0x000000,
    side: THREE.DoubleSide,
} );
const box = new THREE.Mesh( boxGeo, boxMat );
scene.add( box );

// sphere 
const sphereGeo = new THREE.SphereGeometry(1, 64, 64 );
const sphereMat = new THREE.MeshBasicMaterial( { 
    side: THREE.DoubleSide,
} );
const sphere = new THREE.Mesh( sphereGeo, sphereMat );
scene.add( sphere );

let colors = ["b7999c", "8f9e87", "638b83", "c7b57d", "b4a9c7", "e1c9b1", "7a8b99", "d6a8b6", "bfb8a5", "9b9e77"]
let darkColors = ["4f6b65", "8d7e9e", "4bb9f2", "87B4C7", "B1C79F", "b67554", "3f4e6d", "8d4c5e", "817569", "4f524a"]
let ranNum = Math.floor(Math.random() * 3)
console.log(colors[ranNum], darkColors[ranNum])
sphere.material.color.setHex( `0x${colors[4]}` )
box.material.color.setHex( `0x${darkColors[4]}`)


document.getElementById("test").addEventListener("click", () => {
    console.log(document.body.getBoundingClientRect().top * -0.001)
    sphere.position.y = document.body.getBoundingClientRect().top * -0.001
})

document.addEventListener("scroll", () => {
    // console.log(document.body.getBoundingClientRect().top * 0.01)
    sphere.position.y = document.body.getBoundingClientRect().top * 0.01
})

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate()

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}