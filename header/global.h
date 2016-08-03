#ifndef GLOBAL_H
#define GLOBAL_H
#include <iostream>
#include <map>
#include <vector>
#include <bitset>
#include <assert.h>
#include "vector3d.h"
#include "shader.h"
#include "info.h"
#include "Matrix3f.h"

#include "Lvector3d.h"
#include "LMatrix3f.h"

#include "../glm/glm.hpp"

class global
{
 private:
  unsigned int createTexture(int w,int h,bool isDepth=false);
  void initializeShader();
  void initializeTexture();
  void initializeFBO();
  void createFrameBuffer(unsigned int* FBO, unsigned int textureID);
  void createFrameBuffer(unsigned int* FBO, unsigned int* textureID);
  std::bitset<SHADER_COUNT_TOTAL>isShaderSet;


 protected:
  const int static SCREEN_WIDTH = 800;
  const int static SCREEN_HEIGHT = 600;
  static std::map<int, int>locationMap;
  static std::map<int, int>locationMap_2;
  unsigned int mFBO[FBO_COUNT_TOTAL];
  shader *mShader[SHADER_COUNT_TOTAL];
  unsigned int mTexture[TEX_COUNT_TOTAL];
  static std::vector<int>inliersRecord;

 static Matrix3f fundamentalMatrix;
 static	vector3d epipoleA;
 static	vector3d epipoleB;

 static LMatrix3f LfundamentalMatrix;
 static	Lvector3d LepipoleA;
 static	Lvector3d LepipoleB;


 public:
  void dataPoints();
  void initialize();  
  unsigned int* outputTex1;
  unsigned int* outputTex2;
  static std::vector<vector3d>firstImagePoints;
  static std::vector<vector3d>secondImagePoints;
  static glm::mat4 firstHomographyMatrix;
  static glm::mat4 secondHomographyMatrix;

  friend class imageRead;

  global(){ }
  ~global();

};


#endif
