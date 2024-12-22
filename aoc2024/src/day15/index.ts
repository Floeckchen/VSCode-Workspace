import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const sum = (a : number ,b : number) => a+b

const identity = (a : string) => a;

const widen = (a : string) => {
  switch (a) {
    case "#":
      return "##";
    case "O":
      return "[]";
    case "@":
      return "@.";
  }
  return "..";

}

const costFunction = ( c : string, position: [number, number] ) => {
  if ( c === "O" || c === "[" ) {
    return position[0] * 100 + position[1];
  }
  return 0.
}


class roboter {
  private position: [number, number];  
  private grid: string[][];
  private direction: Map<string, [number, number]> = new Map([ ["^", [0, -1]], [">", [1, 0]], ["v", [0, 1]], ["<", [-1, 0]] ]);

  constructor(grid: string[][]) {
    this.grid = grid;
    this.position = this.findPosition(grid);
  }

  findPosition(grid: string[][]): [number, number] {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === "@") {
          return [col, row];
        }
      }
    }
    return [0, 0];
  }



  moveValid(position : [number, number], direction: string): boolean {
    if (!this.direction.has(direction)) {
      return false;
    }
    const [dx, dy] = this.direction.get(direction) as [number, number];
    const [newX, newY] = [position[0] + dx, position[1] + dy];

    if (this.grid[newY][newX] === "#") {
      return false;
    } 
    if (this.grid[newY][newX] === ".") {
      return true;
    }
    if (this.grid[newY][newX] === "O") {
      return this.moveValid([newX, newY], direction);
    }
    if (this.grid[newY][newX] === "[") {
      if (direction === "v" || direction === "^") {
        return ( this.moveValid([newX, newY], direction) && this.moveValid([newX+1,newY], direction) );
      }
      else {
        return this.moveValid([newX, newY], direction);
      }
    }
    if (this.grid[newY][newX] === "]") {
      if (direction === "v" || direction === "^") {
        return ( this.moveValid([newX, newY], direction) && this.moveValid([newX-1,newY], direction) );
      }
      else {
        return this.moveValid([newX, newY], direction);
      }
    }

    return false;
  }

  push(position : [number, number], direction: string) {
    if (this.grid[position[1]][position[0]] === ".") {
      return;
    }
    const [dx, dy] = this.direction.get(direction) as [number, number];
    const [newX, newY] = [position[0] + dx, position[1] + dy];

    if (this.grid[position[1]][position[0]] === "O") {
      this.push([newX,newY], direction);
      this.grid[position[1]][position[0]] = ".";
      this.grid[newY][newX] = "O";
      return;
    }

    if (this.grid[position[1]][position[0]] === "[") { 
      if (direction === "v" || direction === "^") {
        this.push([newX,newY], direction);
        this.push([newX+1,newY], direction);
      }
      else {
        this.push([newX,newY], direction);
      }

      this.grid[position[1]][position[0]] = ".";
      this.grid[position[1]][position[0]+1] = ".";
      this.grid[newY][newX] = "[";
      this.grid[newY][newX+1] = "]";
      return;
    }

    if (this.grid[position[1]][position[0]] === "]") {   
      if (direction === "v" || direction === "^") {
        this.push([newX,newY], direction);
        this.push([newX-1,newY], direction);
      }
      else {
        this.push([newX,newY], direction);
      }

      this.grid[position[1]][position[0]] = ".";
      this.grid[position[1]][position[0]-1] = ".";
      this.grid[newY][newX] = "]";
      this.grid[newY][newX-1] = "[";
      return;
    }
  }
  

  move(direction: string) {
    if (this.moveValid(this.position, direction)) {
      const newX = this.position[0] + this.direction.get(direction)![0];
      const newY = this.position[1] + this.direction.get(direction)![1];
      this.push([newX,newY], direction);

      this.grid[this.position[1]][this.position[0]] = ".";

      this.position[0] += this.direction.get(direction)![0];
      this.position[1] += this.direction.get(direction)![1];

      this.grid[this.position[1]][this.position[0]] = "@";
    }    
  }
}

class solver {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  parseGridMoves(input: string, mapper : (c: string) => string ): [string[][], string] {
    const [grid, moves] = input.split("\n\n");
    return [grid.split("\n").map((line) => line.split("").flatMap( (c:string) => mapper(c).split("")  ) ), moves];
  }


  part1() {
    const [grid, moves] = this.parseGridMoves(this.input, identity);
    const robot = new roboter(grid);

    for (const move of moves) {
      robot.move(move);
    }

    return grid.map( (row, i) => row.map( (char, j) => costFunction(char, [i,j]) ).reduce(sum) ).reduce(sum);
  }

  part2() {
    const [grid, moves] = this.parseGridMoves(this.input, widen);
    const robot = new roboter(grid);

    for (const move of moves) {
      robot.move(move);
    }    

    return grid.map( (row, i) => row.map( (char, j) => costFunction(char, [i,j]) ).reduce(sum) ).reduce(sum);
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
        ##########
        #..O..O.O#
        #......O.#
        #.OO..O.O#
        #..O@..O.#
        #O#..O...#
        #O..O..O.#
        #.OO.O.OO#
        #....O...#
        ##########

        <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
        vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
        ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
        <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
        ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
        ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
        >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
        <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
        ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
        v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
        `,
        expected: 10092,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
      input: `
        ##########
        #..O..O.O#
        #......O.#
        #.OO..O.O#
        #..O@..O.#
        #O#..O...#
        #O..O..O.#
        #.OO.O.OO#
        #....O...#
        ##########

        <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
        vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
        ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
        <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
        ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
        ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
        >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
        <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
        ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
        v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^
        `,
        expected: 9021,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
