// Our symbols to create private methods.
const helper = Symbol('helper');
const getSucc = Symbol('getSucc');

// Our node constructor. I created an object and an id parameter so that we can also insert
// objects into it. It has a leftChild and a rightChild property which is how we create our tree.
class Node {
    constructor(object, id) {
        this.object = object;
        this.id = id;
        this.leftChild = null;
        this.rightChild = null;
    }

    // Display node which console.logs the object.
    displayNode() {
        console.log('{' + this.object + '}');
    }
}
/**
 * Binary Search Tree is a data structure best suited for fast travesals and searches.
 * 
 * It follows 2 simple rules:
 * 1. Each node can have a maximum of two child nodes. 
 * 2. If the node has a value less than the parent, it must be a left child. If the node has a value
 * greater than the parent, it must be a right child.
 * 
 * It is important to note that Binary Search Trees are recursive data structures. This means that
 * every subtree of the original tree must also be a valid binary search tree. A node with no children is also
 * a valid tree.
 * 
 * NOTE** I'm going to assume that the binary search tree here is balanced even though it isn't.
 * This is because in interviews, binary search trees will usually be balanced unless specified.
 * The given time complexities are for a balanced search tree. If you're interested in learning the
 * specifics let me know and I'll explain how to implement a balanced tree.
 * 
 * Time Complexities:
 * Insertion: O(log n)
 * Deletion: O(log n)
 * Search: O(log n)
 * 
 * Because of the rules for the binary search tree, every single operation has a worst time of log n.
 * Use this to your advantage.
 */
class BinarySearchTree {
    // Our constructor takes no parameters. We initialize a root pointer and our size to 0.
    // If the root is null then the tree is empty.
    constructor() {
        this.root = null;
        this.size = 0;
    }

    // Our helper function for searching for a node in a tree. We can recursively look for a node
    // using the rules of the tree. If the key is less than the node, we recursively call the helper
    // function on the left sub-tree. If the key is greater than the node, we recursively call the helper
    // function on the right sub-tree.
    [helper](node, key) {
        if(node == null || node.id == key)
            return node;
        if(node.id > key)
            return this[helper](node.leftChild, key);
        else
            return this[helper](node.rightChild, key);
    }

    // We call our search function here using the helper function from before.
    search(key) {
        return this[helper](this.root, key);
    }

    // Our code for inserting into a binary search tree.
    insert(object, id) {
        // Begin by creating a new node calling the Node class.
        let newNode = new Node(object, id);
        // If the root is null then that means the tree is empty, so insert our node into the root.
        if(this.root == null)  {
            this.root = newNode;
            this.size++;
            return true;
        }
        // If the tree is not empty, we must traverse the tree looking for the correct spot to assign our new node.
        else {
            // We begin with current pointing at root.
            let current = this.root;
            // We also declare an empty parent variable
            let parent;
            // We are going to infinitely loop through until we find the spot for our new node.
            while(true) {
                // We set parent to our current pointer.
                parent = current;
                // We search for the position of insertion. If the current value is greater than we must go left
                if(id < current.id) {
                    current = current.leftChild;
                    // If current is null, this is where we will insert our node.
                    if(current == null) {
                        parent.leftChild = newNode;
                        this.size++;
                        return true;
                    }
                // Else we must go right
                } else {
                    current = current.rightChild;
                    // If current is null, this is where we will insert our node.
                    if(current == null) {
                        parent.rightChild = newNode;
                        this.size++;
                        return true;
                    }
                }
            }
        }
    }
    // The delete function for a node in a binary search tree
    remove(id) {
        // Current is pointed to our root
        let current = this.root;
        // Parent is pointed to our root
        let parent = this.root;
        // Initialize our isLeftChild boolean check to true
        let isLeftChild = true;
        
        // Begin looking for the node to delete. This is identical to our insertion 
        while(current.id != id) {
            parent = current;
            if(id < current.id) {
                isLeftChild = true;
                current = current.leftChild;
            } else {
                isLeftChild = false;
                current = current.rightChild;
            }
            // If current is null then the key is not present in the tree
            if(current == null)
                return false;
            
            // If the node to be deleted doesn't have any children we can simply disconnect it from the parent
            if(current.leftChild == null && current.rightChild == null) {
                // Checking if node is the root
                if(current == this.root)
                    this.root = null;
                // If it's a left child disconnect left child pointer
                else if(isLeftChild)
                    parent.leftChild = null;
                // Else disconnect right child pointer
                else
                    parent.rightChild = null;
            }
            
            // If the node to be deleted has 1 child and the child is a left child
            else if(current.rightChild == null) {
                // Check if node is the root
                if(current == this.root)
                    this.root = current.leftChild;
                // If the node is a left child set the parent's left child to the node's left child
                else if(isLeftChild)
                    parent.leftChild = current.leftChild;
                // Else set the parent's right child to to the node's left child
                else
                    parent.rightChild = current.leftChild;
            }
            
            // If the node to be deleted has 1 child and the child is a right child
            else if(current.leftChild == null) {
                // Check if node is the root
                if(current == this.root)
                    this.root = current.rightChild;
                // If the node is a left child set the parent's left child to the node's right child
                else if(isLeftChild)
                    parent.leftChild = current.rightChild;
                // Else set the parent's right child to to the node's right child
                else
                    parent.rightChild = current.rightChild;
            }

            // The node to be deleted has two children
             else {
                // Find the succesor of the node
                let succ = this[getSucc](current);
                // Check the root
                if(current == root)
                    this.root = succ;
                // If the node to be deleted is a left child, set the parent's left child to the successor
                else if(isLeftChild)
                    parent.leftChild = succ;
                // Else set the parent's right child to the sucessor
                else
                    parent.rightChild = succ;
                // The succesor's left child is the node to be deleted's left child to preserve the property of the tree.
                succ.leftChild = current.leftChild;
             }
             return true;
        }
    }
    // The private function to find the succesor of any node.
    // This can be done by finding either the left most node of the right child of the node. If there are no left children return the node itself.
    [getSucc](node) {
        let succParent = node;
        let succ = node;
        let current = node.rightChild;
        // Find the successor of the node by traversing the left children of the node
        while(current != null) {
            succParent = succ;
            succ = current;
            current = current.leftChild;
        }
        // If the successor is not the node's right child we need to adjust the node's to preserve the binary property of the tree
        if(succ != node.rightChild) {
            succParent.leftChild = succ.rightChild;
            succ.rightChild = node.rightChild;
        }
        return succ;
    }
    
    // Our pre order traversal. The action we take is first before either recursive call
    preOrder(node) {
        if(node != null) {
            console.log(node.object + ' ' + node.id);
            this.preOrder(node.leftChild);
            this.preOrder(node.rightChild);
        }
    }

    // Our in order traversal. The action we take is inbetween our recursive calls.
    inOrder(node) {
        if(node != null) {
            this.preOrder(node.leftChild);
            console.log(node.object + ' ' + node.id);
            this.preOrder(node.rightChild);
        }
    }

    // Our post order traversal. The action comes after all our recursive calls.
    postOrder(node) {
        if(node != null) {
            this.preOrder(node.leftChild);
            this.preOrder(node.rightChild);``
            console.log(node.object + ' ' + node.id);
        }
    }

    // If we want to find the minimum value in a tree, simply traverse all left chilren until we hit null.
    minValue(node) {
        let current = node;
        while(current.leftChild != null)
            current = current.leftChild;
        return current;
    }  

    // If we want to find the maximum value in a tree, simply traverse all right children until we hit null.
    maxValue(node) {
        let current = node;
        while(current.rightChild != null)
            current = current.rightChild;
        return current;
    }
}