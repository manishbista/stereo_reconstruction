#version 130
attribute vec3 lineVertex;
attribute vec3 color;
attribute vec2 UV;

varying vec3 outColor;
varying vec2 outUV;

uniform mat4 modelViewProjectionMatrix;

void main()
{
	gl_Position = modelViewProjectionMatrix*vec4(lineVertex,1.0);
	//outColor = lineVertex;
	outColor = vec3(lineVertex.z, lineVertex.z, lineVertex.z);
}
