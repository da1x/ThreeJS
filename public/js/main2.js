var container, stats;
var camera, scene, raycaster, renderer, controls;
var keyLight, fillLight, backLight;

var mouse = new THREE.Vector2(),
    INTERSECTED;
var radius = 100,
    theta = 0;

var loader = new THREE.GLTFLoader();
var maguro = new THREE.GLTFLoader();
var egg = new THREE.GLTFLoader();


init();
spawnEgg();
spawnMaguro();


function init() {

    //Make a div container
    container = document.createElement('div');
    document.body.appendChild(container);


    //Create camera and camera setting
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
    //Change camera pos
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

    //Create scene and background color
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xff0000, 1);


    //Create light
    keyLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100);

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    //Create controller
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    //Add MouseMove
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    //Add Window Resize
    window.addEventListener('reszie', onWindowResize, false);

}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
}

//Function for spawning 3D model
function spawnMaguro() {
    loader.load('../models/maguro.gltf', function (gltf) {
            scene.add(gltf.scene);
            gltf.animations;
            gltf.scene;
            gltf.scenes;
            gltf.camera;
            gltf.asset;
        },

        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An Error Happaned')
        }
    );
}

function spawnEgg() {
    loader.load('../models/egg.gltf', function (gltf) {
            scene.add(gltf.scene);
            gltf.animations;
            gltf.scene;
            gltf.scenes;
            gltf.camera;
            gltf.asset;
        },

        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An Error Happaned')
        }

    );
}

function render() {
    /*theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();
*/
    controls.update();

    renderer.render(scene, camera);
}