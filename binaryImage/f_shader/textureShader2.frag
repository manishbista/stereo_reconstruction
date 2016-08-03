#version 130
uniform sampler2D textures;
varying vec2 outUV;

varying vec2 topTextureCoordinate; 
varying vec2 bottomTextureCoordinate;

varying vec2 secTopTextureCoordinate; 
varying vec2 secBottomTextureCoordinate;

out vec4 fragmentColor;
void main()
{
vec3 fragmentColorV = texture2D(textures, outUV).rgb * 0.2270270270;
     fragmentColorV += texture2D(textures, bottomTextureCoordinate).rgb * 0.3162162162;
     fragmentColorV += texture2D(textures, topTextureCoordinate).rgb * 0.3162162162;
     fragmentColorV += texture2D(textures, secBottomTextureCoordinate).rgb * 0.0702702703;
     fragmentColorV += texture2D(textures, secTopTextureCoordinate).rgb * 0.0702702703;

//	gl_FragColor=texture2D(textures,outUV);
	fragmentColor = vec4(fragmentColorV, 1.0);
}
