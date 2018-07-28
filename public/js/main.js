//Make scene with camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Make box and material
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
	color: 0x00ff00
});


//Change camera pos
camera.position.z = 10;
camera.position.y = 5;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100);

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);


//Instatiate a loader
var loader = new THREE.GLTFLoader();
var maguro = new THREE.GLTFLoader();
var egg = new THREE.GLTFLoader();

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

spawnMaguro();

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


// custom global variables
var targetList = [];
var projector, mouse = {
	x: 0,
	y: 0
};

// initialize object to perform world/screen calculations
projector = new THREE.Projector();

// when the mouse moves, call the given function
document.addEventListener('mousedown', onDocumentMouseDown, false);

var sushibool = 0;

function onDocumentMouseDown(event) {
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	/*
		if (sushibool == 0) {
			spawnEgg();
			scene.remove(maguro);
			sushibool = 1;
		} else {
			spawnMaguro()
			scene.remove(egg);
			sushibool = 0;
		}*/


	console.log("Click.");

	// update the mouse variable
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	projector.unprojectVector(vector, camera);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects(targetList);

	// if there is one (or more) intersections
	if (intersects.length > 0) {
		console.log("Hit @ " + toString(intersects[0].point));
		// change the color of the closest face.
		intersects[0].face.color.setRGB(0.8 * Math.random() + 0.2, 0, 0);
		intersects[0].object.geometry.colorsNeedUpdate = true;
	}

}



//Rotate cube x and y
var animate = function () {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
};

animate();