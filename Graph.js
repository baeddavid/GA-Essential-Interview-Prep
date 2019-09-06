// We need a queue and a stack to perform searches on the graph.
const Queue = require('./Queue');
const Stack = require('./Stack');

// Our Vertex class. We create vertices with a simple character label and a boolean property
// indicating if the vertex was visited.
class Vertex {
    // We pass a label into our constructor to create our vertex.
    constructor(label) {
        this.label = label;
        this.wasVisited = false;
    }
}
/**
 * Graphs are incredibly robust and complicated data structures. They can be very simple or
 * very complicated. From simple unweighted and undirected graphs to directed topologically sorted graphs,
 * graphs come in a variety of types. In fact graphs are so integral in mathematics there is a subfield known as
 * graph theory. However for the purpose of interviews, we will be doing simple graph implementaions. If you want to
 * go into more detail/ algorithms let me know and I will explain.
 * 
 */
class Graph {
    // We pass a single parameter, size, into our constructor. The size determines how large we need to make the
    // adjacency matrix. The adjacency matrix is how we calculate what vertices have edges without create a separate
    // pointer property. 
    constructor(size) {
        // Vertex list is an array of vertices. This is how we will access vertices.
        this.vertexList = [];
        // Lines 30 - 38 is our initialization of the Adjacency matrix. Since JavaScript does not have preset values for 
        // empty array initializations, we do that manually here.
        this.adjMat = [];
        this.subArr = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                this.subArr.push(0);
            }
            this.adjMat.push(this.subArr);
            this.subArr = [];
        }
        // Our graph starts with 0 vertices.
        this.nVerts = 0;
        // Initialize a queue and a stack.
        this.queue = new Queue();
        this.stack = new Stack();
    }

    // This function creates a vertex and adds it to our vertex list.
    addVertex(label) {
        // Increase the number of vertices by 1
        this.nVerts++;
        // Push the newly created vertex into the list.
        this.vertexList.push(new Vertex(label));
        return true;
    }

    // This function creates an edge between two vertices. We give it two vertices start and end to create edges.
    addEdge(start, end) {
        // We denote an edge with a value of 1
        this.adjMat[start][end] = 1;
        this.adjMat[end][start] = 1;
        return true;
    }

    // Function that deletes a vertex
    removeVertex(key) {
        // Begin by decreasing the vertex count
        this.nVerts--;
        // Then iterate through our vertex list and splice out the vertex that matches key
        for(let i = 0; i < this.vertexList.length; i++)
            if(this.vertexList[i].label == key)
                this.vertexList.splice(i, 1);
        return true;
    }

    // Function that removes an edge from two vertices
    removeEdge(start, end) {
        // Set the relationship to 0
        this.adjMat[start][end] = 0;
        this.adjMat[end][start] = 0;
        return true;
    }

    // Function that displays the label of our vertex
    displayVertex(vertex) {
        console.log(this.vertexList[vertex].label);
    }

    // A function that returns the nearest adjacent unvisited vertex. Important for both searches.
    getAdjUnvisitedVertex(vertex) {
        // Begin iterating through our vertex list and adjacency matrix
        for(let i = 0; i < this.nVerts; i++)
            // If a vertex is connected with an edge and it was not visited return the index of the vertex.
            if(this.adjMat[vertex][i] == 1 && this.vertexList[i].wasVisited == false)
                return i;
        return -1;
    }

    // Bredth First Search
    bfs() {
        this.vertexList[0].wasVisited = true;
        this.displayVertex(0);
        this.queue.enque(0);
        let v2;

        while(!this.queue.isEmpty()) {
            let v1 = this.queue.deque();
            while((v2 = this.getAdjUnvisitedVertex(v1)) != -1) {
                this.vertexList[v2].wasVisited = true;
                this.displayVertex(v2);
                this.queue.enque(v2);
            }
        }
        for(let i = 0; i < this.nVerts; i++)
            this.vertexList[i].wasVisited = false;
    }

    dfs() {
        this.vertexList[0].wasVisited = true;
        this.displayVertex(0);
        this.stack.push(0);

        while(!this.stack.empty()) {
            let vertex = this.getAdjUnvisitedVertex(this.stack.peek());
            if(vertex == -1)
                this.stack.pop();
            else {
                this.vertexList[vertex].wasVisited = true;
                this.displayVertex(vertex);
                this.stack.push(vertex);
            }
        }

        for(let i = 0; i < this.nVerts; i++)
            this.vertexList[i].wasVisited = false;
    }
}