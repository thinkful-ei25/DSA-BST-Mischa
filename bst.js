class BinarySearchTree{
  constructor(key=null, value=null, parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value, parent=null){
    //if parent is null add as root
    if(this.key === null){
      this.key = key;
      this.value = value;
      //if parent is larger than key add to left
    }else if(this.key > key){
      //if we're at the leaf, add new tree
      if(!this.left){
        this.left = new BinarySearchTree(key, value, this);
      }else{
        return this.left.insert(key, value);
      }
    }else{  //if parent is smaller than add to right
      if(!this.right){
        this.right = new BinarySearchTree(key, value, this);
      }else{
        return this.right.insert(key, value, this);
      }
    }
  }

  find(key){
    if(this.key === key){
      return this.value;
    }
    if(this.key > key){
      if(this.left){
        return this.left.find(key);
      }else{
        throw new Error('key not found in tree!');
      }
    }else{
      if(this.right){
        return this.right.find(key);
      }else{
        throw new Error('key not found in tree!');
      }
    }
  }
  //find min of right tree (bottom left) (this.right.find_Min)
  //replace key with this.right.find_Min --> parent of min = this.right.find_min 
  // min.parent.left = null

  remove(key){
    if(this.key === key){
      //if key has two children
      if(this.right && this.left){
        const minRight = this.right._findMin();
        this.key = minRight.key;
        this.value = minRight.value;
        minRight.remove(minRight.key);
        minRight.parent.left = null;
      }else if(this.right){
        this._replaceWith(this.right);
      }else if(this.left){
        this._replaceWith(this.left);
      }else{
        this._replaceWith(null);
      }
    }else if(key < this.key && this.left){
      this.left.remove(key);
    }else if(key > this.key && this.right){
      this.right.remove(key);
    }else{
      throw new Error('Key not in tree!');
    }
  }

  _replaceWith(node){
    if(this.parent){
      if(this === this.parent.left){
        this.parent.left = node;
      }else if(this === this.parent.right){
        this.parent.right = node;
      }
      if(node){
        node.parent = this.parent;
      }
    }else{
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
        //else if we're removing a leaf
      }else{
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
    
  }
  _findMin(){
    if(!this.left){
      return this;
    }else{
      return this.left._findMin();
    }
  }

}
const bst = new BinarySearchTree();
// bst.insert(3, 3);
// bst.insert(1, 1);
// bst.insert(4, 4);
// bst.insert(6, 6);
// bst.insert(9, 9);
// bst.insert(2, 2);
// bst.insert(5, 5);
// bst.insert(7, 7);
// bst.insert(10, 10);
// bst.insert(11, 11);


  //set two variables => left and right counter
function bstHeight(tree) {
    return Math.max(tree.left && bstHeight(tree.left), tree.right && bstHeight(tree.right) ) + 1;
}

function findMax(bst){
  if(!bst.right){
    return bst;
  }else{
    return findMax(bst.right);
  }
}




function thirdLargest(bst){
  const largestNode = findMax(bst);

  //if alrgest is root
  // ---> check if left.right -- if yes return left.right || left.left
  if(!largestNode.parent){
    if(!(largestNode.left || largestNode.right)){
      return 'this tree doesn\'t have at least three nodes!'; 
    }
    const secondLargestNode = findMax(largestNode.left);
    if(secondLargestNode.left){
      return secondLargestNode.left.value;
    }else if(!secondLargestNode.parent.parent){
      return 'this tree doesn\'t have at least three nodes!';
    }else {
      return secondLargestNode.parent.value;
    }
  }
  //if largest node's parent has left return left
  if(largestNode.left){
    return largestNode.parent.value;
  }
  if(largestNode.parent.left){
    return largestNode.parent.left.value;
  }else{
    if(largestNode.parent.parent){
      return largestNode.parent.parent.value ;
    }else{
      return 'this tree doesn\'t have at least three nodes!';
    }
  }
}
//check height of each subtree --> if height of left tree - right ree > 1 return false
bst.insert(10, 10);
bst.insert(6, 6);
bst.insert(8, 8);
bst.insert(7, 7);
bst.insert(3, 3);
bst.insert(9, 9);
bst.insert(12, 12);
bst.insert(11, 11);
bst.insert(38, 38);
bst.insert(28, 28);
bst.insert(27, 27);


function isBalanced(bst){
  //check height of tree
  if(bst.left && bst.right){
    const heightDifference = Math.abs(bstHeight(bst.left) - bstHeight(bst.left));
    if(heightDifference > 1){
      return false;
    }
    return isBalanced(bst.left), isBalanced(bst.right);
  }else if(bst.left && bstHeight(bst.left) > 1){
    return false;
  }else if(bst.right && bstHeight(bst.right) > 1){
    return false;
  }else{
    return true;
  }
}
console.log(isBalanced(bst));
class BinaryTree{
  constructor(key=null, parent=null){
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
  insert(key, parent=null){
    const position = Math.floor(Math.random() * 2) + 1;
    if(!this.key){
      this.key = key;
      return;
    }
    if(position === 1){
      if(!this.left){
        const newTree = new BinaryTree(key, this);
        this.left = newTree;
        return;
      }else{
        return this.left.insert(key, this);
      }
    }else{
      if(!this.right){
        const newTree = new BinaryTree(key, this);
        this.right = newTree;
        return;
      }else{
        return this.right.insert(key, this);
      }
    }
  }
}

const binaryTree = new BinaryTree;
binaryTree.insert(2);
binaryTree.insert(50);
binaryTree.insert(452);
binaryTree.insert(34);
binaryTree.insert(267);

function isBST(tree){
  //base case ===> if we hit the bottom return true
  if(!tree.left && !tree.right){
    return true;
  }

  //check if left is smaller and right is larger
  if(tree.left && tree.right){
    if(tree.left.key > tree.key || tree.right.key < tree.key){
      // console.log(tree.key, tree.left.key, tree.right.key);
      return false;
    }
    return isBST(tree.left), isBST(tree.right);
  }else if(tree.left){
    if(tree.left.key > tree.key){
      return false;
    }
    return isBST(tree.left);
  }else{
    if(tree.right.key < tree.key){
      return false;
    }
    return isBST(tree.right);
  }
}


