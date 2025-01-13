import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  summitsReached(map: number[][], i: number, j: number, currentHeight: number) : number[][]{

    if(map[i][j] === 9)
      return [[i,j]];

    const result = [];

    const direction : Array<[number, number]> = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let dir = 0; dir < 4; dir++) {
      const newI = i + direction[dir][0];
      const newJ = j + direction[dir][1];
 
      if (newI < 0 || newI >= map.length || newJ < 0 || newJ >= map[newI].length) {
        continue;
      }

      if (map[newI][newJ] != currentHeight + 1) {
        continue;
      }

      result.push(...this.summitsReached(map, newI, newJ, map[newI][newJ]));
    }

    return result
  }

  part1() {
    const map = this.input.split("\n").map((line) => line.split("").map(Number));

    let result = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] != 0) {
          continue;
        }
        result += new Set( this.summitsReached(map, i, j, 0).map( x => `${ x[0] }|${ x[1] }`) ).size;
      }
    }

    return result;
  }

  part2() {
    const map = this.input.split("\n").map((line) => line.split("").map(Number));

    let result = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] != 0) {
          continue;
        }
        result += this.summitsReached(map, i, j, 0).length;
      }
    }

    return result;
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
        input: `
        89010123
        78121874
        87430965
        96549874
        45678903
        32019012
        01329801
        10456732
        `,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        89010123
        78121874
        87430965
        96549874
        45678903
        32019012
        01329801
        10456732
        `,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
