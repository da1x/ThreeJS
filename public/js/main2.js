var container, stats;
var camera, scene, raycaster, renderer, controls;
var keyLight, fillLight, backLight;

var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;

var loader = new THREE.GLTFLoader();

init();
//spawnMaguro();

var mesh = loader.load('../models/maguro.gltf', function (gltf) {
    scene.add(gltf.scene);
});


console.log(mesh);


function init() {

    //Make a div container
    container = document.createElement('div');
    document.body.appendChild(container);


    //Create camera and camera setting
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //Change camera pos
    camera.position.z = 10;
    camera.position.y = 5;

    //Create raycast
    raycaster = new THREE.Raycaster();

    //Create Renderer and add to container
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    /*
    //Add stats to container
    stats = new Stats();
    container.appendChild(stats.dom);
*/

    //Create scene
    scene = new THREE.Scene();

    //Add MouseMove
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    //Add Window Resize
    window.addEventListener('reszie', onWindowResize, false);

    //Create light
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 30);
    scene.add(light);

    //Create controller
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

}

var mesh;

//Function for spawning 3D model
function spawnMaguro() {
    loader.load('../models/maguro.gltf', function (gltf) {
            scene.add(gltf.scene);
        }

    );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    //RemoveMesh(mesh);
    console.log("Click.");

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
}

//Remove Mesh
/*
function RemoveMesh(myMesh) {
    scene.remove(myMesh);
    myMesh.geometry.dispose();
    myMesh.material.dispose();
    myMesh = undefined;
}*/


//Output render
var render = function () {
    requestAnimationFrame(render);
    /*theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));*/
    //camera.lookAt(scene.position);

    //camera.updateMatrixWorld();

    controls.update();
    renderer.render(scene, camera);
}

render();