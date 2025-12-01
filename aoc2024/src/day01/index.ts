import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let result = 0;
  let list1 = [];
  let list2 = [];

  for (let i = 0; i < lines.length; i++) {
    const [value_list1, value_list2] = lines[i].split("   ").map(Number);

    list1.push(value_list1);
    list2.push(value_list2);
  }

  list1 = list1.sort((a, b) => a - b);
  list2 = list2.sort((a, b) => a - b);

  for (let i = 0; i < list1.length; i++) {
    result += Math.abs(list1[i] - list2[i]);
  }

  return result + "";
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let result = 0;
  let list1 = [];
  let list2 = [];

  for (let i = 0; i < lines.length; i++) {
    const [value_list1, value_list2] = lines[i].split("   ").map(Number);

    list1.push(value_list1);
    list2.push(value_list2);
  }

  list1 = list1.sort((a, b) => a - b);
  list2 = list2.sort((a, b) => a - b);

  for (let i = 0; i < list1.length; i++) {
    result += list1[i] * getOccurrence(list2, list1[i]);
  }

  return result + "";
};

const getOccurrence = (array: Array<number>, value: number) => {
  let result = 0;
  for (let i = 0; array[i] <= value && i < array.length; i++) {
    if (array[i] == value) {
      result++;
    }
  }
  return result;
  //return array.filter((v) => (v === value)).length;
};

run({
  part1: {
    tests: [
      {
        input: `
          3   4
          4   3
          2   5
          1   3
          3   9
          3   3
        `,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          3   4
          4   3
          2   5
          1   3
          3   9
          3   3
      `,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
