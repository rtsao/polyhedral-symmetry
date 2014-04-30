#ifdef GL_ES
precision highp float;
#endif

#define PI 3.1415926535897932384626433832795
#define GROUP_MAX_SIZE 60

varying vec2 vUv;
uniform mat3 group[GROUP_MAX_SIZE];
uniform int groupSize;
uniform float shiftX;
uniform float shiftY;
uniform sampler2D texture;

vec3 pointCartesian (float theta, float phi) {
	return vec3(
		cos(theta)*sin(phi),
		sin(theta)*sin(phi),
		cos(phi)
	);
}


vec2 pointMap (float x, float y, float z) {
	float theta = atan(y,x)+PI;
	float phi = acos(z);
	return vec2(
		mod( theta/(2.*PI) + shiftX , 1.0),
		mod( phi/PI + shiftY , 1.0)
	);
}



void main()
{

	float u = vUv.x;
	float v = vUv.y;

	float theta = 2.*PI*u;
	float phi = PI*v;

	vec3 p = pointCartesian(theta,phi);

	vec4 sum = vec4(0.0,0.0,0.0,1.0);

	for (int i=0; i<GROUP_MAX_SIZE; i++) {
		if (i>=groupSize) {
			break;
		}

		vec3 newpoint = group[i]*p;
		vec2 xy = pointMap(newpoint.x,newpoint.y,newpoint.z);
		sum=sum+texture2D(texture, xy);
	}

	sum=sum/float(groupSize);

	gl_FragColor = sum;


}