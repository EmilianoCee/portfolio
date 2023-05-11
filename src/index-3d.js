import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
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

const textureLoader = new THREE.TextureLoader();
const textures = [];
function preloadTextures() {
    const imageNames = ["splendor.PNG", "eecu.PNG", "social-engineering.PNG", "layout-practice.PNG"];
    
    imageNames.forEach((imageName) => {
      const texture = textureLoader.load(`images/${imageName}`);
      textures.push(texture);
    });
}
preloadTextures();
const height = textureLoader.load(`images/height.png`)

// desert floor
const floorGeo = new THREE.PlaneGeometry(250, 250, 16, 16);
const floorMat = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
    shininess: false,
    color: 0xFBCC64,
    displacementMap: height,
});
const floor = new THREE.Mesh(floorGeo, floorMat)
floor.receiveShadow = true;
floor.position.y = -6.75;
floor.position.z = -100;
floor.rotation.x = Math.PI / 2;
scene.add(floor)

// sign
const boardGeo = new THREE.PlaneGeometry(18, 12, 16, 16); 
const boardMat = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide,
    color: 0xFFFFFF,
    map: textures[0],
});
const board = new THREE.Mesh(boardGeo, boardMat)
board.castShadow = true;
board.position.set(-12.5, -1, -5)
board.rotation.y = Math.PI / 4;
board.rotation.z = -0.0075;
scene.add(board)

// box
const boxGeo = new THREE.BoxGeometry(500, 100, 500, 16, 16, 16);
const boxMat = new THREE.MeshBasicMaterial( {
    side: THREE.DoubleSide,
    color: 0x6295D9,
});
const box = new THREE.Mesh(boxGeo, boxMat);
box.position.set(0, 41, 0)
scene.add(box)

// cactus object
let cactus;
assetLoader.load(`assets/cactus.glb`, function(gltf) {
    cactus = gltf.scene;
    cactus.position.y = -6;
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
        cactusClone.position.y = -7;

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

// cloud object
let cloud;
assetLoader.load(`assets/low_poly_cloud.glb`, function(gltf) {
    cloud = gltf.scene;
    cloud.position.set(-250, 25, -175);

    cloud.rotation.y = Math.PI  
    cloud.traverse(function (child) {
        if (child.isMesh) {
            child.shininess = false;
            child.receiveShadow = false;
        }
    });
}, function (xhr) {
    console.log(`cloud ${(xhr.loaded / xhr.total * 100)}% loaded`);
}, undefined, function(error) {
    console.error(error)
})

class Cloud {
    constructor(position, scale, speed) {
        this.cloud = SkeletonUtils.clone(cloud);
        this.cloud.scale.set(...scale);
        this.cloud.position.set(...position);
        scene.add(this.cloud); 

        this.cloud.traverse(function (child) {
            if (child.isMesh) {
                    child.shininess = false;
                }
        });

        this.speed = speed;
    }

    step() {
        this.cloud.position.x += this.speed;
    }
}

let mouseX = 0;
let mouseY = 0;
function onDocumentMouseMove( event ) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}
document.addEventListener('mousemove', onDocumentMouseMove);

function rand(x) {
    return Math.random() * x
}

let clouds = [];

let l = 0;
function animate() {
	requestAnimationFrame( animate );
    
    if (clouds.length < 20 && cloud) {
        clouds.push(new Cloud([rand(600) - 425, 15 + rand(10), - rand(175) - 100], [0.5, 0.5, 0.5], Math.random()/  50))
    }

    clouds.forEach((sub_cloud) => {
        sub_cloud.step();
    })

    l = l + 0.001
    light.position.x = Math.sin(l) * 50

    camera.position.x += ( mouseX - camera.position.x ) * .005;
    camera.position.y += ( - mouseY - camera.position.y ) * .005;

	renderer.render( scene, camera );
}
animate()

let currentIndex = 0;
function updateTexture() {
    boardMat.map = textures[currentIndex];
    boardMat.needsUpdate = true;
}

function changeImage() {
    currentIndex = (currentIndex + 1) % textures.length;
    updateTexture();
}

let intervalID = setInterval(changeImage, 2000);

const projectsEl = document.querySelectorAll(".project");

projectsEl.forEach((element) => {
    element.addEventListener('mouseover', function() {
        boardMat.map = textures[Array.from(projectsEl).indexOf(element)]
        clearInterval(intervalID)
    });

});

window.addEventListener("resize", windowResize);
function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}