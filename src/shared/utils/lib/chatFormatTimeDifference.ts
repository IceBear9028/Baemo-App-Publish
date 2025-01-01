import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  parseISO,
} from 'date-fns';

export function chatFormatTimeDifference(dateString2: string): string {
  // 날짜 문자열을 Date 객체로 변환
  const date1 = new Date();
  const date2 = parseISO(dateString2);
  // 시간 차이를 계산
  const diffInMinutes = differenceInMinutes(date1, date2);
  const diffInHours = differenceInHours(date1, date2);
  const diffInDays = differenceInDays(date1, date2);
  const diffInWeeks = differenceInWeeks(date1, date2);
  const diffInMonths = differenceInMonths(date1, date2);
  const diffInYears = differenceInYears(date1, date2);

  //모임이나 운동 처음 생성됐을때 null값 공란으로 처리
  if (!dateString2) {
    return '';
  }

  // 조건에 맞는 문자열 반환
  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else if (diffInWeeks < 4) {
    // 약간의 오차가 있을 수 있지만 4주로 계산
    return `${diffInWeeks}주 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  } else {
    return `${diffInYears}년 전`;
  }
}
