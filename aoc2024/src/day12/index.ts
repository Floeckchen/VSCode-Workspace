import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  private input: string;
  private direction: Array<[number, number]> = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  constructor(input: string) {
    this.input = input;
  }

  getFences(grid: string[][], row: number, col: number, plant: string): number {
    let fences = 0;

    for (let dir = 0; dir < 4; dir++) {
      const newI = row + this.direction[dir][0];
      const newJ = col + this.direction[dir][1];

      if (
        newI < 0 ||
        newI >= grid.length ||
        newJ < 0 ||
        newJ >= grid[newI].length
      ) {
        fences++;
        continue;
      }

      if (grid[newI][newJ] != plant) {
        fences++;
      }
    }

    return fences;
  }

  innerCorner(
    grid: string[][],
    row: number,
    col: number,
    plant: string,
  ): number {
    const topPlant = row - 1 >= 0 ? grid[row - 1][col] : "";
    const leftPlant = col - 1 >= 0 ? grid[row][col - 1] : "";
    const rightPlant = col + 1 < grid[row].length ? grid[row][col + 1] : "";
    const bottomPlant = row + 1 < grid.length ? grid[row + 1][col] : "";
    const topRightPlant =
      row - 1 >= 0 && col + 1 < grid[row].length ? grid[row - 1][col + 1] : "";
    const topLeftPlant =
      row - 1 >= 0 && col - 1 >= 0 ? grid[row - 1][col - 1] : "";
    const bottomRightPlant =
      row + 1 < grid.length && col + 1 < grid[row].length ?
        grid[row + 1][col + 1]
      : "";
    const bottomLeftPlant =
      row + 1 < grid.length && col - 1 >= 0 ? grid[row + 1][col - 1] : "";

    let corners = 0;
    if (topLeftPlant != plant && topPlant == plant && leftPlant == plant) {
      corners++;
    }
    if (topRightPlant != plant && topPlant == plant && rightPlant == plant) {
      corners++;
    }
    if (
      bottomLeftPlant != plant &&
      bottomPlant == plant &&
      leftPlant == plant
    ) {
      corners++;
    }
    if (
      bottomRightPlant != plant &&
      bottomPlant == plant &&
      rightPlant == plant
    ) {
      corners++;
    }

    return corners;
  }

  outerCorner(
    grid: string[][],
    row: number,
    col: number,
    plant: string,
  ): number {
    const topPlant = row - 1 >= 0 ? grid[row - 1][col] : "";
    const leftPlant = col - 1 >= 0 ? grid[row][col - 1] : "";
    const rightPlant = col + 1 < grid[row].length ? grid[row][col + 1] : "";
    const bottomPlant = row + 1 < grid.length ? grid[row + 1][col] : "";

    let corners = 0;
    if (topPlant != plant && leftPlant != plant) {
      corners++;
    }
    if (topPlant != plant && rightPlant != plant) {
      corners++;
    }
    if (bottomPlant != plant && leftPlant != plant) {
      corners++;
    }
    if (bottomPlant != plant && rightPlant != plant) {
      corners++;
    }
    return corners;
  }

  getPosts(grid: string[][], row: number, col: number, plant: string): number {
    return (
      this.innerCorner(grid, row, col, plant) +
      this.outerCorner(grid, row, col, plant)
    );
  }

  calculateRegion(
    grid: string[][],
    visited: boolean[][],
    row: number,
    col: number,
    plant: string,
    calcWholeFence: boolean = true,
  ): number[] {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) {
      return [0, 0];
    }
    if (visited[row][col]) {
      return [0, 0];
    }
    if (grid[row][col] != plant) {
      return [0, 0];
    }

    let fences = 0;
    if (calcWholeFence) {
      fences = this.getFences(grid, row, col, plant);
    } else {
      fences = this.getPosts(grid, row, col, plant);
    }
    let area = 1;

    visited[row][col] = true;

    for (let dir = 0; dir < 4; dir++) {
      const newI = row + this.direction[dir][0];
      const newJ = col + this.direction[dir][1];

      const [f, a] = this.calculateRegion(
        grid,
        visited,
        newI,
        newJ,
        plant,
        calcWholeFence,
      );

      fences += f;
      area += a;
    }

    return [fences, area];
  }

  part1() {
    const grid = this.input.split("\n").map((line) => line.split(""));
    const visited = grid.map((line) => line.map(() => false));

    const cost: number[][] = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        cost.push(
          this.calculateRegion(grid, visited, row, col, grid[row][col]),
        );
      }
    }

    return cost.map(([f, a]) => f * a).reduce((m, n) => m + n);
  }

  part2() {
    const grid = this.input.split("\n").map((line) => line.split(""));
    const visited = grid.map((line) => line.map(() => false));

    const cost: number[][] = [];

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        cost.push(
          this.calculateRegion(grid, visited, row, col, grid[row][col], false),
        );
      }
    }

    return cost.map(([f, a]) => f * a).reduce((m, n) => m + n);
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
        RRRRIICCFF
        RRRRIICCCF
        VVRRRCCFFF
        VVRCCCJFFF
        VVVVCJJCFE
        VVIVCCJJEE
        VVIIICJJEE
        MIIIIIJJEE
        MIIISIJEEE
        MMMISSJEEE
        `,
        expected: 1930,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        AAAA
        BBCD
        BBCC
        EEEC
        `,
        expected: 80,
      },
      {
        input: `
        EEEEE
        EXXXX
        EEEEE
        EXXXX
        EEEEE
        `,
        expected: 236,
      },
      {
        input: `
        AAAAAA
        AAABBA
        AAABBA
        ABBAAA
        ABBAAA
        AAAAAA
        `,
        expected: 368,
      },
      {
        input: `
        RRRRIICCFF
        RRRRIICCCF
        VVRRRCCFFF
        VVRCCCJFFF
        VVVVCJJCFE
        VVIVCCJJEE
        VVIIICJJEE
        MIIIIIJJEE
        MIIISIJEEE
        MMMISSJEEE
        `,
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
