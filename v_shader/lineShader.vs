#version 130
attribute vec3 lineVertex;

uniform mat4 modelViewProjectionMatrix;
varying vec2 outColor;
void main()
{
	gl_Position = modelViewProjectionMatrix * vec4(lineVertex,1.0);
	outColor = vec2(lineVertex.y/600.0, 0.0);
}
