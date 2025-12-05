import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type range = [number, number];
type ingredient = number;

class solver {
  private input: string;

  private ranges: range[];
  private ingredients: ingredient[];
  private consolidatedRanges: range[] = [];

  toRange(input: string): range {
    const [min, max] = input.split("-").map(Number);
    return [min, max];
  }


  constructor(input: string) {
    this.input = input;

    this.ranges = input.split("\n\n")[0].split("\n").map(line => this.toRange(line));
    this.ingredients = input.split("\n\n")[1].split("\n").map(Number);
  }

  addToConsolidatedRanges(range: range) {
    const [min, max] = range;

    for (let i = 0; i < this.consolidatedRanges.length; i++) {
      const [cMin, cMax] = this.consolidatedRanges[i];

      // Check for overlap or adjacency
      if (max >= cMin - 1 && min <= cMax + 1) {
        // Merge ranges
        this.consolidatedRanges[i] = [Math.min(min, cMin), Math.max(max, cMax)];
        return;
      }
    }
    // No overlap found, add as new range
    this.consolidatedRanges.push(range);

  }

  isFresh(ingredient: ingredient): boolean {
    for (const [min, max] of this.consolidatedRanges) {
      if (ingredient >= min && ingredient <= max) {
        return true;
      }
    }
    return false;
  }

  part1() {
    this.ranges = this.ranges.sort((a, b) => a[0] - b[0]);

    this.ranges.forEach((range) => this.addToConsolidatedRanges(range));

    const freshIngredients = this.ingredients.filter(ing => this.isFresh(ing));

    return freshIngredients.length;
  }

  part2() {
    this.ranges = this.ranges.sort((a, b) => a[0] - b[0]);

    this.ranges.forEach((range) => this.addToConsolidatedRanges(range));

    return this.consolidatedRanges.reduce((acc, [min, max]) => acc + (max - min + 1), 0);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return new solver(input).part1();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return new solver(input).part2();
};

run({
  part1: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3-5
10-14
16-20
12-18

1
5
8
11
17
32`,
        expected: 14,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
