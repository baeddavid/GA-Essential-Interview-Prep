// A symbol to create a private method. If you're curious let me know and I will explain
const helper = Symbol('helper');
/**
 * Our Link class. A very simple constructor where our object has two propertis.
 * 
 * The first property is the "payload" of our link. It is the object we are going to 
 * append to the link.
 * 
 * The second property is the next reference. It is initialized to null, however this is 
 * how we connect links together. More details in the list implementation
 */
class Link {
    constructor(object) {
        this.object = object;
        // next pointer default is null
        this.next = null;
        // prev pointer default is null
    }
}

/**
 * Our Linked List class. We pass 0 parameters into the constructor. We initialize a new list 
 * with two properties. 
 * 
 * The first property is the head of the list. This is initialized to null. If the head 
 * has a value of null, it means that the list is empty. This is the most important part
 * of the list. We are able to access our list through our head. If at any point we lose
 * the head, we lose the ability to traverse the list.
 * 
 * The second property is the size of the list. We initialize the size of the list to 0.
 * 
 * Because we are simply appending and deleting links from the front or in some cases the
 * end of the list, time complexity is always constant, unless trying to insert a link or delete
 * a link at a specific index.
 * 
 * Time Complexities:
 * Insertion: O(1)
 * Deletion: O(1)
 * Search: O(n)
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    // Our add function. This function appends a link to the front of the list. 
    add(object) {
        // We initialize a new object passing in the parameter object from the function 
        let newLink = new Link(object);
        // We set the next pointer to the head. This connects our new link to the front of the list.
        newLink.next = this.head;
        // After we have connected our links, the new link at the front of our list is the new head
        this.head = newLink;
        // Increase the size of the list as we have added a link.
        this.length++;
        // Return true if the operation was successful.
        return true;
    }

    // Removes a link from the from the front of the list
    removeFirst() {
        // Create a temporary reference to the head. This temp is our to be deleted link
        let temp = this.head;
        // Head is now the link next to head.
        this.head = this.head.next;
        // Decrease the size of the list by 1
        this.length--;
        // Return the temp.
        return temp;
    }

    // Removes a link with a certian key. We accomplish this by traversing the list first
    removeKey(key) {
        // Current is the head of our list.
        let current = this.head;
        // Prev is also the head of our list.
        let prev = this.head;
        // As long as the payload of current is not equal to the key we continue going next
        while(current.object != key) {
            // If the link next to current is null we have reached the end and the link is not present
            if(current.next == null)
                return false;
            // The two lines move our pointers through the list.
            prev = current; 
            current = current.next;
        }
        // If current is equal to the head, that means the head is the link to be removed
        if(current == this.head)
            // Remove the link as we would removing from the front
            this.head = this.head.next;
        // If it is not the first link
        else
            // The link next to prev is the link next to current. We skip over current.
            prev.next = current.next;
        // Unlink current's next pointer.    
        current.next = null;
        // Decrease the size by 1 since we have removed a link from the list.
        this.length--;
        // Return current.
        return current;
    }
    
    // Our search method. Check bottom as this function was made private with symbol
    search(key) {
        return this[helper](this.head, key);
    }   

    // Checks if our list contains a key. Very similar to deleting a link with a key, 
    // but returns a boolean depending on the prescence of the link.
    contains(key) {
        let current = this.head;
        while(current.object != key) {
            current = current.next;
            if(current == null)
                return false;
        }
        return true;
    }

    // Traverses the list again looking for a key. If a link matches the key, return the link at the "index".
    get(index) {
        // Begin at the head.
        let current = this.head;
        // Initialize our counter to 0.
        let i = 0;
        // While i is less than our index and current is not null keep going next.
        while(i < index && current != null) {
            current = current.next;
            // If current equals null it is not present in the list so return false
            if(current == null)
                return false;
            // Increase i by 1 for every successful move next
            i++;
        }
        // Return the link
        return current;
    }

    // Returns a boolean depending on if the list is empty
    isEmpty() {
        return this.length == 0;
    }

    // Returns the size of the list.
    size() {
        return this.length;
    }

    // A recursive helper function that searches for a link in the list. If the node we 
    // pass into it is null return false. Else if the node's key is equal to the key,
    // return the link. Else recursively go to the next link.
    [helper](node, key) {
        if(node == null)
            return false;
        if(node.object == key)
            return node;
        return this[helper](node.next , key);
    }
}