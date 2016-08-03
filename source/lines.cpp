#include "../header/lines.h"	

lines::lines(std::vector<vector3d>*ld, std::vector<unsigned int>*ID)
{
 lineData = *ld;
 indexData = *ID;

	glGenBuffers(1,&VBO);
	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, lineData.size() * sizeof(vector3d), &lineData[0], GL_STATIC_DRAW);
	
	glGenBuffers(1,&IND);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER,IND);
	glBufferData(GL_ELEMENT_ARRAY_BUFFER, indexData.size() * sizeof(unsigned int), &indexData[0], GL_STATIC_DRAW);
	
	std::cout<<"  VBO  "<<VBO<<"  IND  "<<IND<<std::endl;
	glBindBuffer(GL_ARRAY_BUFFER,0);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER,0);
}

lines::~lines()
{
	glDeleteBuffers(1,&VBO);
	glDeleteBuffers(1,&IND);
}

void lines::linesDraw(unsigned int programId, bool isPoints)
{
	glBindBuffer(GL_ARRAY_BUFFER,VBO);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER,IND);

	int vertex = glGetAttribLocation(programId,"lineVertex");

	glEnableVertexAttribArray(vertex);
	glVertexAttribPointer(vertex, 3, GL_FLOAT, GL_FALSE, sizeof(vector3d), 0);

	if(!isPoints) glDrawElements(GL_LINES,indexData.size(),GL_UNSIGNED_INT,0);
	if(isPoints) glDrawElements(GL_POINTS,indexData.size(),GL_UNSIGNED_INT,0);

	glDisableVertexAttribArray(vertex);
	glBindBuffer(GL_ARRAY_BUFFER,0);
	glBindBuffer(GL_ELEMENT_ARRAY_BUFFER,0);

}
