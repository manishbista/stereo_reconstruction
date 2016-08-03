#version 130
uniform usampler2D textures1;
uniform sampler2D textures2;
varying vec2 outUV;

out vec4 outVal;

void main()
{
 vec4 outB = texture2D(textures2, outUV);
 vec4 outA = vec4(texture(textures1, outUV));

 outVal = outA * (1.0/255.0);
 //outVal = outB;
 //gl_FragColor = vec4(outA.x * 0.5 + outB.x * 0.5 , outB.y * 0.5  + outA.y * 0.5, outB.z * 0.5 + outA.z * 0.5, 1.0);
}
