var THREE = require('three');

//Groups are flattened matrices 3x3 calculated in Mathematica
var TETRAHEDRON_GROUP = [-0.5,-0.5,-0.7071067811865475,0.5,0.5,-0.7071067811865475,0.7071067811865475,-0.7071067811865475,0,1,0,0,0,1,0,0,0,1,0.5,0.5,-0.7071067811865475,-0.5,-0.5,-0.7071067811865475,-0.7071067811865475,0.7071067811865475,0,-1,0,0,0,-1,0,0,0,1,0.5,-0.5,0.7071067811865475,0.5,-0.5,-0.7071067811865475,0.7071067811865475,0.7071067811865475,0,0,-1,0,-1,0,0,0,0,-1,0.5,-0.5,-0.7071067811865475,0.5,-0.5,0.7071067811865475,-0.7071067811865475,-0.7071067811865475,0,0,1,0,1,0,0,0,0,-1,-0.5,-0.5,0.7071067811865475,0.5,0.5,0.7071067811865475,-0.7071067811865475,0.7071067811865475,0,-0.5,0.5,-0.7071067811865475,-0.5,0.5,0.7071067811865475,0.7071067811865475,0.7071067811865475,0,0.5,0.5,0.7071067811865475,-0.5,-0.5,0.7071067811865475,0.7071067811865475,-0.7071067811865475,0,-0.5,0.5,0.7071067811865475,-0.5,0.5,-0.7071067811865475,-0.7071067811865475,-0.7071067811865475,0];
var CUBE_GROUP = [1,0,0,0,-1,0,0,0,-1,1,0,0,0,0,1,0,-1,0,0,-1,0,1,0,0,0,0,1,0,0,-1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,-1,-1,0,0,0,1,0,0,0,-1,0,-1,0,0,0,-1,1,0,0,-1,0,0,0,-1,0,0,0,1,0,0,-1,1,0,0,0,-1,0,0,0,1,1,0,0,0,1,0,1,0,0,0,0,-1,0,1,0,-1,0,0,0,0,1,0,1,0,-1,0,0,0,0,-1,0,-1,0,0,0,1,0,-1,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,1,-1,0,0,0,-1,0,0,0,1,0,1,0,-1,0,0,0,-1,0,-1,0,0,0,0,-1,0,1,0,0,0,-1,-1,0,0,0,1,0,0,0,1,1,0,0,0,0,-1,-1,0,0,0,1,0,0,1,0,-1,0,0,0,0,1,0,-1,0,0,0,1,-1,0,0,0,0,-1,0,-1,0,-1,0,0];
var ICOSAHEDRON_GROUP = [-1,0,0,0,-1,0,0,0,1,-1,0,0,0,1,0,0,0,-1,-0.5,-0.309017,-0.809017,-0.309017,-0.809017,0.5,-0.809017,0.5,0.309017,-0.5,-0.309017,-0.809017,0.309017,0.809017,-0.5,0.809017,-0.5,-0.309017,-0.5,-0.309017,0.809017,-0.309017,-0.809017,-0.5,0.809017,-0.5,0.309017,-0.5,-0.309017,0.809017,0.309017,0.809017,0.5,-0.809017,0.5,-0.309017,-0.5,0.309017,-0.809017,-0.309017,0.809017,0.5,0.809017,0.5,-0.309017,-0.5,0.309017,-0.809017,0.309017,-0.809017,-0.5,-0.809017,-0.5,0.309017,-0.5,0.309017,0.809017,-0.309017,0.809017,-0.5,-0.809017,-0.5,-0.309017,-0.5,0.309017,0.809017,0.309017,-0.809017,0.5,0.809017,0.5,0.309017,0,-1,0,0,0,-1,1,0,0,0,-1,0,0,0,1,-1,0,0,0,0,-1,-1,0,0,0,1,0,0,0,-1,1,0,0,0,-1,0,0,0,1,-1,0,0,0,-1,0,0,0,1,1,0,0,0,1,0,0,1,0,0,0,-1,-1,0,0,0,1,0,0,0,1,1,0,0,0.5,-0.309017,-0.809017,-0.309017,0.809017,-0.5,0.809017,0.5,0.309017,0.5,-0.309017,-0.809017,0.309017,-0.809017,0.5,-0.809017,-0.5,-0.309017,0.5,-0.309017,0.809017,-0.309017,0.809017,0.5,-0.809017,-0.5,0.309017,0.5,-0.309017,0.809017,0.309017,-0.809017,-0.5,0.809017,0.5,-0.309017,0.5,0.309017,-0.809017,-0.309017,-0.809017,-0.5,-0.809017,0.5,-0.309017,0.5,0.309017,-0.809017,0.309017,0.809017,0.5,0.809017,-0.5,0.309017,0.5,0.309017,0.809017,-0.309017,-0.809017,0.5,0.809017,-0.5,-0.309017,0.5,0.309017,0.809017,0.309017,0.809017,-0.5,-0.809017,0.5,0.309017,1,0,0,0,-1,0,0,0,-1,1,0,0,0,1,0,0,0,1,-0.809017,-0.5,-0.309017,-0.5,0.309017,0.809017,-0.309017,0.809017,-0.5,-0.809017,-0.5,-0.309017,0.5,-0.309017,-0.809017,0.309017,-0.809017,0.5,-0.809017,-0.5,0.309017,-0.5,0.309017,-0.809017,0.309017,-0.809017,-0.5,-0.809017,-0.5,0.309017,0.5,-0.309017,0.809017,-0.309017,0.809017,0.5,-0.809017,0.5,-0.309017,-0.5,-0.309017,0.809017,0.309017,0.809017,0.5,-0.809017,0.5,-0.309017,0.5,0.309017,-0.809017,-0.309017,-0.809017,-0.5,-0.809017,0.5,0.309017,-0.5,-0.309017,-0.809017,-0.309017,-0.809017,0.5,-0.809017,0.5,0.309017,0.5,0.309017,0.809017,0.309017,0.809017,-0.5,-0.309017,-0.809017,-0.5,-0.809017,0.5,-0.309017,0.5,0.309017,-0.809017,-0.309017,-0.809017,-0.5,0.809017,-0.5,0.309017,-0.5,-0.309017,0.809017,-0.309017,-0.809017,0.5,-0.809017,0.5,0.309017,-0.5,-0.309017,-0.809017,-0.309017,-0.809017,0.5,0.809017,-0.5,-0.309017,0.5,0.309017,0.809017,-0.309017,0.809017,-0.5,-0.809017,-0.5,-0.309017,-0.5,0.309017,0.809017,-0.309017,0.809017,-0.5,0.809017,0.5,0.309017,0.5,-0.309017,-0.809017,-0.309017,0.809017,0.5,-0.809017,-0.5,0.309017,0.5,-0.309017,0.809017,-0.309017,0.809017,0.5,0.809017,0.5,-0.309017,-0.5,0.309017,-0.809017,0.309017,-0.809017,-0.5,-0.809017,-0.5,0.309017,-0.5,0.309017,-0.809017,0.309017,-0.809017,-0.5,0.809017,0.5,-0.309017,0.5,-0.309017,0.809017,0.309017,-0.809017,0.5,-0.809017,-0.5,-0.309017,0.5,-0.309017,-0.809017,0.309017,-0.809017,0.5,0.809017,0.5,0.309017,-0.5,0.309017,0.809017,0.309017,0.809017,-0.5,-0.809017,0.5,0.309017,0.5,0.309017,0.809017,0.309017,0.809017,-0.5,0.809017,-0.5,-0.309017,-0.5,-0.309017,-0.809017,0.309017,0.809017,0.5,-0.809017,0.5,-0.309017,-0.5,-0.309017,0.809017,0.309017,0.809017,0.5,0.809017,-0.5,0.309017,0.5,0.309017,-0.809017,0.809017,-0.5,-0.309017,-0.5,-0.309017,-0.809017,0.309017,0.809017,-0.5,0.809017,-0.5,-0.309017,0.5,0.309017,0.809017,-0.309017,-0.809017,0.5,0.809017,-0.5,0.309017,-0.5,-0.309017,0.809017,-0.309017,-0.809017,-0.5,0.809017,-0.5,0.309017,0.5,0.309017,-0.809017,0.309017,0.809017,0.5,0.809017,0.5,-0.309017,-0.5,0.309017,-0.809017,-0.309017,0.809017,0.5,0.809017,0.5,-0.309017,0.5,-0.309017,0.809017,0.309017,-0.809017,-0.5,0.809017,0.5,0.309017,-0.5,0.309017,0.809017,0.309017,-0.809017,0.5,0.809017,0.5,0.309017,0.5,-0.309017,-0.809017,-0.309017,0.809017,-0.5];

exports.tetrahedronGroup = chunk(TETRAHEDRON_GROUP,9).map(newMat3);
exports.cubeGroup = chunk(CUBE_GROUP,9).map(newMat3);
exports.icosahedronGroup = chunk(ICOSAHEDRON_GROUP,9).map(newMat3);

function chunk(array,n) {

	return array.reduce (
		function(prev, curr) {
			if (prev[prev.length-1].length===n) {
				prev.push([curr]);
			}
			else {
				prev[prev.length-1].push(curr);
			}
			return prev;
		},
		[[]]
	);
}

function newMat3(array){

	return new (Function.prototype.bind.apply(THREE.Matrix3,[null].concat(array)));

}
