/*
* The second quadratic time sort. Selection sort is a little bit more elegant than bubbleSort.
* It sorts element with two for loops, but each loop performs a different operations.
* The inner for loop finds the index of the ith + 1 smallest element. The outer for loop tells us where we need to put the element
*/
function selectionSort(arr) {
    // Initialize the minimum index to i
    for(let i = 0; i < arr.length; i++) {
        let minIdx = i;
        // Go through the array starting from i, finding the smallest element
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[j] < arr[minIdx])
                minIdx = j;
        }
        // Swap the smallest element and the element at index i.
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    return arr;
}
