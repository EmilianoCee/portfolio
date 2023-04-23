import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 10;
camera.position.x = 25;
camera.position.set(15,5,15)

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

// controls
const controls = new OrbitControls( camera, renderer.domElement );

// camera.lookAt(new THREE.Vector3(0,0,0));

// light 
const light = new THREE.PointLight();
light.position.set(5, 15, 5)
scene.add(light);

// light helper
const lightHelper = new THREE.PointLightHelper(light);
scene.add(lightHelper)

let colors = ["b7999c", "8f9e87", "638b83", "c7b57d", "b4a9c7", "e1c9b1", "7a8b99", "d6a8b6", "bfb8a5", "9b9e77"]
let darkColors = ["4f6b65", "8d7e9e", "8C7456", "87B4C7", "B1C79F", "84948F", "99906B", "5F8A7C", "9BB6BF", "87869E"]
let ranNum = Math.floor(Math.random() * colors.length)

const assetLoader = new GLTFLoader();

// cactus object
let cactus;
assetLoader.load(`/src/assets/cactus.glb`, function(gltf) {
    cactus = gltf.scene;
    // cactus.scale.set(15,15,15);
    scene.add(cactus);

    cactus.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex( `0x${colors[ranNum]}` )
        }
    });

}, function (xhr) {
    console.log(`last name ${(xhr.loaded / xhr.total * 100)} % loaded`);
}, undefined, function(error) {
    console.error(error)
})

// random torus' in background
// const torusGeo = new THREE.TorusGeometry();
// const torusMat = new THREE.MeshBasicMaterial();
// // const torus = new THREE.Mesh(torusGeo, torusMat);
// function addTorus() {
//     const torus = new THREE.Mesh( torusGeo, torusMat);
//     for ( let i = 0; i < 100; i ++ ) {
//         torus.position.x = Math.random() * 300 - 150;
//         // torus.position.y = -Math.random() * 50 - 100;
//         torus.position.y = -100
//         torus.position.z = Math.random() * 200 - 100;

//         torus.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI)
//         torus.material.color.setHex( `0x${colors[ranNum]}` )

//         scene.add( torus );
//     }
// }
// Array(150).fill().forEach(addTorus);

function animate() {
	requestAnimationFrame( animate );
	
	// cieling.rotation.z += 0.1;
    // cieling.position.z += -0.1;

	renderer.render( scene, camera );
}
animate()

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}