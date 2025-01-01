/** ### validatePasswordMessage()
 * #### 사용용도
 * - 비밀번호 유효성검증을 위한 함수
 */
export function validatePasswordMessage(initPw: string, prevPw: string) {
  if (prevPw.length < 8) {
    return '* 비밀번호는 8자 이상이여야 합니다. \n* 비밀번호는 영문 대소문자, 숫자, 특수문자의 조합으로 이루어져야 합니다.';
  }
  if (!/[a-z]/.test(prevPw) || !/[A-Z]/.test(prevPw) || !/[0-9]/.test(prevPw) || !/[!@#$%^&*()]/.test(prevPw)) {
    return '* 비밀번호는 영문 대소문자, 숫자, 특수문자의 조합으로 이루어져야 합니다.';
  }
  if (prevPw !== initPw) {
    return '* 입력한 비밀번호가 서로 다릅니다.';
  }
  return '';
}
