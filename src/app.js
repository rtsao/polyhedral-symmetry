var fs = require('fs')
,	groups = require('./symmetryGroups')
,	THREE = require('three');

THREE.OrbitControls = require('./OrbitControls');

var shader = {
	vertex: fs.readFileSync(__dirname + '/painting.vertex.glsl','utf8'),
	fragment: fs.readFileSync(__dirname + '/painting.fragment.glsl','utf8')
}

var renderer, scene, camera;

//Settings
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight
    FOV = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 1000;

function init() {
	//Renderer Setup
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT);
	document.body.appendChild(renderer.domElement);


	// Texture rendering
	var RTtexture = new THREE.WebGLRenderTarget( WIDTH, HEIGHT, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat } );

	var	uniforms = {
			"group" : { type: "m3v",  value:groups.tetrahedronGroup },
			"groupSize" : { type : "i", value:groups.tetrahedronGroup.length },
			"texture" : { type: "t", value:texture }
		};

	var	RTcamera = new THREE.OrthographicCamera( -WIDTH/2, WIDTH/2, HEIGHT/2, -HEIGHT/2, 1, 100 );
	RTcamera.position.z = 1;

	var RTscene= new THREE.Scene();
	RTscene.add(RTcamera);

	var	RTmaterial = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: shader.vertex,
			fragmentShader: shader.fragment
		});

	RTmesh = new THREE.Mesh( new THREE.PlaneGeometry( WIDTH, HEIGHT ), RTmaterial );
	RTscene.add( RTmesh );

	renderer.render( RTscene, RTcamera, RTtexture, true );



	//Camera Setup
	camera = new THREE.PerspectiveCamera
	(
		FOV,
		ASPECT,
		NEAR,
		FAR
	);

	camera.position.z = 200;
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );


	//Scene Setup
	scene = new THREE.Scene();
	var radius = 50, segments = 60, rings = 60;

	var basicMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map:RTtexture } );

	var sphere = new THREE.Mesh
	(
		new THREE.SphereGeometry(radius, segments, rings),
		basicMaterial
	);

	scene.add(sphere);
	scene.add(camera);

	var controls = new THREE.OrbitControls( camera );
	controls.noPan = true;

	controls.addEventListener( 'change', render );
	render();

}



function render() {

	renderer.render(scene, camera);

}

var texture = THREE.ImageUtils.loadTexture('image1.jpg', null, init);


