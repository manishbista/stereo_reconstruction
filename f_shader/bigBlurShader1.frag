#version 130
uniform usampler2D gray_textures;
varying vec2 outUV;

highp float fragColor;
highp vec2 pos;
highp float SCREEN_WIDTH = 800.0;

uint outfragCol;
out uvec4 outVal;
void main()
{
	pos = outUV;
	fragColor = vec4(texture(gray_textures, pos)).r * 0.1762041097;

	pos.x = outUV.x - 0.1428571429 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.28032472;

	pos.x = outUV.x + 0.1428571429 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.28032472;

	pos.x = outUV.x - 3.33333333 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.1108976914;

	pos.x = outUV.x + 3.33333333 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.1108976914;

	pos.x = outUV.x - 5.238095238 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.019407096;

	pos.x = outUV.x + 5.238095238 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.019407096;

	pos.x = outUV.x - 7.142857143 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.001268437647;

	pos.x = outUV.x + 7.142857143 / SCREEN_WIDTH;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.001268437647;

	//fragColor = vec4(texture(gray_textures, outUV)).r;
	outfragCol = uint(fragColor);
	outVal = uvec4(outfragCol, outfragCol, outfragCol, 255);
//	outVal = uvec4(255, 0, 0, 255);
}



