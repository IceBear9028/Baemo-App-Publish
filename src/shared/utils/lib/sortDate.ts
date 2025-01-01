// 날짜 문자열을 Date 객체로 변환하는 함수
import {parse, compareDesc} from 'date-fns';

const parseDateString = (dateString: string): Date => {
  return parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date());
};

/** #### sortDate()
 * #### 사용용도
 * - yyyy.MM.dd HH:mm:ss [] 형태의 Array 를 시간 순서대로 정렬하는 함수
 * #### Params
 * - inputArray : string[] - 정렬하고자 하는 시간문자열이 담긴 Array
 * - isDescending : boolean - ture 일 경우 최신시간 기준으로 정렬, false 는 가장 오래된 시간 기준으로 정렬
 * */
export function sortDate<Obj>(inputArray: Obj[], baseKey: keyof Obj, isDescending = true) {
  try {
    return inputArray.sort((a, b) => {
      if (isDescending) {
        return compareDesc(parseDateString(a[baseKey] as string), parseDateString(b as string));
      }
      return compareDesc(parseDateString(b[baseKey] as string), parseDateString(a[baseKey] as string));
    });
  } catch (error) {
    console.error(error);
    throw inputArray;
  }
}
