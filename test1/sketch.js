function setup() {
	createCanvas(windowWidth, windowHeight);
	background(85,91,169);
	frameRate(600);
}

function draw() { //loops forever
	
	strokeWeight(4);

  	strokeWeight(2);
  	fill('white');
  	

	if (mouseIsPressed) {
  	 line(mouseX,mouseY,pmouseX,pmouseY);
	}

	if(keyIsPressed){
		background(85,91,169);
	}
}