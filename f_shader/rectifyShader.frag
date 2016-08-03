uniform sampler2D textures;
varying vec2 outUV;

void main()
{
 //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
 gl_FragColor = texture2D(textures, outUV);
}
