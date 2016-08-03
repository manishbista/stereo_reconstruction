#ifndef LMATRIX3F_H
#define LMATRIX3F_H

#include <iostream>
#include "Lvector3d.h"
#include <math.h>

class LMatrix3f
{
 public:
  long double m[3][3];
 LMatrix3f();
 LMatrix3f(long double a00, long double a01, long double a02,
		 long double a10, long double a11, long double a12,
		 long double a20, long double a21, long double a22);
	LMatrix3f(long double mat[][3]);
	LMatrix3f(long double *mat);
	LMatrix3f(long double **mat);
	void SetIdentity();
	void SetZero();
	void Transpose();
	LMatrix3f ReturnTranspose();
	LMatrix3f ReturnSymmetric();
	long double Determinant();

	void operator=(const LMatrix3f mat);
	LMatrix3f operator+(const LMatrix3f mat);
	LMatrix3f operator-(const LMatrix3f mat);
	LMatrix3f operator*(const LMatrix3f mat);
	Lvector3d operator*(Lvector3d vec);

	void Display();
	void Display(const char* name);
};



#endif
