import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Below are test output!</h1>
<div class="block">
Write a function called same, which accepts two arrays. 
The function should return true if every value in the array has its corresponding 
value squared in the second array. The frequency of values must be the same.
</div>
<div><h3>Same with Frequency Counter Tests</h3></div>
<div id="naive-same"></div>
<div id="same"></div>
<div class="block">Write a function called sumZero which accepts a sorted array of integers.
 The function should find the first pair where the sum is 0. 
 Return an array that includes both values that sum to zero or 
 undefined if a pair does not exist</div>
 <div><h3>Multiple Pointers Example SumZero
 Tests</h3></div>
<div id="naive-sumZero"></div>
<div id="sumZero"></div>
<div class="block">Write a function called maxSubarraySum which accepts 
an array of integers and a number called n. The function 
should calculate the maximum sum of n consecutive elements in the array</div>
<div><h3>Sliding Window Example MaxSubarraySum
</h3></div>
<div id="naive-maxSubArraySum"></div>
<div id="maxSubArraySum"></div>
<div class="block">Given a sorted array of integers, write a function called search, 
that accepts a value and returns the index where the value passed to 
the function is located. If the value is not found, return -1
</div>
<div><h3>Divide and Conquer Example Search
Tests</h3></div>
<div id="naive-search"></div>
<div id="search"></div>
`;

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }
  return true;
}

if (
  same([1, 2, 3], [4, 1, 9]) &&
  !same([1, 2, 3], [1, 9]) &&
  !same([1, 2, 1], [4, 4, 1])
) {
  document.getElementById("naive-same").innerHTML = "Naive Same Tests Pass";
} else {
  document.getElementById("naive-same").innerHTML = "Naive Same Tests Fail";
}

function goodSame(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const fc1 = arr1.reduce((acc, item, idx) => {
    if (acc[item]) {
      acc[item]++;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});
  const fc2 = arr2.reduce((acc, item, idx) => {
    if (acc[item]) {
      acc[item]++;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});

  for (const key in fc1) {
    if (fc1[key] !== fc2[parseInt(key, 10) ** 2]) {
      return false;
    }
  }
  return true;
}

if (
  goodSame([1, 2, 3], [4, 1, 9]) &&
  !goodSame([1, 2, 3], [1, 9]) &&
  !goodSame([1, 2, 1], [4, 4, 1])
) {
  document.getElementById("same").innerHTML = "Good Same Tests Pass";
} else {
  document.getElementById("same").innerHTML = "Good Same Tests Fail";
}

function sumZero(arr) {
  if (arr.length <= 1) {
    return undefined;
  }
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

if (
  Array.isArray(sumZero([-3, -2, -1, 0, 1, 2, 3])) &&
  sumZero([-3, -2, -1, 0, 1, 2, 3])[0] === -3 &&
  sumZero([-3, -2, -1, 0, 1, 2, 3])[1] === 3 &&
  !sumZero([1, 2, 3], [1, 9]) &&
  !sumZero([1, 2, 1], [4, 4, 1])
) {
  document.getElementById("naive-sumZero").innerHTML =
    "Naive Sum Zero Tests Pass";
} else {
  document.getElementById("naive-sumZero").innerHTML =
    "Naive Sum Zero Tests Fail";
}

function goodSumZero(arr) {
  if (arr.length <= 1) {
    return undefined;
  }
  let left = 0,
    right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

if (
  Array.isArray(goodSumZero([-3, -2, -1, 0, 1, 2, 3])) &&
  goodSumZero([-3, -2, -1, 0, 1, 2, 3])[0] === -3 &&
  goodSumZero([-3, -2, -1, 0, 1, 2, 3])[1] === 3 &&
  !goodSumZero([1, 2, 3], [1, 9]) &&
  !goodSumZero([1, 2, 1], [4, 4, 1])
) {
  document.getElementById("sumZero").innerHTML = "Good Sum Zero Tests Pass";
} else {
  document.getElementById("sumZero").innerHTML = "Good Same Tests Fail";
}

function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  let max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}

function goodMaxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2); // 10
maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4); // 17
maxSubarraySum([4, 2, 1, 6], 1); // 6
maxSubarraySum([4, 2, 1, 6, 2], 4); // 13
maxSubarraySum([], 4); // null

if (
  maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) === 10 && // 10
  maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) === 17 && // 17
  maxSubarraySum([4, 2, 1, 6], 1) === 6 && // 6
  maxSubarraySum([4, 2, 1, 6, 2], 4) === 13 && // 13
  !maxSubarraySum([], 4) // null
) {
  document.getElementById("naive-maxSubArraySum").innerHTML =
    "Naive Max Sub Array Sum Tests Pass";
} else {
  document.getElementById("naive-maxSubArraySum").innerHTML =
    "Naive MaxSubArray Sum Tests Fail";
}

if (
  goodMaxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) === 10 && // 10
  goodMaxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) === 17 && // 17
  goodMaxSubarraySum([4, 2, 1, 6], 1) === 6 && // 6
  goodMaxSubarraySum([4, 2, 1, 6, 2], 4) === 13 && // 13
  !goodMaxSubarraySum([], 4) // null
) {
  document.getElementById("maxSubArraySum").innerHTML =
    "Good Max Sub Array Sum Tests Pass";
} else {
  document.getElementById("maxSubArraySum").innerHTML =
    "Good MaxSubArray Sum Tests Fail";
}
/* Explanation https://replit.com/@ArthurBernier/Sliding-Window?v=1 */

function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

function goodSearch(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
}

if (
  search([1, 2, 3, 4, 5, 6], 4) === 3 && // 3
  search([1, 2, 3, 4, 5, 6], 6) === 5 && // 5
  search([1, 2, 3, 4, 5, 6], 11) === -1 // -1
) {
  document.getElementById("naive-search").innerHTML = "Naive Search Tests Pass";
} else {
  document.getElementById("naive-search").innerHTML = "Naive Search Tests Fail";
}

if (
  goodSearch([1, 2, 3, 4, 5, 6], 4) === 3 && // 3
  goodSearch([1, 2, 3, 4, 5, 6], 6) === 5 && // 5
  goodSearch([1, 2, 3, 4, 5, 6], 11) === -1 // -1
) {
  document.getElementById("search").innerHTML =
    "Good Search (binary search) Tests Pass";
} else {
  document.getElementById("search").innerHTML =
    "Good Search (binary search) Tests Fail";
}
