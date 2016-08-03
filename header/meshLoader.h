#ifndef MESHLOADER_H
#define MESHLOADER_H
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include "mesh.h"


class meshLoader
{
	private:
	mesh* g_Mesh;
	mesh* g_Mesh2;
	bool isCombined;
	std::vector<vertexData>g_VertexData;
	std::vector<vertexData>g_VertexData2;
	std::vector<unsigned int>g_Index;
	std::vector<unsigned int>g_Index2;
	std::vector<textureData>g_TexData;
	std::vector<textureData>g_TexData2;

	public:
	meshLoader(const char* filename);
	meshLoader(const char* filename1, const char* filename2);
	~meshLoader();
	void draw(unsigned int programId);
	unsigned int loadTexture(const char* filename);
};


#endif
