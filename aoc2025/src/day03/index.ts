import run from "aocrunner";

type Bank = string;
type Length = number;

const parseInput = (rawInput: string) => rawInput;

class solver {


  private input: string;
  private banks: string[];

  constructor(input: string) {
    this.input = input;

    this.banks = this.input.split("\n");
  }

  findHighestBankDigit(bank: string): [number, number] {
    let maxDigit = -1;
    let maxIndex = -1;

    if (bank === "") {
      return [maxIndex, maxDigit];
    }

    bank.split("").forEach((digit, index) => {
      const digitValue = Number(digit);

      if (digitValue > maxDigit) {
        maxDigit = digitValue;
        maxIndex = index;
      }

      if (digitValue == 9) {
        return [maxIndex, maxDigit];
      }
    });

    return [maxIndex, maxDigit];
  }

  findJoltage(bank: string): number {

    const [maxIndex, maxDigit] = this.findHighestBankDigit(bank);

    const [bankBefore, bankAfter] = [this.findHighestBankDigit(bank.substring(0, maxIndex)), this.findHighestBankDigit(bank.substring(maxIndex + 1))];

    return Math.max(bankBefore[1] > 0 ? bankBefore[1] * 10 + maxDigit : 0, bankAfter[1] > 0 ? maxDigit * 10 + bankAfter[1] : 0);
  }

  findHighestJoltage(bank: Bank, length: Length, memo: Record<Bank, Record<Length, number>> = {}): number {
    if (bank in memo && length in memo[bank]) {
      return memo[bank][length];
    }

    if (length == 1) {
      return Math.max(...bank.split("").map(digit => Number(digit)));
    }

    if (bank.length == length) {
      return Number(bank);
    }

    const digit = bank[0];
    const remainingBank = bank.substring(1);

    const joltage1 = Number(digit + this.findHighestJoltage(remainingBank, length - 1, memo));
    const joltage2 = this.findHighestJoltage(remainingBank, length, memo);

    const maxJoltage = Math.max(joltage1, joltage2);

    if (!(bank in memo)) {
      memo[bank] = {};
    }

    memo[bank][length] = maxJoltage;

    return maxJoltage;
  }

  part1() {
    return this.banks.map(bank => this.findJoltage(bank)).reduce((a, b) => a + b, 0);
  }

  part2() {
    return this.banks.map(bank => this.findHighestJoltage(bank, 12)).reduce((a, b) => a + b, 0);
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
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
      {
        input: `987654321111111`,
        expected: 987654321111,
      },
      {
        input: `811111111111119`,
        expected: 811111111119,
      },
      {
        input: `234234234234278`,
        expected: 434234234278,
      },
      {
        input: `818181911112111`,
        expected: 888911112111,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
