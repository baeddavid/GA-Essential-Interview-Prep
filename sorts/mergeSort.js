/**
 * Merge Sort is the other Divide and Conquer sort algorithm. It works by merging to already sorted
 * subarrays into a single array. Although the theory and explanation behind it is simple, the implementation
 * is a little but more complicated. It uses the merge function and the sort function to accomplish sorting.
 */

// The merge function. It takes 4 parameters: our array, the left most index, the median index, and the right most index.
function merge(arr, left, mid, right) {
    // Initialize two empty arrays to split our array into.
    let L = [];
    let R = [];
    
    // Find the respective sizes for each array using mid and some math.
    let n1 = mid - left + 1;
    let n2 = right - mid;
  
    // Begin adding elements from the original array into our half arrays. 
    for(let i = 0; i < n1; i++)
      L.push(arr[left + i]);
    for(let j = 0; j < n2; j++)
      R.push(arr[mid + 1 + j]);
    
    // Initialize three variables, i for the L array, j for the R array, and k for the original array.
    // We will be using them to index through each respective array.
    let i = 0, j = 0, k = left;
    // Go through both arrays at the same time using a while loop.
    while(i < n1 && j < n2) {
      // If the element at L[i] is less than or equal to R[j], insert into the original array at index k.
      if(L[i] <= R[j])
        arr[k++] = L[i++];
      // Else insert element R[j] into the original array at index k.
      else
        arr[k++] = R[j++];
    }
    // When we terminate out of the above while loop, it means that we have emptied out one of the split arrays.
    
    // Empty the rest of the split array into the original array.
    while(i < n1) 
      arr[k++] = L[i++];

    // Empty the rest of the split array into the original array.
    while(j < n2)
      arr[k++] = R[j++];
    //Return the newly sorted array.
    return arr;
}

// Our recursive sort function. We pass it three elements: the original array, the left most index, and the right most index.
function mergeSort(arr, l, r) {
    // As long as the size of the subarrays is greater than 1
    if(l < r) {
        // Find the median of the array.
        let m = Math.floor((l + r) / 2);
        // Recursively perfrom mergeSort on both halves of the array.
        mergeSort(arr, l , m);
        mergeSort(arr, m + 1, r);
        // Return the merged and sorted subarrays back up the recursion.
        return merge(arr, l, m, r);
    }
    // It can be difficult to visualize how merge sort works so below is an example. Keep in mind that
    // we can consider an array with a single element as a sorted array.
    /* 
    Illustration of merge sort on the array:
    {3, 41, 52, 26, 38, 57, 9, 49}

    Recursion Level 0 (Down):
    L: {3, 41, 52, 26, 38, 57, 9, 49} R: {}

    Recursion Level 1 (Down):
    L: {3, 41, 52, 26} R: {38, 57, 9, 49}

    Recursion Level 2 (Down):
    L1: {3, 41} R1: {38, 57}
    L2: {52, 26} R2: {9, 49}

    Recursion Level 3 (Down):
    L1: {3} R1:{41}
    L2: {38} R2: {57}
    L3: {52} R3: {26}
    L4: {9} R4: {49}

    Traverse back up the recursion tree - The "Conquer" part

    Recursion Level 2 (Up):
    L1: {3, 41} R1: {38, 57}
    L2: {26, 52} R2: {9, 49}

    Recursion Level 3 (Up):
    L: {3, 38, 41, 57} R: {9, 26, 49, 52}

    Recursion Level 0 (Up):
    L: {3, 9, 26, 38, 41, 49, 52, 57} R:{}
    */
}