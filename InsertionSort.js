/**
 * The more elegant of the basic sorts, Insertion sort works like how you would sort a hand of cards.
 * Begin with the second element, and begin comparing it against the previous elements. If the elements before
 * are larger, thean bump them forward until we find the appropriate position for the element.
 */
function insertionSort(arr) {
    // Begin our loop at index 1. This is because everything before i is in sorted order. We can make the assumption
    // that a subarray with a sinlge element is technically sorted, so the element at index 0 is a sorted subarray.
    for(let i = 1; i < arr.length; i++) {
        // Cache the element at index i. We call this key.
        let key = arr[i];
        // J starts at i - 1. This is that we can effectively compare elments against our key
        let j = i - 1;
        // As long as j is greater than or equal to 0 and the element at arr[j] is greater than key, keep bumping elements forward.
        while(j >= 0 && arr[j] > key)  {
            arr[j + 1] = arr[j];
            j--;
        }
        // When we break out of the while loop, we have found the appropriate position for our key, j + 1.
        arr[j + 1] = key;
    }
    return arr;
}