#version 130
uniform sampler2D super_textures;
uniform sampler2D gray_textures;
varying vec2 outUV;
highp vec2 pos_0, pos_1, pos_2, pos_3, pos_4, pos_5, pos_m;
float SCREEN_WIDTH = 800.0;
float SCREEN_HEIGHT = 600.0;
float uv_x = 1.0/SCREEN_WIDTH, uv_y = 1.0/SCREEN_HEIGHT;
highp float uc_0, uc_60, uc_120, us_0, us_60, us_120;
highp float uc0, uc60, uc120, us0, us60, us120;
mediump float sth0_0, sth0_1, sth0_2, sth0_3, sth0_4, sth0_5;
mediump float sth1_0, sth1_1, sth1_2, sth1_3, sth1_4, sth1_5;
mediump float sth2_0, sth2_1, sth2_2, sth2_3, sth2_4, sth2_5;
mediump float sth3_0, sth3_1, sth3_2, sth3_3, sth3_4, sth3_5;
out uvec4 out_a;
out uvec4 out_b;
out uvec4 out_c;

float deg;
float stepVal;
int binaryDes = 0x00000000;
int binaryDes0, binaryDes1, binaryDes2, binaryDes3, binaryDes4, binaryDes5, binaryDes6, binaryDes7, binaryDes8;
highp float a, b, c, d, e, f, g, h, i, j, k, l;

void main()
{
 vec3 orient = texture2D(super_textures, outUV).rgb;
// if(orient.x == 1.0)
// {
	//deg = 0.0;
	deg = mix(orient.z, 1.0, -1.0) * orient.y * 3.141592654;
	uc0 = cos(deg);
	uc60 = cos(1.047197551 + deg);
	uc120 = cos(2.094395102 + deg);
	
	us0 = sin(deg);
	us60 = sin(1.047197551 + deg);		//1.04 = pi/3
	us120 = sin(2.094395102 + deg);

	uc_0 = uv_x * uc0;
	uc_60 = uv_x * uc60;
	uc_120 = uv_x * uc120;
	
	us_0 = uv_y * us0;
	us_60 = uv_y * us60;
	us_120 = uv_y * us120;

	pos_0.x = outUV.x + uc_0;  	pos_0.y = outUV.y + us_0;		//six positions around keypoint
	pos_1.x = outUV.x + uc_60; 	pos_1.y = outUV.y + us_60;
	pos_2.x = outUV.x + uc_120; 	pos_2.y = outUV.y + us_120;
	pos_3.x = outUV.x - uc_0;  	pos_3.y = outUV.y - us_0;
	pos_4.x = outUV.x - uc_60; 	pos_4.y = outUV.y - us_60;
	pos_5.x = outUV.x - uc_120; 	pos_5.y = outUV.y - us_120;

	pos_m.x = pos_0.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_0.y;
	sth0_0 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_0.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.7;

	pos_m.x = pos_1.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_1.y;	
	sth0_1 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_1.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.7;

	pos_m.x = pos_2.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_2.y;
	sth0_2 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_2.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.7;

	pos_m.x = pos_3.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_3.y;
	sth0_3 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_3.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.7;

	pos_m.x = pos_4.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_4.y;
	sth0_4 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_4.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.7;

	pos_m.x = pos_5.x - 0.4285714286 / SCREEN_WIDTH;
	pos_m.y = pos_5.y;
	sth0_5 = texture2D(gray_textures, pos_m).r * 0.7;
	pos_m.x = pos_5.x + 0.4285714286 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.7;

	uc_0 = uv_x * 2 * uc0;
	uc_60 = uv_x * 2 * uc60;
	uc_120 = uv_x * 2 * uc120;
	
	us_0 = uv_y * 2 * us0;
	us_60 = uv_y * 2 * us60;
	us_120 = uv_y * 2 * us120;

	pos_0.x = outUV.x + uc_0;  	pos_0.y = outUV.y + us_0;		//six positions around keypoint
	pos_1.x = outUV.x + uc_60; 	pos_1.y = outUV.y + us_60;
	pos_2.x = outUV.x + uc_120; 	pos_2.y = outUV.y + us_120;
	pos_3.x = outUV.x - uc_0;  	pos_3.y = outUV.y - us_0;
	pos_4.x = outUV.x - uc_60; 	pos_4.y = outUV.y - us_60;
	pos_5.x = outUV.x - uc_120; 	pos_5.y = outUV.y - us_120;

	sth1_0 = texture2D(gray_textures, pos_0).r * 0.2941176471;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 1.333333 / SCREEN_WIDTH;
	sth1_0 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_0.x + 1.333333 / SCREEN_WIDTH;
	sth1_0 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth1_1 = texture2D(gray_textures, pos_1).r * 0.2941176471;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 1.333333 / SCREEN_WIDTH;
	sth1_1 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_1.x + 1.333333 / SCREEN_WIDTH;
	sth1_1 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth1_2 = texture2D(gray_textures, pos_2).r * 0.2941176471;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 1.333333 / SCREEN_WIDTH;
	sth1_2 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_2.x + 1.333333 / SCREEN_WIDTH;
	sth1_2 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth1_3 = texture2D(gray_textures, pos_3).r * 0.2941176471;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 1.333333 / SCREEN_WIDTH;
	sth1_3 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_3.x + 1.333333 / SCREEN_WIDTH;
	sth1_3 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth1_4 = texture2D(gray_textures, pos_4).r * 0.2941176471;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 1.333333 / SCREEN_WIDTH;
	sth1_4 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_4.x + 1.333333 / SCREEN_WIDTH;
	sth1_4 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth1_5 = texture2D(gray_textures, pos_5).r * 0.2941176471;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 1.333333 / SCREEN_WIDTH;
	sth1_5 = texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_5.x + 1.333333 / SCREEN_WIDTH;
	sth1_5 = texture2D(gray_textures, pos_m).r * 0.3529411765;


	uc_0 = uv_x * 4 * uc0;
	uc_60 = uv_x * 4 * uc60;
	uc_120 = uv_x * 4 * uc120;
	
	us_0 = uv_y * 4 * us0;
	us_60 = uv_y * 4 * us60;
	us_120 = uv_y * 4 *us120;

	pos_0.x = outUV.x + uc_0;  	pos_0.y = outUV.y + us_0;		//six positions around keypoint
	pos_1.x = outUV.x + uc_60; 	pos_1.y = outUV.y + us_60;
	pos_2.x = outUV.x + uc_120; 	pos_2.y = outUV.y + us_120;
	pos_3.x = outUV.x - uc_0;  	pos_3.y = outUV.y - us_0;
	pos_4.x = outUV.x - uc_60; 	pos_4.y = outUV.y - us_60;
	pos_5.x = outUV.x - uc_120; 	pos_5.y = outUV.y - us_120;

	sth2_0 = texture2D(gray_textures, pos_0).r * 0.2270270270;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_0 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_0.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_0 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_0.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_0 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_0.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_0 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth2_1 = texture2D(gray_textures, pos_1).r * 0.2270270270;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_1 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_1.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_1 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_1.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_1 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_1.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_1 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth2_2 = texture2D(gray_textures, pos_2).r * 0.2270270270;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_2 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_2.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_2 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_2.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_2 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_2.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_2 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth2_3 = texture2D(gray_textures, pos_3).r * 0.2270270270;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_3 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_3.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_3 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_3.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_3 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_3.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_3 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth2_4 = texture2D(gray_textures, pos_4).r * 0.2270270270;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_4 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_4.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_4 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_4.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_4 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_4.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_4 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth2_5 = texture2D(gray_textures, pos_5).r * 0.2270270270;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 1.3846153846 / SCREEN_WIDTH;
	sth2_5 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_5.x + 1.3846153846 / SCREEN_WIDTH;
	sth2_5 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_5.x - 3.2307692308 / SCREEN_WIDTH;
	sth2_5 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_5.x + 3.2307692308 / SCREEN_WIDTH;
	sth2_5 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	uc_0 = uv_x * 8 * uc0;
	uc_60 = uv_x * 8 * uc60;
	uc_120 = uv_x * 8 * uc120;
	
	us_0 = uv_y * 8 *us0;
	us_60 = uv_y * 8 *us60;
	us_120 = uv_y * 8 *us120;

	pos_0.x = outUV.x + uc_0;  	pos_0.y = outUV.y + us_0;		//six positions around keypoint
	pos_1.x = outUV.x + uc_60; 	pos_1.y = outUV.y + us_60;
	pos_2.x = outUV.x + uc_120; 	pos_2.y = outUV.y + us_120;
	pos_3.x = outUV.x - uc_0;  	pos_3.y = outUV.y - us_0;
	pos_4.x = outUV.x - uc_60; 	pos_4.y = outUV.y - us_60;
	pos_5.x = outUV.x - uc_120; 	pos_5.y = outUV.y - us_120;

	sth3_0 = texture2D(gray_textures, pos_0).r * 0.1762041097;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_0.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_0.x - 3.33333333 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_0.x + 3.33333333 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_0.x - 5.238095238 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_0.x + 5.238095238 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_0.x - 7.142857143 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_0.x + 7.142857143 / SCREEN_WIDTH;
	sth3_0 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth3_1 = texture2D(gray_textures, pos_1).r * 0.1762041097;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_1.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_1.x - 3.33333333 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_1.x + 3.33333333 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_1.x - 5.238095238 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_1.x + 5.238095238 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_1.x - 7.142857143 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_1.x + 7.142857143 / SCREEN_WIDTH;
	sth3_1 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth3_2 = texture2D(gray_textures, pos_2).r * 0.1762041097;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_2.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_2.x - 3.33333333 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_2.x + 3.33333333 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_2.x - 5.238095238 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_2.x + 5.238095238 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_2.x - 7.142857143 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_2.x + 7.142857143 / SCREEN_WIDTH;
	sth3_2 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth3_3 = texture2D(gray_textures, pos_3).r * 0.1762041097;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_3.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_3.x - 3.33333333 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_3.x + 3.33333333 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_3.x - 5.238095238 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_3.x + 5.238095238 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_3.x - 7.142857143 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_3.x + 7.142857143 / SCREEN_WIDTH;
	sth3_3 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth3_4 = texture2D(gray_textures, pos_4).r * 0.1762041097;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_4.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_4.x - 3.33333333 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_4.x + 3.33333333 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_4.x - 5.238095238 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_4.x + 5.238095238 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_4.x - 7.142857143 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_4.x + 7.142857143 / SCREEN_WIDTH;
	sth3_4 += texture2D(gray_textures, pos_m).r * 0.001268437647;


	sth3_5 = texture2D(gray_textures, pos_5).r * 0.1762041097;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 0.1428571429 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_5.x + 0.1428571429 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_5.x - 3.33333333 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_5.x + 3.33333333 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_5.x - 5.238095238 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_5.x + 5.238095238 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_5.x - 7.142857143 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_5.x + 7.142857143 / SCREEN_WIDTH;
	sth3_5 += texture2D(gray_textures, pos_m).r * 0.001268437647;

//0_0 - 0_n
	binaryDes = 0x00000000;

	stepVal = step(sth0_0, sth0_1);			//0-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth0_2);			//0-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth0_3);			//0-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth0_4);			//0-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth0_5);			//0-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_0 - 1_n
	stepVal = step(sth0_0, sth1_0);			//0-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth1_1);			//0-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth1_2);			//0-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth1_3);			//0-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth1_4);			//0-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth1_5);			//0-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_0 - 2_n
	stepVal = step(sth0_0, sth2_0);			//0-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth2_1);			//0-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth2_2);			//0-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth2_3);			//0-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth2_4);			//0-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth2_5);			//0-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_0 - 3_n
	stepVal = step(sth0_0, sth3_0);			//0-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth3_1);			//0-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth3_2);			//0-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth3_3);			//0-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth3_4);			//0-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_0, sth3_5);			//0-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//0_1 - 0_n
	stepVal = step(sth0_1, sth0_2);			//0-23		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth0_3);			//0-24	
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth0_4);			//0-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth0_5);			//0-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_1 - 1_n
	stepVal = step(sth0_1, sth1_0);			//0-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth1_1);			//0-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth1_2);			//0-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth1_3);			//0-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth1_4);			//0-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes0 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth0_1, sth1_5);			//1-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_1 - 2_n
	stepVal = step(sth0_1, sth2_0);			//1-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth2_1);			//1-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth2_2);			//1-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth2_3);			//1-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth2_4);			//1-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth2_5);			//1-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_1 - 3_n
	stepVal = step(sth0_1, sth3_0);			//1-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth3_1);			//1-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth3_2);			//1-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth3_3);			//1-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth3_4);			//1-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_1, sth3_5);			//1-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//0_2 - 0_n

	stepVal = step(sth0_2, sth0_3);			//1-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth0_4);			//1-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth0_5);			//1-15		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_2 - 1_n
	stepVal = step(sth0_2, sth1_0);			//1-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth1_1);			//1-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth1_2);			//1-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth1_3);			//1-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth1_4);			//1-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth1_5);			//1-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_2 - 2_n
	stepVal = step(sth0_2, sth2_0);			//1-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth2_1);			//1-23
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth2_2);			//1-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth2_3);			//1-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth2_4);			//1-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth2_5);			//1-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_2 - 3_n
	stepVal = step(sth0_2, sth3_0);			//1-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth3_1);			//1-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth3_2);			//1-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth3_3);			//1-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes1 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth0_2, sth3_4);			//2-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_2, sth3_5);			//2-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//0_3 - 0_n

	stepVal = step(sth0_3, sth0_4);			//2-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth0_5);			//2-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_3 - 1_n
	stepVal = step(sth0_3, sth1_0);			//2-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth1_1);			//2-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth1_2);			//2-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth1_3);			//2-7		//reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth1_4);			//2-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth1_5);			//2-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_3 - 2_n
	stepVal = step(sth0_3, sth2_0);			//2-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth2_1);			//2-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth2_2);			//2-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth2_3);			//2-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth2_4);			//2-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth2_5);			//2-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_3 - 3_n
	stepVal = step(sth0_3, sth3_0);			//2-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth3_1);			//2-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth3_2);			//2-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth3_3);			//2-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth3_4);			//2-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_3, sth3_5);			//2-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//0_4 - 0_n

	stepVal = step(sth0_4, sth0_5);			//2-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_4 - 1_n
	stepVal = step(sth0_4, sth1_0);			//2-23
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth1_1);			//2-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth1_2);			//2-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth1_3);			//2-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth1_4);			//2-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth1_5);			//2-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_4 - 2_n
	stepVal = step(sth0_4, sth2_0);			//2-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth2_1);			//2-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth2_2);			//2-31		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes2 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth0_4, sth2_3);			//3-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth2_4);			//3-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth2_5);			//3-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_4 - 3_n
	stepVal = step(sth0_4, sth3_0);			//3-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth3_1);			//3-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth3_2);			//3-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth3_3);			//3-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth3_4);			//3-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_4, sth3_5);			//3-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//0_5 - 1_n
	stepVal = step(sth0_5, sth1_0);			//3-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth1_1);			//3-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth1_2);			//3-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth1_3);			//3-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth1_4);			//3-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth1_5);			//3-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_5 - 2_n
	stepVal = step(sth0_5, sth2_0);			//3-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth2_1);			//3-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth2_2);			//3-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth2_3);			//3-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth2_4);			//3-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth2_5);			//3-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//0_5 - 3_n
	stepVal = step(sth0_5, sth3_0);			//3-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth3_1);			//3-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth3_2);			//3-23		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth3_3);			//3-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth3_4);			//3-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth0_5, sth3_5);			//3-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);


//next	
//1_0 - 1_n
	stepVal = step(sth1_0, sth1_1);			//3-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth1_2);			//3-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth1_3);			//3-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth1_4);			//3-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth1_5);			//3-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes3 = binaryDes;
	binaryDes = 0x00000000;

//1_0 - 2_n
	stepVal = step(sth1_0, sth2_0);			//4-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth2_1);			//4-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth2_2);			//4-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth2_3);			//4-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth2_4);			//4-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth2_5);			//4-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_0 - 3_n
	stepVal = step(sth1_0, sth3_0);			//4-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth3_1);			//4-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth3_2);			//4-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth3_3);			//4-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth3_4);			//4-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_0, sth3_5);			//4-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//1_1 - 1_n

	stepVal = step(sth1_1, sth1_2);			//4-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth1_3);			//4-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth1_4);			//4-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth1_5);			//4-15 		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_1 - 2_n
	stepVal = step(sth1_1, sth2_0);			//4-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth2_1);			//4-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth2_2);			//4-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth2_3);			//4-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth2_4);			//4-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth2_5);			//4-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_1 - 3_n
	stepVal = step(sth1_1, sth3_0);			//4-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth3_1);			//4-23
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth3_2);			//4-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth3_3);			//4-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth3_4);			//4-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_1, sth3_5);			//4-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//1_2 - 1_n

	stepVal = step(sth1_2, sth1_3);			//4-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth1_4);			//4-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth1_5);			//4-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_2 - 2_n
	stepVal = step(sth1_2, sth2_0);			//4-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes4 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth1_2, sth2_1);			//5-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth2_2);			//5-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth2_3);			//5-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth2_4);			//5-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth2_5);			//5-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_2 - 3_n
	stepVal = step(sth1_2, sth3_0);			//5-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth3_1);			//5-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth3_2);			//5-7		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth3_3);			//5-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth3_4);			//5-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_2, sth3_5);			//5-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//1_3 - 1_n

	stepVal = step(sth1_3, sth1_4);			//5-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth1_5);			//5-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_3 - 2_n
	stepVal = step(sth1_3, sth2_0);			//5-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth2_1);			//5-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth2_2);			//5-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth2_3);			//5-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth2_4);			//5-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth2_5);			//5-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_3 - 3_n
	stepVal = step(sth1_3, sth3_0);			//5-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth3_1);			//5-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth3_2);			//5-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth3_3);			//5-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth3_4);			//5-23
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_3, sth3_5);			//5-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//1_4 - 1_n

	stepVal = step(sth1_4, sth1_5);			//5-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_4 - 2_n
	stepVal = step(sth1_4, sth2_0);			//5-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth2_1);			//5-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth2_2);			//5-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth2_3);			//5-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth2_4);			//5-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth2_5);			//5-31		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes5 = binaryDes;
	binaryDes = 0x00000000;

//1_4 - 3_n
	stepVal = step(sth1_4, sth3_0);			//6-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth3_1);			//6-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth3_2);			//6-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth3_3);			//6-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth3_4);			//6-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_4, sth3_5);			//6-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//1_5 - 2_n
	stepVal = step(sth1_5, sth2_0);			//6-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth2_1);			//6-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth2_2);			//6-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth2_3);			//6-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth2_4);			//6-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth2_5);			//6-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//1_5 - 3_n
	stepVal = step(sth1_5, sth3_0);			//6-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth3_1);			//6-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth3_2);			//6-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth3_3);			//6-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth3_4);			//6-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth1_5, sth3_5);			//6-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_0 - 2_n

	stepVal = step(sth2_0, sth2_1);			//6-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth2_2);			//6-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth2_3);			//6-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth2_4);			//6-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth2_5);			//6-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//2_0 - 3_n
	stepVal = step(sth2_0, sth3_0);			//6-23		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth3_1);			//6-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth3_2);			//6-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth3_3);			//6-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth3_4);			//6-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_0, sth3_5);			//6-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_1 - 2_n

	stepVal = step(sth2_1, sth2_2);			//6-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth2_3);			//6-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth2_4);			//6-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes6 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth2_1, sth2_5);			//7-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//2_1 - 3_n
	stepVal = step(sth2_1, sth3_0);			//7-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth3_1);			//7-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth3_2);			//7-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth3_3);			//7-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth3_4);			//7-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_1, sth3_5);			//7-6
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_2 - 2_n

	stepVal = step(sth2_2, sth2_3);			//7-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth2_4);			//7-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth2_5);			//7-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//2_2 - 3_n
	stepVal = step(sth2_2, sth3_0);			//7-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth3_1);			//7-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth3_2);			//7-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth3_3);			//7-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth3_4);			//7-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_2, sth3_5);			//7-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_3 - 2_n

	stepVal = step(sth2_3, sth2_4);			//7-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth2_5);			//7-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//2_3 - 3_n
	stepVal = step(sth2_3, sth3_0);			//7-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth3_1);			//7-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth3_2);			//7-20
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth3_3);			//7-21
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth3_4);			//7-22
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_3, sth3_5);			//7-23
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_4 - 2_n

	stepVal = step(sth2_4, sth2_5);			//7-24
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//2_4 - 3_n
	stepVal = step(sth2_4, sth3_0);			//7-25
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_4, sth3_1);			//7-26
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_4, sth3_2);			//7-27
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_4, sth3_3);			//7-28
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_4, sth3_4);			//7-29
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_4, sth3_5);			//7-30
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//2_5 - 3_n

	stepVal = step(sth2_5, sth3_0);			//7-31
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes7 = binaryDes;
	binaryDes = 0x00000000;

	stepVal = step(sth2_5, sth3_1);			//8-0
	//binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_5, sth3_2);			//8-1
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_5, sth3_3);			//8-2
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_5, sth3_4);			//8-3
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth2_5, sth3_5);			//8-4
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//3_0 - 3_n

	stepVal = step(sth3_0, sth3_1);			//8-5
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_0, sth3_2);			//8-6		reached limit
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_0, sth3_3);			//8-7
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_0, sth3_4);			//8-8
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_0, sth3_5);			//8-9
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//3_1 - 3_n

	stepVal = step(sth3_1, sth3_2);			//8-10
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_1, sth3_3);			//8-11
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_1, sth3_4);			//8-12
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_1, sth3_5);			//8-13
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//3_2 - 3_n
	stepVal = step(sth3_2, sth3_3);			//8-14
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_2, sth3_4);			//8-15
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_2, sth3_5);			//8-16
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//3_3 - 3_n

	stepVal = step(sth3_3, sth3_4);			//8-17
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	stepVal = step(sth3_3, sth3_5);			//8-18
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

//next	
//3_4 - 3_n

	stepVal = step(sth3_4, sth3_5);			//8-19
	binaryDes = binaryDes<<1;
	binaryDes = binaryDes | int(stepVal);

	binaryDes8 = binaryDes;

	out_a = uvec4(binaryDes0, binaryDes1, binaryDes2, binaryDes3);
	out_b = uvec4(binaryDes4, binaryDes5, binaryDes6, binaryDes7);
	out_c = uvec4(binaryDes8, 0, 0, 0);

 //}

 //else
 //{
 //out_a = vec4(0, 0, 0, 0);
 //out_b = vec4(0, 0, 0, 0);
 //out_c = vec4(0, 0, 0, 0);
 //} 
}


