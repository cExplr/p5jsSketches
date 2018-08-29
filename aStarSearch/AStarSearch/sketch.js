var cols = 60;
var rows = 60;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var path = [];

var start;
var end;
//var endx = cols-1;
//var endy = rows-1;
var endx=35;
var endy=42;
var w, h;

function Spot(i,j){
	this.i = i;
	this.j = j;
	this.f = 999;
	this.g = 999;
	this.h = 0;
	this.neighbors = [];	//Keep track of its neighbors
	this.wall = false;

	if(random(1) < 0.3){
		this.wall = true;
	}

	this.addNeighbors = function(grid){
			var i = this.i;
			var j = this.j;
			if(i < cols-1){
				this.neighbors.push(grid[i+1][j]);
			}
			if(i>0){
				this.neighbors.push(grid[i-1][j]);
			}
			if(j<rows-1){
				this.neighbors.push(grid[i][j+1]);
			}
			if(j>0){
				this.neighbors.push(grid[i][j-1]);
			}

	}

	this.show = function(color){
		fill(color);
		if(this.wall){
			fill(0);
		}
		rect(this.i*w, this.j*h, w-1,h-1)
	}
}

function removeFromArray(arr,elt){
		for(var i = arr.length-1 ; i >= 0;i--){
			if (arr[i] == elt){
				arr.splice(i,1);
			}
		}
}

function heuristic(a,b){

	d = abs(a.i-b.i) + abs(a.j-b.j);
	return d;
}


function setup() {

	createCanvas(600, 600);
	console.log("A*");

	w = width/cols;
	h = height/rows;

	for(var i = 0 ; i<cols;i++){
		grid[i] = new Array(rows);
	}

	for(var i = 0 ; i<rows;i++){
		for(var j = 0 ; j<cols;j++){
				grid[i][j] = new Spot(i,j);
		}
	}

	for(var i = 0 ; i<rows;i++){
		for(var j = 0 ; j<cols;j++){
				grid[i][j].addNeighbors(grid);
		}
	}

	start = grid[0][0];
	end = grid[endx][endy];
	start.g = 0;
	openSet.push(start)
	start.f = heuristic(start,end);
	start.wall = false;
	end.wall = false;

}



function draw() {
	background(0);


	if(openSet.length > 0){
		//Keep on iterating

		var lowestIndex=0;
		for(var i = 0 ; i < openSet.length ; i++){
			if(openSet[i].f < openSet[lowestIndex].f){
				lowestIndex = i;
			}
		}
		var current = openSet[lowestIndex];

		if(current === end){

			path = [];
			var temp = current;

			while(temp.previous){
				path.push(temp.previous);
				temp = temp.previous;
			}
			console.log("Path : ");
			for(var i = 0 ; i < path.length ; i++){
				console.log("(" + path[i].j + "," + path[i].i + ")");
			}
			console.log("Done!");

			noLoop();
			//return;


		}
		else{

		closedSet.push(current);
		//openSet.remove
		removeFromArray(openSet,current);

		var neighbors = current.neighbors;
		var tentative_gscore = 999;
		for (var i = 0 ; i < neighbors.length;i++){
				var neighbor = neighbors[i];
				if(closedSet.includes(neighbor)){
					continue; //ignore the neighbor which has already been evaluated
				}
				//get the tentaive_gscore
				tentaive_gscore = current.g + 1;
				if(!( openSet.includes(neighbor)) && neighbor.wall == false){
					openSet.push(neighbor);
				}else if(tentaive_gscore >= neighbor.g){
					continue;
				}
				neighbor.previous = current;
				neighbor.h = heuristic(neighbor,end);
				neighbor.f = neighbor.g + neighbor.h;
			}
		}
	}

		for(var i = 0 ; i<rows;i++){
			for(var j = 0 ; j<cols;j++){
					grid[i][j].show(color(255));

			}
		}

		for(var i = 0 ; i < closedSet.length ; i++){
			closedSet[i].show(color(255,0,0));
		}

		for(var i = 0 ; i < openSet.length ; i++){
			openSet[i].show(color(0,255,0));
		}
		for(var i = 0 ; i < path.length ;i++){
			path[i].show(color(0,0,255));
		}

		start.show(color(0,255,255));
		end.show(color(255,255,0));
}
