/** ### maskName
 * 이름의 중간을 * 로 치환
 *
 */
export function maskName(input: string): string {
  // 문자열의 길이가 2인 경우, 첫 번째 문자는 그대로 두고 두 번째 문자는 *로 대체
  if (input.length === 2) {
    return input[0] + '*';
  }

  // 문자열의 길이가 1이거나 0인 경우, 그대로 반환
  if (input.length <= 1) {
    return input;
  }

  // 맨 앞 문자
  const firstChar = input[0];
  // 맨 뒤 문자
  const lastChar = input[input.length - 1];
  // 중간 부분을 *로 대체
  const maskedMiddle = '*'.repeat(input.length - 2);

  return firstChar + maskedMiddle + lastChar;
}
