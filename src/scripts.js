import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.y = 0.1;

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

// controls
const controls = new OrbitControls( camera, renderer.domElement );

camera.lookAt(new THREE.Vector3(0,0,0));


// light 
const light = new THREE.PointLight();
light.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
scene.add(light);

// light helper
// const lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper)

let colors = ["b7999c", "8f9e87", "638b83", "c7b57d", "b4a9c7", "e1c9b1", "7a8b99", "d6a8b6", "bfb8a5", "9b9e77"]
let darkColors = ["4f6b65", "8d7e9e", "8C7456", "87B4C7", "B1C79F", "84948F", "99906B", "5F8A7C", "9BB6BF", "87869E"]
let ranNum = Math.floor(Math.random() * colors.length)

// backdrop 
const backGeo = new THREE.PlaneGeometry(50, 22.5, 32, 16);
const backMat = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    shininess: false,
    // wireframe: true,
    // transparent: true,
});
const backdrop = new THREE.Mesh( backGeo, backMat );
backdrop.rotation.x = Math.PI / 2;
backdrop.position.set(-1.75, -50, -1)
scene.add( backdrop );

// top and bottom of box
const roofGeo = new THREE.PlaneGeometry(50, 55, 22.5, 16);
const roofMat = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    shininess: false,
});

// cieling
const cieling = new THREE.Mesh( roofGeo, roofMat );
cieling.rotation.x = Math.PI;
cieling.position.set(-1.75, -22.5, -12.25);
cieling.material.color.setHex( `0x${darkColors[ranNum]}`);
scene.add( cieling );

// floor
const floor = new THREE.Mesh( roofGeo, roofMat );
floor.rotation.x = Math.PI;
floor.position.set(-1.75, -22.5, 10.25);
floor.material.color.setHex( `0x${darkColors[ranNum]}`);
scene.add( floor );


// right and left of box
const wallsGeo = new THREE.PlaneGeometry(55, 22.5, 22.5, 16);
const wallMat = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide,
    shininess: false,
});

// left wall
const leftWall = new THREE.Mesh( wallsGeo, wallMat );
leftWall.rotation.x = Math.PI / 2;
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-26.75, -22.5, -1);
leftWall.material.color.setHex( `0x${darkColors[ranNum]}`);
scene.add( leftWall );

// right wall
const rightWall = new THREE.Mesh( wallsGeo, wallMat );
rightWall.rotation.x = Math.PI / 2;
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set(23.25, -22.5, -1);
rightWall.material.color.setHex( `0x${darkColors[ranNum]}`);
scene.add( rightWall );

// box
const boxGeo = new THREE.BoxGeometry( 50, 55, 22.5, 2, 2, 2 );
const boxMat = new THREE.MeshPhongMaterial( { 
    side: THREE.DoubleSide,
    shininess: false,
    // wireframe: true,
    // transparent: true,
} );
const box = new THREE.Mesh( boxGeo, boxMat );
box.material.color.setHex( `0x${darkColors[ranNum]}`);
box.position.set(-1.75, -22.5, -1)
// scene.add( box );

// box wireframe
const boxWire = new THREE.WireframeGeometry( boxGeo );
const boxline = new THREE.LineSegments( boxWire );
boxline.position.set(-1.75, -22.5, -1)
backdrop.material.color.setHex( `0x${darkColors[ranNum]}`);
// scene.add( boxline );

// sphere 
const sphereGeo = new THREE.SphereGeometry(1, 64, 64 );
const sphereMat = new THREE.MeshBasicMaterial( { 
    side: THREE.DoubleSide,
    // shininess: false,
} );
const sphere = new THREE.Mesh( sphereGeo, sphereMat );
sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2;
sphere.material.color.setHex( `0x${colors[ranNum]}` );
scene.add( sphere );

console.log(colors[ranNum], darkColors[ranNum])

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

document.getElementById("hamburger-contaier").addEventListener("click", () => {
    console.log(currNum)
})

function scrollCheck() {
    if (document.body.getBoundingClientRect().top * -0.025 >= 48) {
        canvas.style.display = "none"
        // document.querySelector("#hero").style.backgroundColor = `#${colors[currNum]}`;
        document.querySelector("#hamburger-contaier").style.display = "none";
    } else {
        sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
        // console.log(sphere.position.y)
        // console.log("top: " + document.body.getBoundingClientRect().top * -0.025)
        canvas.style.display = "block"
        document.querySelector("#hamburger-contaier").style.display = "block";
        light.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2

        cieling.position.z = document.body.getBoundingClientRect().top * 0.01 - 12.25
        floor.position.z = document.body.getBoundingClientRect().top * -0.01 + 10.25

        rightWall.position.x = document.body.getBoundingClientRect().top * -0.01 + 23.25
        leftWall.position.x = document.body.getBoundingClientRect().top * 0.01 - 26.75

        backdrop.position.y = document.body.getBoundingClientRect().top * 0.005 - 50
    }
}

scrollCheck();
document.addEventListener("scroll", scrollCheck)

 

let currNum = ranNum;
function colorLerp() {
    currNum++
    if (currNum >= colors.length) {
        currNum = 0;
    }
    let endColor = `0x${colors[currNum]}`;
    sphere.material.color.setHex(endColor)
}

function animate() {
	requestAnimationFrame( animate );
	
	// cieling.rotation.z += 0.1;
    // cieling.position.z += -0.1;

	renderer.render( scene, camera );
}
animate()

document.querySelector("main").style.backgroundColor = `#${darkColors[ranNum]}`;
document.querySelector("#hero").style.backgroundColor = `#${colors[currNum]}`;

// setInterval(colorLerp, 500)

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}