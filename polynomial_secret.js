const fs = require("fs");


function findConstantTerm(points) {
    const n = points.length;
    let result = BigInt(0);
  
    for (let i = 0; i < n; i++) {
      let term = BigInt(points[i].y);
      let numerator = BigInt(1);
      let denominator = BigInt(1);
  
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          numerator = numerator * BigInt(-points[j].x);
          denominator = denominator * BigInt(points[i].x - points[j].x);
        }
      }
  
      if (denominator < BigInt(0)) {
        numerator = -numerator;
        denominator = -denominator;
      }
  
      term = (term * numerator) / denominator;
      result = result + term;
    }
  
    return result;
  }
  

function convertFromBase(value, base) {
  if (base <= 10) {
    return BigInt(parseInt(value, base));
  }

  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let result = BigInt(0);
  value = value.toLowerCase();

  for (let i = 0; i < value.length; i++) {
    const digit = BigInt(digits.indexOf(value[i]));
    result = result * BigInt(base) + digit;
  }

  return result;
}


function processTestCase(testCase) {
  const {
    keys: { k },
    ...pointsData
  } = testCase;
  const points = [];

  Object.entries(pointsData).forEach(([x, data]) => {
    if (x !== "keys") {
      const xVal = parseInt(x);
      const yVal = convertFromBase(data.value, parseInt(data.base));
      points.push({ x: xVal, y: yVal });
    }
  });

  points.sort((a, b) => a.x - b.x);

  const selectedPoints = points.slice(0, k);

  const secret = findConstantTerm(selectedPoints);
  return secret;
}

module.exports = {
  processTestCase,
};

//testcase outputs are
// Test Case 1: 3
// Test Case 2: 79836264058144
