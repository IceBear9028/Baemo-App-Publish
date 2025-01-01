import {useEffect, useState} from 'react';
import {Groups} from '~/shared/mapper/groups';
import {ExerciseIntro} from '~/shared/mapper/exercise';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

export interface PutExerciseEditInfoStatus {
  exerciseId: number;
  name: string;
  location: string;
  locationDetail: LocationDetail;
  startTime: null | Date;
  endTime: null | Date;
  intro: string;
  headCount: string;
  guestHeadCount: string;
}

export function useEditGroupExerciseStatus(input: ExerciseIntro) {
  const [errorMessage, setError] = useState({
    name: '',
    location: '',
    startTime: '',
    endTime: '',
    time: '',
    intro: '',
    headCount: '',
    guestHeadCount: '',
  });
  const [exerciseStatus, setStatus] = useState<PutExerciseEditInfoStatus>({
    exerciseId: input.exerciseId,
    name: input.name,
    location: input.location,
    locationDetail: input.locationDetail,
    startTime: input.startTime,
    endTime: input.endTime,
    intro: input.description,
    headCount: String(input.headCount),
    guestHeadCount: String(input.guestHeadCount),
  });
  const {intro, ...exercise} = exerciseStatus;
  const isValid = Object.values(errorMessage).every(item => item === '') && Object.values(exercise).every(item => !!item);

  function changeName(name: string) {
    setStatus(prev => ({...prev, name}));
    if (name.length <= 2) {
      setError(prev => ({...prev, name: '운동이름은 최소 2글자 이상 지어야 합니다.'}));
    } else {
      setError(prev => ({...prev, name: ''}));
    }
  }
  function changeLocation(location: string) {
    setStatus(prev => ({...prev, location}));
    if (!location.length) {
      setError(prev => ({...prev, location: '위치를 지정해주세요.'}));
    } else {
      setError(prev => ({...prev, location: ''}));
    }
  }
  function changeLocationDetail(locationDetail: LocationDetail) {
    setStatus(prev => ({...prev, locationDetail}));
    if (!locationDetail) {
      setError(prev => ({...prev, locationDetail: 'null'}));
    } else if (!locationDetail.address) {
      setError(prev => ({...prev, locationDetail: 'address is null'}));
    } else if (!locationDetail.locationCode) {
      setError(prev => ({...prev, locationDetail: 'location code is null'}));
    } else {
      setError(prev => ({...prev, locationDetail: ''}));
    }
  }
  function changeEndTime(endTime: PutExerciseEditInfoStatus['endTime']) {
    setStatus(prev => ({...prev, endTime}));
    if (!endTime) {
      setError(prev => ({...prev, time: '시간을 지정해주세요.'}));
    } else {
      setError(prev => ({...prev, time: ''}));
    }
  }
  function changeStartTime(startTime: PutExerciseEditInfoStatus['startTime']) {
    setStatus(prev => ({...prev, startTime}));
    if (!startTime) {
      setError(prev => ({...prev, time: '시간을 지정해주세요.'}));
    } else {
      setError(prev => ({...prev, time: ''}));
    }
  }
  function changeHeadCount(headCount: string) {
    setStatus(prev => ({...prev, headCount}));
    if (!headCount) {
      setError(prev => ({...prev, headCount: '모임인원수를 입력해주세요.'}));
    } else {
      setError(prev => ({...prev, headCount: ''}));
    }
  }
  function changeGuestCount(guestCount: string) {
    setStatus(prev => ({...prev, guestHeadCount: guestCount}));
    if (!guestCount) {
      setError(prev => ({...prev, guestHeadCount: '모임인원수를 입력해주세요.'}));
    } else {
      setError(prev => ({...prev, guestHeadCount: ''}));
    }
  }
  function changeIntro(intro: string) {
    setStatus(prev => ({...prev, intro}));
  }
  function changeGroup(group: Groups) {
    setStatus(prev => ({...prev, group}));
  }

  // 시간 유효성검증 로직
  useEffect(() => {
    if (exerciseStatus.startTime && exerciseStatus.endTime) {
      if (exerciseStatus.startTime.getTime() > exerciseStatus.endTime.getTime()) {
        setError(prev => ({...prev, time: '시작시간이 종료시간보다 뒤 입니다.'}));
      } else if (new Date().getTime() > exerciseStatus.startTime.getTime()) {
        setError(prev => ({...prev, time: '과거 시간에는 운동을 생성할 수 없습니다.'}));
      } else {
        setError(prev => ({...prev, time: ''}));
      }
    }
  }, [exerciseStatus]);

  return {
    exerciseStatus,
    errorMessage,
    isValid,
    changeName,
    changeLocation,
    changeLocationDetail,
    changeStartTime,
    changeEndTime,
    changeHeadCount,
    changeGuestCount,
    changeIntro,
    changeGroup,
  };
}
