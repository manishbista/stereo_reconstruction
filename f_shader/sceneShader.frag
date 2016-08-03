#version 130
uniform sampler2D textures1;
varying vec3 outColor;
varying vec2 outUV;

out uvec4 outVal;
void main()
{
// gl_FragColor = texture2D(textures1, outUV);
 //outColor.z = 255.0;
 uint val = uint(outColor.z);
 outVal = uvec4(val, val, val, 255);
}
