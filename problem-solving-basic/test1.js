function miniMaxSum(arr) {
  if (arr.length !== 5) {
    throw new Error("Input array must contain exactly 5 integers.");
  }

  const totalSum = arr.reduce((acc, num) => acc + num, 0);

  let minSum = Number.MAX_SAFE_INTEGER;
  let maxSum = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    const sumOfFour = totalSum - arr[i];

    if (sumOfFour < minSum) {
      minSum = sumOfFour;
    }
    if (sumOfFour > maxSum) {
      maxSum = sumOfFour;
    }
  }

  console.log(minSum, maxSum);
}

const input1 = "1 2 3 4 5";
const input2 = "12 22 34 24 10";
const input3 = "21 15 9 22 34";
const arr1 = input1.split(" ").map(Number);
const arr2 = input2.split(" ").map(Number);
const arr3 = input3.split(" ").map(Number);
miniMaxSum(arr1);
miniMaxSum(arr2);
miniMaxSum(arr3);
