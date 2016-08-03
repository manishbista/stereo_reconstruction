#ifndef MSRECTIFY_H
#define MSRECTIFY_H
#include "global.h"

class rectify:public global
{
	private:
	Matrix3f fundamentalMat;
	 float scrWidth, scrHeight;
	 void powerMaxEigenVec(Matrix3f inputMat, vector3d& outputVec);
	 void singularValueDecomposition(Matrix3f inputMat, Matrix3f& orthoMat, Matrix3f& orthoMatInverse);
	 Matrix3f projectiveTrans, projectiveTransDash;

	 Matrix3f euclideanTrans, euclideanTransDash, shearTrans;
	 void initializeAffineTransform();
	 void initializeShearTransform();
	 void initializeProjectiveTransform();
	 void combineMatrices();

	 Matrix3f firstHomography;
	 Matrix3f secondHomography;

	public:
	 rectify();
	 ~rectify();
	 void initializeMatrices();



};


#endif
