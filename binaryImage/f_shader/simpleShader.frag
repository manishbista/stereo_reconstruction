uniform sampler2D texture0;
varying vec2 outUV;

varying vec2 leftTextureCoordinate;
varying vec2 rightTextureCoordinate;
varying vec2 topTextureCoordinate; 
varying vec2 bottomTextureCoordinate;

float verticalDerivative;
float horizontalDerivative;
vec4 derivativeImage;

void main()
{
 vec3 topVec = texture2D(texture0, topTextureCoordinate).rgb;
 vec3 bottomVec = texture2D(texture0, bottomTextureCoordinate).rgb;
 vec3 leftVec = texture2D(texture0, leftTextureCoordinate).rgb;
 vec3 rightVec = texture2D(texture0, rightTextureCoordinate).rgb;

 vec3 multiplier = vec3(0.2125, 0.7154, 0.0721);

 float topIntensity = dot(topVec, multiplier);
 float bottomIntensity = dot(bottomVec, multiplier);
 float leftIntensity = dot(leftVec, multiplier);
 float rightIntensity = dot(rightVec, multiplier);

 verticalDerivative = abs(-topIntensity + bottomIntensity);
 horizontalDerivative = abs(-leftIntensity + rightIntensity);

 derivativeImage = vec4(horizontalDerivative * horizontalDerivative, verticalDerivative * verticalDerivative, verticalDerivative * horizontalDerivative, 1.0);
 //gl_FragColor = derivativeImage;
 gl_FragColor = texture2D(texture0, outUV);	


}


