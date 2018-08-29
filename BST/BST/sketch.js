var tree;

function setup() {
	//createCanvas(windowWidth, windowHeight);
	noCanvas();
	console.log("Binary Search Tree\n===============================\n\n");
	tree = new Tree();
	tree.addValue(4);
	tree.addValue(5);
	tree.addValue(2);
	tree.addValue(9);
	for(var i =0;i<50;i++){
		tree.addValue(floor(random(2,500)));
	}
	console.log(tree);
	tree.traverse();
	// To test it, go to the console and type in tree.search(<a number>);
}
