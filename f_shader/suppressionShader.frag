#version 130
uniform sampler2D textures;
varying highp vec2 textureCoordinate;
varying highp vec2 leftTextureCoordinate;
varying highp vec2 rightTextureCoordinate;

varying highp vec2 topTextureCoordinate;
varying highp vec2 topLeftTextureCoordinate;
varying highp vec2 topRightTextureCoordinate;

varying highp vec2 bottomTextureCoordinate;
varying highp vec2 bottomLeftTextureCoordinate;
varying highp vec2 bottomRightTextureCoordinate;
void main()
{
    lowp float bottomColor = texture2D(textures, bottomTextureCoordinate).r;
    lowp float bottomLeftColor = texture2D(textures, bottomLeftTextureCoordinate).r;
    lowp float bottomRightColor = texture2D(textures, bottomRightTextureCoordinate).r;
    lowp vec4 centerColor = texture2D(textures, textureCoordinate);
    lowp float leftColor = texture2D(textures, leftTextureCoordinate).r;
    lowp float rightColor = texture2D(textures, rightTextureCoordinate).r;
    lowp float topColor = texture2D(textures, topTextureCoordinate).r;
    lowp float topRightColor = texture2D(textures, topRightTextureCoordinate).r;
    lowp float topLeftColor = texture2D(textures, topLeftTextureCoordinate).r;

    // Use a tiebreaker for pixels to the left and immediately above this one
    lowp float multiplier = 1.0 - step(centerColor.r, topColor);
    multiplier = multiplier * 1.0 - step(centerColor.r, topLeftColor);
    multiplier = multiplier * 1.0 - step(centerColor.r, leftColor);
    multiplier = multiplier * 1.0 - step(centerColor.r, bottomLeftColor);

    lowp float maxValue = max(centerColor.r, bottomColor);
    maxValue = max(maxValue, bottomRightColor);
    maxValue = max(maxValue, rightColor);
    maxValue = max(maxValue, topRightColor);
 //gl_FragColor = vec4((centerColor.rgb * step(maxValue, centerColor.r) * multiplier), 1.0);

	lowp float col = step(maxValue, centerColor.r) * step(0.25, centerColor.r)  * multiplier; 
    gl_FragColor = vec4(col, col, col, 1.0);
   //gl_FragColor = vec4(textureCoordinate, 0.0, 1.0);
}


