import run from "aocrunner";
import readlineSync from "readline-sync";

const parseInput = (rawInput: string) => rawInput;

const mod =(n : number, m :number ) : number => {
  return ((n % m) + m) % m;
}

class roboter { 
  public position: [number, number];	
  private velocity: [number, number];
  private dimensions: [number, number];

  constructor(input: string, dimensions: [number, number]) {
    [ this.position, this.velocity ] =input.split(" ").map( (x) => ( x.split(/[^0-9-]+/).map(Number).splice(1) ) as [number, number] );
    this.dimensions = dimensions;
  }

  move() {
    this.position[0] += this.velocity[0]
    this.position[1] += this.velocity[1]
    this.position[0] = mod(this.position[0], this.dimensions[0]);
    this.position[1] = mod(this.position[1], this.dimensions[1]);
  }

  getQuadrant() : number {
    // bottom right
    if ( this.position[0] > Math.floor(this.dimensions[0] / 2) && this.position[1] > Math.floor(this.dimensions[1] / 2) ) {
      return 1;
    }
    // bottom left
    if ( this.position[0] < Math.floor(this.dimensions[0] / 2) && this.position[1] > Math.floor(this.dimensions[1] / 2) ) {
      return 2;
    }
    // top left
    if ( this.position[0] < Math.floor(this.dimensions[0] / 2) && this.position[1] < Math.floor(this.dimensions[1] / 2) ) {
      return 3;
    }
    // top right
    if ( this.position[0] > Math.floor(this.dimensions[0] / 2) && this.position[1] < Math.floor(this.dimensions[1] / 2) ) {
      return 4;
    }
    return 0;
  }


}

class solver {
  private input: string;
  private robots: roboter[];

  constructor(input: string) {
    this.input = input;
    this.robots = input.split("\n").map( (robot) => new roboter(robot, [101, 103]) );
  }

  part1() {
    for (let i = 0; i < 100; i++) {
      this.robots.forEach( (robot) => robot.move() );
    }

    const quadrantCounts = [0,0,0,0,0];
    this.robots.forEach( (robot) => quadrantCounts[robot.getQuadrant()]++ );

    return quadrantCounts[1] * quadrantCounts[2] * quadrantCounts[3] * quadrantCounts[4];
  }

  getGrid(robots: roboter[]) : string[] {
    const grid = Array.from({length: 103}, () => Array.from({length: 101}, () => "."));
    robots.forEach( (robot) => grid[robot.position[1]][robot.position[0]] = "#");
    return grid.map( (row) => row.join(""));
  }

  part2() {
    let quadrantCounts = [0,0,0,0,0];
    let i = 0;
    while (true) {
      i++;
      quadrantCounts = [0,0,0,0,0];
      this.robots.forEach( (robot) => robot.move() );
      this.robots.forEach( (robot) => quadrantCounts[robot.getQuadrant()]++ );
      
      const grid =this.getGrid(this.robots);   
      
      // ask user if this is a tree, let him decide
      if( ( i-27 ) % 101 === 0 && ( i - 75 ) % 103 === 0 ) {
        grid.forEach( (row) => console.log(row) );
        const userInput = readlineSync.question("Is this a tree? (yes/no): ");
        if (userInput.toLowerCase() === "yes") {
          break;
        }
      }
    } 
    return i;       
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
        p=0,4 v=3,-3
        p=6,3 v=-1,-3
        p=10,3 v=-1,2
        p=2,0 v=2,-1
        p=0,0 v=1,3
        p=3,0 v=-2,-2
        p=7,6 v=-1,-3
        p=3,0 v=-1,-2
        p=9,3 v=2,3
        p=7,3 v=-1,2
        p=2,4 v=2,-3
        p=9,5 v=-3,-3
        `,
        expected: 12,
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
