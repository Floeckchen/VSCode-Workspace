import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let totalArea = 0;

  lines.forEach((line) => {
    const [l, w, h] = line.split("x").map(Number);
    const volume = getArea(l, w, h);

    totalArea += volume;
  });

  return totalArea + "";
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");

  let totalLength = 0;

  lines.forEach((line) => {
    const [l, w, h] = line.split("x").map(Number);
    const length = getRibbonLength(l, w, h);

    totalLength += length;
  });

  return totalLength + "";
};

const getArea = (l: number, w: number, h: number) => {
  return 2 * l * w + 2 * w * h + 2 * h * l + Math.min(l * w, w * h, h * l);
};

const getRibbonLength = (l: number, w: number, h: number) => {
  const sorted = [l, w, h].sort((a, b) => a - b);

  return 2 * sorted[0] + 2 * sorted[1] + l * w * h;
};

run({
  part1: {
    tests: [
      {
        input: `2x3x4`,
        expected: "58",
      },
      {
        input: `1x1x10`,
        expected: "43",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2x3x4`,
        expected: "34",
      },
      {
        input: `1x1x10`,
        expected: "14",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
