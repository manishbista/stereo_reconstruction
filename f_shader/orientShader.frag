#version 130
uniform sampler2D super_textures;
uniform sampler2D gray_textures;
varying vec2 outUV;
highp vec2 pos_0, pos_1, pos_2, pos_3, pos_4, pos_5, pos_m;
float SCREEN_WIDTH = 800.0;
float SCREEN_HEIGHT = 600.0;
float uv_x = 1.0/SCREEN_WIDTH, uv_y = 1.0/SCREEN_HEIGHT;
float c_0 = 1.0;
float c_60 = 0.5;
highp float uc_0, uc_60, us_0, us_60;
float s_0 = 0.0;
highp float s_60 = 0.8660254038;
mediump float sth0_0, sth0_1, sth0_2, sth0_3, sth0_4, sth0_5;
highp vec2 oVec = vec2(0.000000);



void main()
{
 vec3 super = texture2D(super_textures, outUV).rgb;

//lowp float m = max(0.75 - outUV.x, 0.0) * max(0.75 - outUV.y, 0.0) * max(outUV.y - 0.25, 0.0) * max(outUV.x - 0.25, 0.0) * floor(super.x);

 if(super.x == 1.0)
 {
	uv_x *= 1;			//SCREEN_WIDTH
	uv_y *= 1;			//SCREEN_HEIGHT
	uc_0 = 	uv_x * c_0;
	uc_60 = uv_x * c_60;
	us_0 =  uv_y * s_0;
	us_60 = uv_y * s_60;

	pos_0 = vec2(outUV.x + uc_0, outUV.y + us_0);		//six positions around keypoint
	pos_1 = vec2(outUV.x + uc_60, outUV.y + us_60);
	pos_2 = vec2(outUV.x - uc_60, outUV.y + us_60);
	pos_3 = vec2(outUV.x - uc_0, outUV.y + us_0);
	pos_4 = vec2(outUV.x - uc_60, outUV.y - us_60);
	pos_5 = vec2(outUV.x + uc_60, outUV.y - us_60);

	pos_m = vec2(pos_0.x - 0.4285714286 / SCREEN_WIDTH, pos_0.y);
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

oVec += normalize(pos_0 - pos_3) * (sth0_0 - sth0_3) + normalize(pos_1 - pos_4) * (sth0_1 - sth0_4) +
	normalize(pos_2 - pos_5) * (sth0_2 - sth0_5) + normalize(pos_0 - pos_2) * (sth0_0 - sth0_2) +
	normalize(pos_1 - pos_3) * (sth0_1 - sth0_3) + normalize(pos_2 - pos_4) * (sth0_2 - sth0_4) +
	normalize(pos_3 - pos_5) * (sth0_3 - sth0_5) + normalize(pos_4 - pos_0) * (sth0_4 - sth0_0) +
	normalize(pos_5 - pos_1) * (sth0_5 - sth0_1);



	uv_x *= 2.0;			//SCREEN_WIDTH
	uv_y *= 2.0;			//SCREEN_HEIGHT

	uc_0 = 	uv_x * c_0;
	uc_60 = uv_x * c_60;
	us_0 =  uv_y * s_0;
	us_60 = uv_y * s_60;

	pos_0 = vec2(outUV.x + uc_0, outUV.y + us_0);		//six positions around keypoint
	pos_1 = vec2(outUV.x + uc_60, outUV.y + us_60);
	pos_2 = vec2(outUV.x - uc_60, outUV.y + us_60);
	pos_3 = vec2(outUV.x - uc_0, outUV.y + us_0);
	pos_4 = vec2(outUV.x - uc_60, outUV.y - us_60);
	pos_5 = vec2(outUV.x + uc_60, outUV.y - us_60);

	sth0_0 = texture2D(gray_textures, pos_0).r * 0.2941176471;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 1.333333 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_0.x + 1.333333 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth0_1 = texture2D(gray_textures, pos_1).r * 0.2941176471;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 1.333333 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_1.x + 1.333333 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth0_2 = texture2D(gray_textures, pos_2).r * 0.2941176471;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 1.333333 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_2.x + 1.333333 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth0_3 = texture2D(gray_textures, pos_3).r * 0.2941176471;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 1.333333 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_3.x + 1.333333 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth0_4 = texture2D(gray_textures, pos_4).r * 0.2941176471;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 1.333333 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_4.x + 1.333333 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.3529411765;

	sth0_5 = texture2D(gray_textures, pos_5).r * 0.2941176471;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 1.333333 / SCREEN_WIDTH;
	sth0_5 = texture2D(gray_textures, pos_m).r * 0.3529411765;
	pos_m.x = pos_5.x + 1.333333 / SCREEN_WIDTH;
	sth0_5 = texture2D(gray_textures, pos_m).r * 0.3529411765;

oVec += normalize(pos_0 - pos_3) * (sth0_0 - sth0_3) + normalize(pos_1 - pos_4) * (sth0_1 - sth0_4) +
	normalize(pos_2 - pos_5) * (sth0_2 - sth0_5) + normalize(pos_0 - pos_2) * (sth0_0 - sth0_2) +
	normalize(pos_1 - pos_3) * (sth0_1 - sth0_3) + normalize(pos_2 - pos_4) * (sth0_2 - sth0_4) +
	normalize(pos_3 - pos_5) * (sth0_3 - sth0_5) + normalize(pos_4 - pos_0) * (sth0_4 - sth0_0) +
	normalize(pos_5 - pos_1) * (sth0_5 - sth0_1);




	uv_x *= 2.0;			//SCREEN_WIDTH
	uv_y *= 2.0;		//SCREEN_HEIGHT

	uc_0 = 	uv_x * c_0;
	uc_60 = uv_x * c_60;
	us_0 =  uv_y * s_0;
	us_60 = uv_y * s_60;

	pos_0 = vec2(outUV.x + uc_0, outUV.y + us_0);		//six positions around keypoint
	pos_1 = vec2(outUV.x + uc_60, outUV.y + us_60);
	pos_2 = vec2(outUV.x - uc_60, outUV.y + us_60);
	pos_3 = vec2(outUV.x - uc_0, outUV.y + us_0);
	pos_4 = vec2(outUV.x - uc_60, outUV.y - us_60);
	pos_5 = vec2(outUV.x + uc_60, outUV.y - us_60);

	sth0_0 = texture2D(gray_textures, pos_0).r * 0.2270270270;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_0.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_0.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_0.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth0_1 = texture2D(gray_textures, pos_1).r * 0.2270270270;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_1.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_1.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_1.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth0_2 = texture2D(gray_textures, pos_2).r * 0.2270270270;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_2.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_2.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_2.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth0_3 = texture2D(gray_textures, pos_3).r * 0.2270270270;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_3.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_3.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_3.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth0_4 = texture2D(gray_textures, pos_4).r * 0.2270270270;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_4.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_4.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_4.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.0702702703;

	sth0_5 = texture2D(gray_textures, pos_5).r * 0.2270270270;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 1.3846153846 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_5.x + 1.3846153846 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.3162162162;
	pos_m.x = pos_5.x - 3.2307692308 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.0702702703;
	pos_m.x = pos_5.x + 3.2307692308 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.0702702703;

oVec += normalize(pos_0 - pos_3) * (sth0_0 - sth0_3) + normalize(pos_1 - pos_4) * (sth0_1 - sth0_4) +
	normalize(pos_2 - pos_5) * (sth0_2 - sth0_5) + normalize(pos_0 - pos_2) * (sth0_0 - sth0_2) +
	normalize(pos_1 - pos_3) * (sth0_1 - sth0_3) + normalize(pos_2 - pos_4) * (sth0_2 - sth0_4) +
	normalize(pos_3 - pos_5) * (sth0_3 - sth0_5) + normalize(pos_4 - pos_0) * (sth0_4 - sth0_0) +
	normalize(pos_5 - pos_1) * (sth0_5 - sth0_1);



	uv_x *= 2.0;		//SCREEN_WIDTH
	uv_y *= 2.0;		//SCREEN_HEIGHT

	uc_0 = 	uv_x * c_0;
	uc_60 = uv_x * c_60;
	us_0 =  uv_y * s_0;
	us_60 = uv_y * s_60;

	pos_0 = vec2(outUV.x + uc_0, outUV.y + us_0);		//six positions around keypoint
	pos_1 = vec2(outUV.x + uc_60, outUV.y + us_60);
	pos_2 = vec2(outUV.x - uc_60, outUV.y + us_60);
	pos_3 = vec2(outUV.x - uc_0, outUV.y + us_0);
	pos_4 = vec2(outUV.x - uc_60, outUV.y - us_60);
	pos_5 = vec2(outUV.x + uc_60, outUV.y - us_60);


	sth0_0 = texture2D(gray_textures, pos_0).r * 0.1762041097;
	pos_m.y = pos_0.y;
	pos_m.x = pos_0.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_0.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_0.x - 3.33333333 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_0.x + 3.33333333 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_0.x - 5.238095238 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_0.x + 5.238095238 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_0.x - 7.142857143 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_0.x + 7.142857143 / SCREEN_WIDTH;
	sth0_0 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth0_1 = texture2D(gray_textures, pos_1).r * 0.1762041097;
	pos_m.y = pos_1.y;
	pos_m.x = pos_1.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_1.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_1.x - 3.33333333 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_1.x + 3.33333333 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_1.x - 5.238095238 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_1.x + 5.238095238 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_1.x - 7.142857143 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_1.x + 7.142857143 / SCREEN_WIDTH;
	sth0_1 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth0_2 = texture2D(gray_textures, pos_2).r * 0.1762041097;
	pos_m.y = pos_2.y;
	pos_m.x = pos_2.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_2.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_2.x - 3.33333333 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_2.x + 3.33333333 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_2.x - 5.238095238 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_2.x + 5.238095238 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_2.x - 7.142857143 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_2.x + 7.142857143 / SCREEN_WIDTH;
	sth0_2 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth0_3 = texture2D(gray_textures, pos_3).r * 0.1762041097;
	pos_m.y = pos_3.y;
	pos_m.x = pos_3.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_3.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_3.x - 3.33333333 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_3.x + 3.33333333 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_3.x - 5.238095238 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_3.x + 5.238095238 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_3.x - 7.142857143 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_3.x + 7.142857143 / SCREEN_WIDTH;
	sth0_3 += texture2D(gray_textures, pos_m).r * 0.001268437647;

	sth0_4 = texture2D(gray_textures, pos_4).r * 0.1762041097;
	pos_m.y = pos_4.y;
	pos_m.x = pos_4.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_4.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_4.x - 3.33333333 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_4.x + 3.33333333 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_4.x - 5.238095238 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_4.x + 5.238095238 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_4.x - 7.142857143 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_4.x + 7.142857143 / SCREEN_WIDTH;
	sth0_4 += texture2D(gray_textures, pos_m).r * 0.001268437647;


	sth0_5 = texture2D(gray_textures, pos_5).r * 0.1762041097;
	pos_m.y = pos_5.y;
	pos_m.x = pos_5.x - 0.1428571429 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_5.x + 0.1428571429 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.28032472;
	pos_m.x = pos_5.x - 3.33333333 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_5.x + 3.33333333 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.1108976914;
	pos_m.x = pos_5.x - 5.238095238 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_5.x + 5.238095238 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.019407096;
	pos_m.x = pos_5.x - 7.142857143 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.001268437647;
	pos_m.x = pos_5.x + 7.142857143 / SCREEN_WIDTH;
	sth0_5 += texture2D(gray_textures, pos_m).r * 0.001268437647;

oVec += normalize(pos_0 - pos_3) * (sth0_0 - sth0_3) + normalize(pos_1 - pos_4) * (sth0_1 - sth0_4) +
	normalize(pos_2 - pos_5) * (sth0_2 - sth0_5) + normalize(pos_0 - pos_2) * (sth0_0 - sth0_2) +
	normalize(pos_1 - pos_3) * (sth0_1 - sth0_3) + normalize(pos_2 - pos_4) * (sth0_2 - sth0_4) +
	normalize(pos_3 - pos_5) * (sth0_3 - sth0_5) + normalize(pos_4 - pos_0) * (sth0_4 - sth0_0) +
	normalize(pos_5 - pos_1) * (sth0_5 - sth0_1);


highp float deg = atan(oVec.y, oVec.x)/ 3.141592654;

gl_FragColor = vec4(1.0, abs(deg), ceil(deg), 1.0);

 }

 else
 gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}


