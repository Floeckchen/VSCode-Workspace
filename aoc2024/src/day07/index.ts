import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const sum = (a: number, b: number) => a + b;

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  isEqationSolvable(
    solution: number,
    parameters: Array<number>,
    concatActive: boolean = false,
  ): boolean {
    // check if factors are empty
    if (parameters.length === 1) {
      return solution === parameters[0];
    }
    // check if the first parameter is bigger than the solution
    if (parameters[0] > solution) {
      return false;
    }

    return (
      this.isEqationSolvable(
        solution,
        [parameters[0] + parameters[1]].concat(parameters.slice(2)),
        concatActive,
      ) ||
      this.isEqationSolvable(
        solution,
        [parameters[0] * parameters[1]].concat(parameters.slice(2)),
        concatActive,
      ) ||
      (concatActive &&
        this.isEqationSolvable(
          solution,
          [+("" + parameters[0] + parameters[1])].concat(parameters.slice(2)),
          concatActive,
        ))
    );
  }

  part1() {
    const equations: [number, number[]][] = this.input.split("\n")
      .map((line: string) => line.split(":"))
      .map(([a, b]: string[]) => [
        parseInt(a),
        b.trim().split(" ").map(Number),
      ]);

    return equations
      .map((eq) => (this.isEqationSolvable(eq[0], eq[1]) ? eq[0] : 0))
      .reduce(sum);
  }

  part2() {
    const equations: [number, number[]][] = this.input.split("\n")
      .map((line: string) => line.split(":"))
      .map(([a, b]: string[]) => [
        parseInt(a),
        b.trim().split(" ").map(Number),
      ]);

    return equations
      .map((eq) => (this.isEqationSolvable(eq[0], eq[1], true) ? eq[0] : 0))
      .reduce(sum);
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
        190: 10 19
        3267: 81 40 27
        83: 17 5
        156: 15 6
        7290: 6 8 6 15
        161011: 16 10 13
        192: 17 8 14
        21037: 9 7 18 13
        292: 11 6 16 20
        `,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        190: 10 19
        3267: 81 40 27
        83: 17 5
        156: 15 6
        7290: 6 8 6 15
        161011: 16 10 13
        192: 17 8 14
        21037: 9 7 18 13
        292: 11 6 16 20
        `,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
