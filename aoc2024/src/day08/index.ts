import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  part1() {
    const grid = this.input.split("\n").map((line) => line.split(""));

    const min_x = 0;
    const min_y = 0;
    const max_x = grid[0].length;
    const max_y = grid.length;

    const antennas: string[] = [];
    const antinodes: Set<string> = new Set();

    //Find all antennas
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] != "." && antennas.includes(grid[i][j]) == false) {
          antennas.push(grid[i][j]);
        }
      }
    }

    for (let i = 0; i < antennas.length; i++) {
      const antenna = antennas[i];

      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
          if (grid[row][column] == antenna) {
            for (let y = row; y < grid.length; y++) {
              for (let x = 0; x < grid[y].length; x++) {
                if (y === row && x <= column) {
                  continue;
                }

                if (grid[y][x] == antenna) {
                  const dist_x = column - x;
                  const dist_y = row - y;

                  const y1 = row + dist_y;
                  const x1 = column + dist_x;

                  const y2 = y - dist_y;
                  const x2 = x - dist_x;

                  if (
                    !(y1 < min_y || y1 >= max_y || x1 < min_x || x1 >= max_x)
                  ) {
                    antinodes.add(`${y1},${x1}`);
                  }

                  if (
                    !(y2 < min_y || y2 >= max_y || x2 < min_x || x2 >= max_x)
                  ) {
                    antinodes.add(`${y2},${x2}`);
                  }
                }
              }
            }
          }
        }
      }
    }

    return antinodes.size;
  }

  part2() {
    const grid = this.input.split("\n").map((line) => line.split(""));

    const min_x = 0;
    const min_y = 0;
    const max_x = grid[0].length;
    const max_y = grid.length;

    const antennas: string[] = [];
    const antinodes: Set<string> = new Set();

    //Find all antennas
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] != "." && antennas.includes(grid[i][j]) == false) {
          antennas.push(grid[i][j]);
        }
      }
    }

    for (let i = 0; i < antennas.length; i++) {
      const antenna = antennas[i];

      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
          if (grid[row][column] == antenna) {
            for (let y = row; y < grid.length; y++) {
              for (let x = 0; x < grid[y].length; x++) {
                if (y === row && x <= column) {
                  continue;
                }

                if (grid[y][x] == antenna) {
                  const dist_x = column - x;
                  const dist_y = row - y;

                  let y1 = row;
                  let x1 = column;

                  let y2 = y;
                  let x2 = x;

                  while (
                    !(y1 < min_y || y1 >= max_y || x1 < min_x || x1 >= max_x)
                  ) {
                    antinodes.add(`${y1},${x1}`);
                    y1 += dist_y;
                    x1 += dist_x;
                  }

                  while (
                    !(y2 < min_y || y2 >= max_y || x2 < min_x || x2 >= max_x)
                  ) {
                    antinodes.add(`${y2},${x2}`);
                    y2 -= dist_y;
                    x2 -= dist_x;
                  }
                }
              }
            }
          }
        }
      }
    }

    return antinodes.size;
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
        ............
        ........0...
        .....0......
        .......0....
        ....0.......
        ......A.....
        ............
        ............
        ........A...
        .........A..
        ............
        ............
        `,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      ............
      ........0...
      .....0......
      .......0....
      ....0.......
      ......A.....
      ............
      ............
      ........A...
      .........A..
      ............
      ............
      `,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
