
function Tile(i,j){
	this.i=i;
	this.j=j;
	this.empty = false;
	this.value = 0;
	this.gscore = 99999;
	this.fscore = 99999;

	this.show = function(colour){
		fill(colour);
		if(this.empty == true){
			fill(0);
		}
		rect(this.i*w, this.j*w,w-2,w-2);
	}
}
