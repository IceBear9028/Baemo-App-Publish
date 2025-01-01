export type GenderResponse = 'M' | 'F' | 'X';

export class Gender {
  public M = 'M';
  public F = 'F';
  public X = 'X';

  static convertText(input: keyof Gender) {
    switch (input) {
      case 'F':
        return '여';
      case 'M':
        return '남';
      default:
        return '';
    }
  }
}
