
function Tree(){
	this.root = null;
}

Tree.prototype.addValue = function(value) {
	var n = new Node(value);
	if(this.root == null){
		this.root = n;
	}else{
		this.root.addNode(n);
	}
	console.log("Added new Node with Value of " + value);
};


Tree.prototype.traverse = function(){
  return this.root.visit();
};

Tree.prototype.search = function(value){
  if(this.root.search(value) != null){
    console.log("GoodJob");
    return this.root.search(value);
  }else{
    console.log("Node not found!");
    return null;
  }
};
