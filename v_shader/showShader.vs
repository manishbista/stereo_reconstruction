#version 130
attribute vec3 lineVertex;

varying vec2 outUV;

uniform mat4 modelViewProjectionMatrix;
uniform usampler2D textures;

highp float zedValue;
highp vec3 linePosition;
void main()
{
	outUV = vec2(lineVertex.x/800.0, lineVertex.y/600.0);
	zedValue = vec4(texture(textures, outUV)).r;
	linePosition = lineVertex;
	linePosition.z =  5.0 * linePosition.z;
	gl_Position = modelViewProjectionMatrix * vec4(linePosition, 1.0);
}
