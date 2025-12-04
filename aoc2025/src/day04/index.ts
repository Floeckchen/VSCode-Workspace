import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const direction: Record<string, [number, number]> = {
  up: [0, -1],
  upLeft: [-1, -1],
  left: [-1, 0],
  downLeft: [-1, 1],
  down: [0, 1],
  downRight: [1, 1],
  right: [1, 0],
  upRight: [1, -1]
}

class solver {
  private input: string;
  private warehouse: string[][];

  constructor(input: string) {
    this.input = input;

    this.warehouse = input.split("\n").map(line => line.split(""));
  }

  getNeighbors(x: number, y: number): string[] {
    const neighbors: string[] = [];

    for (const dir in direction) {
      const [dx, dy] = direction[dir];
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < this.warehouse[0].length && ny >= 0 && ny < this.warehouse.length) {
        neighbors.push(this.warehouse[ny][nx]);
      }
    }

    return neighbors;
  }

  getNumberOfAdjacentRolls(x: number, y: number): number {
    const neighbors = this.getNeighbors(x, y);
    return neighbors.filter(cell => cell === "@").length;
  }

  canBeAccessed(x: number, y: number): boolean {
    const neighbors = this.getNumberOfAdjacentRolls(x, y);
    return neighbors < 4;
  }

  removeRoll(x: number, y: number): boolean {
    if (this.warehouse[y][x] !== "@") {
      return false;
    }

    if (!this.canBeAccessed(x, y)) {
      return false;
    }

    this.warehouse[y][x] = ".";

    return true;
  }
  part1() {
    return this.warehouse.reduce((accY, row, y) => {
      return accY + row.reduce((accX, cell, x) => {
        if (cell === "@") {
          return accX + (this.canBeAccessed(x, y) ? 1 : 0);
        }
        return accX;
      }, 0);
    }, 0);
  }

  part2() {
    let removedCount = 0;

    let madeRemoval: boolean;
    do {
      madeRemoval = false;
      for (let y = 0; y < this.warehouse.length; y++) {
        for (let x = 0; x < this.warehouse[0].length; x++) {
          if (this.removeRoll(x, y)) {
            removedCount++;
            madeRemoval = true;
          }
        }
      }
    } while (madeRemoval);

    return removedCount;
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
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
