var canvasLength = 600;
var cols,rows;
var w = 200;
var numbervaluegrid = []; // For assigning numbers to the game
var grid = [];
var start;
var openSet = [];
var closedSet = [];
var goalGrid = [0,1,2,3,4,5,6,7,8,9];
var neighbors = [];


function index(i,j){
	if(i<0||j<0||i>cols-1||j>rows-1){
		return null;
	}
	return i+j*cols;
}

function shuffleArray(array) {
	//https://github.com/coolaj86/knuth-shuffle
	//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function setup(){

	frameRate(1)
	console.log("This is the 8 puzzle generator and solver\n");
	console.log("============================================");
	createCanvas(canvasLength,canvasLength);
	cols = floor(width/w);
	rows = floor(height/w);

	// Initialize the grid
	for (var i=0; i<rows;i++){
		for(var j=0;j<cols;j++){
			var t = new Tile(i,j);
			t.empty = false;
			grid.push(t);
		}
	}

	//This game has only one empty tiles so lets name any random tile empty
	// DO NOT ASSIGN A NUMBER TO EMPTY TILE
	var e = random(grid);
	e.empty = true;
	start = e;	//Let the empty tile be the start for the game since it is the only
							// place that can be moved into

	start.gscore = 0;
	start.fscore = 0;
	openSet.push(start);	// Store start into openSet

	console.log("You should see that one tile is \"empty\"");
	console.log(grid);
	for ( var i = 1 ; i < cols*rows ;i++){

		//Create the numbers from 1 to 8. 0 for empty tile is assigned specially
			numbervaluegrid.push(i);
	}

	// Assign a number to the
	numbervaluegrid = shuffleArray(numbervaluegrid);
	console.log(numbervaluegrid);//Used for assigning numbers to the tiles except empty tiles

	for ( var i=0 ; i < grid.length ; i++){
		if (grid[i].empty){
			grid[i].value = 0;	// Assign number as 0
			continue;
		}else{
			var value = numbervaluegrid.pop();
			console.log(value);
			grid[i].value = value;
		}
	}

}

function removeTileFromArray(arr,elt){
	for(var i = arr.length-1 ; i >= 0 ; i--){
		console.log("arr.length = " + arr.length);
		console.log("i = " + i);
		console.log("elt.value : " + elt.value);

		return arr.filter(function(elt){
			return elt.value != arr[i].value;
		});
	}

	for(var j = 0 ; j < arr.length ; j++){  // FOR DEBUGGING PURPOSE
		console.log(arr[j].values);
	}


}

function checkGoal(inputGrid){
	for (var i = 0 ; i < goalGrid.length ; i++){
		if ( goalGrid[i] != grid[i]){
			return false;
		}
	}
	return true;
}


function findNeighbors(tile){
		var listNeighbors = [];
		var x = tile.i;
		var y = tile.j;
		console.log("Current x and y is : " + x +","+y);
		if (x < cols - 1){
			listNeighbors.push(grid[index(x+1,y)]);
		}
		if(x > 0){
			listNeighbors.push(grid[index(x-1,y)]);
		}
		if(y< rows-1){
			listNeighbors.push(grid[index(x,y+1)]);
		}
		if(y>0){
			listNeighbors.push(grid[index(x,y-1)]);
		}
		console.log("Neighbors :");
		console.log(listNeighbors);
		return listNeighbors;
}

function heuristic_cost_estimate(current,neighbor,end){

	for(var a = 0 ; a < grid.length ; a++){
		console.log(grid[a].value);
	}

	var temp = 0;	// temporarily store value for swapping

	// TODO: CHANGE COLORS



	// neighbor.empty = true;
	// current.empty = false;
	temp = neighbor.value;
	neighbor.value = current.value;
	current.value = temp;

	//update thee grid
	// TODO: UPGRADE AND return SOMETHING FROM THSI FUNCTION 

}


function draw(){
	background(150,100,190);

	if(openSet.length > 0 ){
		// if openset is not empty
		var lowestIndex=0;
		for(var i = 0 ; i < openSet.length ; i++){
			if(openSet[i].f < openSet[lowestIndex].f){
				lowestIndex = i;
			}
		}
		var current = openSet[lowestIndex];
		if(checkGoal(grid)){		//// TODO:  PLEASE CREATE CHECK GOAL
			console.log("We have found a solution!!");
			noLoop();	// Stop looping draw
		}

		// console.log(openSet);
		// console.log(closedSet);
		closedSet.push(current);
		openSet = removeTileFromArray(openSet,current);
		// console.log(openSet);
		// console.log(closedSet);

		neighbors = findNeighbors(current);
		for(var i=0;i<neighbors.length;i++){
			var neighbor = neighbors[i];
			if (closedSet.includes(neighbor)){
					// We do not need to re-evaluate those that have been visited before
					continue;
			}
			//tentative g_score to be calculated
			var tentative_gscore = current.gscore + 1;

			//if neightbor not in openSet ....
			if (!openSet.includes(neighbor)){
				openSet.push(neighbor);
			}
			else if(tentative_gscore > neighbor.gscore){
				// This is not the better path
				continue;
			}

			//Current Best Path
			//// TODO: cameFrom[neighbor.....


			neighbor.gscore = tentative_gscore;

			//heuristic_cost_estimate will "move" and edit the grid and will compare to goal\
			//manhattan way
			neighbor.fscore = neighbor.gscore + heuristic_cost_estimate(current, neighbor,goalGrid);


		}

	}


	for(var i = 0 ; i < grid.length ; i++){
		console.log("Grid Length "  + grid.length);
		stroke(255);
		textLeading(w);
		textSize(50);

		grid[i].show(color(255,170,60));
		textAlign(CENTER);
		noStroke();
		fill(0);
		if(grid[i].empty == false){
			// Print all the values on the tiles except for the empty black tile
			text(str(grid[i].value),(grid[i].i*w + w/2), (grid[i].j*w + w/2));
		}

	}
}
