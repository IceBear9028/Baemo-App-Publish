import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

export function exerciseTimeFormat(start?: Date, end?: Date) {
  // 1. 두 Date 중 한개라도 값이 없는 경우
  if (!start || !end) {
    return {datePart: '', timeRange: ''};
  }

  // Date 의 날짜 추출 함수
  const formatDate = (date: Date) => format(date, 'yyyy.MM.dd (EEE)', {locale: ko});

  // Date 의 시간 추출 함수
  const formatHour = (date: Date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}시${minute > 0 ? ` ${minute}분` : ''}`;
  };

  const datePart = formatDate(start);
  const timeRange = `${formatHour(start)} ~ ${formatHour(end)}`;

  return {
    datePart,
    timeRange,
  };
}
