var fs = require('fs')
,	groups = require('./symmetryGroups')
,	THREE = require('three')
,	dat = require('dat-gui')
,	orbitControls = require('./OrbitControls');

var shader = {
	vertex: fs.readFileSync( __dirname + '/painting.vertex.glsl', 'utf8' ),
	fragment: fs.readFileSync( __dirname + '/painting.fragment.glsl', 'utf8' )
}

var renderer, scene, camera, sphere, texture, material, RTtexture, RTcamera, RTscene, RTmesh;

//Settings
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight
    FOV = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 1000;

var options = {
	sphere: true,
	image: 'image3.jpg',
	group: 'tetrahedron',
	shiftX: 0.00,
	shiftY: 0.00
}

var gui = new dat.GUI();

var imageController = gui.add( options, 'image', [ 'image1.jpg', 'image2.jpg', 'image3.jpg' ] );
var groupController = gui.add( options, 'group', [ 'tetrahedron', 'cube', 'icosahedron', 'none' ] );
var sphereController = gui.add( options, 'sphere' );
var shiftXController = gui.add( options, 'shiftX', 0, 1.0 );
var shiftYController = gui.add( options, 'shiftY', 0, 1.0 );

imageController.onFinishChange( loadTextureSource );
groupController.onFinishChange( loadTextureSource );
shiftXController.onChange( loadTextureSource );
shiftYController.onChange( loadTextureSource );
sphereController.onFinishChange( render );

function init() {
	//Renderer Setup
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize( WIDTH, HEIGHT );
	document.body.appendChild( renderer.domElement );

	//Camera Setup
	camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );

	camera.position.z = 200;
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );


	//Scene Setup
	scene = new THREE.Scene();
	var radius = 50, segments = 60, rings = 60;

	material= new THREE.MeshBasicMaterial( { color: 0xffffff } );

	sphere = new THREE.Mesh
	(
		new THREE.SphereGeometry( radius, segments, rings ),
		material
	);

	scene.add( sphere );
	scene.add( camera );

	var controls = new orbitControls( camera, renderer.domElement );
	controls.noPan = true;

	controls.addEventListener( 'change', render );

}

function initTexture() {
	RTtexture = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	RTcamera = new THREE.OrthographicCamera( -WIDTH/2, WIDTH/2, HEIGHT/2, -HEIGHT/2, 1, 100 );
	RTcamera.position.z = 1;

	RTscene= new THREE.Scene();
	RTscene.add( RTcamera );

	RTmaterial = new THREE.ShaderMaterial({
			vertexShader: shader.vertex,
			fragmentShader: shader.fragment
	});

	RTmesh = new THREE.Mesh( new THREE.PlaneGeometry( WIDTH, HEIGHT ), RTmaterial );
	RTscene.add( RTmesh );

}

function renderTexture() {

	var	uniforms = {
			"group" : { type: "m3v",  value:groups[options.group] },
			"groupSize" : { type : "i", value:groups[options.group].length },
			"texture" : { type: "t", value:texture },
			"shiftX" : { type: "f", value:options.shiftX },
			"shiftY" : { type: "f", value:options.shiftY }
	};

	RTmesh.material.uniforms = uniforms;
	RTmesh.material.needsUpdate = true;

	renderer.render( RTscene, RTcamera, RTtexture, true );

	sphere.material.map = RTtexture;
	sphere.material.needsUpdate = true;

	render();
	
}

function render() {

	if (options.sphere) {
		renderer.render( scene, camera );
	}
	else {
		renderer.render( RTscene, RTcamera );
	}
	

}

function loadTextureSource() {
	texture = THREE.ImageUtils.loadTexture( options.image, null, renderTexture );
}

init();
initTexture();
loadTextureSource();





