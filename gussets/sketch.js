
var keyInput = "b";

class Paper{
	//THIS PROGRAM ASSUMES THAT A SQUARE PAPER IS USED
	//IF YOU WANT NON SQUARE GRID THEN REIMPLEMENT THE DRAW GRID
	constructor(){
		this.paperLength = 400;
	}
}

var paper = new Paper();

var Grid={
	gridDivisionNumber:0,//change this
	gridVertexX:[],
	gridVertexY:[],
	divisionNoX:0, //measured in pixels\
	divisionNoY:0
};

class Vertex{
	//Created a vertex "class"
	constructor(){
		this.x=0;
		this.y=0;
	}

	setX(x){
		this.x = x;
	}
	setY(y){
		this.y=y;
	}

	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}	
}


function setup(){
	
	Grid.gridDivisionNumber = 16;	//Draw 16 grids
	createCanvas(paper.paperLength,paper.paperLength);	// Creating the paper
	background(220);

	drawGrid(Grid.gridDivisionNumber);

}

function drawGrid(gridDivisionNumber){

	console.log("DRAWING GRID");
	//DRAW GRID FIRST
	for(var x = 0 ; x <= paper.paperLength ; x += paper.paperLength/gridDivisionNumber)
		line(x,0,x,paper.paperLength);
	for(var y = 0 ; y <= paper.paperLength ; y+= paper.paperLength/gridDivisionNumber)
		line(0,y,paper.paperLength,y);
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
		x=map(Grid.divisionNoX,0,gridDivisionNumber,0,paper.paperLength); 
		//console.log("curent X : " + x);

		for(Grid.divisionNoY=0; Grid.divisionNoY <= gridDivisionNumber ; Grid.divisionNoY++){
			y=map(Grid.divisionNoY,0,gridDivisionNumber,0,paper.paperLength);
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

function mouseClicked(){
	if(mouseButton==LEFT){ //if normal left mouseClick
		// console.log("Left Clicked");
		var nearestVertex = new Vertex();
		nearestVertex = searchForClosestVertex();
		
		if (!(nearestVertex.getX() < 0 || nearestVertex.y <0)){
			//SELECT THE VERTEX nearestVertex and draw a point on it
			//Store this vertex into selectedVertexArray
			strokeWeight(1);
			fill(0,0,255);
			ellipse(nearestVertex.getX(),nearestVertex.getY(),8);
		}
	}
}

function searchForClosestVertex(){
	//Choose the closest vertex and draw an ellipse on it (circle)
	var closestVertexToClick = new Vertex();	// The selected vertex
	var clickPositionX = pmouseX;
	var clickPositionY = pmouseY;
	var plusMinus = 2/100;		//The acceptable range from the vertexto get selected

	for (var x = 0 ; x < Grid.gridVertexX.length;x++){
		if(clickPositionX >= (Grid.gridVertexX[x] - Grid.gridVertexX[x]*plusMinus) && clickPositionX <= (Grid.gridVertexX[x] + Grid.gridVertexX[x]*plusMinus)){		
			for (var y = 0 ; y < Grid.gridVertexY.length;y++){
				if (clickPositionY >= (Grid.gridVertexY[y] - Grid.gridVertexY[y] * plusMinus) &&clickPositionY <= (Grid.gridVertexY[y] + Grid.gridVertexY[y] * plusMinus) ) {
					
					var closestVertexToClick = new Vertex();
					closestVertexToClick.setX(Grid.gridVertexX[x]);
					closestVertexToClick.setY(Grid.gridVertexY[y]);
					// console.log("Clicked within range for X at : "+ pmouseX + " where grid vertex falls on " + Grid.gridVertexX[x]);
					// console.log("Clicked within range for y : " + pmouseY + " where grid vertex falls on " + Grid.gridVertexY[y]);
					console.log("closestVertexToClick : "+ closestVertexToClick.getX()+","+closestVertexToClick.getY());
					return closestVertexToClick;
				}
			}
		}
	}
	//THIS WILL SHOW THAT THE VERTEX IS NOT VALID 
	closestVertexToClick.setX(-1);
	closestVertexToClick.setY(-1);

	return closestVertexToClick;
}

function draw(){
	
	if(keyIsPressed){
		if(key == "b" || key =="B"){
			console.log("B pressed -- Add lines");


		}
	}
	

}

function reset(){

	console.log("Reset!");
}