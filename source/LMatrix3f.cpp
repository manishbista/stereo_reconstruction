#include "../header/LMatrix3f.h"

LMatrix3f::LMatrix3f()
{
 m[0][0] = 0.0;	m[0][1] = 0.0;	m[0][2] = 0.0;
 m[1][0] = 0.0;	m[1][1] = 0.0;	m[1][2] = 0.0;
 m[2][0] = 0.0;	m[2][1] = 0.0;	m[2][2] = 0.0;
}

LMatrix3f::LMatrix3f(long double a00, long double a01, long double a02,
		 long double a10, long double a11, long double a12,
		 long double a20, long double a21, long double a22)
{
 m[0][0] = a00;	m[0][1] = a01;	m[0][2] = a02;
 m[1][0] = a10;	m[1][1] = a11;	m[1][2] = a12;
 m[2][0] = a20;	m[2][1] = a21;	m[2][2] = a22;
}

LMatrix3f::LMatrix3f(long double mat[][3])
{
 m[0][0] = mat[0][0];	m[0][1] = mat[0][1];	m[0][2] = mat[0][2];
 m[1][0] = mat[1][0];	m[1][1] = mat[1][1];	m[1][2] = mat[1][2];
 m[2][0] = mat[2][0];	m[2][1] = mat[2][1];	m[2][2] = mat[2][2];
}

LMatrix3f::LMatrix3f(long double **mat)
{
 m[0][0] = mat[0][0];	m[0][1] = mat[0][1];	m[0][2] = mat[0][2];
 m[1][0] = mat[1][0];	m[1][1] = mat[1][1];	m[1][2] = mat[1][2];
 m[2][0] = mat[2][0];	m[2][1] = mat[2][1];	m[2][2] = mat[2][2];
}

LMatrix3f::LMatrix3f(long double *mat)
{
 m[0][0] = mat[0];	m[0][1] = mat[1];	m[0][2] = mat[2];
 m[1][0] = mat[3];	m[1][1] = mat[4];	m[1][2] = mat[5];
 m[2][0] = mat[6];	m[2][1] = mat[7];	m[2][2] = mat[8];

}

void LMatrix3f::SetIdentity()
{
 m[0][0] = 1.0;	m[0][1] = 0.0;	m[0][2] = 0.0;
 m[1][0] = 0.0;	m[1][1] = 1.0;	m[1][2] = 0.0;
 m[2][0] = 0.0;	m[2][1] = 0.0;	m[2][2] = 1.0;
}

void LMatrix3f::SetZero()
{
 m[0][0] = 0.0;	m[0][1] = 0.0;	m[0][2] = 0.0;
 m[1][0] = 0.0;	m[1][1] = 0.0;	m[1][2] = 0.0;
 m[2][0] = 0.0;	m[2][1] = 0.0;	m[2][2] = 0.0;
}
void LMatrix3f::Transpose()
{
 LMatrix3f mat = *this;
 m[0][0] = mat.m[0][0];	m[0][1] = mat.m[1][0];	m[0][2] = mat.m[2][0];
 m[1][0] = mat.m[0][1];	m[1][1] = mat.m[1][1];	m[1][2] = mat.m[2][1];
 m[2][0] = mat.m[0][2];	m[2][1] = mat.m[1][2];	m[2][2] = mat.m[2][2];
}

long double LMatrix3f::Determinant()
{
 long double det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
		- m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
		+ m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
 return det;
}



LMatrix3f LMatrix3f::ReturnTranspose()
{
 LMatrix3f mat( m[0][0], m[1][0], m[2][0],
		 m[0][1], m[1][1], m[2][1],
 		 m[0][2], m[1][2], m[2][2]);
 return mat;
}

LMatrix3f LMatrix3f::ReturnSymmetric()
{
 LMatrix3f dumb = *this;
 LMatrix3f tDumb = dumb.ReturnTranspose();
 return (tDumb * dumb);
}


void LMatrix3f::operator=(const LMatrix3f mat)
{
 m[0][0] = mat.m[0][0];	m[0][1] = mat.m[0][1];	m[0][2] = mat.m[0][2];
 m[1][0] = mat.m[1][0];	m[1][1] = mat.m[1][1];	m[1][2] = mat.m[1][2];
 m[2][0] = mat.m[2][0];	m[2][1] = mat.m[2][1];	m[2][2] = mat.m[2][2];
}

LMatrix3f LMatrix3f::operator+(const LMatrix3f mat)
{
 LMatrix3f res;
 res.m[0][0] = m[0][0] + mat.m[0][0];	 res.m[0][1] = m[0][1] + mat.m[0][1];	 res.m[0][2] = m[0][2] + mat.m[0][2];
 res.m[1][0] = m[1][0] + mat.m[1][0];	 res.m[1][1] = m[1][1] + mat.m[1][1];	 res.m[1][2] = m[1][2] + mat.m[1][2];
 res.m[2][0] = m[2][0] + mat.m[2][0];	 res.m[2][1] = m[2][1] + mat.m[2][1];	 res.m[2][2] = m[2][2] + mat.m[2][2];
 return res;
}

LMatrix3f LMatrix3f::operator-(const LMatrix3f mat)
{
 LMatrix3f res;
 res.m[0][0] = m[0][0] - mat.m[0][0];	 res.m[0][1] = m[0][1] - mat.m[0][1];	 res.m[0][2] = m[0][2] - mat.m[0][2];
 res.m[1][0] = m[1][0] - mat.m[1][0];	 res.m[1][1] = m[1][1] - mat.m[1][1];	 res.m[1][2] = m[1][2] - mat.m[1][2];
 res.m[2][0] = m[2][0] - mat.m[2][0];	 res.m[2][1] = m[2][1] - mat.m[2][1];	 res.m[2][2] = m[2][2] - mat.m[2][2];
 return res;
}

LMatrix3f LMatrix3f::operator*(const LMatrix3f mat)
{
 LMatrix3f res;
 for(int i = 0; i < 3; i++)
 {
	for(int j = 0; j < 3; j++)
	 res.m[i][j] = m[i][0] * mat.m[0][j] + m[i][1] * mat.m[1][j] + m[i][2] * mat.m[2][j];	 
 }
 return res;
}

Lvector3d LMatrix3f::operator*(Lvector3d vec)
{
 long double ret[3];
 long double sum = 0.0;
	for(int i = 0; i < 3; i++)
	{
		sum = 0.0;
		 for(int k = 0; k < 3; k++)
		 sum += m[i][k] * vec.get(k);
		ret[i] = sum;
	}
 return Lvector3d(ret);
}


void LMatrix3f::Display()
{
 for(int i = 0; i < 3; i++)
 {
	std::cout<<std::endl;
	for(int j = 0; j < 3; j++)
	std::cout<<"   "<<m[i][j]<<"  ";
 }
	std::cout<<std::endl;
}

void LMatrix3f::Display(const char* name)
{
 for(int i = 0; i < 3; i++)
 {
	std::cout<<std::endl;
	for(int j = 0; j < 3; j++)
	std::cout<<"   "<<name<<"["<<i<<"]["<<j<<"] = "<<m[i][j]<<"  ";
 }
	std::cout<<std::endl;
}


