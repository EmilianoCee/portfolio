import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 1;

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

// controls
// const controls = new OrbitControls( camera, renderer.domElement );

camera.lookAt(new THREE.Vector3(0,0,0));


// light 
const light = new THREE.PointLight();
light.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
scene.add(light);

// light helper
// const lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper)

// box
const boxGeo = new THREE.BoxGeometry( 50, 55, 22.5, 2, 2, 2 );
const boxMat = new THREE.MeshPhongMaterial( { 
    side: THREE.DoubleSide,
    shininess: false,
} );
const box = new THREE.Mesh( boxGeo, boxMat );
box.position.set(-1.75, -22.5, -1)
scene.add( box );

// sphere 
const sphereGeo = new THREE.SphereGeometry(1, 64, 64 );
const sphereMat = new THREE.MeshBasicMaterial( { 
    side: THREE.DoubleSide,
    // shininess: false,
} );
const sphere = new THREE.Mesh( sphereGeo, sphereMat );
sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2;
scene.add( sphere );

let colors = ["b7999c", "8f9e87", "638b83", "c7b57d", "b4a9c7", "e1c9b1", "7a8b99", "d6a8b6", "bfb8a5", "9b9e77"]
let darkColors = ["4f6b65", "8d7e9e", "8C7456", "87B4C7", "B1C79F", "84948F", "99906B", "5F8A7C", "9BB6BF", "87869E"]
let ranNum = Math.floor(Math.random() * 10)
console.log(colors[ranNum], darkColors[ranNum])
sphere.material.color.setHex( `0x${colors[ranNum]}` )
box.material.color.setHex( `0x${darkColors[ranNum]}`)

// const firstNameUrl = new URL(`/src/assets/first-name.glb`, import.meta.url);

const assetLoader = new GLTFLoader();

// first name object
assetLoader.load(`/src/assets/first-name.glb`, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-23.55, -51, 7.58);
    model.scale.set(15,15,15);

    model.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex( `0x${colors[ranNum]}` )
        }
    });

}, undefined, function(error) {
    console.error(error)
})
// console.log(sphere.getObjectByName())

// last name object
assetLoader.load(`/src/assets/last-name.glb`, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    model.position.set(-26.5, -51, -2.5);
    model.scale.set(15,15,15);

    model.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex( `0x${colors[ranNum]}` )
        }
    });

}, undefined, function(error) {
    console.error(error)
})

document.getElementById("test").addEventListener("click", () => {
    console.log(sphere.position)
    // sphere.position.y = document.body.getBoundingClientRect().top * -0.001
})

document.addEventListener("scroll", () => {
    if (document.body.getBoundingClientRect().top * -0.025 - 49.2 >= -0.2) {
        canvas.style.display = "none"
    } else {
        canvas.style.display = "block"
        sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
        console.log(sphere.position.y)
        console.log("top: " + document.body.getBoundingClientRect().top * 0.025)
        light.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
    }
})

document.querySelector("main").style.backgroundColor = `#${colors[ranNum]}`;

function animate() {
	requestAnimationFrame( animate );

	// sphere.rotation.x += 0.01;
	// sphere.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate()

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}