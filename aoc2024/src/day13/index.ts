import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  input: string;

  constructor(input: string) {
    this.input = input;
  }

  parseNumbers(input: string): number[] {
    return input.split(/[^0-9]+/).map(Number).splice(1);
  }

  getGames(input: string): number[][][] {
    return input.split("\n\n").map((game) => game.split("\n").map((line) => this.parseNumbers(line) ) );
  }

  solveGame(game: number[][]): number {
    const [a, b, prize] = game;

    const pressA = ( (prize[0] * b[1]) - (prize[1] * b[0]) ) / ( (a[0] * b[1]) - (a[1] * b[0]) );
    const pressB = ( (prize[1] * a[0]) - (prize[0] * a[1]) ) / ( (a[0] * b[1]) - (a[1] * b[0]) );

    if ( Number.isInteger(pressA) && Number.isInteger(pressB)  && pressA >= 0 && pressB >= 0) {
      return pressA * 3 + pressB;
    }
    return 0;
  }

  adjust(game: number[][]): number[][] {
    game[2] = game[2].map( (x) => x + 10000000000000);
    return game;
  }

  part1() {
    const game = this.getGames(this.input);

    return game.map( (game) => this.solveGame(game) ).reduce((a,b) => a+b);
  }

  part2() {
    const game = this.getGames(this.input);

    return game.map( (game) => this.adjust(game) ).map( (game) => this.solveGame(game) ).reduce((a,b) => a+b);
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
        Button A: X+94, Y+34
        Button B: X+22, Y+67
        Prize: X=8400, Y=5400

        Button A: X+26, Y+66
        Button B: X+67, Y+21
        Prize: X=12748, Y=12176

        Button A: X+17, Y+86
        Button B: X+84, Y+37
        Prize: X=7870, Y=6450

        Button A: X+69, Y+23
        Button B: X+27, Y+71
        Prize: X=18641, Y=10279
        `,
        expected: 480,
      },
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
