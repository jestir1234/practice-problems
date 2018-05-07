// Find the most frequent integer in an array

const mostFrequentInteger = (arr = []) => {
  if (!Array.isArray(arr)) {
    console.error("Invalid input provided. Require an array.");
    return;
  }

  if (!arr.length) {
    return null;
  }

  const frequency = new Map();

  let largestFrequency = 1;
  let numWithLargestFrequency = arr[0];

  arr.forEach(num => {
    if (frequency[num]) {
      frequency[num] += 1;
    } else {
      frequency[num] = 1;
    }

    if (frequency[num] > largestFrequency) {
      numWithLargestFrequency = num;
      largestFrequency = frequency[num];
    }
  });

  console.log(
    `The most frequent number is ${numWithLargestFrequency} with a frequency of ${largestFrequency}.`
  );
  return numWithLargestFrequency;
};

// mostFrequentInteger([1, 1, 2, 1, 3, 4, 5, 4, 5, "cat"]);
// mostFrequentInteger(null);

// O(n) time complexity
// O(n) space complexity

// Find pairs in an integer array whose sum is equal to 10 (bonus: do it in linear time)

const sumPairs = (arr = []) => {
  const pairs = new Map();
  console.log("The pairs that add up to 10 are ");
  for (let i = 0; i < arr.length; i++) {
    if (pairs[10 - arr[i]] === arr[i]) {
      console.log([10 - arr[i], arr[i]]);
      return [pairs[10 - arr[i]], arr[i]];
    }
    pairs[arr[i]] = 10 - arr[i];
  }

  console.log([]);
  return [];
};

// sumPairs([1, 3, 4, 6]);
// sumPairs("dog");

// O(n) or less time complexity
// O(n) space complexity

// Given 2 integer arrays, determine if the 2nd array is a rotated version of the 1st array. Ex. Original Array A={1,2,3,5,6,7,8} Rotated Array B={5,6,7,8,1,2,3}

const rotatedArrays = (arr1 = [], arr2 = []) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr1)) {
    console.error("Invalid input(s). Inputs should be arrays.");
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  let diffArr1 = 0;
  let diffArr2 = 0;

  for (let i = 0; i < arr1.length; i++) {
    const next = i === arr1.length - 1 ? 0 : i + 1;
    diffArr1 += arr1[next] - arr1[i];
    diffArr2 += arr2[next] - arr1[i];
  }

  console.log("The total difference for array1 is ", diffArr1);
  console.log("The total difference for array2 is ", diffArr2);
  return diffArr1 === diffArr2 ? true : false;
};

// test1
// console.log(
//   "Test 1 should be true: ",
//   `ANSWER CORRECT ${rotatedArrays(
//     [1, 2, 3, 5, 6, 7, 8],
//     [5, 6, 7, 8, 1, 2, 3]
//   ) === true}`
// );

// test2
// console.log(
//   "Test 2 should be true: ",
//   `ANSWER CORRECT ${rotatedArrays(
//     [1, 3, 2, 5, 7, 6, 8],
//     [5, 7, 6, 8, 1, 3, 2]
//   ) === true}`
// );

// test3
// console.log(
//   "Test 3 should be false: ",
//   `ANSWER CORRECT: ${rotatedArrays(
//     [1, 4, 2, 5, 7, 6, 8],
//     [5, 7, 6, 12, 1, 3, 2]
//   ) === false}`
// );

// O(n) time complexity
// O(1) space complexity

// Write fibbonaci iteratively and recursively (bonus: use dynamic programming)

const fibIterative = n => {
  const nums = [0, 1];
  if (typeof n != "number") {
    return null;
  }

  if (n === 0) {
    console.log(null);
    return null;
  }

  if (n < 2) {
    console.log(nums[n - 1]);
    return nums[n - 1];
  }

  while (nums.length < n) {
    nums.push(nums[nums.length - 1] + nums[nums.length - 2]);
  }
  console.log(nums[nums.length - 1]);
  console.log(nums);
  return nums[nums.length - 1];
};

// O(n) time complexity
// O(n) space complexity
// fibIterative("cat");

var recursiveCalls = 0;
const fibRecursive = (n, cache = {}) => {
  if (n === 0) {
    cache[0] = 0;
    return 0;
  }

  if (n === 1) {
    cache[1] = 1;
    return 1;
  }
  let fib1;
  let fib2;
  if (cache[n - 1]) {
    console.log("UTILIZING CACHE FOR", n - 1, cache);
    fib1 = cache[n - 1];
  } else {
    recursiveCalls += 1;
    fib1 = fibRecursive(n - 1, cache);
  }

  if (cache[n - 2]) {
    console.log("UTILIZING CACHE FOR", n - 2, cache);
    fib2 = cache[n - 2];
  } else {
    recursiveCalls += 1;
    fib2 = fibRecursive(n - 2, cache);
  }
  cache[n - 1] = fib1;
  cache[n - 2] = fib2;
  return fib1 + fib2;
};

// console.log(fibRecursive(10));
// console.log("TOTAL RECURSIVE CALLS", recursiveCalls);

// Find the only element in an array that only occurs once.

const occursOnce = (arr = []) => {
  if (!arr.length) {
    return null;
  }

  let occuredOnce = arr[0];

  const nums = {};

  for (let i = 0; i < arr.length; i++) {
    if (nums[arr[i]]) {
      nums[arr[i]] += 1;
    } else {
      nums[arr[i]] = 1;
    }
  }
  console.log(nums);

  for (let key in nums) {
    if (nums[key] === 1) {
      return key;
    }
  }
  return occuredOnce;
};

// O(n + n) time complexity
// O(n) space complexity

// console.log(occursOnce([1, 1, 2, 3, 3, 4, 4]));

const occursOnceSorted = (arr = [], cache = { stack: [] }) => {
  if (!arr.length) {
    return null;
  }

  if (cache[arr[0]]) {
    if (arr[0] === cache.stack[cache.stack.length - 1]) {
      cache.stack.pop(); // O(1) operation
    }
  } else {
    cache[arr[0]] = true;
    cache.stack.push(arr[0]); // O(1) operation
  }

  if (arr.length === 1) {
    return cache.stack[0];
  }

  return occursOnceSorted(arr.slice(1, arr.length), cache);
};

const nums = [2, 2, 2, 1, 5, 3, 5, 3, 5, 3];
const sortedNums = nums.sort(); // best sorting algorithm is MergeSort at O(n log n)
// console.log(occursOnceSorted(sortedNums));

// O(n log n) + O(n) time complexity
// O(n + n) space complexity

const occursOnceImproved = (sortedArr = []) => {
  if (!sortedArr.length) {
    return null;
  }

  if (sortedArr.length === 1) {
    return sortedArr[0];
  }

  let currentVal = sortedArr[0];

  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] !== currentVal) {
      return currentVal;
    }
  }
};

// console.log(occursOnceImproved(sortedNums));
// O(n log n) + 0(less than n) time complexity
// O(n) space complexity

// Find the common elements of 2 int arrays
var iterations = 0;
const commonElements = (arr1 = [], arr2 = []) => {
  const nums = {};

  // O(n)
  arr1.forEach(el => {
    iterations += 1;
    nums[el] = true;
  });

  // O(k)
  return arr2.filter(el => {
    iterations += 1;
    return nums[el];
  });
};

const arr1 = [4, 2, 18, 7, 9];
const arr2 = [4, 2, 18, 7, 9, 27, 5, 2, 15, 14, 13, 12, 11, 20, 7, 7, 9];

// console.log(commonElements(arr1, arr2));
// console.log(`Iterations: ${iterations}`);

// O(n + k) time complexity
// O(lesser of n and k) space complexity

const shorterArray = (arr1, arr2) => (arr1.length < arr2.length ? arr1 : arr2); // O(1) t
const longerArray = (arr1, arr2) => (arr1.length > arr2.length ? arr1 : arr2); // O(1) t

var iterations2 = 0;
const commonElementsImproved = (arr1 = [], arr2 = []) => {
  const nums = {}; // O(lesser of n and k) s
  const longArray = longerArray(arr1, arr2);
  const shortArray = shorterArray(arr1, arr2);

  let common = []; // O(lesser of n and k) s

  // O(lesser of n and k) t
  shorterArray(arr1, arr2).forEach(el => {
    iterations2 += 1;
    nums[el] = true;
  });

  // O(lesser of n and k) t
  for (let i = 0; i < longArray.length; i++) {
    iterations2 += 1;
    let ele = longArray[i];
    if (nums[ele]) {
      common.push(ele);
    }
    if (common.length >= shortArray.length) {
      break;
    }
  }
  return common;
};

// console.log(commonElementsImproved(arr1, arr2));
// console.log(`Iterations2: ${iterations2}`);

var iterations3 = 0;
const commonElementsSorted = (arr1, arr2) => {
  let common = []; // O(smaller of n || k) s
  let longArray = arr1.length > arr2.length ? arr1 : arr2;
  let idx1 = 0;
  let idx2 = 0;

  // O(larger of n || k) time complexity
  for (let i = 0; i < longArray.length; i++) {
    iterations3 += 1;
    if (arr1[idx1] === arr2[idx2]) {
      common.push(arr1[idx1]);
      idx1 += 1;
      idx2 += 1;
    } else if (arr1[idx1] > arr2[idx2]) {
      idx2 += 1;
    } else if (arr1[idx1] < arr2[idx2]) {
      idx1 += 1;
    }

    if (idx1 >= arr1.length || idx2 > arr2.length) {
      break;
    }
  }

  return common;
};

let nums1 = [1, 3, 5, 8, 15];
let nums2 = [4, 6, 8, 10, 12, 13];
let nums3 = [4, 6, 8, 10, 4, 12, 13];

let arr1Sorted = arr1.sort((a, b) => a - b);
let arr2Sorted = arr2.sort((a, b) => a - b);
// console.log(arr1Sorted);
// console.log(arr2Sorted);
// console.log(commonElementsSorted(arr1Sorted, arr2Sorted));
// console.log("ITERATIONS", iterations3);

// Implement binary search of a sorted array of integers

const binarySearch = (sortedArray, target, idx = 0) => {
  const mid = sortedArray.length > 1 ? Math.round(sortedArray.length / 2) : 0; // O(1)
  const midElement = sortedArray[mid]; // O(1)

  if (target === midElement) {
    return mid + idx;
  }

  if (sortedArray.length <= 1) {
    console.log("SEARCH FINISHED...NOTHING FOUND");
    return -1;
  }

  const lowerHalf = sortedArray.slice(0, mid); // O(n)
  const upperHalf = sortedArray.slice(mid); // O(n)

  if (target < midElement) {
    return binarySearch(lowerHalf, target, idx);
  } else {
    return binarySearch(upperHalf, target, mid + idx);
  }
};

// O(log n)

// console.log(binarySearch(nums2, 8));
// console.log(binarySearch(nums1, 15));
// console.log(binarySearch(nums1, 20));
// console.log(binarySearch(nums1, null));
// console.log(binarySearch(nums1, "cat"));
// console.log(binarySearch(nums3, 4));

// Implement binary search in a rotated array (ex. {5,6,7,8,1,2,3})

const rotatedArray = [10, 11, 12, 13, 14, 15, 19, 20, 5, 6, 7, 8, 9];
const rotatedArray2 = [19, 20, 5, 6, 7, 8, 9];
const rotatedArray3 = [10, 11, 12, 13, 14, 15];
const rotatedArray4 = [12, 13, 14, 15, 19, 8, 10, 11];
const rotatedArray5 = [15, 19, 20, 25, 3, 4, 6, 7, 8, 11, 12];

const binarySearchRotated = (arr, target, idx = 0) => {
  const mid = Math.round((arr.length - 1) / 2);
  const midEle = arr[mid];
  const first = arr[0];
  const last = arr[arr.length - 1];
  console.log("MID ELE IS: ", midEle);
  console.log("ARRAY ", arr);
  console.log("IDX ", idx);

  if (target === midEle) {
    console.log("FOUND AT INDEX: ", mid + idx);
    return mid + idx;
  }

  if (arr.length <= 1) {
    console.log("FINISHED SEARCHING...NOTHING FOUND");
    return -1;
  }
  if (midEle > first) {
    // first half sorted
    console.log("FIRST HALF SORTED");
    if (target >= first && target <= midEle) {
      console.log("SEARCHING....FIRST HALF");
      return binarySearch(arr.slice(0, mid), target, idx);
    } else {
      console.log("SEARCHING....SECOND HALF");
      return binarySearchRotated(arr.slice(mid), target, mid + idx);
    }
  } else {
    // second half sorted
    console.log("SECOND HALF SORTED");
    if (target <= last && target >= midEle) {
      console.log("SEARCHING....SECOND HALF");
      return binarySearch(arr.slice(mid), target, mid + idx);
    } else {
      console.log("SEARCHING....FIRST HALF");
      return binarySearchRotated(arr.slice(0, mid), target, idx);
    }
  }
};

// const answers = rotatedArray.map(el => binarySearchRotated(rotatedArray, el));
// console.log(answers);

// Find the first non-repeated character in a String

const findFirstNonRepeatCharacter = string => {
  if (!string.length) {
    return null;
  }

  const charHash = new Map();

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (charHash.get(char)) {
      charHash.set(char, charHash.get(char) + 1);
    } else {
      charHash.set(char, 1);
    }
  }

  for (let i = 0; i < string.length; i++) {
    if (charHash.get(string[i]) === 1) {
      return string[i];
    }
  }
};

// O(n + n)
// console.log(findFirstNonRepeatCharacter("catepillar"));

// Reverse a String iteratively and recursively

const revereStringIterative = string => {
  let reversed = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }
  return reversed;
};

// O(n) time and space complexity

// console.log(revereStringIterative("terrible"));

const reverseStringRecursively = string => {
  if (string.length <= 1) {
    return string;
  }

  return (
    string[string.length - 1] +
    reverseStringRecursively(string.slice(0, string.length - 1))
  );
};

console.log(reverseStringRecursively("terrible"));
