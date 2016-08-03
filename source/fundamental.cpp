#include "../header/inliers.h"
#include <iomanip>

void inliers::normalization(std::vector<int> maybeInliersRecord, LMatrix3f& matTranScale, LMatrix3f& matTranScaleDash)
{
 float sumX = 0.0, sumY = 0.0, sumXdash = 0.0, sumYdash = 0.0;
 long double SUMX, SUMY, SUMXDASH, SUMYDASH;
 long double sumsq = 0.0, sumsqdash = 0.0;

 //find offset till mean zero translation or centroid = 0;
 int num_pts = maybeInliersRecord.size();
 int dataID;
 for(int i = 0; i < num_pts; i++)
 {
	dataID = maybeInliersRecord[i];
	sumX += global::firstImagePoints[dataID].x;		sumY += global::firstImagePoints[dataID].y;
	sumXdash += global::secondImagePoints[dataID].x;	sumYdash += global::secondImagePoints[dataID].y;
 }

 SUMX = sumX/num_pts;	SUMXDASH = sumXdash/num_pts;
 SUMY = sumY/num_pts;	SUMYDASH = sumYdash/num_pts;

 vector3d ptFirst;
 vector3d ptSecond;
 //translate points
 for(int i = 0; i < num_pts; i++)
 {
	dataID = maybeInliersRecord[i];
	ptFirst = global::firstImagePoints[dataID];
	ptSecond = global::secondImagePoints[dataID];
	sumsq += (ptFirst.x - SUMX)*(ptFirst.x - SUMX) + (ptFirst.y - SUMY)*(ptFirst.y - SUMY);
	sumsqdash += (ptSecond.x - SUMX)*(ptSecond.x - SUMX) + (ptSecond.y - SUMY)*(ptSecond.y - SUMY);
 }

 sumsq /= num_pts;		sumsqdash /= num_pts;
 sumsq = sqrt(sumsq);		sumsqdash = sqrt(sumsqdash);

 std::cout<<" sigma "<<sumsq<<" and "<<sumsqdash<<std::endl;
 sumsq = 1.414214/sumsq;	sumsqdash = 1.414214/sumsqdash;

 matTranScale.m[0][0] = sumsq;		matTranScale.m[0][1] = 0.0;	matTranScale.m[0][2] = -sumsq * SUMX;
 matTranScale.m[1][0] = 0.0;		matTranScale.m[1][1] = sumsq;	matTranScale.m[1][2] = -sumsq * SUMY;
 matTranScale.m[2][0] = 0.0;		matTranScale.m[2][1] = 0.0;	matTranScale.m[2][2] = 1.0;

 matTranScaleDash.m[0][0] = sumsqdash;	matTranScaleDash.m[0][1] = 0.0;		matTranScaleDash.m[0][2] = -sumsqdash * SUMXDASH;
 matTranScaleDash.m[1][0] = 0.0;	matTranScaleDash.m[1][1] = sumsqdash;	matTranScaleDash.m[1][2] = -sumsqdash * SUMYDASH;
 matTranScaleDash.m[2][0] = 0.0;	matTranScaleDash.m[2][1] = 0.0;		matTranScaleDash.m[2][2] = 1.0;

}

void inliers::powerSVD(LMatrix3f fund, LMatrix3f& orthoMatU, LMatrix3f& diagMat, LMatrix3f& orthoMat)
{
int _size = 3;
 LMatrix3f symmetricFund;
 symmetricFund = fund.ReturnSymmetric();	//returned AtA
 //if determinant is 0, look no further, else 
 int matSize = 0;
 long double dummyMaxEigenVec[3] = {0.0};
 int counter;
 bool powerRepeat = true;
 long double squareSum = 0.0;
 long double sum = 0.0;
 int totalCounter = 0;

 while(matSize != 3)
 {
 //initial approximation to eigenVector
	orthoMat.m[matSize][0] = 1.0;
	orthoMatU.m[matSize][0] = 1.0;

 for(int i = 1; i < 3; i++)
 {
	orthoMat.m[matSize][i] = 0.0;
	orthoMatU.m[matSize][i] = 0.0;
 }

 //dummy eigenVecs for value comparision during iteration
 powerRepeat = true;
 squareSum = 0.0;
 sum = 0.0;
 totalCounter = 0;

  while(powerRepeat)
	{
	 //std::cout<<" repeat "<<std::endl;
	 //save maxEigenVec to dummy
	 for(int i = 0; i < _size; i++)
		dummyMaxEigenVec[i] = orthoMat.m[matSize][i];

	 //do matrix multiplication
	 for(int i = 0; i < _size; i++)
		orthoMat.m[matSize][i] = dummyMaxEigenVec[0] * symmetricFund.m[i][0] + dummyMaxEigenVec[1] * symmetricFund.m[i][1] + dummyMaxEigenVec[2] * symmetricFund.m[i][2];

	 //find maximum value in eigenVec and make it 1
	 diagMat.m[matSize][matSize] = fabs(orthoMat.m[matSize][0]);
	 for(int i = 1; i < _size; i++)
	 {
		if(fabs(orthoMat.m[matSize][i]) > diagMat.m[matSize][matSize]) diagMat.m[matSize][matSize] = fabs(orthoMat.m[matSize][i]);
	 }

	 for(int i = 0; i < _size; i++)
		orthoMat.m[matSize][i] /= diagMat.m[matSize][matSize];

	 //comparision for repitition of iteration
	 counter = 0;
	 for(int i = 0; i < _size; i++)
	 {
		if(fabs(dummyMaxEigenVec[i] - orthoMat.m[matSize][i]) < 0.000005) counter++;
	 }	
	
	totalCounter++;
	 if(counter == 3 || totalCounter > 500) powerRepeat = false;
	
	 if(!powerRepeat)
		{

		 squareSum = orthoMat.m[matSize][0] * orthoMat.m[matSize][0] + orthoMat.m[matSize][1] * orthoMat.m[matSize][1]
			 + orthoMat.m[matSize][2] * orthoMat.m[matSize][2];
		 squareSum = sqrt(squareSum); 
		 orthoMat.m[matSize][0] /= squareSum;
		 orthoMat.m[matSize][1] /= squareSum;
		 orthoMat.m[matSize][2] /= squareSum; //v[i] = x[i] / |x[i]|
		
		sum = 0.0;
		 for(int i = 0; i < _size; i++)
		 {
			squareSum = fund.m[i][0] * orthoMat.m[matSize][0] + fund.m[i][1] * orthoMat.m[matSize][1] 
					+ fund.m[i][2] * orthoMat.m[matSize][2];
			sum += squareSum * squareSum;
			orthoMatU.m[matSize][i] = squareSum;	
		 }		
		 sum = sqrt(sum);
		diagMat.m[matSize][matSize] = sum;

		for(int i = 0; i < _size; i++)
		 orthoMatU.m[matSize][i] /= sum;

		if(totalCounter > 500){assert(0);}

		}

	}

 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	 fund.m[i][j] -= diagMat.m[matSize][matSize] * orthoMatU.m[matSize][i] * orthoMat.m[matSize][j];
 }
 symmetricFund = fund.ReturnSymmetric();

 matSize++;
 }
}



void inliers::solutionSVD(long double **inputMat, int numRow, int numCol, long double *outputMat)
{
  long double sumMat = 0.0;
 long double **symmetricMat;
 symmetricMat = new long double*[numCol];
 for(int i = 0; i < numCol; i++)
	symmetricMat[i] = new long double[numCol];

 long double **matL;
 matL = new long double*[numCol];
 for(int i = 0; i < numCol; i++)
	matL[i] = new long double[numCol];

 long double **matU;
 matU = new long double*[numCol];
 for(int i = 0; i < numCol; i++)
	matU[i] = new long double[numCol];


 for(int i = 0; i < numCol; i++)
 {
	for(int j = 0; j < numCol; j++)
	{
		sumMat = 0.0;
		for(int k = 0; k < numRow; k++)
			sumMat += inputMat[k][i] * inputMat[k][j];
		symmetricMat[i][j] = sumMat;
	}
 }

 LUDecomposition(symmetricMat, matL, matU, numCol);

 long double dummyMaxEigenVec[numCol];
 long double middleMan[numCol];

 bool powerRepeat = true;
 int totalCounter = 0;
 int counter = 0;

 outputMat[0] = 1.0;
 for(int i = 1; i < numCol; i++)
 outputMat[i] = 0.0;


 while(powerRepeat)
 {
	for(int i = 0; i < numCol; i++)
	 dummyMaxEigenVec[i] = outputMat[i];

	for(int i = 0; i < numCol; i++)
	{
		sumMat = 0.0;
		for(int j = 0; j < i; j++)
		sumMat += matL[i][j] * middleMan[j];

		middleMan[i] = dummyMaxEigenVec[i] - sumMat;	
	}

	for(int i = numCol -1; i >= 0; i--)
	{
		sumMat = 0.0;
		for(int j = numCol - 1; j > i; j--)
		sumMat += matU[i][j] * outputMat[j];

		outputMat[i] = (middleMan[i] - sumMat)/matU[i][i];
	}
	

 	counter = 0;
 	for(int i = 1; i < numCol; i++)
	 {if(fabs(outputMat[i]) > fabs(outputMat[counter])) counter = i;}

	sumMat = outputMat[counter];
 	for(int i = 0; i < numCol; i++)
	  outputMat[i] /= sumMat;

 	counter = 0;
 	for(int i = 0; i < numCol; i++)
  	{
		if((fabs(dummyMaxEigenVec[i]) - fabs(outputMat[i])) < 0.00000000000000001) counter++;
  	}	
  	totalCounter++;
  	if(counter == numCol || totalCounter > 500) powerRepeat = false;

	if(!powerRepeat)
		{
			sumMat = 0.0;
			for(int i = 0; i < numCol; i++)
		  	 sumMat += outputMat[i] * outputMat[i];	
			for(int i = 0; i < numCol; i++)
			 outputMat[i] /= sqrt(sumMat);
			
		 if(totalCounter > 500) std::cout<<std::endl<<"not converging"<<std::endl;
		}
 }

delete[] symmetricMat;
delete[] matL;
delete[] matU;
}


void inliers::estimateFundamentalMatrix()
{
 int num_pts = global::inliersRecord.size();
 long double **coeffMat;
 coeffMat = new long double*[num_pts];	//maximum number of rows is num_pts and columns is 9
 for(int i = 0; i < num_pts; i++)
	coeffMat[i] = new long double[9];

 long double outputMat[9];

long double **fundMatrix;
fundMatrix = new long double*[3];
for(int i = 0; i < 3; i++)
 fundMatrix[i]  = new long double[3];

long double outEpi[3];

//for normalization
 LMatrix3f matTransScale, matTransScaleDash, normFundamentalMatrix;
 normalization(global::inliersRecord, matTransScale, matTransScaleDash);

 int dataID;
 Lvector3d first, second;
 for(int i = 0; i < num_pts; i++)
 {
	dataID = global::inliersRecord[i];
	first = global::firstImagePoints[dataID];
	second = global::secondImagePoints[dataID];
	first = matTransScale * first;
	second = matTransScaleDash * second;
	first.change(first.x/first.z, first.y/first.z, 1.0);
	second.change(second.x/second.z, second.y/second.z, 1.0);
	
	coeffMat[i][0] = second.x * first.x;
	coeffMat[i][1] = second.x * first.y;
	coeffMat[i][2] = second.x * first.z;
	coeffMat[i][3] = second.y * first.x;
	coeffMat[i][4] = second.y * first.y;
	coeffMat[i][5] = second.y * first.z;
	coeffMat[i][6] = second.z * first.x;
	coeffMat[i][7] = second.z * first.y;
	coeffMat[i][8] = second.z * first.z;
 }

 solutionSVD(coeffMat, num_pts, 9, outputMat);		//inverse followed by SVD to find fundamental Matrix

 fundMat = LMatrix3f(outputMat);
 setZeroFundamentalMatrix(fundMat, normFundamentalMatrix);
 fundMat = matTransScaleDash.ReturnTranspose() * normFundamentalMatrix * matTransScale;	//denorm
 global::fundamentalMatrix = fundMat;
 global::LfundamentalMatrix = fundMat;

 fundMat.Display("fund");
 for(int i = 0; i < 3; i++)
 {
	for(int j = 0; j < 3; j++)
		fundMatrix[i][j] = fundMat.m[i][j];
 } 

 solutionSVD(fundMatrix, 3, 3, outEpi);
 global::epipoleA = vector3d(outEpi[0], outEpi[1], outEpi[2]);
 //global::epipoleA = vector3d(outEpi[0]/outEpi[2], outEpi[1]/outEpi[2], 1.0);
 global::epipoleA.Display("epi");

 global::LepipoleA = Lvector3d(outEpi[0], outEpi[1], outEpi[2]);

 for(int i = 0; i < 3; i++)
 {
	for(int j = 0; j < 3; j++)
		fundMatrix[i][j] = fundMat.m[j][i];
 }

 solutionSVD(fundMatrix, 3, 3, outEpi);
 global::epipoleB = vector3d(outEpi[0], outEpi[1], outEpi[2]);
 //global::epipoleB = vector3d(outEpi[0]/outEpi[2], outEpi[1]/outEpi[2], 1.0);
 global::epipoleB.Display("epi");

 global::LepipoleB = Lvector3d(outEpi[0], outEpi[1], outEpi[2]);

 delete[] fundMatrix;
 delete[] coeffMat;
}


void inliers::setZeroFundamentalMatrix(LMatrix3f fMatrix, LMatrix3f& nMatrix)
{
	LMatrix3f matU, matV, matD;
	powerSVD(fMatrix, matU, matD, matV);
	matD.m[2][2] = 0;
	nMatrix = matU.ReturnTranspose() * matD * matV;

}

void inliers::LUDecomposition(long double **inputMat, long double **matL, long double **matU, int _size)
{
long double sum = 0.0;

for(int i = 0; i < _size; i++)
{
 for(int j = 0; j < _size; j++)
	{
		if(i == j)	matL[i][i] = 1;
		else if(i < j)	matL[i][j] = 0;
		else if(i > j)	matU[i][j] = 0;
	}
}	


for(int i = 0; i < _size; i++)
{
	for(int j = i; j < _size; j++)
	{
		sum = 0.0;
		for(int k = 0; k < i; k++)
		 sum += matL[i][k] * matU[k][j];
		
		matU[i][j] = inputMat[i][j] - sum;
	}

	for(int j = i + 1; j < _size; j++)
	{
		sum = 0.0;
		for(int k = 0; k < i; k++)
		 sum += matL[j][k] * matU[k][i];

		matL[j][i] = (inputMat[j][i] - sum)/matU[i][i];
	}
}

/*
std::cout<<std::endl<<" matrixL  "<<std::endl;
for(int i = 0; i < _size; i++)
{
 std::cout<<std::endl;
 for(int j = 0; j < _size; j++)
 std::cout<<"  "<<matL[i][j]<<"  ";
}


std::cout<<std::endl<<" matrixU  "<<std::endl;
for(int i = 0; i < _size; i++)
{
 std::cout<<std::endl;
 for(int j = 0; j < _size; j++)
 std::cout<<"  "<<matU[i][j]<<"  ";
}

std::cout<<std::endl<<" matrix Check  "<<std::endl;
for(int i = 0; i < _size; i++)
{
 std::cout<<std::endl;
 for(int j = 0; j < _size; j++)
 {
	sum = 0.0;
	for(int k = 0; k < _size; k++)
	 sum += matL[i][k] * matU[k][j];
 	std::cout<<"  "<<(sum - inputMat[i][j])<<"  ";
 }

}
*/

}










