#version 130
attribute vec3 vertex;
attribute vec2 UV;

uniform mat3 homography;
uniform mat4 modelViewProjectionMatrix;

varying vec2 outUV;

void main()
{
	vec3 transVec = homography * vec3(vertex.x, vertex.y, 1.0);
	gl_Position = vec4(transVec,1.0);
	outUV = UV;
}
