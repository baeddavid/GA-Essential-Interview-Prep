/**
 * A Queue is an abstract data type. It follows the rules of FIFO - First In First Out.
 * A queue is the opposite of a stack. Any element that we insert, must be retrieved in that order.
 * This queue is implemented via an array.
 * 
 * A good visualization is to picture a line at a movie theatre. The person first in line
 * is the first person to be served. People at the back are unable to get served before.
 * 
 * Time Complexities: 
 * Insertion: O(1) - amortized
 * Deletion: O(1) - amortized
 * Search: N/A
 */
class Queue {
    // We initialize our queue with an empty array and a length of 0 to keep track of the 
    // size of the queue.
    constructor() {
        this.queArr = [];
        this.length = 0;
    }

    // When we add objects to a queue, we enque objects. We push elements into the array
    // and increase the length of the queue by 1. Returns true if the operation was
    // successful.
    enque(object) {
        this.queArr.push(object);
        this.length++;
        return true;
    }

    // When we remove element from a queue, we deque objects. We reduce the size of the 
    // array and then return the shifted object.
    deque() {
        this.length--;
        return this.queArr.shift();
    }

    // Returns a boolean depending if the object is present in the queue.
    contains(object) {
        for(let x of this.queArr)
            if(x == object)
                return true;
        return false;
    }

    // Returns a boolean depending if the queue is empty.
    isEmpty() {
        return this.length == 0;
    }

    // Returns the object at the front of the queue. If the queue is empty return false.
    peek() {
        if(this.length == 0)
            return false;
        return this.queArr[0];
    }
    
    // Returns the size of the queue.
    size() {
        return this.length;
    }
}