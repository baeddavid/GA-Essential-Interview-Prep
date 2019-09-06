/**
 * A quadratic sorting algorithm. This is one of the most basic sorts. 
 * It works with two for loops. An outer "counter" for loop and an inner comparison for loop.
 * We count the iterations needed to sort with the outer loop and make the swaps in the inner loop.
 */
function bubbleSort(arr) {
    // The outer "counter" loop
    for(let i = 0; i < arr.length - 1; i++) {
        // The inner "comparison" loop
        for(let j = 0; j < arr.length - 1; j++) {
            // If the element next to arr[j] is greater, swap them
            if(arr[j] > arr[j + 1]){
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}