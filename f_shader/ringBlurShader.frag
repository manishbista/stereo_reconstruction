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
float deg;
void main()
{
 vec3 orient = texture2D(super_textures, outUV).rgb;
 if(orient.x == 1.0)
 {
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

	gl_FragData[0] = vec4(sth0_0, sth1_0, sth2_0, sth3_0);
	gl_FragData[1] = vec4(sth0_1, sth1_1, sth2_1, sth3_1);
	gl_FragData[2] = vec4(sth0_2, sth1_2, sth2_2, sth3_2);
	gl_FragData[3] = vec4(sth0_3, sth1_3, sth2_3, sth3_3);
	gl_FragData[4] = vec4(sth0_4, sth1_4, sth2_4, sth3_4);
	gl_FragData[5] = vec4(sth0_5, sth1_5, sth2_5, sth3_5);

 }

 else
 {
 gl_FragData[0] = vec4(0.0, 0.0, 0.0, 0.0f);
 gl_FragData[1] = vec4(0.0, 0.0, 0.0, 0.0);
 gl_FragData[2] = vec4(0.0, 0.0, 0.0, 0.0);
 gl_FragData[3] = vec4(0.0, 0.0, 0.0, 0.0);
 gl_FragData[4] = vec4(0.0, 0.0, 0.0, 0.0);
 gl_FragData[5] = vec4(0.0, 0.0, 0.0, 0.0);
 } 
}


