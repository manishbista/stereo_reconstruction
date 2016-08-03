#version 130
attribute vec3 vertex;
attribute vec2 UV;
attribute float ID;

varying vec2 outUV;
varying float outID;
uniform mat4 modelViewProjectionMatrix;

void main()
{
	gl_Position=modelViewProjectionMatrix*vec4(vertex,1.0);
	outUV = UV;
	outID = ID;
}
