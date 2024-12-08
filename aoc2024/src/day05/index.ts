import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

class solver {
  input: string;

  constructor(input: string) {
    this.input = input;
  }

  pageIsInOrder(page: string[], rulesMap: string[]): boolean {
    if (page.length === 1) {
      return true;
    }
    return page.map((number) => !rulesMap.includes( number + '|' + page[0] )).every(v => v === true) && this.pageIsInOrder(page.slice(1), rulesMap);
  }

  orderPage(page: string[], rulesMap: string[]): string {
    if (page.length === 1) {
      return page[0];
    }   
    
    let smallest = page.map((number) => !rulesMap.includes( number + '|' + page[0] )).indexOf(false); 
    if ( smallest === -1 ){
      const first = page[0];
      page.splice(0, 1);

      return first + ',' + this.orderPage(page, rulesMap);
    }

    [page[0], page[smallest]] = [page[smallest], page[0]];
    
    return this.orderPage(page, rulesMap);
  }


  mitddleOfPage(page: string) {
    const pageNumbers = page.split(",").map(Number);

    const middle = Math.floor(pageNumbers.length / 2);

    return pageNumbers[middle] as unknown as number;
  }

  part1() {
    const [rules, pages] = this.input.split("\n\n");

    const rulesMap = rules.split("\n");

    return pages.split("\n").map((page) => this.pageIsInOrder(page.split(","), rulesMap) ? this.mitddleOfPage(page) : 0).reduce((m, n) => m + n);    
  }

  part2() {
    const [rules, pages] = this.input.split("\n\n");

    const rulesMap = rules.split("\n");

    return pages.split("\n").map((page) => this.pageIsInOrder(page.split(","), rulesMap) ? 0 : this.mitddleOfPage(this.orderPage(page.split(","), rulesMap))).reduce((m, n) => m + n);   
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
        47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47
        `,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          47|53
          97|13
          97|61
          97|47
          75|29
          61|13
          75|53
          29|13
          97|29
          53|29
          61|53
          97|53
          61|29
          47|13
          75|47
          97|75
          47|61
          75|61
          47|29
          75|13
          53|13

          75,47,61,53,29
          97,61,53,29,13
          75,29,13
          75,97,47,61,53
          61,13,29
          97,13,75,29,47
          `,
        expected: 123,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
