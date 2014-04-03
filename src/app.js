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


//Renderer Setup
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// Texture rendering
var RTtexture = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

var	uniforms = {
		"group" : { type: "m3v",  value:groups.icosahedronGroup },
		"groupSize" : { type : "i", value:60 }
	};

var	RTcamera = new THREE.OrthographicCamera( -WIDTH*2, WIDTH*2, HEIGHT*2, -HEIGHT*2, 1, 1000 );
RTcamera.position.z = 1;

var RTscene= new THREE.Scene();
RTscene.add(RTcamera);

var	RTmaterial = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: shader.vertex,
		fragmentShader: shader.fragment
	});

RTmesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2 ), RTmaterial );
RTscene.add( RTmesh );

renderer.render( RTscene, RTcamera, RTtexture, true );

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

renderer.render(scene, camera);
