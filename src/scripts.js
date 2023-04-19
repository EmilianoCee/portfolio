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
// const controls = new OrbitControls( camera, renderer.domElement );

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
} );
const sphere = new THREE.Mesh( sphereGeo, sphereMat );
sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2;
sphere.material.color.setHex( `0x${colors[ranNum]}` );
scene.add( sphere );

console.log(colors[ranNum], darkColors[ranNum])

const assetLoader = new GLTFLoader();
// first name object
let firstName;
assetLoader.load(`/src/assets/first-name.glb`, function(gltf) {
    firstName = gltf.scene.children[0];
    scene.add(firstName);
    firstName.position.set(-23.55, -51, 7.58);
    firstName.scale.set(15,15,15);

    firstName.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex( `0x${colors[ranNum]}` )
        }
    });
}, function (xhr) {
    console.log(`first name ${(xhr.loaded / xhr.total * 100)} % loaded`);
}, undefined, function(error) {
    console.error(error)
})
// console.log(sphere.getObjectByName())

// last name object
let lastName;
assetLoader.load(`/src/assets/last-name.glb`, function(gltf) {
    lastName = gltf.scene;
    scene.add(lastName);
    lastName.position.set(-26.5, -51, -2.5);
    lastName.scale.set(15,15,15);

    lastName.traverse(function (child) {
        if (child.isMesh) {
          child.material.color.setHex( `0x${colors[ranNum]}` )
        }
    });

}, function (xhr) {
    console.log(`last name ${(xhr.loaded / xhr.total * 100)} % loaded`);
}, undefined, function(error) {
    console.error(error)
})

document.getElementById("hamburger-contaier").addEventListener("click", () => {
    console.log(firstName)
})

function scrollCheck() {
    if (document.body.getBoundingClientRect().top * -0.025 >= 48) {
        canvas.style.display = "none";
        document.querySelector("#hamburger-contaier").style.display = "none";
    } else {
        sphere.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2
        canvas.style.display = "block";
        document.querySelector("#hamburger-contaier").style.display = "block";
        light.position.y = document.body.getBoundingClientRect().top * -0.025 - 49.2;

        cieling.position.z = document.body.getBoundingClientRect().top * 0.015 - 12.25;
        cieling.rotation.x = document.body.getBoundingClientRect().top * 0.0005 - Math.PI;

        floor.position.z = document.body.getBoundingClientRect().top * -0.015 + 10.25;
        floor.rotation.x = document.body.getBoundingClientRect().top * - 0.0005 - Math.PI;

        rightWall.position.x = document.body.getBoundingClientRect().top * -0.015 + 23.25;
        rightWall.rotation.y = document.body.getBoundingClientRect().top * 0.0005 + Math.PI / 2;

        leftWall.position.x = document.body.getBoundingClientRect().top * 0.015 - 26.75;
        leftWall.rotation.y = document.body.getBoundingClientRect().top * - 0.0005 + Math.PI / 2;

        backdrop.position.y = document.body.getBoundingClientRect().top * 0.005 - 50;
        if (firstName !== undefined && lastName !== undefined) {
            firstName.position.y = document.body.getBoundingClientRect().top * 0.005 - 51;
            lastName.position.y = document.body.getBoundingClientRect().top * 0.005 - 51;
          } else {
            console.log('names are undefined');
          }
        
    }
}
scrollCheck();
document.addEventListener("scroll", scrollCheck)


const torusGeo = new THREE.TorusGeometry();
const torusMat = new THREE.MeshBasicMaterial();
// const torus = new THREE.Mesh(torusGeo, torusMat);
function addTorus() {
    const torus = new THREE.Mesh( torusGeo, torusMat);
    for ( let i = 0; i < 100; i ++ ) {
        torus.position.x = Math.random() * 300 - 150;
        torus.position.y = -Math.random() * 50 - 100;
        torus.position.z = Math.random() * 200 - 100;

        torus.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI)
        torus.material.color.setHex( `0x${colors[ranNum]}` )

        scene.add( torus );
    }
}
Array(250).fill().forEach(addTorus);

function animate() {
	requestAnimationFrame( animate );
	
	// cieling.rotation.z += 0.1;
    // cieling.position.z += -0.1;

	renderer.render( scene, camera );
}
animate()

document.querySelector("main").style.backgroundColor = `#${darkColors[ranNum]}`;
document.querySelector("#hero").style.backgroundColor = `#${colors[ranNum]}`;

// setInterval(colorLerp, 500)

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}