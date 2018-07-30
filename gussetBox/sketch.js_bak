
canvasLength = 400;
canvasHeight = 400;

var GridVertex = {
	x:[],
	y:[]
};

var Grid={	//Properties of GRID
	gridSize:16,
	unitX:0,	//unitX refers to pixels per unit
	unitY:0,	

};

function setup() {
	Grid.gridSize = 16;	//Set grid size
	createCanvas(canvasLength,canvasHeight);
	background(220,220,220);

	Grid.unitX = canvasLength/16.0;	//This is the total number of pixels for one division
	console.log("UnitX : " + Grid.unitX);

	Grid.unitY = canvasHeight/16.0;
	console.log("UnitY : " + Grid.unitY); 
	drawGrid(Grid.gridSize);
}

function draw() {

}

function drawGrid(gridSize){
	strokeWeight(1);
	stroke(0);
	var temp = [];
	var temp1=[];
	for(var x = 0 ; x < canvasHeight ; x += canvasHeight/gridSize){
		line(x,0,x,canvasHeight);
		temp.push(x);
	}

	for(var y = 0 ; y < canvasLength ; y+= canvasLength/gridSize){
		line(0,y,canvasLength,y);
		temp1.push(y);
	}
	/*THIS IS TO INITLIZE AN ARRAY OF VERTEX THAT BELONGS TO THE GRID
	* We will compare to this value when clicked to see if it falls within the 5% range
	*/
	for(var i = 0 ; i < temp.length; i++){
		for(var j = 0 ; j < temp1.length;j++){
			GridVertex.x.push(i*Grid.unitX);
			GridVertex.y.push(j*Grid.unitY);
		}
	}
	//To access first vertex, 
	//console.log("GridVertex.x[0] +","+GridVertex.y[0])
	//
	console.log(GridVertex.x);
	console.log(GridVertex.y);

	// for(var p = 0;p<GridVertex.x.length ; p++){
	// 	console.log((GridVertex.x[p])/400+","+GridVertex.y[p]/400);
	// }
}

function reset(){
	background(220,220,220);
	drawGrid();
}

function mouseClicked(){


}