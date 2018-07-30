var Paper = {
	//THIS PROGRAM ASSUMES THAT A SQUARE PAPER IS USED
	//IF YOU WANT NON SQUARE GRID THEN REIMPLEMENT THE DRAW GRID

	paperLength:400.0
};

var Grid={
	gridDivisionNumber:0,//change this
	gridVertexX:[],
	gridVertexY:[],
	divisionNoX:0, //measured in pixels\
	divisionNoY:0
};

function setup(){
	Grid.gridDivisionNumber = 16;	//Draw 16 grids
	createCanvas(Paper.paperLength,Paper.paperLength);	// Creating the paper
	background(220);

	drawGrid(Grid.gridDivisionNumber);

}

function drawGrid(gridDivisionNumber){

	console.log("DRAWING GRID");
	//DRAW GRID FIRST
	for(var x = 0 ; x <= Paper.paperLength ; x += Paper.paperLength/gridDivisionNumber)
		line(x,0,x,Paper.paperLength);
	for(var y = 0 ; y <= Paper.paperLength ; y+= Paper.paperLength/gridDivisionNumber)
		line(0,y,Paper.paperLength,y);
	console.log("Grid Drawn");
	/*
	//THIS TEST THE MAPPING FUNCTION. CHANGE THE FIRST TWO VARIABLE BELOW TO SEE TRHE DIFFEREMCE
	//IN THE BROWSER CONSOLE
	Grid.divisionNoX = 3 ;
	Grid.divisionNoY = 2 ;

	x=map(Grid.divisionNoX,0,gridDivisionNumber,0,Paper.paperLength); 
	y=map(Grid.divisionNoY,0,gridDivisionNumber,0,Paper.paperHeight);
	console.log("x : " + x);
	console.log("y : " + y);
	*/

	/* Nested for loop below stores the vertex coordinates into their Grid.gridVertexX[] and
		Grid.gridVertexY[] respectively
	*/
	console.log("Initializing all grid vertex coordinates");
	for(Grid.divisionNoX = 0 ; Grid.divisionNoX <= gridDivisionNumber ; Grid.divisionNoX++){
		x=map(Grid.divisionNoX,0,gridDivisionNumber,0,Paper.paperLength); 
		//console.log("curent X : " + x);

		for(Grid.divisionNoY=0; Grid.divisionNoY <= gridDivisionNumber ; Grid.divisionNoY++){
			y=map(Grid.divisionNoY,0,gridDivisionNumber,0,Paper.paperLength);
			Grid.gridVertexX.push(x);
			Grid.gridVertexY.push(y);
		}
	}

	// THIS TEST TO GET ALL VALUES OF COORDINATES IN THE GRID
	// for(var i = 0 ; i < Grid.gridVertexX.length ; i++){
	// 	console.log("( "+ Grid.gridVertexX[i] + "," + Grid.gridVertexY[i] +" )");
	// }
	console.log("Done initializing all grid vertex");
}