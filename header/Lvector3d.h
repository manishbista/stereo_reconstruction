#ifndef LVECTOR3D_H
#define LVECTOR3D_H
#include <iostream>
#include <cmath>
#include "vector3d.h"

class Lvector3d{
	public:
		long double x,y,z;
		Lvector3d();
		Lvector3d(long double a,long double b,long double c);
		Lvector3d(long double *vec);
		long double distancePointsSquared(const Lvector3d& vec2);
		long double Length();
		void Normalize();
		void change(long double a,long double b,long double c);
		
		Lvector3d operator+(const Lvector3d& vec2);
		Lvector3d operator-(const Lvector3d& vec2);
		Lvector3d operator=(const Lvector3d& vec2);
		Lvector3d operator=(const vector3d& vec2);
				
		long double dotProduct(const Lvector3d& vec2);

		void Display();
		void Display(const char* name);	

		long double& get(int var);	
};

#endif
