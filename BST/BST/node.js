function Node(value){
	this.value = value;
	this.left = null;
	this.right = null;

}

Node.prototype.addNode = function (n) {
	if(n.value <  this.value){
		if (this.left== null){
			this.left = n;
		}else{
			this.left.addNode(n);
		}

	}else if (n.value > this.value){
		if(this.right == null){
			this.right = n;
		}else{
			this.right.addNode(n);
		}
	}
};



Node.prototype.search = function (value) {
  if(this.value == value){
    console.log("Found the node!");
    return this;
  }else if (value < this.value && this.left != null){
    return this.left.search(value);
  }else if(value > this.value && this.right != null){
    return this.right.search(value);
  }
  return null;
};


Node.prototype.visit = function () {
  if(this.left != null){
    this.left.visit();
  }
  console.log(this.value);
  if(this.right != null){
    this.right.visit();
  }
};
