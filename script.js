const { execSync } = require("child_process");

// ===== CONFIG =====
const START_DATE = new Date("2024-01-07"); // Sunday start recommended
const COMMITS_PER_DAY = 5;

// 5x7 font for "HIRE ME"
const letters = {
  H: [
    "10101",
    "10101",
    "11111",
    "10101",
    "10101",
    "10101",
    "10101"
  ],
  I: [
    "11111",
    "00100",
    "00100",
    "00100",
    "00100",
    "00100",
    "11111"
  ],
  R: [
    "11110",
    "10001",
    "11110",
    "10100",
    "10010",
    "10001",
    "10001"
  ],
  E: [
    "11111",
    "10000",
    "11110",
    "10000",
    "10000",
    "10000",
    "11111"
  ],
  M: [
    "10001",
    "11011",
    "10101",
    "10101",
    "10001",
    "10001",
    "10001"
  ],
  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000"
  ]
};

// Build full grid
const text = "HIRE ME";
const grid = [];

for (let row = 0; row < 7; row++) {
  let line = "";
  for (let char of text) {
    line += letters[char][row] + "0"; // spacing
  }
  grid.push(line);
}

// Flatten grid into day sequence
const days = [];
for (let col = 0; col < grid[0].length; col++) {
  for (let row = 0; row < 7; row++) {
    days.push(grid[row][col]);
  }
}

// Determine today index
const today = new Date();
const diffDays = Math.floor((today - START_DATE) / (1000 * 60 * 60 * 24));

if (diffDays < 0 || diffDays >= days.length) {
  console.log("Outside pattern range");
  process.exit(0);
}

if (days[diffDays] === "1") {
  for (let i = 0; i < COMMITS_PER_DAY; i++) {
    execSync(`
      echo "${Date.now()}" >> data.txt
      git add .
      git commit -m "pixel"
    `);
  }
}
