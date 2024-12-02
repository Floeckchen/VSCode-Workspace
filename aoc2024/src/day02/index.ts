import run from "aocrunner";
import { get } from "http";

const parseInput = (rawInput: string) => rawInput;

class solver {
  constructor(input: string) {
    this.input = input;
  }

  input: string;

  part1() : string {
    let reports = this.getReports();

    var validReports = 0;

    for (let i = 0; i < reports.length; i++) {
      let report = reports[i];
      if (this.reportIsValid(report)) {
        validReports++;
      }
    }

    return validReports + "";
  }

  part2() : string {
    let reports = this.getReports();

    var validReports = 0;

    for (let i = 0; i < reports.length; i++) {
      let report = reports[i];

      for (let j = 0; j < report.length; j++) {
        let tempReport = [...report];

        tempReport.splice(j, 1);   

        if (this.reportIsValid(tempReport)) {
          validReports++;
          break;
        }
      }
    }

    return validReports + "";
  }

  getReports() {
    return this.input.split("\n").map(report => { return report.split(" ").map(Number) });
  }

  reportIsValid(report: Array<number>): boolean {
    return this.isMonotone(report) && this.isNotSteep(report);
  }

  isMonotone(report: Array<number>): boolean {
    let isIncreasing = ( report[0] < report[1] );
    for (let i = 0; i < report.length - 1; i++) {
      if ( (isIncreasing && report[i] > report[i + 1]) 
        || (!isIncreasing && report[i] < report[i + 1]) ) {
        return false;
      }
    }

    return true;
  }
  isNotSteep(report: Array<number>): boolean {
    for (let i = 0; i < report.length - 1; i++) {
      let diff = Math.abs(report[i] - report[i + 1]);
      if ( (diff > 3) ||( diff == 0)) {
        return false;
      }
    }

    return true;
  }
}



const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return  new solver( input ).part1();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return new solver( input ).part2();;
};

run({
  part1: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
        `,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
        `,
        expected: "4",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
