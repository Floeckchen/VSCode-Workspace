import run from "aocrunner";
import { get } from "http";

const parseInput = (rawInput: string) => rawInput;

const mod =(n : number, m :number ) : number => {
  return ((n % m) + m) % m;
};


class solver {
  private input: string;
  private ranges : number[][];
  private dialPosition : number = solver.starting_position;

  static starting_position = 50;

  constructor(input: string) {
    this.input = input;

    this.ranges = this.input.split(",").map(line => line.split("-").map(Number));
  }

  getInvalidNumbersInRange(range: number[]) : number {   
    const minNumber = this.getMinNumber(range[0]);
    const maxNumber = this.getMaxNumber(range[1]);

    return Array.from({length: maxNumber - minNumber + 1}, (_, i) => i + minNumber).map( number => 
      this.getInvalidNumber(number)
    ).reduce( (a,b) => a + b, 0);

  }

  getLength =(val : number): number => {
    return val.toString().length;
  }

  getInvalidNumber(val: number) : number {
    return  val * ( 10 ** this.getLength(val)  ) + val ;
  }

  getMinNumber(val: number) : number {
    const length = this.getLength(val);
    let halfLength:number;
    let firstHalf:number;

    if ( length %2 == 0 ) {
      halfLength = length / 2;
      firstHalf = Math.floor( val / (10 ** halfLength) );
    } else {
      halfLength = Math.floor( length / 2 );
      firstHalf = 10 ** halfLength; 
    }
    
    if ( this.getInvalidNumber(firstHalf) < val ) {
      firstHalf += 1;
    }

    return firstHalf;
  }
  getMaxNumber(val: number) : number {
    const minNumber = this.getMinNumber(val);
    if ( this.getInvalidNumber(minNumber) > val ) {
      return minNumber - 1;
    }
    return minNumber
  }

  part1() {  
    return this.ranges.map( range => this.getInvalidNumbersInRange(range)).reduce( (a,b) => a + b, 0);
  }

  part2() {
    return 0;
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
        input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`,
        expected: 1227775554,
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
