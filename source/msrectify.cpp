#include "../header/msrectify.h"
#include <iomanip> 
#include <SDL2/SDL.h>


rectify::rectify()
{
 std::cout<<std::endl<<" rectify constructor called "<<std::endl;
 scrWidth = (float)global::SCREEN_WIDTH;
 scrHeight = (float)global::SCREEN_HEIGHT;

}


void rectify::initializeMatrices()
{

initializeProjectiveTransform();

initializeAffineTransform();
//initializeShearTransform();
combineMatrices();


firstHomographyMatrix[0][0] = firstHomography.m[0][0];  firstHomographyMatrix[0][1] = firstHomography.m[1][0];
firstHomographyMatrix[0][2] = 0.0; 			firstHomographyMatrix[0][3] = firstHomography.m[2][0];

firstHomographyMatrix[1][0] = firstHomography.m[0][1];  firstHomographyMatrix[1][1] = firstHomography.m[1][1];
firstHomographyMatrix[1][2] = 0.0;			firstHomographyMatrix[1][3] = firstHomography.m[2][1];

firstHomographyMatrix[2][0] = 0.0; firstHomographyMatrix[2][1] = 0.0; 
firstHomographyMatrix[2][2] = 1.0; firstHomographyMatrix[2][3] = 0.0;

firstHomographyMatrix[3][0] = firstHomography.m[0][2];  firstHomographyMatrix[3][1] = firstHomography.m[1][2]; 
firstHomographyMatrix[3][2] = 0.0; 			firstHomographyMatrix[3][3] = firstHomography.m[2][2];



secondHomographyMatrix[0][0] = secondHomography.m[0][0]; secondHomographyMatrix[0][1] = secondHomography.m[1][0];
secondHomographyMatrix[0][2] = 0.0; 			secondHomographyMatrix[0][3] = secondHomography.m[2][0];

secondHomographyMatrix[1][0] = secondHomography.m[0][1]; secondHomographyMatrix[1][1] = secondHomography.m[1][1];
secondHomographyMatrix[1][2] = 0.0; 			secondHomographyMatrix[1][3] = secondHomography.m[2][1];

secondHomographyMatrix[2][0] = 0.0; firstHomographyMatrix[2][1] = 0.0; 
secondHomographyMatrix[2][2] = 1.0; firstHomographyMatrix[2][3] = 0.0;

secondHomographyMatrix[3][0] = secondHomography.m[0][2]; secondHomographyMatrix[3][1] = secondHomography.m[1][2]; 
secondHomographyMatrix[3][2] = 0.0; 			secondHomographyMatrix[3][3] = secondHomography.m[2][2];

}

void rectify::initializeProjectiveTransform()
{
 Matrix3f matPCPT;
 matPCPT.m[0][0] = (scrWidth -1)*(scrWidth -1);	matPCPT.m[0][1] = (scrWidth -1)*(scrHeight -1);	 matPCPT.m[0][2] = (scrWidth -1)*2;
 matPCPT.m[1][0] = (scrWidth -1)*(scrHeight -1);matPCPT.m[1][1] = (scrHeight -1)*(scrHeight -1); matPCPT.m[1][2] = (scrHeight -1)*2;
 matPCPT.m[2][0] = (scrWidth -1)*2;		matPCPT.m[2][1] = (scrHeight -1)*2;	 	 matPCPT.m[2][2] = 4; 
 matPCPT = matPCPT * 0.25; 

 Matrix3f matPPT;
 matPPT.m[0][0] = (scrWidth * scrWidth -1);	matPPT.m[0][1] = 0;	 			matPPT.m[0][2] = 0;
 matPPT.m[1][0] = 0;				matPPT.m[1][1] = (scrHeight * scrHeight -1);	matPPT.m[1][2] = 0;
 matPPT.m[2][0] = 0;				matPPT.m[2][1] = 0;			 	matPPT.m[2][2] = 0;
 float var = (scrWidth * scrHeight)/12.0;
 matPPT  = matPPT * var;


 vector3d epipoleFirst = global::epipoleA;
 Matrix3f epiASymmetric;	//take global::epipoleA and create antiSymmetric Matrix: A = -transpose(A)
 epiASymmetric.m[0][0] = 0;	 		epiASymmetric.m[0][1] = epipoleFirst.z;	 epiASymmetric.m[0][2] = -epipoleFirst.y;
 epiASymmetric.m[1][0] = -epipoleFirst.z;	 epiASymmetric.m[1][1] = 0;	 		epiASymmetric.m[1][2] = epipoleFirst.x;
 epiASymmetric.m[2][0] = epipoleFirst.y;	 epiASymmetric.m[2][1] = -epipoleFirst.x;	 epiASymmetric.m[2][2] = 0;

 Matrix3f fundamentalMat = global::fundamentalMatrix;
//fundamentalMat.m[1][1] *= (-1);

 Matrix3f rectMatA = epiASymmetric.ReturnTranspose() * matPPT * epiASymmetric;
 Matrix3f rectMatB = epiASymmetric.ReturnTranspose() * matPCPT * epiASymmetric;
 Matrix3f rectMatADash = fundamentalMat.ReturnTranspose() * matPPT * fundamentalMat;
 Matrix3f rectMatBDash = fundamentalMat.ReturnTranspose() * matPCPT * fundamentalMat;

 Matrix3f orthoMatD, orthoMatDInv, orthoMatD_Dash, orthoMatDInv_Dash;
 singularValueDecomposition(rectMatA, orthoMatD, orthoMatDInv);		//rectMatA = orthoMatD' * orthoMatD; ' = transpose
 singularValueDecomposition(rectMatADash, orthoMatD_Dash, orthoMatDInv_Dash);	

/*
 std::cout<<std::endl<<" for rectMatA "<<std::endl;
 rectMatA.Display("rectMatA");
 orthoMatD.Display("matD");
 (orthoMatD.ReturnTranspose() * orthoMatD).Display("MUL");
 orthoMatDInv.Display("matDInv");
 (orthoMatD * orthoMatDInv).Display("ID");

 std::cout<<std::endl<<" for rectMatB "<<std::endl;
 rectMatADash.Display("rectMatADash");
 orthoMatD_Dash.Display("matDDash");
 (orthoMatD_Dash.ReturnTranspose() * orthoMatD_Dash).Display("MUL");
 orthoMatDInv_Dash.Display("matDDashInv");
 (orthoMatD_Dash * orthoMatDInv_Dash).Display("IDDash");
*/


// to maximize weight matrix
 Matrix3f weightMat, weightMatDash;
 weightMat = orthoMatDInv.ReturnTranspose() * rectMatB * orthoMatDInv;
 weightMatDash = orthoMatDInv_Dash.ReturnTranspose() * rectMatBDash * orthoMatDInv_Dash;

 vector3d way, way_dash;
 powerMaxEigenVec(weightMat, way);
 powerMaxEigenVec(weightMatDash, way_dash);
 
 vector3d zed, zed_dash;
 zed = orthoMatDInv * way;
 zed_dash = orthoMatDInv_Dash * way_dash;

 zed.Normalize();
 zed_dash.Normalize();
 vector3d Zedd = zed * 0.5 + zed_dash * 0.5;

 vector3d dublu, dubluDash;
 dublu = epiASymmetric * Zedd;
 dubluDash = fundamentalMat * Zedd;


 dublu.change(dublu.x/dublu.z, dublu.y/dublu.z, 1.0);
 dubluDash.change(dubluDash.x/dubluDash.z, dubluDash.y/dubluDash.z, 1.0);


 projectiveTrans.m[0][0] = 1;		projectiveTrans.m[0][1] = 0;		 projectiveTrans.m[0][2] = 0;
 projectiveTrans.m[1][0] = 0;		projectiveTrans.m[1][1] = 1;		 projectiveTrans.m[1][2] = 0;
 projectiveTrans.m[2][0] = dublu.x;	projectiveTrans.m[2][1] = dublu.y;	 projectiveTrans.m[2][2] = 1;

 projectiveTransDash.m[0][0] = 1;		projectiveTransDash.m[0][1] = 0;		 projectiveTransDash.m[0][2] = 0;
 projectiveTransDash.m[1][0] = 0;		projectiveTransDash.m[1][1] = 1;		 projectiveTransDash.m[1][2] = 0;
 projectiveTransDash.m[2][0] = dubluDash.x;	projectiveTransDash.m[2][1] = dubluDash.y;	 projectiveTransDash.m[2][2] = 1;

 (projectiveTrans * global::epipoleA).Display("epiA");
 (projectiveTransDash * global::epipoleB).Display("epiB");
 projectiveTrans.Display("projT");
 projectiveTransDash.Display("projTD");

}


void rectify::initializeAffineTransform()
{

Matrix3f fundamentalMat = global::fundamentalMatrix;
float var_a = fundamentalMat.m[2][1] - fundamentalMat.m[2][2] * projectiveTrans.m[2][1];
float var_b = fundamentalMat.m[2][0] - fundamentalMat.m[2][2] * projectiveTrans.m[2][0];

float var_aD = projectiveTransDash.m[2][1] * fundamentalMat.m[2][2] - fundamentalMat.m[1][2];
float var_bD = projectiveTransDash.m[2][0] * fundamentalMat.m[2][2] - fundamentalMat.m[0][2];

 euclideanTrans.m[0][0] = var_a;	euclideanTrans.m[0][1] = -var_b;	 euclideanTrans.m[0][2] = 0;
 euclideanTrans.m[1][0] = var_b;	euclideanTrans.m[1][1] = var_a;	 	euclideanTrans.m[1][2] = fundamentalMat.m[2][2];
 euclideanTrans.m[2][0] = 0;		euclideanTrans.m[2][1] = 0;	 	euclideanTrans.m[2][2] = 1;

 euclideanTransDash.m[0][0] = var_aD;	euclideanTransDash.m[0][1] = -var_bD;	 	euclideanTransDash.m[0][2] = 0;
 euclideanTransDash.m[1][0] = var_bD;	euclideanTransDash.m[1][1] = var_aD;	 	euclideanTransDash.m[1][2] = 0;
 euclideanTransDash.m[2][0] = 0;	euclideanTransDash.m[2][1] = 0;			euclideanTransDash.m[2][2] = 1;

euclideanTrans.Display("ec");
euclideanTransDash.Display("ecd");
Matrix3f scaleTrans, scaleTransDash;


 var_a = 1/(var_aD);
 
 scaleTrans.m[0][0] = var_a;	scaleTrans.m[0][1] = 0.0;	 	scaleTrans.m[0][2] = 0;
 scaleTrans.m[1][0] = 0.0;	scaleTrans.m[1][1] = var_a;	 	scaleTrans.m[1][2] = 0;
 scaleTrans.m[2][0] = 0;	scaleTrans.m[2][1] = 0;			scaleTrans.m[2][2] = 1;

 scaleTransDash.m[0][0] = var_a;	scaleTransDash.m[0][1] = 0.0;	 	scaleTransDash.m[0][2] = 0;
 scaleTransDash.m[1][0] = 0.0;		scaleTransDash.m[1][1] = var_a;	 	scaleTransDash.m[1][2] = 0;
 scaleTransDash.m[2][0] = 0;		scaleTransDash.m[2][1] = 0;		scaleTransDash.m[2][2] = 1;

euclideanTrans = scaleTrans * euclideanTrans;
euclideanTransDash = scaleTransDash * euclideanTransDash;

 vector3d first, second;
 first = euclideanTrans * projectiveTrans * global::epipoleA;
 first.Display("epiA");
 (euclideanTransDash * projectiveTransDash * global::epipoleB).Display("epiB");
 

}

void rectify::combineMatrices()
{
 firstHomography = euclideanTrans * projectiveTrans;
 secondHomography = euclideanTransDash * projectiveTransDash;
 firstHomography.Display();
 secondHomography.Display();


 std::vector<vector3d>checkVec;
 checkVec.clear();
 checkVec.reserve(6);
 checkVec.push_back(vector3d(0, 0, 1));
 checkVec.push_back(vector3d(800, 0, 1));
 checkVec.push_back(vector3d(0, 600, 1));
 checkVec.push_back(vector3d(400, 300, 1));
 checkVec.push_back(vector3d(800, 600, 1));
 checkVec.push_back(vector3d(500, 500, 1));

 vector3d first, second;
 for(int i = 0; i < checkVec.size(); i++)
 {
	first = firstHomography * checkVec[i];
	second = secondHomography * checkVec[i];
	first.Display("first");
	second.Display("second");
 }

 int dataID;
 for(int i = 0; i < global::inliersRecord.size(); i++)
 {
  global::secondImagePoints[dataID];
  dataID = inliersRecord[i];
  first = global::firstImagePoints[dataID];
  first = firstHomography * first;
  first.change(first.x/first.z, first.y/first.z, 1.0);
  first.Display("fiC");

  second = global::secondImagePoints[dataID];
  second = secondHomography * second;
  second.change(second.x/second.z, second.y/second.z, 1.0);
  second.Display("secChan");

  std::cout<<" disparity "<<fabs(first.x - second.x)<<std::endl;
 }

 first = firstHomography * global::epipoleA;
 first.Display("f");
 second = secondHomography * global::epipoleB;
  second.Display("s");


vector3d inf = vector3d(1, 0, 0);
Matrix3f infX;
//infX.AsymmetricMatrix(inf);
infX.m[2][1] = 1;
infX.m[1][2] = -1;
(secondHomography.ReturnTranspose() * infX * firstHomography).Display("Fun");
Matrix3f fund = global::fundamentalMatrix;
 fund = fund * (1/fund.m[2][1]);
fund.Display("DAm");

}

void rectify::singularValueDecomposition(Matrix3f ipMat, Matrix3f& orthoMat, Matrix3f& orthoMatInverse)
{
 int _size = 3;
 long double symmetricMatrix[3][3];
 long double sum = 0.0;

 long double inputMat[3][3];
 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	 inputMat[i][j] = ipMat.m[i][j];
 }



 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	{
		sum = 0.0;
		for(int k = 0; k < _size; k++)
		 sum+= inputMat[k][i] * inputMat[k][j];
		symmetricMatrix[i][j] = sum;			//store AtA
	}
 }
	


 //if determinant is 0, look no further, else 
 int matSize = 0;
 int counter;
 bool powerRepeat = true;
 long double squareSum = 0.0;
 int totalCounter = 0;

 long double matV[3][3] = {0};
 long double swapper[3] = {0};
 long double matU[3][3] = {0};
 long double diagonal[3] = {0};
 while(matSize != 3)
 {
 //initial approximation to eigenVector
	matV[matSize][0] = 1.0;
	matU[matSize][0] = 1.0;

 for(int i = 1; i < 3; i++)
 {
	matV[matSize][i] = 0.0;
	matU[matSize][i] = 0.0;
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
		swapper[i] = matV[matSize][i];

	 //do matrix multiplication
	 for(int i = 0; i < _size; i++)
		matV[matSize][i] = swapper[0] * symmetricMatrix[i][0] + swapper[1] * symmetricMatrix[i][1] + swapper[2] * symmetricMatrix[i][2];

	 //find maximum value in eigenVec and make it 1
		 squareSum = matV[matSize][0];
	 for(int i = 1; i < _size; i++)
	 {
		if(fabs(matV[matSize][i]) > fabs(squareSum)) squareSum = matV[matSize][i];
	 }

	 for(int i = 0; i < _size; i++)
		matV[matSize][i] /= squareSum;

	 //comparision for repitition of iteration
	 counter = 0;
	 for(int i = 0; i < _size; i++)
	 {
		if(fabs(swapper[i] - matV[matSize][i]) < 0.000001) counter++;
	 }	
	
	totalCounter++;
	 if(counter == 3 || totalCounter > 2000) powerRepeat = false;
	 if(!powerRepeat)
		{

		 squareSum = matV[matSize][0] * matV[matSize][0] + matV[matSize][1] * matV[matSize][1] + matV[matSize][2] * matV[matSize][2];
		 squareSum = sqrt(squareSum); 
		 matV[matSize][0] /= squareSum;
		 matV[matSize][1] /= squareSum;
		 matV[matSize][2] /= squareSum; //v[i] = x[i] / |x[i]|
		
		sum = 0.0;
		 for(int i = 0; i < _size; i++)		
		 {
			squareSum = inputMat[i][0] * matV[matSize][0] + inputMat[i][1] * matV[matSize][1] + inputMat[i][2] * matV[matSize][2];
			sum += squareSum * squareSum;
			matU[matSize][i] = squareSum;	
		 }		
		 sum = sqrt(sum);
		diagonal[matSize] = sum;

		for(int i = 0; i < _size; i++)	 matU[matSize][i]  = matV[matSize][i];
		// matU[matSize][i] /= sum;

		if(totalCounter > 2000){std::cout<<std::endl<<" not converging "<<std::endl;}

		}//if(powerRepeat)

	}//while(powerRepeat)

 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	 inputMat[i][j] -= diagonal[matSize] * matV[matSize][i] * matV[matSize][j];
 }

 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	{
		sum = 0.0;
		for(int k = 0; k < _size; k++)
		 sum+= inputMat[k][i] * inputMat[k][j];
		symmetricMatrix[i][j] = sum;			//store AtA
	}
 }	
 matSize++;
 }//while(matSize)	//end of main loop

 for(int i = 0; i < _size; i++)
	diagonal[i] = sqrt(diagonal[i]);

 //I = V'DV = V'ddV = V'd'dV = (dV)'dV = L'L
 //return L = dV and, L inverse = Vt * dinverse

 for(int i = 0; i < _size; i++)
 {
	for(int j = 0; j < _size; j++)
	 orthoMat.m[i][j] = diagonal[i] * matV[i][j];
 }

 //now to determine inverse

 squareSum = matV[0][0] * (matV[1][1] * matV[2][2] - matV[1][2] * matV[2][1])
		- matV[0][1] * (matV[1][0] * matV[2][2] - matV[1][2] * matV[2][0])
		+ matV[0][2] * (matV[1][0] * matV[2][1] - matV[1][1] * matV[2][0]);

  orthoMatInverse.m[0][0] = (matV[1][1] * matV[2][2] - matV[1][2] * matV[2][1]) / (squareSum * diagonal[0]);
  orthoMatInverse.m[1][0] = (matV[2][0] * matV[1][2] - matV[2][2] * matV[1][0]) / (squareSum * diagonal[0]);
  orthoMatInverse.m[2][0] = (matV[1][0] * matV[2][1] - matV[1][1] * matV[2][0]) / (squareSum * diagonal[0]);

  orthoMatInverse.m[0][1] = (matV[2][1] * matV[0][2] - matV[2][2] * matV[0][1]) / (squareSum * diagonal[1]);
  orthoMatInverse.m[1][1] = (matV[0][0] * matV[2][2] - matV[0][2] * matV[2][0]) / (squareSum * diagonal[1]);
  orthoMatInverse.m[2][1] = (matV[2][0] * matV[0][1] - matV[2][1] * matV[0][0]) / (squareSum * diagonal[1]);

  orthoMatInverse.m[0][2] = (matV[0][1] * matV[1][2] - matV[1][1] * matV[0][2]) / (squareSum * diagonal[2]);
  orthoMatInverse.m[1][2] = (matV[1][0] * matV[0][2] - matV[0][0] * matV[1][2]) / (squareSum * diagonal[2]);
  orthoMatInverse.m[2][2] = (matV[0][0] * matV[1][1] - matV[1][0] * matV[0][1]) / (squareSum * diagonal[2]);
}

void rectify::powerMaxEigenVec(Matrix3f inputMat, vector3d& outputVec)
{
 Matrix3f symmetricFund;
 inputMat = inputMat * 1e-20;
 symmetricFund = inputMat.ReturnSymmetric();	//returned AtA
 vector3d dummyMaxEigenVec;
 vector3d output = vector3d(1.0, 0.0, 0.0);
 //symmetricFund = symmetricFund * 1e-15;
 int _size = 3;
 bool powerRepeat = true;
 float diag = 0.0;
 int totalCounter = 0;
 bool thresReached = false;
 vector3d diff;
 int counter;

 //dummy eigenVecs for value comparision during iteration

  while(powerRepeat)
	{
	 //save maxEigenVec to dummy
		dummyMaxEigenVec = output;

	 //do matrix multiplication
		output = symmetricFund * dummyMaxEigenVec;

	 //find maximum value in eigenVec and make it 1
		diag = output.x;
		if(fabs(output.y) > fabs(diag)) diag = output.y;
		if(fabs(output.z) > fabs(diag)) diag = output.z;
		output /= diag;

	 //comparision for repitition of iteration
	 diff = dummyMaxEigenVec - output;
		if(fabs(diff.x) < 0.00005 && fabs(diff.y) < 0.00005 && fabs(diff.z) < 0.00005) thresReached = true;
	
	totalCounter++;
	 if(thresReached == true || totalCounter > 20) powerRepeat = false;

	 if(!powerRepeat)
		{
		 output.Display("op");
		 output.Normalize();
		 outputVec = output;
		if(totalCounter > 200){std::cout<<std::endl<<" power not converging "<<std::endl;}
		}
	 }
}

void rectify::initializeShearTransform()
{
 float width = (float)global::SCREEN_WIDTH;
 float height = (float)global::SCREEN_HEIGHT;
 
 width = (width - 1)/2; 
 height = (height - 1)/2;

 vector3d vecA = vector3d(width, 0, 1);
 vector3d vecB = vector3d(2 * width, height, 1);
 vector3d vecC = vector3d(width, 2 * height, 1);
 vector3d vecD = vector3d(0, height, 1);
 
 vector3d yax = vecB - vecD;
 vector3d way = vecC - vecA;

 float param_a = (height * height * yax.y * yax.y + width * width * way.y * way.y)/(height * width * (yax.y * way.x - way.y * yax.x));
 float param_b = (height * height * yax.x * yax.y + width * width * way.x * way.y)/(height * width * (yax.x * way.y - way.x * yax.y));
 if(param_a < 0){ param_a /= -1; param_b /= -1;}

 shearTrans.m[0][0] = param_a;	shearTrans.m[0][1] = param_b;	 	shearTrans.m[0][2] = 0;
 shearTrans.m[1][0] = 0;	shearTrans.m[1][1] = 1;	 		shearTrans.m[1][2] = 0;
 shearTrans.m[2][0] = 0;	shearTrans.m[2][1] = 0;			shearTrans.m[2][2] = 1;

 shearTrans.Display("Shear");
}


rectify::~rectify()
{
 std::cout<<std::endl<<" rectify destructor called "<<std::endl;

}


