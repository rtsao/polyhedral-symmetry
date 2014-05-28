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
uniform float hue;
uniform float saturation;
uniform float value;
uniform sampler2D texture;

vec3 pointCartesian (float theta, float phi) {
	return vec3(
		cos(theta)*sin(phi),
		sin(theta)*sin(phi),
		cos(phi)
	);
}


vec2 pointMap (float x, float y, float z) {
	float theta = atan(y,x);
	float phi = acos(z);
	return vec2(
		mod( theta/(2.*PI) + shiftX , 1.0),
		mod( phi/PI + shiftY , 1.0)
	);
}

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}


vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
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
	
	vec3 HSL = rgb2hsv(sum.xyz);
	HSL.y = HSL.y*saturation;
	HSL.x = HSL.x+hue;

	sum = vec4(hsv2rgb(HSL),1.0);

	gl_FragColor = sum;

}