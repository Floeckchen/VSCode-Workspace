import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      result++;
    } else {
      result--;
    }
  }

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `(())`,
        expected: 0
      },
    {
        input: `()()`,
        expected: 0
    },
    {
        input: `(((`,
        expected: 3
      },
    {
        input: `(()(()(`,
        expected: 3
      },
    {
        input: `))(((((`,
        expected: 3
      },
    {
        input: `())`,
        expected: -1
      },
    {
        input: `))(`,
        expected: -1
      },
    {
        input: `)))`,
        expected: -3
      },
    {
        input: `)())())`,
        expected: -3
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
