function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(windowWidth,windowHeight);
	background(50,50,50);
}

var count = 0;

function draw() {

	if(keyIsPressed){
		background(50,50,50);
		count=0;
		coords=[];
	}
}

var coords=[];

function mouseClicked(){
	
	if(count <= 2){
		count+=1;
		strokeWeight(2);
		beginShape(POINTS);
		xcoord = pmouseX;
		ycoord = pmouseY;
		
		//console.log("( "+xcoord + ","+ycoord+" )");

		coords.push(xcoord);
		coords.push(ycoord);
		console.log(coords);


		fill(200,200,200);
		stroke(255,255,255);
		vertex(xcoord,ycoord);
		
		
		endShape();
	} 

	if (count == 3){
		count+=1; //To prevent redrawing the triangle
		//plotInCenter();
		strokeWeight(2);
		fill(255,255,255,150);
		stroke(200,50,50);
		beginShape();
		vertex(coords[0],coords[1]);
		vertex(coords[2],coords[3]);
		vertex(coords[4],coords[5]);
		endShape(CLOSE);
		calculateInCenter(coords);
		count=0;
		coords=[];
	}
	
	return false;
}

function calculateInCenter(coords){

	var x1 = coords[0];
	var x2 = coords[2];
	var x3 = coords[4];
	var y1 = coords[1];
	var y2 = coords[3];
	var y3 = coords[5];

	var xc = 0;
	var yc = 0;

	var a = calculateDistance(x1,y1,x2,y2);
	console.log("Distance between 1 and 2 : " + a);
	var b = calculateDistance(x3,y3,x2,y2);
	console.log("Distance between 2 and 3 : " + b);
	var c = calculateDistance(x1,y1,x3,y3);
	console.log("Distance between 1 and 3 : " + c);

	var perimeter = a + b + c;
	xc = (x1*b + x2*c + x3*a)/perimeter;
	yc = (y1*b + y2*c + y3*a)/perimeter;
	console.log("Incenter Coordinate : ( " + xc+","+yc+" )");

	fill(0,255,0);
	stroke(0,255,0);
	strokeWeight(2);
	vertex(xc,yc);
	
	stroke(0,0,255);
	strokeWeight(2);
	line(x1,y1,xc,yc);
	line(x2,y2,xc,yc);
	line(x3,y3,xc,yc);
}

function calculateDistance(x1,y1,x2,y2){
	var temp = sq(y2-y1) + sq(x2-x1);
	if(temp < 0)
		temp*=-1;
	return sqrt(temp);
}

