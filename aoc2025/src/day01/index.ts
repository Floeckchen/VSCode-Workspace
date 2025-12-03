import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const mod = (n: number, m: number): number => {
  return ((n % m) + m) % m;
}

class solver {
  private input: string;
  private rotations: string[];
  private dialPosition: number = solver.starting_position;

  static starting_position = 50;

  constructor(input: string) {
    this.input = input;

    this.rotations = this.input.split("\n").map(line => line.trim());
  }

  rotate(rotation: string): number {
    const direction = rotation[0];
    const distance = Number(rotation.slice(1));

    if (direction == 'L') {
      this.dialPosition = mod(this.dialPosition - distance, 100);
    } else if (direction == 'R') {
      this.dialPosition = mod(this.dialPosition + distance, 100);
    } else {
      throw new Error(`Unknown direction ${direction} in rotation ${rotation}`);
    }

    return this.dialPosition == 0 ? 1 : 0;
  }

  rotate_count(rotation: string): number {
    const direction = rotation[0];
    let distance = Number(rotation.slice(1));
    let passes_zero = false;

    const full_rotations = Math.floor(distance / 100);

    distance = mod(distance, 100);

    if (direction == 'L') {
      if (this.dialPosition <= distance && this.dialPosition != 0) {
        passes_zero = true;
      }
      this.dialPosition = mod(this.dialPosition - distance, 100);
    } else if (direction == 'R') {
      if (this.dialPosition + distance >= 100) {
        passes_zero = true;
      }
      this.dialPosition = mod(this.dialPosition + distance, 100);
    } else {
      throw new Error(`Unknown direction ${direction} in rotation ${rotation}`);
    }

    return passes_zero ? full_rotations + 1 : full_rotations;
  }


  part1() {
    return this.rotations.map(rotation => this.rotate(rotation)).reduce((sum, p) => sum + p);
  }

  part2() {
    return this.rotations.map(rotation => this.rotate_count(rotation)).reduce((sum, p) => sum + p);
  }


}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return new solver(input).part1();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return new solver(input).part2();;
};

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 6,
      },
      {
        input: `L150`,
        expected: 2,
      },
      {
        input: `R150`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
