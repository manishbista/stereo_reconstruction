#include "../header/inliers.h"

inliers::inliers()
{
std::cout<<" inliers constructor "<<std::endl;
std::cout<<" inliers size = "<<global::inliersRecord.size()<<" and location Size "<<global::locationMap.size()<<std::endl;
}

inliers::~inliers()
{
std::cout<<" inliers destructor "<<std::endl;
std::cout<<" inliers size = "<<global::inliersRecord.size()<<std::endl;
}

void inliers::checkThings()
{
 ransac();
std::cout<<std::endl<<" ransac finished start fundamental matrix approximation  "<<std::endl;
 estimateFundamentalMatrix();
}


void inliers::solutionSVD(float **inputMat, int numRow, int numCol, float *outputMat)
{
 //output mat is a square matrix having numCol elements
 //input Matrix is [A](R * C), it's transpose is [A](C * R)
 //then symmetric matrix is [AtA](C * C)

 float symmetricMat[numCol][numCol * 2];
 float matSum = 0.0;
 for(int i = 0; i < numCol; i++)
 {
	std::cout<<std::endl;
	for(int j = 0; j < numCol; j++)
	{
		matSum = 0.0;
		for(int k = 0; k < numRow; k++)
			matSum += inputMat[k][i] * inputMat[k][j];
		symmetricMat[i][j] = matSum;
	}
 }

 //symmetric matrix thus formed needs to be inverted
 //taking into account the possibility of singular matrix,
 //perform gauss inversion

    //augment identity matrix
    for(int i = 0; i < numCol; i++)
    {
        for(int j = numCol; j < numCol * 2; j++)
        {
            if(j - i == numCol) symmetricMat[i][j] = 1;
            else symmetricMat[i][j] = 0;
        }
    }

    //elementary row operation
    for(int j = 0; j < numCol; j ++)
    {
        for(int i = 0; i < numCol; i++)
        {
            if(i != j)
            {
                matSum = symmetricMat[i][j] / symmetricMat[j][j];
                for(int k = 0; k < 2 * numCol; k++)
                     symmetricMat[i][k] = symmetricMat[i][k] - matSum * symmetricMat[j][k];
            }

        }
    }

    //final identity change

    for(int i = 0; i < numCol; i++)
    {
        matSum = symmetricMat[i][i];
        for(int j = 0; j < numCol * 2; j ++)
            symmetricMat[i][j] = symmetricMat[i][j] / matSum;

    }
/*
	std::cout<<std::endl<<" inversion "<<std::endl;
    for(int i = 0; i < numCol; i++)
    {
	std::cout<<std::endl;
        for(int j = numCol; j < numCol * 2; j++)
	{
	 std::cout<<"  "<<symmetricMat[i][j]<<"  ";
	}
    }
*/

 //gauss inversion finished, pivoting is not used
 //start power method
 float dummyMaxEigenVec[numCol];
 outputMat[0] = 1.0;
 for(int i = 1; i < numCol; i++)
	outputMat[i] = 0.0;

 bool powerRepeat = true;
 int totalCounter = 0;
 int counter = 0;
 float sumMat;
 while(powerRepeat)
 {
 //save maxEigenVec to dummy
	for(int i = 0; i < numCol; i++)
	 dummyMaxEigenVec[i] = outputMat[i];

 //do matrix symmetricMat and vector dummyMaxVec multiplication
 //and store in ouputMat
 	for(int i = 0; i < numCol; i++)
 	{
	 sumMat = 0.0;
	 for(int j = 0; j < numCol; j++)
	 	sumMat += symmetricMat[i][numCol + j] * dummyMaxEigenVec[j];
	// std::cout<<" i "<<sumMat<<std::endl;
	 outputMat[i] = sumMat;
 	}

 //find maximum element of outputMat and divide all elements by it
 	sumMat = fabs(outputMat[0]);
 	for(int i = 1; i < numCol; i++)
	 {if(fabs(outputMat[i]) > sumMat) sumMat = fabs(outputMat[i]);}

 	for(int i = 0; i < numCol; i++)
	  outputMat[i] /= sumMat;

 //check whether output is converging
 	counter = 0;
 	for(int i = 0; i < numCol; i++)
  	{
		if(fabs(dummyMaxEigenVec[i] - outputMat[i]) < 0.005) counter++;
  	}	
  	totalCounter++;
  	if(counter == numCol || totalCounter > 100) powerRepeat = false;

 //if iterations stopped, make |outputMat| = 1.0;
	if(!powerRepeat)
		{
		 sumMat = 0.0;
		 for(int i = 0; i < numCol; i++)
		   sumMat += outputMat[i] * outputMat[i];	
		 sumMat = sqrt(sumMat); 
		//std::cout<<" sum "<<sumMat<<std::endl;
		 for(int i = 0; i < numCol; i++)
		 {
		   outputMat[i] /= sumMat;
		//	std::cout<<" op "<< outputMat[i]<<std::endl;
		 }
		//if(totalCounter > 100) assert(0);
		}
 }
}







void inliers::normalization(std::vector<int> maybeInliersRecord, Matrix3f& matTranScale, Matrix3f& matTranScaleDash)
{
 float sumX = 0.0, sumY = 0.0, sumXdash = 0.0, sumYdash = 0.0;
 float sumsq = 0.0, sumsqdash = 0.0;

 //find offset till mean zero translation or centroid = 0;
 int num_pts = maybeInliersRecord.size();
 int dataID;
 for(int i = 0; i < num_pts; i++)
 {
	dataID = maybeInliersRecord[i];
	sumX += global::firstImagePoints[dataID].x;		sumY += global::firstImagePoints[dataID].y;
	sumXdash += global::secondImagePoints[dataID].x;	sumYdash += global::secondImagePoints[dataID].y;
 }
 sumX /= num_pts;	sumY /= num_pts;
 sumXdash /= num_pts;	sumYdash /= num_pts;

 vector3d meanFirst = vector3d(sumX, sumY, 1.0);
 vector3d meanSecond = vector3d(sumXdash, sumYdash, 1.0);
 //translate points
 for(int i = 0; i < num_pts; i++)
 {
	dataID = maybeInliersRecord[i];
	sumsq += meanFirst.distancePointsSquared(global::firstImagePoints[dataID]);
	sumsqdash += meanSecond.distancePointsSquared(global::secondImagePoints[dataID]);

 }
 sumsq /= num_pts;		sumsqdash /= num_pts;
 sumsq = sqrt(sumsq);		sumsqdash = sqrt(sumsqdash);
 std::cout<<" sigma "<<sumsq<<" and "<<sumsqdash<<std::endl;
 sumsq = 1.414214/sumsq;	sumsqdash = 1.414214/sumsqdash;

 matTranScale.m[0][0] = sumsq;		matTranScale.m[0][1] = 0.0;	matTranScale.m[0][2] = -sumsq * sumX;
 matTranScale.m[1][0] = 0.0;		matTranScale.m[1][1] = sumsq;	matTranScale.m[1][2] = -sumsq * sumY;
 matTranScale.m[2][0] = 0.0;		matTranScale.m[2][1] = 0.0;	matTranScale.m[2][2] = 1.0;

 matTranScaleDash.m[0][0] = sumsqdash;	matTranScaleDash.m[0][1] = 0.0;		matTranScaleDash.m[0][2] = -sumsqdash * sumXdash;
 matTranScaleDash.m[1][0] = 0.0;	matTranScaleDash.m[1][1] = sumsqdash;	matTranScaleDash.m[1][2] = -sumsqdash * sumYdash;
 matTranScaleDash.m[2][0] = 0.0;	matTranScaleDash.m[2][1] = 0.0;		matTranScaleDash.m[2][2] = 1.0;

}


void inliers::ransac()
{
int totalPointSize = firstImagePoints.size();			//'S' equals total set containing all points
 //largest block to contain coefficients, accessed partially
 float **coeffMat;
 int num_pts = 2 * totalPointSize;
 coeffMat = new float *[num_pts];
 for(int i = 0; i < num_pts; i++)
	coeffMat[i] = new float[9];
 float outputMat[9];
 Matrix3f homographyMat;

 //select random points, but here three diverse points are selected
 num_pts = 4;
 Matrix3f mat, matD;
 sampleInliers.clear();
 sampleInliers.reserve(num_pts);
 int interval = (totalPointSize / num_pts) - 1;
 for(int j = 0; j < 4; j++)
	sampleInliers.push_back(interval * j);
 int dataID;
 vector3d first, second;

bool ransacRepeat = true;
float threshold = 0.0;				//'t' equals 3.84 * sigma_squared, maximum deviation to be an inlier

float errorDeviation[totalPointSize];		//deviation of point from mean, which is estimated to be zero
int oldSampleSize;
float oldOmega = 0.5;				//increase of omega, which is prob. of inliers, suggests convergence
float omega;
int capitalN;
int ransacItr = 0;

while(ransacRepeat)
{
 	normalization(sampleInliers, mat, matD);

 	for(int i = 0; i < num_pts; i++)
 	{	
	dataID = sampleInliers[i];
	first = global::firstImagePoints[dataID];
	second = global::secondImagePoints[dataID];
	first = mat * first;
	second = matD * second;
	coeffMat[2 * i][0] = 0;
	coeffMat[2 * i][1] = 0;
	coeffMat[2 * i][2] = 0;
	coeffMat[2 * i][3] = -second.z * first.x;
	coeffMat[2 * i][4] = -second.z * first.y;
	coeffMat[2 * i][5] = -second.z * first.z;
	coeffMat[2 * i][6] = second.y * first.x;
	coeffMat[2 * i][7] = second.y * first.y;
	coeffMat[2 * i][8] = second.y * first.z;

	coeffMat[2 * i + 1][0] = second.z * first.x;
	coeffMat[2 * i + 1][1] = second.z * first.y;
	coeffMat[2 * i + 1][2] = second.z * first.z;
	coeffMat[2 * i + 1][3] = 0;
	coeffMat[2 * i + 1][4] = 0;
	coeffMat[2 * i + 1][5] = 0;
	coeffMat[2 * i + 1][6] = -second.x * first.x;
	coeffMat[2 * i + 1][7] = -second.x * first.y;
	coeffMat[2 * i + 1][8] = -second.x * first.z;
 	}

 solutionSVD(coeffMat, num_pts * 2, 9, outputMat);
 homographyMat = Matrix3f(outputMat);
 matD.Inverse();
 homographyMat = matD * homographyMat * mat;
 //homographyMat.Display();
 ransacItr++;							//counter increased
//check accuracy of homographyMat with other points
 for(int i = 0; i < totalPointSize; i++)
 {
	first = homographyMat * firstImagePoints[i];
	first.change(first.x/first.z, first.y/first.z, 1.0);
	second = secondImagePoints[i];
	errorDeviation[i] = second.distancePointsSquared(first);
	std::cout<<" index  "<<i<<" and S.D.  "<<sqrt(errorDeviation[i])<<"   ";
	//first.Display("f");	second.Display("s");
	threshold += errorDeviation[i];
	if( i % 2 == 0) std::cout<<std::endl;
 }
	threshold /= totalPointSize;
	threshold = sqrt(threshold) * 0.8;
std::cout<<" thres "<<threshold<<std::endl;

 oldSampleSize = sampleInliers.size();				//'s' is the sample Size, or old num_pts
 sampleInliers.clear();
 sampleInliers.reserve(totalPointSize);

 std::cout<<std::endl;
 for(int i = 0; i < totalPointSize; i++)
 {
	 if(sqrt(errorDeviation[i]) <= threshold)
	 {
		std::cout<<" Pindex "<<i<<" deviation "<<sqrt(errorDeviation[i])<<"   ";
		if( i % 2 == 0) std::cout<<std::endl;
		sampleInliers.push_back(i);			//'Si' is the consensus set
	 }
 }
 oldSampleSize = sampleInliers.size() - oldSampleSize;
 std::cout<<std::endl<<" sampleInliersPushed  "<<oldSampleSize<<"  "<<std::endl;

 num_pts = sampleInliers.size();
 omega = (float)num_pts / totalPointSize;			//probability of an inlier
 omega = log10(1 - pow(omega, oldSampleSize));
 capitalN = (-2)/omega;
	std::cout<<std::endl<<" omega  "<<omega<<" capitalN "<<capitalN<<std::endl;
 if(capitalN <= ransacItr || ransacItr > 50) ransacRepeat = false;

//need to check whether omega was converging
}

 std::cout<<std::endl;
//final re-estimation of the model
 normalization(sampleInliers, mat, matD);
 for(int i = 0; i < num_pts; i++)
 {	
	dataID = sampleInliers[i];
	first = global::firstImagePoints[dataID];
	second = global::secondImagePoints[dataID];
	first = mat * first;
	second = matD * second;
	coeffMat[2 * i][0] = 0;
	coeffMat[2 * i][1] = 0;
	coeffMat[2 * i][2] = 0;
	coeffMat[2 * i][3] = -second.z * first.x;
	coeffMat[2 * i][4] = -second.z * first.y;
	coeffMat[2 * i][5] = -second.z * first.z;
	coeffMat[2 * i][6] = second.y * first.x;
	coeffMat[2 * i][7] = second.y * first.y;
	coeffMat[2 * i][8] = second.y * first.z;

	coeffMat[2 * i + 1][0] = second.z * first.x;
	coeffMat[2 * i + 1][1] = second.z * first.y;
	coeffMat[2 * i + 1][2] = second.z * first.z;
	coeffMat[2 * i + 1][3] = 0;
	coeffMat[2 * i + 1][4] = 0;
	coeffMat[2 * i + 1][5] = 0;
	coeffMat[2 * i + 1][6] = -second.x * first.x;
	coeffMat[2 * i + 1][7] = -second.x * first.y;
	coeffMat[2 * i + 1][8] = -second.x * first.z;
 }

 solutionSVD(coeffMat, num_pts * 2, 9, outputMat);
 std::cout<<" answer "<<std::endl;
	for(int j = 0; j < 9; j++)
 std::cout<<" "<<outputMat[j]<<"  ";

 homographyMat = Matrix3f(outputMat);
 homographyMat.Display("homoSmall");
 matD.Inverse();
 homographyMat = matD * homographyMat * mat;
 homographyMat.Display("homography");

global::inliersRecord.clear();
global::inliersRecord.reserve(sampleInliers.size());
for(int i = 0; i < sampleInliers.size(); i++)
	global::inliersRecord.push_back(sampleInliers[i]);

 //release memory
 delete[] coeffMat;
}
/*
void inliers::estimateFundamentalMatrix()
{
 int num_pts = global::inliersRecord.size();
 float **coeffMat;
 float outputMat[9];
 coeffMat = new float*[num_pts];	//maximum number of rows is num_pts and columns is 9
 for(int i = 0; i < num_pts; i++)
	coeffMat[i] = new float[9];

float **fundMatrix;
fundMatrix = new float*[3];
for(int i = 0; i < 3; i++)
 fundMatrix[i]  = new float[3];
 float outEpi[3];

//for normalization
 Matrix3f matTransScale, matTransScaleDash, normFundamentalMatrix;
 normalization(global::inliersRecord, matTransScale, matTransScaleDash);

 int dataID;
 vector3d first, second;
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
	coeffMat[i][2] = second.x;
	coeffMat[i][3] = second.y * first.x;
	coeffMat[i][4] = second.y * first.y;
	coeffMat[i][5] = second.y;
	coeffMat[i][6] = first.x;
	coeffMat[i][7] = first.y;
	coeffMat[i][8] = 1;
 }

 
 std::cout<<" displaying coefficients "<<std::endl;
 for(int i = 0; i < num_pts; i++)
 {
 	std::cout<<std::endl;
	for(int j = 0; j < 9; j++)
	 std::cout<<"  "<<coeffMat[i][j]<<"  ";

 }

 solutionSVD(coeffMat, num_pts, 9, outputMat);		//inverse followed by SVD to find fundamental Matrix

 std::cout<<std::endl<<"  coeff "<<std::endl;
 for(int i = 0; i < 9; i++)
 std::cout<<"  "<<outputMat[i]<<"  ";
 fundMat = Matrix3f(outputMat);
 setZeroFundamentalMatrix(fundMat, normFundamentalMatrix);
 fundMat = matTransScaleDash.ReturnTranspose() * normFundamentalMatrix * matTransScale;	//denorm

 for(int i = 0; i < 3; i++)
 {
	for(int j = 0; j < 3; j++)
		fundMatrix[i][j] = fundMat.m[i][j];
 } 

 solutionSVD(fundMatrix, 3, 3, outEpi);

 global::epipoleCheckA = vector3d(outEpi[0], outEpi[1], outEpi[2]);
 global::epipoleA = vector3d(outEpi[0]/outEpi[2], outEpi[1]/outEpi[2], 1);
 global::epipoleA.Display("epi");

 for(int i = 0; i < 3; i++)
 {
	for(int j = 0; j < 3; j++)
		fundMatrix[i][j] = fundMat.m[j][i];
 }

 solutionSVD(fundMatrix, 3, 3, outEpi);
 global::epipoleCheckB = vector3d(outEpi[0], outEpi[1], outEpi[2]);
 global::epipoleB = vector3d(outEpi[0]/outEpi[2], outEpi[1]/outEpi[2], 1);
 global::epipoleB.Display("epi2");
 global::fundamentalMatrix = fundMat;

 delete[] fundMatrix;
 delete[] coeffMat;
}

*/

