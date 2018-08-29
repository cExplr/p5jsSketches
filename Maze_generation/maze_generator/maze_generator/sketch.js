var cols, rows;
var w =70;
var grid = [];
var current; // current cell that is being visited
var stack = [];

var start;
var end;

function setup() {
	//frameRate(5);
	createCanvas(700, 700);
	cols = floor(width/w);
	rows = floor(height/w);

	for(var j =0;j<rows;j++){
		for(var i = 0 ; i < rows; i++){
			var cell = new Cell(i,j);
			grid.push(cell);
		}
	}
	start = grid[0];
	end = grid[index(6,8)];
	//console.log(grid);
	current = grid[0];
	// current.visited = true;
}

var liwen, orhlulu;
function preload(){
	//preload the image before starting
	orhlulu = loadImage("orhlulu.jpeg");
	liwen = loadImage("liwen.jpg");
}

function draw() {
	background(51);
	for(var i = 0 ; i < grid.length;i++){
		grid[i].show(color(255,255,255));
	}
	current.visited = true;
	current.highlight();
	var nextCell = current.checkNeighbors();
	if(nextCell){
		//step 1 of 2.1 in wikipedia maze generation algorithm
		nextCell.visited = true;

		//step 2 of 2.1 in wikipedia maze generation algorithm

		stack.push(current);

		//step 3 of 2. in wikipedia maze generation algorithm
		removeWalls(current, nextCell);

		//step 4 of 2.1 in wikipedia maze generation algorithm
		current = nextCell;
	}else if(stack.length >0){
		current = stack.pop();
	}

	image(orhlulu,grid[0].i*w,grid[0].j*w,w,w)
	image(liwen,end.i*w, end.j*w ,w*0.7,w*0.7,w*0.1,w*0.1, end.i*w*0.8,end.j*w*0.8);
	// image(img, dx, dy, dWidth, dHeight, sx, sy, [sWidth], [sHeight])
}

function index(i,j){
	if(i<0 || j< 0 || i>cols-1 || j> rows - 1){
		return -1;	// if invalid index then return -1 and this will indicate if they have neighbots

	}
	return i+j*rows;
}


function removeWalls(a,b){
		var x = a.i - b.i;
		if(x === 1){
			a.walls[3] = false;
			b.walls[1] = false;
		}else if (x=== -1){
			a.walls[1] = false;
			b.walls[3] = false;
		}

		var y = a.j - b.j;
		if(y === 1){
			a.walls[0] = false;
			b.walls[2] = false;
		}else if (y=== -1){
			a.walls[2] = false;
			b.walls[0] = false;
		}

}



function Cell(i,j){
	// i - col no. , j = row no.
	this.i = i;
	this.j = j;
	this.visited = false;
	this.walls = [true,true,true,true]; //[top,right,bottom,left]

	this.highlight = function(){
		var x = this.i*w;
		var y = this.j*w;
		noStroke();
		fill(0,0,255,100);
		rect(x,y,w,w);
	}
	this.show = function(colour){
		var x = this.i*w;
		var y = this.j*w;
		noFill();
		// stroke(colour);
		// rect(x,y,w,w);
		stroke(colour);
		if(this.walls[0])
		line(	x		,	y		,	x+w	,	y		); // top
		if(this.walls[1])
		line(	x+w	,	y		,	x+w	,	y+w	); //right
		if(this.walls[2])
		line(	x		,	y+w	,	x+w	,	y+w	); //bottom
		if(this.walls[3])
		line(	x		,	y		,	x		,	y+w	); // left

		if(this.visited == true){
			noStroke();
			fill(255,0,255,100);
			rect(x,y,w,w);
		}

	}

	this.checkNeighbors = function(cell){

		var neighbors = [];
		var top = grid[index(i,j-1)];
		var right = grid[index(i+1,j)];
		var bottom = grid[index(i,j+1)];
		var left = grid[index(i-1,j)];

		if(top && !top.visited){
			neighbors.push(top);
		}
		if(right && !right.visited){
			neighbors.push(right);
		}
		if(bottom && !bottom.visited){
			neighbors.push(bottom);
		}
		if(left && !left.visited){
			neighbors.push(left);
		}

		if(neighbors.length > 0 ){
			var r = floor(random(0,neighbors.length));
			return neighbors[r];
		}else{
			return undefined;
		}
	}

}
