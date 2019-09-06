/**
 * The first Divide and Conquer sort algorithm. Quick Sort is one of the fastest sorting algorithms
 * It uses two functions to accomplish the sort. It uses a partition algorithm and a sort algorithm. 
 * The partition algorithm partitions an array around a pivot. We typically assign the pivot to the last
 * element of the array. 
 */

// Partition function
function partition(arr, left, right) {
    // Set the pivot to the right most element of the array.
    let pivot = arr[right];
    // i is set to 1 minus our left.
    let i = left - 1;
    // In our for loop, start at left.
    for(let j = left; j < right; j++) {
        // If the element at arr[j] is less than the pivot, increase i and swap the elements at j and i
        if(arr[j] <= pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // Swap the left most greater than the pivot element with the pivot.
    let temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;
    // Return the index of i + 1 to get the index of the pivot. 
    return i + 1;
}

// Our recursive sort algorithm
function quickSort(arr, left, right) {
    // As long as the size of the sub arrays are greater than 1
    if(left < right) {
        // We find the partition the array and find the pivot of it.
        let pivot = partition(arr, left, right);
        // We then recursively quick sort around the pivot. This is where Quick Sort actually sorts.
        // It creates an "ordered" array of pivot since our recursive calls to Quick Sort never actually touch the pivot.
        quickSort(arr, left, pivot - 1);
        quickSort(arr, pivot + 1, right);
    }
    return arr;
}