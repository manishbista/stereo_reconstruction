#ifndef VECTOR3D_H
#define VECTOR3D_H
#include <iostream>
#include <cmath>

class vector3d{
	public:
		float x,y,z;
		vector3d();
		vector3d(float a,float b);
		vector3d(float a,float b,float c);
		vector3d(float *vec);
		float distancePoints(const vector3d& vec2);
		float distancePointsSquared(const vector3d& vec2);
		float dotProduct(const vector3d& vec2);
		vector3d crossProduct(const vector3d& vec2);
		float length();
		float Length();
		void normalize();
		void Normalize();
		void change(float a,float b,float c);
		void change(vector3d vec2);
		void changeX(float a);
		void changeY(float a);
		void changeZ(float a);
		
		vector3d operator+(const vector3d& vec2);
		vector3d operator-(const vector3d& vec2);
		vector3d operator*(float num);
		vector3d operator/(float num);
		vector3d operator=(const vector3d& vec2);
		
		vector3d& operator+=(const vector3d& vec2);
		vector3d& operator-=(const vector3d& vec2);
		vector3d& operator*=(float num);
		vector3d& operator/=(float num);	
		
		bool operator==(const vector3d vec2);
		bool operator!=(const vector3d vec2);
		float& get(char a);
		float& get(int var);
		void Display();
		void Display(const char* name);		

		friend std::ostream& operator<<(std::ostream& out,const vector3d& vec);
};

#endif
