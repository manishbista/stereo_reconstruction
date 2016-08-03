#ifndef IMAGE_READ_H
#define IMAGE_READ_H
#include <vector>
#include <map>
#include <GL/glew.h>
#include <bitset>
#include <math.h>
#include "global.h"
#include "matrices.h"
#include "meshLoader.h"
#include <fstream>
#include <string>
#include <xmmintrin.h>
#include <nmmintrin.h>
#include "lines.h"

class imageRead
{
private:
	int SCREEN_WIDTH, SCREEN_HEIGHT;
	int numTex;
	unsigned int *ringFBO1, *ringFBO2, *supFBO1, *supFBO2;
	std::vector<int>cornerCount_2;
	unsigned int pX[6][global::SCREEN_WIDTH * global::SCREEN_HEIGHT * 4];
	std::vector<int>cornerCount;
	float pixies_1[7][global::SCREEN_WIDTH * global::SCREEN_HEIGHT * 4];
	float pixies_2[7][global::SCREEN_WIDTH * global::SCREEN_HEIGHT * 4];
	float rectifyPixies[2][global::SCREEN_WIDTH * global::SCREEN_HEIGHT * 4];

	unsigned char binChar[800][36];
	unsigned char binCharNext[800][36];

	void pixelRead();
	void pixelRead_2();
	void followRectificationImageDraw(global *world);
	void followRectificationPixelRead(global *world);
	void followRectificationPixelDescript(global *world);
	matrices pipeline;
  meshLoader *sceneL, *sceneR;
	void initializeComboQuad();

	std::vector<vector3d>totalVertexData;
	std::vector<unsigned int>totalIndexData;

 unsigned char binCharOut[28800], binCharNextOut[28800];
	uint16_t relationMap[288];

void drawFST(unsigned int fbo, shader *shades, unsigned int texID);
void drawFST(unsigned int fbo, shader *shades, unsigned int texID1, unsigned int texID2);
void drawFSM(unsigned int fbo, shader *shades, meshLoader *mesh);


public:
	imageRead(global *instantGlobal);
	~imageRead();
	void imageDraw(global *instantGlobal);
	void pointDescript(global *instantGlobal);
	void pointDescriptor(const int index);
	void initialize(global *world);
	void followRectification(global *world);
	void initializeQuad();
	  mesh* quad;
	  mesh* bigQuad;
	mesh *comboQuad1, *comboQuad2;
	lines *grayMesh;
	
	std::vector<vector3d>g_points;		
	std::vector<unsigned int>g_index;	
	void fillMatchingPoints();

};



#endif

