#include "../header/camera.h"

extern SDL_Window* gWindow;
void camera::lockCamera()
{
	if(camPitch>90)
		camPitch=90;
	if(camPitch<-90)
		camPitch=-90;
	if(camYaw<0.0)
		camYaw+=360.0;
	if(camYaw>360.0)
		camYaw-=360;
}

void camera::moveCamera(float dir)
{
	float rad=(camYaw+dir)*M_PI/180.0;
	loc.x-=sin(rad)*movevel;
	loc.z-=cos(rad)*movevel;
}

void camera::moveCameraUp(float dir)
{
	float rad=(camPitch+dir)*M_PI/180.0;
	loc.y+=sin(rad)*movevel;	
}

camera::camera()
{
	camPitch=0;
	camYaw=0;
	movevel=0.4;
	mousevel=0.4;
	mi=ismoved=false;
}
camera::camera(vector3d l)
{
	loc.change(l);
	camPitch=0;
	camYaw=0;
	movevel=0.2;
	mousevel=0.2;
	mi=ismoved=false;
}

camera::camera(vector3d l,float yaw,float pitch)
{
	loc.change(l);
	camPitch=pitch;
	camYaw=yaw;
	movevel=0.2;
	mousevel=0.2;
	mi=ismoved=false;
}

camera::camera(vector3d l,float yaw,float pitch,float mv,float mov)
{
	loc.change(l);
	camPitch=pitch;
	camYaw=yaw;
	movevel=mv;
	mousevel=mov;
	mi=false;
}

void camera::Control(matrices& pipeline)
{
	if(mi)
	{
		int MidX=320;
		int MidY=240;
		SDL_ShowCursor(SDL_DISABLE);
		int tmpx,tmpy;
		SDL_GetMouseState(&tmpx,&tmpy);
		camYaw+=mousevel*(MidX-tmpx);
		camPitch+=mousevel*(MidY-tmpy);
		lockCamera();
		SDL_WarpMouseInWindow(gWindow, MidX, MidY);
		const Uint8* state=SDL_GetKeyboardState(NULL);
		ismoved=false;
		if(state[SDL_GetScancodeFromKey(SDLK_w)])
		{
			ismoved=true;
			//if(camPitch!=90 && camPitch!=-90)
				moveCamera(0.0);
			//moveCameraUp(0.0);
		}else if(state[SDL_GetScancodeFromKey(SDLK_s)])
		{
			ismoved=true;
			//if(camPitch!=90 && camPitch!=-90)
				moveCamera(180.0);
		//	moveCameraUp(180.0);
		}		
		if(state[SDL_GetScancodeFromKey(SDLK_a)])
		{
			ismoved=true;
			moveCamera(90.0);
		}
		else if(state[SDL_GetScancodeFromKey(SDLK_d)])
		{
			ismoved=true;
			moveCamera(270);	
		}
	}
	//glRotatef(-camPitch,1.0,0.0,0.0);
	//glRotatef(-camYaw,0.0,1.0,0.0);
	pipeline.rotateX(camPitch);
	pipeline.rotateY(camYaw);
}

void camera::UpdateCamera(matrices& pipeline)
{
	//glTranslatef(-loc.x,-loc.y,-loc.z);
	pipeline.translate(loc.x,loc.y, loc.z);
}

//change the spherical coordinate system to cartesian
vector3d camera::getVector()
{
	//Google->spherical to cartesian
 	return (vector3d(-cos(camPitch*M_PI/180.0)*sin(camYaw*M_PI/180.0),sin(camPitch*M_PI/180.0),-cos(camPitch*M_PI/180.0)*cos(camYaw*M_PI/180.0)));
}
vector3d camera::getLocation()
{
	return loc;
}

float camera::getPitch()
{
	return camPitch;
}

float camera::getYaw()
{
	return camYaw;
}
float camera::getMovevel()
{
	return movevel;
}
float camera::getMousevel()
{
	return mousevel;
}

bool camera::isMouseIn()
{
	return mi;
}
		
void camera::setLocation(vector3d vec)
{
	loc.change(vec);
}

void camera::lookAt(float pitch,float yaw)
{
	camPitch=pitch;
	camYaw=yaw;
}

void camera::mouseIn(bool b)
{
	mi=b;
}

void camera::setSpeed(float mv,float mov)
{
	movevel=mv;
	mousevel=mov;
}

bool camera::isMoved()
{
	return ismoved;
}
