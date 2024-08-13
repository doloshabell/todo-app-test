function plusMinus(arr) {
  const n = arr.length;

  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;

  arr.forEach((num) => {
    if (num > 0) {
      positiveCount++;
    } else if (num < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
  });

  const positiveRatio = positiveCount / n;
  const negativeRatio = negativeCount / n;
  const zeroRatio = zeroCount / n;

  console.log(positiveRatio.toFixed(6));
  console.log(negativeRatio.toFixed(6));
  console.log(zeroRatio.toFixed(6));
}

const arr1 = [-4, 3, -9, 0, 4, 1];
const arr2 = [1, 1, 0, -1, -1]
plusMinus(arr1);
console.log("--------");
plusMinus(arr2);
