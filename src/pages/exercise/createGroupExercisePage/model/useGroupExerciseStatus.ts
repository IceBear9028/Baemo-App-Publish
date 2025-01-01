import {useEffect, useState} from 'react';
import {Groups} from '~/shared/mapper/groups';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

export interface PostExerciseInfoStatus {
  name: string;
  location: string;
  locationDetail: LocationDetail;
  startTime: null | Date;
  endTime: null | Date;
  intro: string;
  headCount: string;
  guestHeadCount: string;
  group?: Groups;
}

export function useGroupExerciseStatus(initGroup?: Groups) {
  const [errorMessage, setError] = useState({
    name: '',
    location: '',
    locationDetail: '',
    startTime: '',
    endTime: '',
    time: '',
    headCount: '',
    guestHeadCount: '',
    group: '',
  });
  const [exerciseStatus, setStatus] = useState<PostExerciseInfoStatus>({
    name: '',
    location: '',
    locationDetail: {
      address: '',
      locationCode: '',
      latitude: 0,
      longitude: 0,
    },
    startTime: null,
    endTime: null,
    intro: '',
    headCount: '',
    guestHeadCount: '0',
    group: initGroup,
  });
  // const isValid = Object.values(errorMessage).every(item => item === '') && Object.values(exerciseStatus).every(item => !!item);
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
  function changeEndTime(endTime: PostExerciseInfoStatus['endTime']) {
    setStatus(prev => ({...prev, endTime}));
    if (!endTime) {
      setError(prev => ({...prev, time: '시간을 지정해주세요.'}));
    } else {
      setError(prev => ({...prev, time: ''}));
    }
  }
  function changeStartTime(startTime: PostExerciseInfoStatus['startTime']) {
    setStatus(prev => ({...prev, startTime}));
    if (!startTime) {
      setError(prev => ({...prev, time: '시간을 지정해주세요.'}));
    } else {
      setError(prev => ({...prev, time: ''}));
    }
  }
  function changeHeadCount(headCount: string) {
    setStatus(prev => ({...prev, headCount}));
    if (!headCount || Number(headCount) <= 0) {
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
    console.log('error Message', errorMessage);
    if (exerciseStatus.startTime && exerciseStatus.endTime) {
      if (new Date().getTime() > exerciseStatus.startTime.getTime()) {
        setError(prev => ({...prev, time: '과거 시간에는 운동을 생성할 수 없습니다.'}));
      } else {
        setError(prev => ({...prev, time: ''}));
      }
    } else {
      setError(prev => ({...prev, time: '운동 시간을 입력해주세요.'}));
    }
    if (!exerciseStatus.group) {
      setError(prev => ({...prev, group: '모임을 선택해주세요.'}));
    } else {
      setError(prev => ({...prev, group: ''}));
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
