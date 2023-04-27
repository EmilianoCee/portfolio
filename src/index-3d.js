import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.y = 10;
// camera.position.x = 25;
camera.position.set(0,2,20)

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene, camera);

renderer.shadowMap.enabled = true;

// controls
// const controls = new OrbitControls( camera, renderer.domElement );

camera.lookAt(new THREE.Vector3(0,0,0));

// light 
const light = new THREE.PointLight();
light.intensity = 1.1
light.position.set(0, 20, 10)
light.castShadow = true;
scene.add(light);

// light helper
// const lightHelper = new THREE.PointLightHelper(light);
// scene.add(lightHelper)

const assetLoader = new GLTFLoader();

// var images = [];
// function preload() {
//     for (var i = 0; i < arguments.length; i++) {
//         images[i] = new Image();
//         images[i].src = preload.arguments[i];
//     }
// }

// preload(
//     `/src/images/cacti.jpg`,
//     `/src/images/green-plant.jpg`
// )

const textureLoader = new THREE.TextureLoader();
const textures = [];
function preloadTextures() {
    const imageNames = ["cacti.jpg", "green-plant.jpg", "cacti.png", "pricklypear.png", "cactus.jpg"];
    
    imageNames.forEach((imageName) => {
      const texture = textureLoader.load(`src/images/${imageName}`);
      textures.push(texture);
    });
}
preloadTextures();

// desert floor
const floorGeo = new THREE.PlaneGeometry(250, 250, 16, 16);
const floorMat = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    shininess: false,
    color: 0xFBCC64,
});
const floor = new THREE.Mesh(floorGeo, floorMat)
floor.receiveShadow = true;
floor.position.y = -6;
floor.rotation.x = Math.PI / 2;
scene.add(floor)

// sign
const boardGeo = new THREE.PlaneGeometry(18, 12, 16, 16); 
const boardMat = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide,
    // shininess: false,
    color: 0xFFFFFF,
    map: textures[0],
});
const board = new THREE.Mesh(boardGeo, boardMat)
// board.receiveShadow = true;
board.castShadow = true;
board.position.x = -15;
board.position.z = -5;
board.rotation.y = Math.PI / 4;
scene.add(board)

// box
const boxGeo = new THREE.BoxGeometry(250, 100, 250, 16, 16, 16);
const boxMat = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide,
    color: 0x6295D9,
});
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.set(0, 42, 0)
scene.add(box)

// cactus object
let cactus;
assetLoader.load(`/src/assets/cactus.glb`, function(gltf) {
    cactus = gltf.scene;
    // cactus.scale.set(15,15,15);
    cactus.position.y = -5;
    scene.add(cactus);    
    cactus.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });

    for (let i = 0; i < 200; i++) {
        const cactusClone = SkeletonUtils.clone(cactus);
        cactusClone.position.z = Math.random() * -75 - 25;
        cactusClone.position.x = Math.random() * -200 + 100;
        cactusClone.position.y = -5;

        cactusClone.rotation.y = Math.random() * 2 * Math.PI
        cactusClone.castShadow = true;
        scene.add(cactusClone)

        cactusClone.traverse(function (child) {
            if (child.isMesh) {
                    child.castShadow = true;
                }
        });
    }

}, function (xhr) {
    console.log(`cactus ${(xhr.loaded / xhr.total * 100)}% loaded`);
}, undefined, function(error) {
    console.error(error)
})

let mouseX = 0;
let mouseY = 0;
function onDocumentMouseMove( event ) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

document.addEventListener('mousemove', onDocumentMouseMove);

let l = 0;
function animate() {
	requestAnimationFrame( animate );
    
    l = l + 0.001
    light.position.x = Math.sin(l) * 50

    camera.position.x += ( mouseX - camera.position.x ) * .01;
    camera.position.y += ( - mouseY - camera.position.y ) * .01;
    // if (camera.position.y <= 0) {
    //     camera.position.y = 0
    // }

	renderer.render( scene, camera );
}
animate()

const projectsEl = document.querySelectorAll(".project");
projectsEl.forEach((element) => {
    element.addEventListener('mouseover', function() {
        boardMat.map = textures[Array.from(projectsEl).indexOf(element) + 1]
    });
    
    element.addEventListener('mouseout', function() {
        boardMat.map = textures[0]
    });
});

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}