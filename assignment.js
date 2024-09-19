const testCases = require("./input");

function parseInput(jsonInput) {
  const data = JSON.parse(jsonInput);

  const { n, k } = data.keys;

  const points = Object.keys(data)
    .filter((key) => !isNaN(parseInt(key))) // Filter out the "keys" property
    .map((key) => {
      const base = parseInt(data[key].base, 10);
      const value = parseInt(data[key].value, base);
      return { x: parseInt(key), y: value }; // x is the key, y is the decoded value
    });

  return points.slice(0, k); // Only take the first k points (because k is m+1)
}

// Lagrange Interpolation function
function lagrangeInterpolation(points) {
  const k = points.length;
  let c = 0;

  for (let i = 0; i < k; i++) {
    let xi = points[i].x;
    let yi = points[i].y;

    // Calculate the Lagrange basis polynomial L_i(0)
    let li = 1;
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        li *= -points[j].x / (xi - points[j].x); // L_i(0) = Π (x_j / (x_i - x_j)) for j ≠ i
      }
    }

    // Add the term to the polynomial evaluation at x = 0
    c += yi * li;
  }

  return c;
}

// Main function to solve the problem
function findConstantTerm(jsonInput) {
  const points = parseInput(jsonInput);
  const constantTerm = lagrangeInterpolation(points);
  return constantTerm;
}

//take number of objects from the input array
const n = testCases.length;
var i = 0
while (i<n) {
  const jsonInput = JSON.stringify(testCases[i]);

  const constant = findConstantTerm(jsonInput);

  console.log(`The constant term of testcase[${i}]`, constant);
  i++;
}
