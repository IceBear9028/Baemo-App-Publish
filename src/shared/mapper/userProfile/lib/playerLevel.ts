export type PlayerLevelResponse = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'N';

export class PlayerLevel {
  readonly S: 'S';
  readonly A: 'A';
  readonly B: 'B';
  readonly C: 'C';
  readonly D: 'D';
  readonly E: 'E';
  readonly N: 'N';
  constructor() {
    this.S = 'S';
    this.A = 'A';
    this.B = 'B';
    this.C = 'C';
    this.D = 'D';
    this.E = 'E';
    this.N = 'N';
  }
  static levelText(input: keyof PlayerLevel | '') {
    switch (input) {
      case 'S':
        return '자강(S)';
      case 'A':
        return 'A';
      case 'B':
        return 'B';
      case 'C':
        return 'C';
      case 'D':
        return 'D';
      case 'E':
        return 'E';
      case 'N':
        return '입문';
      default:
        return '';
    }
  }
}
