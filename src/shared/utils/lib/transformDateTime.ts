import {parse, format, getDay, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';

// 요일 배열
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

// 날짜 변환 함수
export function transformDateTime(dateString: string, temp?: boolean) {
  try {
    // 문자열을 Date 객체로 파싱
    // const formatType = temp ? 'yyyy.MM.dd HH:mm:ss' : 'yyyy-MM-ddTHH:mm:ss';
    const parsedDate = temp ? parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date()) : new Date(dateString);

    // 요일 추출
    const dayOfWeek = daysOfWeek[getDay(parsedDate)];

    // 시간 변환 (오전/오후)
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const period = hours < 12 ? '오전' : '오후';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `:0${minutes}` : `:${minutes}`;

    // 최종 형식으로 변환
    const formattedDate = format(parsedDate, 'yy.MM.dd', {locale: ko});

    return `${formattedDate}(${dayOfWeek}) - ${period} ${formattedHours}${formattedMinutes}`;
  } catch (error) {
    console.error('transformDateTime Error', transformDateTime);
    return '';
  }
}

export function transformDate(dateInfo: string | Date) {
  // 빈 문자열, 혹은 빈 값을 받으면 빈 문자열 return
  if (!dateInfo) {
    return '';
  }

  // 문자열을 Date 객체로 파싱
  const parsedDate = typeof dateInfo === 'string' ? parse(dateInfo, 'yyyy.MM.dd', new Date()) : dateInfo;

  // 요일 추출
  const dayOfWeek = daysOfWeek[getDay(parsedDate)];

  // 최종 형식으로 변환
  const formattedDate = format(parsedDate, 'yy.MM.dd', {locale: ko});

  return `${formattedDate}(${dayOfWeek})`;
}

export function transformTime(dateInfo: string | Date) {
  // 빈 문자열, 혹은 빈 값을 받으면 빈 문자열 return
  if (!dateInfo) {
    return '';
  }

  // 문자열을 Date 객체로 파싱
  const parsedDate = typeof dateInfo === 'string' ? parse(dateInfo, 'yyyy.MM.dd', new Date()) : dateInfo;

  // 시간 변환 (오전/오후)
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes === 0 ? '' : `${minutes} 분`;

  return `${period} ${formattedHours} ${formattedMinutes}`;
}

export function transformDatetime(dateInfo: string | Date) {
  // 빈 문자열, 혹은 빈 값을 받으면 빈 문자열 return
  if (!dateInfo) {
    return '';
  }

  // 문자열을 Date 객체로 파싱
  const parsedDate = typeof dateInfo === 'string' ? parse(dateInfo, 'yyyy.MM.dd', new Date()) : dateInfo;

  // 시간 변환 (오전/오후)
  const month = parsedDate.getMonth();
  const date = parsedDate.getDate();
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();
  const period = hours < 12 ? '오전' : '오후';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${month + 1}월 ${date}일 - ${period} ${formattedHours}:${formattedMinutes}`;
}

/**
 * ### formatSecToMin
 * input - seconds : number(단위:sec)
 * outpust : `MM:SS`
 */
export function formatSecToMin(seconds: number): string {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  return format(new Date(0, 0, 0, 0, mm, ss), 'mm:ss');
}

//프로필 생일 편집
export function transProfileDate(dateInfo: string | Date) {
  // 빈 문자열, 혹은 빈 값을 받으면 빈 문자열 return
  if (!dateInfo) {
    return '';
  }

  // 문자열을 Date 객체로 파싱
  const parsedDate = typeof dateInfo === 'string' ? parse(dateInfo, 'yyyy.MM.dd', new Date()) : dateInfo;

  // 최종 형식으로 변환
  const formattedDate = format(parsedDate, 'yyyy-MM-dd', {locale: ko});

  return `${formattedDate}`;
}

export function transformDateAgo(dateString: string) {
  const parsedDate = new Date(dateString);
  const nowDate = Date.now();

  const diff = (nowDate - parsedDate.getTime()) / 1000;
  // 1분 미만일땐 1분전으로 표기
  if (diff < 60 * 1) {
    return '1분전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(parsedDate, {addSuffix: true, locale: ko});
  }
  // 3일 초과 했을 때는 기본 날짜 포맷
  return format(parsedDate, 'yyyy-MM-dd', {locale: ko}); // 날짜 포맷
}
