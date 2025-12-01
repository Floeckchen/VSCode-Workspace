import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let current_floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      current_floor++;
    } else {
      current_floor--;
    }
  }

  return current_floor;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let current_floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      current_floor++;
    } else {
      current_floor--;
    }
    if (current_floor === -1) {
      return i + 1;
    }
  }

  return Infinity;
};

run({
  part1: {
    tests: [
      {
        input: `(())`,
        expected: 0,
      },
      {
        input: `()()`,
        expected: 0,
      },
      {
        input: `(((`,
        expected: 3,
      },
      {
        input: `(()(()(`,
        expected: 3,
      },
      {
        input: `))(((((`,
        expected: 3,
      },
      {
        input: `())`,
        expected: -1,
      },
      {
        input: `))(`,
        expected: -1,
      },
      {
        input: `)))`,
        expected: -3,
      },
      {
        input: `)())())`,
        expected: -3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `)`,
        expected: 1,
      },
      {
        input: `()())`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
