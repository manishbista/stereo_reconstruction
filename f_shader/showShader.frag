#version 130
uniform sampler2D textureColor;
varying vec2 outUV;

void main()
{
 vec4 outB = texture2D(textureColor, outUV);

 gl_FragColor = outB;
}
