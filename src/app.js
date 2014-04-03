var fs = require('fs')
,	groups = require('./symmetryGroups')
,	THREE = require('three');

var shader = {
	vertex: fs.readFileSync(__dirname + '/painting.vertex.glsl','utf8'),
	fragment: fs.readFileSync(__dirname + '/painting.fragment.glsl','utf8')
}

console.log(shader.vertex);
console.log(shader.fragment);