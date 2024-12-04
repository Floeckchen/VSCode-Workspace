import run from "aocrunner";
import { get } from "http";

const parseInput = (rawInput: string) => rawInput;

class solver {
  input: string;

  active = true;

  calculateProduct = (input: string) => input.slice(4,-1).split(',').map(Number).reduce((m, n) => m * n, this.active ? 1 : 0);  

  decider = (input: string) => { 
    if ( input === 'do()' )      
      this.active = true;
    else if ( input === 'don\'t()' )
      this.active = false;
    else if ( this.active )
      return this.calculateProduct(input);
    return 0;
  }

  constructor(input: string) {
    this.input = input;
  }


  part1() {    
    return this.getMatches()!.map(match => this.calculateProduct(match) ).reduce((m, n)=> m + n);       
  }

  part2() {
    return this.getMatchesWWithInstructions()!.map(match => this.decider(match) ).reduce((m, n)=> m + n);    
  }

  getMatches() {
    const regexPattern: RegExp = /mul\(([0-9]{1,3},[0-9]{1,3})\)/gs;
    return this.input.match(regexPattern);
  }

  getMatchesWWithInstructions() {
    const regexPattern: RegExp = /mul\(([0-9]{1,3},[0-9]{1,3})\)|don't\(\)|do\(\)/gs;
    return this.input.match(regexPattern);
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
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
