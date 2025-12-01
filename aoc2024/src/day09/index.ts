import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const sum = (a: number, b: number) => a + b;

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  part1() {
    const harddrive = this.input.split("").map(Number);
    const filled = harddrive.filter((_, i) => i % 2 === 0);
    const empty = harddrive.filter((_, i) => i % 2 === 1);

    let position_start = 0;
    let position_end = harddrive.reduce(sum);
    let index_start = 0;
    let index_end = filled.length - 1;

    let result = 0;

    while (position_start < position_end && index_start <= index_end) {
      const already_filled = filled[index_start];

      for (let i = 0; i < already_filled; i++) {
        result += position_start * index_start;
        position_start++;
      }

      while (
        empty[index_start] != 0 &&
        position_start < position_end &&
        index_start < index_end
      ) {
        result += position_start * index_end;

        empty[index_start] -= 1;
        position_start++;
        position_end--;

        filled[index_end] -= 1;

        if (filled[index_end] == 0) {
          index_end--;
        }
      }
      index_start++;
    }

    return result;
  }

  getHarddrive() {
    let harddrive = "";
    for (let i = 0; i < this.input.length; i++) {
      if (i % 2 == 0) {
        for (let j = 0; j < (this.input[i] as unknown as number); j++) {
          harddrive += String.fromCharCode(i / 2 + 33);
        }
      } else {
        for (let j = 0; j < (this.input[i] as unknown as number); j++) {
          harddrive += String.fromCharCode(32);
        }
      }
    }
    return harddrive;
  }

  setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  part2() {
    let harddriveDetails = this.getHarddrive();

    for (let i = harddriveDetails.length - 1; i >= 0; ) {
      if (harddriveDetails[i] == " ") {
        i--;
        continue;
      }

      const current = harddriveDetails[i];
      let emptySpaceNeeded = "";
      while (harddriveDetails[i] == current) {
        emptySpaceNeeded += " ";
        i--;
      }

      const freeSpace = harddriveDetails.indexOf(emptySpaceNeeded);

      if (i < freeSpace || freeSpace == -1) {
        continue;
      }

      while (harddriveDetails.indexOf(current) != -1) {
        harddriveDetails = harddriveDetails.replace(current, " ");
      }

      for (let j = freeSpace; j < freeSpace + emptySpaceNeeded.length; j++) {
        harddriveDetails = this.setCharAt(harddriveDetails, j, current);
      }
    }

    return harddriveDetails
      .split("")
      .map((x, i) => {
        return Math.max(x.charCodeAt(0) - 33, 0) * i;
      })
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
        2333133121414131402
        `,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2333133121414131402
        `,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
