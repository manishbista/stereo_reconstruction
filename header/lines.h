#ifndef LINES_H
#define LINES_H

#include <iostream>
#include <GL/glew.h>
#include <vector>
#include <string>
#include "vector3d.h"

class lines
{
// private:
	std::vector<vector3d>lineData;
	std::vector<unsigned int>indexData;
	unsigned int VBO;
	unsigned int IND;

 public:
	lines(std::vector<vector3d>*ld, std::vector<unsigned int>*ID);
	void linesDraw(unsigned int programId, bool isPoints = false);
	~lines();
};

#endif
