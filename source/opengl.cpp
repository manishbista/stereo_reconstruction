#include <GL/glew.h>
#include <SDL2/SDL_opengl.h>
#include <SDL2/SDL.h>
#include "../header/meshLoader.h"
#include "../header/shader.h"
#include "../header/matrices.h"
#include "../header/Matrix3f.h"
#include "../header/global.h"
#include "../header/image_read.h"
#include "../header/inliers.h"
#include "../header/lines.h"
#include "../header/msrectify.h"
#include "../header/camera.h"

SDL_Window* gWindow = NULL;
SDL_Surface* gScreenSurface = NULL;
float SCREEN_WIDTH = 800;
float SCREEN_HEIGHT = 600;
matrices pipeline;
glm::mat4 modelMatrix;
glm::mat4 viewMatrix;
glm::mat4 projectionMatrix;
meshLoader *scene;
shader *mixShades, *lineShades, *sceneShades;
global* world;
imageRead* reader;
lines *checkLines;
inliers *robust;
rectify *disparity;
shader* showShades;

camera cam;

void init()
{
	world = new global();
	reader = new imageRead(world);
	world->initialize();			//initialize variables
	reader->initialize(world);		//draw and read pixels
	world->dataPoints();			//database for corners

	pipeline.matrixMode(PROJECTION_MATRIX);
	pipeline.loadIdentity();
	//pipeline.perspective(50,SCREEN_WIDTH/SCREEN_HEIGHT,1,1000);
	//pipeline.ortho(-1.0, 1.0, -1.0, 1.0, 1.0, 100);
	pipeline.ortho(0.0, SCREEN_WIDTH, 0.0, SCREEN_HEIGHT, -1000.0, 1000.0);
	mixShades = new shader("../v_shader/mixShader.vs","../f_shader/mixShader.frag");
	lineShades = new shader("../v_shader/lineShader.vs","../f_shader/lineShader.frag");
	sceneShades = new shader("../v_shader/sceneShader.vs","../f_shader/sceneShader.frag");
	showShades = new shader("../v_shader/showShader.vs","../f_shader/showShader.frag");
	

	scene = new meshLoader("cones/imL.png");
	robust = new inliers();
	robust->checkThings();			//inliers Created

	disparity = new rectify();
	disparity->initializeMatrices();


	reader->fillMatchingPoints();
/*	for(int i = 0; i < reader->g_points.size(); i++)
	{
		reader->g_points[i].Display("pts");
		std::cout<<"   "<<reader->g_index[i]<<"  ";
	}
*/
/*	checkLines = new lines(&(reader->g_points), &(reader->g_index));

	std::vector<vector3d> linesV;
	std::vector<unsigned int>linesID;

	linesV.clear();
	linesID.clear();
	linesV.reserve(2);
	linesID.reserve(2);
	linesV.push_back(vector3d(400, 300, 1.0));
	linesV.push_back(vector3d(600, 300, 1.0));
	linesID.push_back(0);
	linesID.push_back(1);	
	checkLines = new lines(&linesV, &linesID);
*/
	reader->followRectification(world);
	pipeline.matrixMode(VIEW_MATRIX);
	pipeline.loadIdentity();


}

float angle = 0.5;
float disp = 0.0;
void display()
{
	glClearColor(0.25, 0.75, 0.75, 1);
	pipeline.matrixMode(MODEL_MATRIX);
	pipeline.loadIdentity();

	pipeline.matrixMode(VIEW_MATRIX);
	cam.Control(pipeline);
	cam.UpdateCamera(pipeline);

		showShades->useShader();
		glClear(GL_COLOR_BUFFER_BIT);
			glActiveTexture(GL_TEXTURE0);
			glBindTexture(GL_TEXTURE_2D,*(world->outputTex1));		//blurTex
			glUniform1i(glGetUniformLocation(showShades->getProgramId(),"textures"),0);

			glActiveTexture(GL_TEXTURE1);
			glBindTexture(GL_TEXTURE_2D,*(world->outputTex2));		//true color
			glUniform1i(glGetUniformLocation(showShades->getProgramId(),"textureColor"),1);
		pipeline.updateMatrices(showShades->getProgramId());
		reader->grayMesh->linesDraw(showShades->getProgramId(), true);
		showShades->delShader();

/*
			mixShades->useShader();
			glClear(GL_COLOR_BUFFER_BIT);
			glActiveTexture(GL_TEXTURE0);
			glBindTexture(GL_TEXTURE_2D,*(world->outputTex1));
			glUniform1i(glGetUniformLocation(mixShades->getProgramId(),"textures1"),0);
			glActiveTexture(GL_TEXTURE1);
			glBindTexture(GL_TEXTURE_2D,*(world->outputTex2));
			glUniform1i(glGetUniformLocation(mixShades->getProgramId(),"textures2"),1);
			pipeline.updateMatrices(mixShades->getProgramId());
			reader->bigQuad->draw(mixShades->getProgramId());
		mixShades->delShader();
*/
/*
		lineShades->useShader();
			pipeline.updateMatrices(lineShades->getProgramId());
			checkLines->linesDraw(lineShades->getProgramId());
		lineShades->delShader();
	

		sceneShades->useShader();
		glClear(GL_COLOR_BUFFER_BIT);
			glActiveTexture(GL_TEXTURE0);
			glBindTexture(GL_TEXTURE_2D,*(world->outputTex2));
			glUniform1i(glGetUniformLocation(sceneShades->getProgramId(),"textures1"),0);
		pipeline.updateMatrices(sceneShades->getProgramId());
		reader->grayMesh->linesDraw(sceneShades->getProgramId(), true);
		sceneShades->delShader();
		//angle = 0.0;		
*/
}


int main()
{

	SDL_Init(SDL_INIT_EVERYTHING);
	SDL_GL_SetAttribute(SDL_GL_CONTEXT_MAJOR_VERSION, 3);
	SDL_GL_SetAttribute(SDL_GL_CONTEXT_MINOR_VERSION, 0);
	gWindow = SDL_CreateWindow("SDL_COLLIDE", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, SCREEN_WIDTH, SCREEN_HEIGHT, SDL_WINDOW_SHOWN | SDL_WINDOW_OPENGL);
	SDL_GLContext gContext = SDL_GL_CreateContext(gWindow);
	glewExperimental = GL_TRUE;
	glewInit();
	SDL_GL_SetSwapInterval( 1 );
	gScreenSurface = SDL_GetWindowSurface( gWindow );
	bool running=true;
	SDL_Event event;	
	init();

	while(running)
	{
		while(SDL_PollEvent(&event))
		{
			switch(event.type)
			{
				case SDL_QUIT:
				running = false;
				break;
	

				case SDL_MOUSEBUTTONDOWN:
				cam.mouseIn(true);
				break;

				case SDL_KEYDOWN:
				switch(event.key.keysym.sym)
					{
						case SDLK_ESCAPE:
							running=false;
							break;
						case SDLK_LEFT:
							angle -=8;
							break;
						case SDLK_RIGHT:	
							angle+=8;
							break;
						case SDLK_UP:
							disp -=1;
							break;
						case SDLK_DOWN:	
							disp+=1;
							break;
						case SDLK_p:	
							cam.mouseIn(false);
							break;

						
					}
	
			}
		}
		display();
		SDL_GL_SwapWindow(gWindow);
	}

	delete mixShades;
	delete lineShades;
	delete scene;
	delete reader;
	delete world;
	delete robust;
	delete disparity;
	//delete checkLines;
	delete sceneShades;
	delete showShades;
	SDL_FreeSurface(gScreenSurface);
	SDL_GL_DeleteContext(gContext);
	SDL_DestroyWindow(gWindow);
	SDL_Quit();
	return 0;
}
