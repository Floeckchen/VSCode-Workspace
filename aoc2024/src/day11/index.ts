import run from "aocrunner";
import { count } from "console";

const parseInput = (rawInput: string) => rawInput;

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }  

  getStonesMap(stones: string[]) : Map<string, number> {
    const currentStones = new Map();

    for (let i = 0; i < stones.length; i++) {
      if ( currentStones.has(stones[i]) ) {
        currentStones.set(stones[i], currentStones.get(stones[i]) + 1);
      } else {
        currentStones.set(stones[i], 1);
      }
    }
    return currentStones;
  }

  addStoneToMap(currentStones: Map<string, number>, stone: string, times: number) {
    stone = Number(stone).toString();

    if ( currentStones.has(stone) ) {
      currentStones.set(stone, currentStones.get(stone)! + times);
    } else {
      currentStones.set(stone, times);
    }
  }

  blink(currentStones: Map<string, number>, times: number) : Map<string, number> {
    if ( times == 0 ) {
      return currentStones;
    }
    const newStones = new Map();

    currentStones.forEach((value, key) => {
      if ( key == '0' ){
        this.addStoneToMap(newStones, '1', value);
      } else if ( key.length % 2 == 0 ){
        this.addStoneToMap(newStones, key.slice(0, key.length / 2), value);
        this.addStoneToMap(newStones, key.slice(key.length / 2), value);
      } else {
        this.addStoneToMap(newStones, `${ ( key as unknown as number ) * 2024 }`, value);
      }   
    });

    return this.blink(newStones, times - 1);
  }

  part1() {
    const stones = this.input.split(' ');

    let currentStones = this.getStonesMap(stones);

    currentStones = this.blink(currentStones, 25);  

    let count = 0;
    currentStones.forEach( (value, key) => {
      count += value;
    } );

    return count;
  }

  part2() {
    const stones = this.input.split(' ');

    let currentStones = this.getStonesMap(stones);

    currentStones = this.blink(currentStones, 75);  

    let count = 0;
    currentStones.forEach( (value, key) => {
      count += value;
    } );

    return count;
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
        input: `125 17`,
        expected: 55312,
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
