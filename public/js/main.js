//Make scene with camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//Instatiate a loader
var maguro = new THREE.GLTFLoader();
var egg = new THREE.GLTFLoader();


//Renderer
var renderer = new THREE.WebGLRenderer({
	alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


////////////////////////////////////////////////////////

//Change camera pos
camera.position.z = 10;
camera.position.y = 5;

//Add controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

//Add light
var keyLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 1.0);
keyLight.position.set(-100, 0, 100);

scene.add(keyLight);

spawnMaguro();

/////////////////////////////////////////////////////////
function spawnMaguro() {
	maguro.load('../models/maguro.gltf', function (gltf) {
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
	egg.load('../models/egg.gltf', function (gltf) {
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


var mouse = {
	x: 0,
	y: 0
};
// when the mouse moves, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);

var sushibool = 0;

function onDocumentMouseDown(event) {


	console.log("Click.");

	// update the mouse variable
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

}



//Rotate cube x and y
var animate = function () {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
};

//animate();