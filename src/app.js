var fs = require('fs')
,	groups = require('./symmetryGroups')
,	THREE = require('three');

var shader = {
	vertex: fs.readFileSync(__dirname + '/painting.vertex.glsl','utf8'),
	fragment: fs.readFileSync(__dirname + '/painting.fragment.glsl','utf8')
}

//Settings
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight
    FOV = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 1000;

//Camera Setup
var camera = new THREE.PerspectiveCamera
(
	FOV,
	ASPECT,
	NEAR,
	FAR
);

camera.position.z = 300;
camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

//Scene Setup
var scene = new THREE.Scene();
var radius = 50, segments = 60, rings = 60;

var basicMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

var sphere = new THREE.Mesh
(
	new THREE.SphereGeometry(radius, segments, rings),
	basicMaterial
);

scene.add(sphere);
scene.add(camera);

//Renderer Setup
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);


renderer.render(scene, camera);
