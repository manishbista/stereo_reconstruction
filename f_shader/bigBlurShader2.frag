#version 130
uniform usampler2D gray_textures;
varying vec2 outUV;

highp float fragColor;
highp vec2 pos;
highp float SCREEN_HEIGHT = 600.0;

uint outfragCol;
out uvec4 outVal;

void main()
{
	pos = outUV;
	fragColor = vec4(texture(gray_textures, pos)).r * 0.1762041097;

	pos.y = outUV.y - 0.1428571429 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.28032472;

	pos.y = outUV.y + 0.1428571429 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.28032472;

	pos.y = outUV.y - 3.33333333 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.1108976914;

	pos.y = outUV.y + 3.33333333 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.1108976914;

	pos.y = outUV.y - 5.238095238 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.019407096;

	pos.y = outUV.y + 5.238095238 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.019407096;

	pos.y = outUV.y - 7.142857143 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.001268437647;

	pos.y = outUV.y + 7.142857143 / SCREEN_HEIGHT;
	fragColor += vec4(texture(gray_textures, pos)).r * 0.001268437647;

	outfragCol = uint(fragColor);
	outVal = uvec4(outfragCol, outfragCol, outfragCol, 255);
}

