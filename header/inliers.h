#ifndef INLIERS_H
#define INLIERS_H
#include "global.h"
#include <stdlib.h>
#include <time.h>
#include <assert.h>

class inliers : public global
{
 public:
	inliers();
	~inliers();
	void checkThings();
 private:
	std::vector<int>sampleInliers;
	LMatrix3f fundMat;
	void normalization(std::vector<int> maybeInliersRecord, Matrix3f& matTranScale, Matrix3f& matTranScaleDash);
	void normalization(std::vector<int> maybeInliersRecord, LMatrix3f& matTranScale, LMatrix3f& matTranScaleDash);
	void powerSVD(LMatrix3f fund, LMatrix3f& orthoMatU, LMatrix3f& diagMat, LMatrix3f& orthoMat);
	void solutionSVD(float **inputMat, int numRows, int numCol, float *outputMat);
	void solutionSVD(long double **inputMat, int numRow, int numCol, long double *outputMat);
	void ransac();
	void estimateFundamentalMatrix();
	void checkFundamentalMatrix(std::vector<vector3d>pointA, std::vector<vector3d>pointB);
	void setZeroFundamentalMatrix(LMatrix3f fMatrix, LMatrix3f& nMatrix);
	void LUDecomposition(long double **inputMat, long double **matL, long double **matU, int _size);
};


#endif
