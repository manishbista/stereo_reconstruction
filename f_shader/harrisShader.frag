#version 130
uniform sampler2D textures;
varying vec2 outUV;

const mediump float harrisConstant = 0.7;
void main()
{
mediump vec3 derivativeElements = texture2D(textures, outUV).rgb;
mediump float derivativeSum = derivativeElements.x + derivativeElements.y;
mediump float harrisIntensity = (derivativeElements.x * derivativeElements.y - (derivativeElements.z * derivativeElements.z)) / (derivativeSum);
gl_FragColor = vec4(vec3(harrisIntensity * 15.0), 1.0);
}
