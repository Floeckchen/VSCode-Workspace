import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const getInitialInputAndWires = (input: string) => {
  const [initalInput, wires] = input.split("\n\n");

  return [
    initalInput.split("\n").map((x) => x.split(": ")),
    wires.split("\n").map((x) => x.split(" -> ")),
  ];
};

class solver {
  private input: string;
  private wires: Map<string, number>;
  private wireConnections: Map<string, string>;

  constructor(input: string) {
    this.input = input;
    this.wires = new Map<string, number>();

    const [initialInput, wireConnections] = getInitialInputAndWires(this.input);

    this.wireConnections = wireConnections.reduce((acc, [value, key]) => {
      acc.set(key as string, value as string);
      return acc;
    }, new Map<string, string>());

    for (const [key, value] of initialInput) {
      this.wires.set(key as string, parseInt(value as string));
    }

    for (const wire of this.wireConnections.keys()) {
      this.wires.set(wire, -1);
    }
  }

  logWire(start: string, depth = 0) {
    if (depth > 10) {
      return;
    }
    const conn = this.wireConnections.get(start);
    console.log("   ".repeat(depth), start, conn);

    if (!conn) {
      return;
    }
    const [op1, _, op2] = conn!.split(" ");
    this.logWire(op1, depth + 1);
    this.logWire(op2, depth + 1);
  }

  setWiresMap(i: number) {
    this.wires = new Map<string, number>();

    const [initialInput, _] = getInitialInputAndWires(this.input);

    for ( const [key, _] of initialInput ) {
      if ( parseInt(key.slice(1)) == i  || parseInt(key.slice(1)) == i + 1 || parseInt(key.slice(1)) == i + 2 ) {  
        if ( key[0] == "x" || key[0] == "y" ) {
          this.wires.set(key as string, 1);     
        } else {
          this.wires.set(key as string, 0);
        }
      } else {
        this.wires.set(key as string, 0);
      }
    }

    for (const wire of this.wireConnections.keys()) {
      this.wires.set(wire, -1);
    }
  }

  setWiresMapX(i: number) {
    const [initialInput, _] = getInitialInputAndWires(this.input);  

    const binary = i.toString(2).padStart(44, "0").split("").reverse().map(Number);

    for ( const [key, _] of initialInput ) {       
      if ( key[0] == "x" ) {
        this.wires.set(key as string, binary[ parseInt(key.slice(1)) ]);     
      } else {
        this.wires.set(key as string, 0);
      }      
    }
  
    for ( const wire of this.wireConnections.keys() ) {
      this.wires.set( wire, -1);
    }
  }
  setWiresMapY(i: number) {
    const [initialInput, _] = getInitialInputAndWires(this.input);  

    const binary = i.toString(2).padStart(44, "0").split("").reverse().map(Number);

    for ( const [key, _] of initialInput ) {       
      if ( key[0] == "y" ) {
        this.wires.set(key as string, binary[ parseInt(key.slice(1)) ]);     
      } else {
        this.wires.set(key as string, 0);
      }      
    }
  
    for ( const wire of this.wireConnections.keys() ) {
      this.wires.set( wire, -1);
    }
  }

  testRandomNumbers(count: number) {
    this.wires = new Map<string, number>();    

    for ( let i = 0; i < count; i++ ) {
      //create two random numbers with 44 bits
      const x = Math.floor(Math.random() * 2 ** 44);
      const y = Math.floor(Math.random() * 2 ** 44);

      this.setWiresMapX(x);
      this.setWiresMapY(y);

      let result = 0;

      for( const wire of this.wires.keys() ) {
        if (wire[0] != "z") {
          continue;
        }
        result += this.evaluateWire(wire)! * ( 2 ** parseInt(wire.slice(1)));
      }
  
      if ( result != x + y ) {
        return false;
      }
    }
    return true;
  }

  evaluateWire(wire: string, visited: Array<string> = []) {
    if (this.wires.get(wire) != -1) {
      return this.wires.get(wire);
    }
    if (visited.includes(wire)) {
      return -1;
    }
    visited.push(wire);

    const connection = this.wireConnections.get(wire)!;

    const [first, operator, second] = connection.split(" ");

    const firstValue = this.evaluateWire(first, visited)!;
    const secondValue = this.evaluateWire(second, visited)!;

    if (firstValue == -1 || secondValue == -1) {
      return -1;
    }

    switch (operator) {
      case "AND":
        this.wires.set(wire, firstValue & secondValue);
        break;
      case "OR":
        this.wires.set(wire, firstValue | secondValue);
        break;
      case "XOR":
        this.wires.set(wire, firstValue ^ secondValue);
        break;
    }

    return this.wires.get(wire);
  }

  part1() {
    let result = 0;

    for (const wire of this.wires.keys()) {
      if (wire[0] != "z") {
        continue;
      }
      result += this.evaluateWire(wire)! * 2 ** parseInt(wire.slice(1));
    }

    return result;
  }

  getErrorCount() {
    let errorCount = 0;
    for ( let i = 0; i < 42; i++ ) {
      this.setWiresMap(i);

      let result = 0;

      for (const wire of this.wires.keys()) {
        if (wire[0] != "z") {
          continue;
        }
        result += this.evaluateWire(wire)! * 2 ** parseInt(wire.slice(1));
      }
      if ( result != 2 * ( 2 ** i + 2 ** (i+1) + 2 ** (i+2) ) ) {        
        errorCount++;
      }        
    } 
      
    return errorCount;   
  }

  swapWires( wire1: string, wire2: string ) {
    const temp = this.wireConnections.get(wire1);      
    this.wireConnections.set(wire1, this.wireConnections.get(wire2)!);
    this.wireConnections.set(wire2, temp!);
  }

  part2() {  
    // const wiresToSwap = [];

    // const errorCount = this.getErrorCount( );
    // console.log("Initial error count", errorCount);

    // let i = 0;

    // for( const connection1 of this.wireConnections.keys() ) {
    //   console.log( i / this.wireConnections.size * 100, "%");      
    //   for ( const connection2 of [...this.wireConnections.keys()].splice(i+1) ) {        
    //     const temp = this.wireConnections.get(connection1);      
    //     this.wireConnections.set(connection1, this.wireConnections.get(connection2)!);
    //     this.wireConnections.set(connection2, temp!);

    //     const errorCountTmp = this.getErrorCount( );       

    //     if ( errorCountTmp < errorCount ) { 
    //       console.log("Swapping", connection1, connection2, errorCountTmp);
    //       wiresToSwap.push([connection1, connection2]);          
    //     }

    //     this.wireConnections.set(connection2, this.wireConnections.get(connection1)!);
    //     this.wireConnections.set(connection1, temp!);
    //   }
    //   i++;
    // }

    // console.log(wiresToSwap);

    const wiresToSwap = [
      [ 'nwq', 'z36' ], [ 'z18', 'z19' ],
      [ 'z18', 'fvw' ], [ 'mdb', 'z22' ],
      [ 'fsw', 'z36' ], [ 'z19', 'cjb' ],
      [ 'rpv', 'rqd' ], [ 'rpv', 'grf' ],
      [ 'rqd', 'jqn' ], [ 'rqd', 'wpq' ],
      [ 'z22', 'sbs' ], [ 'z37', 'z36' ],
      [ 'grf', 'jqn' ], [ 'grf', 'wpq' ],
      [ 'fvw', 'cjb' ], [ 'z36', 'vmq' ],
      [ 'z36', 'kjd' ], [ 'vvt', 'cjb' ],
      [ 'ffh', 'cjb' ]
    ];

    const goodSwaps = [];

    for ( let swap1 = 0; swap1 < wiresToSwap.length; swap1++ ) {
      for ( let swap2 = swap1 + 1; swap2 < wiresToSwap.length; swap2++ ) {
        for ( let swap3 = swap2 + 1; swap3 < wiresToSwap.length; swap3++ ) {
          for ( let swap4 = swap3 + 1; swap4 < wiresToSwap.length; swap4++ ) {
            this.swapWires(wiresToSwap[swap1][0], wiresToSwap[swap1][1]);
            this.swapWires(wiresToSwap[swap2][0], wiresToSwap[swap2][1]);
            this.swapWires(wiresToSwap[swap3][0], wiresToSwap[swap3][1]);
            this.swapWires(wiresToSwap[swap4][0], wiresToSwap[swap4][1]);

            if ( this.getErrorCount() == 0 ) {
              if( this.testRandomNumbers(50) ) {
                goodSwaps.push( [wiresToSwap[swap1][0], wiresToSwap[swap1][1], wiresToSwap[swap2][0], wiresToSwap[swap2][1], wiresToSwap[swap3][0], wiresToSwap[swap3][1], wiresToSwap[swap4][0], wiresToSwap[swap4][1]].sort().join(",") );
              }
            }

            this.swapWires(wiresToSwap[swap1][0], wiresToSwap[swap1][1]);
            this.swapWires(wiresToSwap[swap2][0], wiresToSwap[swap2][1]);
            this.swapWires(wiresToSwap[swap3][0], wiresToSwap[swap3][1]);
            this.swapWires(wiresToSwap[swap4][0], wiresToSwap[swap4][1]);
          }
        }
      }
    }

    console.log(goodSwaps);

    return 0;
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
        x00: 1
        x01: 0
        x02: 1
        x03: 1
        x04: 0
        y00: 1
        y01: 1
        y02: 1
        y03: 1
        y04: 1

        ntg XOR fgs -> mjb
        y02 OR x01 -> tnw
        kwq OR kpj -> z05
        x00 OR x03 -> fst
        tgd XOR rvg -> z01
        vdt OR tnw -> bfw
        bfw AND frj -> z10
        ffh OR nrd -> bqk
        y00 AND y03 -> djm
        y03 OR y00 -> psh
        bqk OR frj -> z08
        tnw OR fst -> frj
        gnj AND tgd -> z11
        bfw XOR mjb -> z00
        x03 OR x00 -> vdt
        gnj AND wpb -> z02
        x04 AND y00 -> kjc
        djm OR pbm -> qhw
        nrd AND vdt -> hwm
        kjc AND fst -> rvg
        y04 OR y02 -> fgs
        y01 AND x02 -> pbm
        ntg OR kjc -> kwq
        psh XOR fgs -> tgd
        qhw XOR tgd -> z09
        pbm OR djm -> kpj
        x03 XOR y03 -> ffh
        x00 XOR y04 -> ntg
        bfw OR bqk -> z06
        nrd XOR fgs -> wpb
        frj XOR qhw -> z04
        bqk OR frj -> z07
        y03 OR x01 -> nrd
        hwm AND bqk -> z03
        tgd XOR rvg -> z12
        tnw OR pbm -> gnj
        `,
        expected: 2024,
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
