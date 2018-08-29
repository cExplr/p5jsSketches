var tree;

function setup() {
	//createCanvas(windowWidth, windowHeight);
	createCanvas(700,700);
	background(color(80,80,80));
	console.log("Binary Search Tree\n===============================\n\n");
	tree = new Tree();

	for(var i =0;i<6;i++){
		tree.addValue(floor(random(0,50)));
	}
	console.log(tree);
	tree.traverse();
	// To test it, go to the console and type in tree.search(<a number>);
}
