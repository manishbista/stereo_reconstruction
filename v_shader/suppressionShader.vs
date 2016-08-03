#version 130
attribute vec3 vertex;
attribute vec2 UV;

varying highp vec2 textureCoordinate;
varying highp vec2 leftTextureCoordinate;
varying highp vec2 rightTextureCoordinate;

varying highp vec2 topTextureCoordinate;
varying highp vec2 topLeftTextureCoordinate;
varying highp vec2 topRightTextureCoordinate;

varying highp vec2 bottomTextureCoordinate;
varying highp vec2 bottomLeftTextureCoordinate;
varying highp vec2 bottomRightTextureCoordinate;
uniform mat4 modelViewProjectionMatrix;

float texelWidth, texelHeight;
void main()
{
	gl_Position=modelViewProjectionMatrix*vec4(vertex,1.0);
	textureCoordinate = UV;	
	texelWidth = 1.0/800.0;
	texelHeight = 1.0/600.0;

	leftTextureCoordinate = vec2(textureCoordinate.x - texelWidth, textureCoordinate.y);
	rightTextureCoordinate = vec2(textureCoordinate.x + texelWidth, textureCoordinate.y);

	topTextureCoordinate = vec2(textureCoordinate.x, textureCoordinate.y + texelHeight);
	topLeftTextureCoordinate = vec2(textureCoordinate.x - texelWidth, textureCoordinate.y + texelHeight);
	topRightTextureCoordinate = vec2(textureCoordinate.x + texelWidth, textureCoordinate.y + texelHeight);
	
	bottomTextureCoordinate = vec2(textureCoordinate.x, textureCoordinate.y - texelHeight);
	bottomLeftTextureCoordinate = vec2(textureCoordinate.x - texelWidth, textureCoordinate.y - texelHeight);
	bottomRightTextureCoordinate = vec2(textureCoordinate.x + texelWidth, textureCoordinate.y - texelHeight);

}
