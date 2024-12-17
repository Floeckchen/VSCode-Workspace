import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  input: string;

  constructor(input: string) {
    this.input = input;
  }

  howManyXmasStartInLine(line: string, i: number, lines: string[]) : number {
    return line.split('').map((c, j) => this.howManyXmasStartHere(i,j,lines)).reduce((m, n) => m + n);
  }

  howManyCrossedMasStartInLine(line: string, i: number, lines: string[]) : number {
    return line.split('').map((c, j) => this.howManyCrossedMasStartHere(i,j,lines)).reduce((m, n) => m + n);
  }

  howManyXmasStartHere(i: number, j: number, lines: string[]) : number {
    if (lines[i][j] != 'X')
      return 0;

    const maxI = lines.length;
    const maxJ = lines[0].length;

    let counter = 0;
    // check if we can go right
    if (j + 3 < maxJ)
      if (lines[i][j+1] == 'M' && lines[i][j+2] == 'A' && lines[i][j+3] == 'S')
        counter++;

    // check if we can go down
    if (i + 3 < maxI)
      if (lines[i+1][j] == 'M' && lines[i+2][j] == 'A' && lines[i+3][j] == 'S')
        counter++;

    // check if we can go down-right
    if (i + 3 < maxI && j + 3 < maxJ)
      if (lines[i+1][j+1] == 'M' && lines[i+2][j+2] == 'A' && lines[i+3][j+3] == 'S')
        counter++;

    // check if we can go down-left
    if (i + 3 < maxI && j - 3 >= 0)
      if (lines[i+1][j-1] == 'M' && lines[i+2][j-2] == 'A' && lines[i+3][j-3] == 'S')
        counter++;

    //check if we can go left
    if (j - 3 >= 0)
      if (lines[i][j-1] == 'M' && lines[i][j-2] == 'A' && lines[i][j-3] == 'S')
        counter++;

    // check if we can go up
    if (i - 3 >= 0)
      if (lines[i-1][j] == 'M' && lines[i-2][j] == 'A' && lines[i-3][j] == 'S')
        counter++;

    // check if we can go up-right
    if (i - 3 >= 0 && j + 3 < maxJ)
      if (lines[i-1][j+1] == 'M' && lines[i-2][j+2] == 'A' && lines[i-3][j+3] == 'S')
        counter++;

    // check if we can go up-left
    if (i - 3 >= 0 && j - 3 >= 0)
      if (lines[i-1][j-1] == 'M' && lines[i-2][j-2] == 'A' && lines[i-3][j-3] == 'S')
        counter++;

    return counter;
  }

  howManyCrossedMasStartHere(i: number, j: number, lines: string[]) : number {
    if(lines[i][j] != 'A')
      return 0;
    
    const maxI = lines.length;
    const maxJ = lines[0].length;

    if (i + 1 >= maxI || j + 1 >= maxJ)
      return 0;

    if(i-1 < 0 || j-1 < 0)
      return 0;

    // check if there is a crossed MAS by checkong opposite corners for SM and MS
    if ( ( lines[i-1][j-1] + lines[i+1][j+1] == 'SM' || lines[i-1][j-1] + lines[i+1][j+1] == 'MS' ) && ( lines[i-1][j+1] + lines[i+1][j-1] == 'SM' || lines[i-1][j+1] + lines[i+1][j-1] == 'MS' ) )
      return 1;

    return 0;
  }

  part1() {
    const lines = this.input.split("\n");

    return lines.map((line, i, lines) =>  this.howManyXmasStartInLine(line, i , lines) ).reduce((m, n) => m + n);
  }

  part2() {
    const lines = this.input.split("\n");

    return lines.map((line, i, lines) =>  this.howManyCrossedMasStartInLine(line, i , lines) ).reduce((m, n) => m + n);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  return new solver(input).part1();;
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
        MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX
        `,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX
        `,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
