import run from "aocrunner";
import { dir } from "console";

const parseInput = (rawInput: string) => rawInput;

class solver {
  input: string;

  warehouse: string[][];
  placesTurned: number[][];

  x: number;
  y: number;

  direction: number[];

  getStartingPosition() {
    const lines = this.input.trim().split("\n");    

    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === "^") {
          return [x, y];
        }
      }
    }
    return [0, 0];
  }

  constructor(input: string) {
    this.input = input;
    this.warehouse = this.input.trim().split("\n").map((line) => line.split(""));
    [this.x, this.y] = this.getStartingPosition();
    this.direction = [0, -1];
    this.placesTurned = new Array(this.warehouse.length).fill(0).map(() => new Array(this.warehouse[0].length).fill(1));
  }

  wayIsClear() {
    return this.warehouse[this.y + this.direction[1]][this.x + this.direction[0]] != "#";
  }

  turnRight( markTurns: boolean ) {
    if (this.direction[0] === 0) {      
      if (markTurns) {
        this.direction[1] === 1 ? this.placesTurned[this.y][this.x] *= 2 : this.placesTurned[this.y][this.x] *= 3;
      }
      this.direction = [-this.direction[1], 0];
    } else {      
      if (markTurns) {
        this.direction[0] === 1 ? this.placesTurned[this.y][this.x] *= 5 : this.placesTurned[this.y][this.x] *= 7;
      }
      this.direction = [0, this.direction[0]];
    }
  }

  looped() {
    if (this.direction[0] === 0) {     
      if (this.direction[1] === 1)
        return this.placesTurned[this.y][this.x] % 2 === 0;
      else
        return this.placesTurned[this.y][this.x] % 3 === 0;
    } else {
      if (this.direction[0] === 1)
        return this.placesTurned[this.y][this.x] % 5 === 0;
      else
        return this.placesTurned[this.y][this.x] % 7 === 0;
    }
  }

  moveForward() {
    this.x += this.direction[0];
    this.y += this.direction[1];
  }

  move(markTiles: boolean, markTurns: boolean ) {
    if (this.wayIsClear()) {      
      this.moveForward();
      if (markTiles)
        this.warehouse[this.y][this.x] = "X";
    } else {
      this.turnRight( markTurns );      
    }
  }

  tilesTraversed() {
    return this.warehouse.flat().filter((tile) => tile === "X").length;
  }

  reset() {
    this.warehouse = this.input.trim().split("\n").map((line) => line.split(""));
    [this.x, this.y] = this.getStartingPosition();
    this.direction = [0, -1];
    this.placesTurned = new Array(this.warehouse.length).fill(0).map(() => new Array(this.warehouse[0].length).fill(1));

  }   

  part1() {
    this.warehouse[this.y][this.x] = "X";
    while (!(this.x + this.direction[0] < 0 || this.x + this.direction[0] >= this.warehouse[0].length || this.y + this.direction[1] < 0 || this.y + this.direction[1] >= this.warehouse.length)) {
      this.move( true, false );
    }
    return this.tilesTraversed();
  }

  part2() {
    let loopsFound = 0;

    for (let yBox = 0; yBox < this.warehouse.length; yBox++) {
      for (let xBox = 0; xBox < this.warehouse[yBox].length; xBox++) {
        this.reset();
        if (this.warehouse[yBox][xBox] === '#' || this.warehouse[yBox][xBox] === '^' ) {
          continue;
        }      

        this.warehouse[yBox][xBox] = "#";  

        while (!(this.x + this.direction[0] < 0 || this.x + this.direction[0] >= this.warehouse[0].length || this.y + this.direction[1] < 0 || this.y + this.direction[1] >= this.warehouse.length)) {
          this.move( false, true );
          if (this.looped()){            
            loopsFound++;
            break;
          }
        }     
      }
    }

    return loopsFound;
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
        ....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...
        `,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
