#include "../header/Lvector3d.h"

Lvector3d::Lvector3d()
{
x=y=z=0;
}

Lvector3d::Lvector3d(long double a,long double b,long double c)
{
	x=a;
	y=b;
	z=c;
}

Lvector3d::Lvector3d(long double *vec)
{
 x = vec[0]; y = vec[1]; z = vec[2];
}

long double Lvector3d::distancePointsSquared(const Lvector3d& vec2)
{
long double det = (x- vec2.x) * (x- vec2.x) + (y - vec2.y) * (y - vec2.y) + (z - vec2.z) * (z - vec2.z);
return det;
}

long double Lvector3d::Length()
{
return sqrt(x*x+y*y + z*z);
}

void Lvector3d::Normalize()
{
	long double len=Length();
	if(len!=0)
	{
		x/=len;
		y/=len;
		z/=len;
	}
}

void Lvector3d::change(long double a,long double b,long double c)
{
	x=a;
	y=b;
	z=c;
}
		
	
Lvector3d Lvector3d::operator+(const Lvector3d& vec2)
{
	return Lvector3d(x+vec2.x,y+vec2.y,z+vec2.z);
}

Lvector3d Lvector3d::operator-(const Lvector3d& vec2)
{
	return Lvector3d(x-vec2.x,y-vec2.y,z-vec2.z);
}

Lvector3d Lvector3d::operator=(const Lvector3d& vec2)
{
 x= vec2.x; y = vec2.y; z = vec2.z;
}
		
Lvector3d Lvector3d::operator=(const vector3d& vec2)
{
 x= (long double)vec2.x; y = (long double)vec2.y; z = (long double)vec2.z;
}		
void Lvector3d::Display()
{
 std::cout<<std::endl<<"  "<<x<<"   "<<y<<"   "<<z<<std::endl;
}

long double Lvector3d::dotProduct(const Lvector3d& vec2)
{
	return (x*vec2.x+y*vec2.y+z*vec2.z);
}

void Lvector3d::Display(const char* name)	
{
 std::cout<<std::endl<<name<<".x = "<<x<<"   "<<name<<".y = "<<y<<"   "<<name<<".z = "<<z<<std::endl;
}

long double& Lvector3d::get(int var)
{
 if(var == 0) return x;
 else if(var == 1) return y;
 else if(var == 2) return z;
}



	
