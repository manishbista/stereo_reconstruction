#version 130
uniform sampler2D textures;
varying vec2 outUV;

void main()
{
 gl_FragColor = texture2D(textures, outUV);
}
