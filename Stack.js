/**
 * A stack is an Abstract Data Type. This means that we do not care the stack was implemented.
 * We are only concerned with if the stack is able to perform its key operations.
 * This stack is implemented via an array.
 * 
 * A stack is a data structure where we can only access the last element inserted into the
 * data structure. This means that we are unable to perform searches or get random access.
 * It follows the FILO property - First In Last Out.
 * 
 * A good visualization is to think of a stack of books. If we want to remove the bottom book
 * on a stack of books, we must remove all the books on top first. The last book we added to the stack
 * is the first book we can immediately retrieve.
 * 
 * Time Complexities:
 * Insertion: O(1) - amortized
 * Deletion: O(1) - amortized
 * Search: N/A
 */
class Stack {
    // Our constructor for the stack. We initialize it with an empty array and a variable
    // to keep track of the size of our stack.
    constructor() {
        this.stackArr = [];
        this.length = 0;
    }
    
    // Our push method. This pushes in an object to the top of our stack. We also increase
    // the size of our stack by 1. It returns true if the operation was succesful.
    push(object) {
        this.stackArr.push(object);
        this.length++;
        return true;
    }
    
    // Our pop method. It returns the element at the top of our stack and decreases the size 
    // of the stack by 1.
    pop() {
        this.length--;
        return this.stackArr.pop();
    }
    
    // Our peek method returns the element at the top of our stack.
    peek() {
        return this.stackArr[this.stackArr.length - 1];
    }
    
    // Returns a boolean depending on if the stack is empty
    empty() {
        return this.length == 0;
    }
    
    // A contain function that checks if the stack has a certain element. It will not 
    // return the index, it only returns a boolean depending on if the element is present
    // in the stack.
    contains(object) {
        for(let i = this.stackArr.length - 1; i >= 0; i--)
            if(this.stackArr[i] == object)
                return true;
        return false;
    }
    
    // Returns the size of the stack.
    size() {
        return this.length;
    }
}