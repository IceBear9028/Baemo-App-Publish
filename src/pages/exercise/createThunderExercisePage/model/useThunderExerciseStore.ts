import {create} from 'zustand';
import {ExerciseInfoStatus, ReqExerciseInfoStatus} from '../api/fetchCreateThunderExercise';

interface ActionExerciseStatus {
  status: ExerciseInfoStatus;
  resetStatus: () => void;
  isValidExercise: () => boolean;
  errors: {
    title: string;
    participate: string;
    location: string;
    time: string;
    participantLimit: string;
  };
  getStatus: () => ReqExerciseInfoStatus;
  setTitle: (input: ExerciseInfoStatus['title']) => void;
  setDescription: (input: ExerciseInfoStatus['description']) => void;
  setLocation: (input: ExerciseInfoStatus['location']) => void;
  setLocationDetail: (input: ExerciseInfoStatus['locationDetail']) => void;
  setParticipate: (input: string) => void;
  setStartTime: (input: ExerciseInfoStatus['exerciseStartTime']) => void;
  setEndTime: (input: ExerciseInfoStatus['exerciseEndTime']) => void;
}

const INIT_STORE: ExerciseInfoStatus = {
  title: '',
  description: '',
  participantLimit: 0,
  location: '',
  locationDetail: {
    address: '',
    locationCode: '',
    latitude: 0,
    longitude: 0,
  },
  // locationCode: '',
  // latitude: '0',
  // longitude: '0',
  exerciseStartTime: null, // '2024-07-06T09:18:01.211Z'
  exerciseEndTime: null, // '2024-07-06T09:18:01.211Z'
};
const INIT_ERRORS = {
  title: '',
  participate: '',
  location: '',
  locationDetail: '',
  time: '',
  participantLimit: '',
};

export const useThunderExerciseStore = create<ActionExerciseStatus>((set, get) => ({
  status: INIT_STORE,
  errors: INIT_ERRORS,
  getStatus: () => {
    const status = get().status;
    const startTimeString = status.exerciseStartTime === null ? '' : status.exerciseStartTime.toISOString();
    const endTimeString = status.exerciseEndTime === null ? '' : status.exerciseEndTime.toISOString();
    return {...status, exerciseStartTime: startTimeString, exerciseEndTime: endTimeString} as ReqExerciseInfoStatus;
  },
  isValidExercise: () => {
    const errorMessage = get().errors;
    const {description: _, ...status} = get().status;
    return Object.values(errorMessage).every(item => item === '') && Object.values(status).every(item => !!item);
  },
  resetStatus: () => set(prev => ({prev, status: INIT_STORE, errors: INIT_ERRORS})),
  setTitle: input => {
    let errorMessage = '';
    if (input.length < 2) {
      errorMessage = '운동 이름은 최대 2글자 이상 작성해주세요.';
    }
    set(prev => ({...prev, status: {...prev.status, title: input}, errors: {...prev.errors, title: errorMessage}}));
  },
  setDescription: input => {
    set(prev => ({...prev, status: {...prev.status, description: input}}));
  },
  setLocation: input => {
    let errorMessage = '';
    if (!input) {
      errorMessage = '운동장소 입력해주세요.';
    }
    set(prev => ({...prev, status: {...prev.status, location: input}, errors: {...prev.errors, location: errorMessage}}));
  },
  setLocationDetail: input => {
    let errorMessage = '';
    if (!input) {
      errorMessage = 'Location Detail 설정 오류입니다.';
    }
    console.log(JSON.stringify(input));
    set(prev => ({
      ...prev,
      status: {
        ...prev.status,
        locationDetail: input,
      },
      errors: {
        ...prev.errors,
        locationDetail: errorMessage,
      },
    }));
  },
  setParticipate: input => {
    let errorMessage = '';
    if (Number(input) < 4) {
      errorMessage = '인원은 최소 4명 이상이여야 합니다.';
    }
    set(prev => ({
      ...prev,
      status: {...prev.status, participantLimit: Number(input)},
      errors: {...prev.errors, participantLimit: errorMessage},
    }));
  },
  setStartTime: input => {
    let errorMessage = '';
    if (!input) {
      errorMessage = '시작 시간을 입력해주세요.';
    }
    if (input) {
      // 1. 과거 시간에 시간을 설정한 경우
      if (input.getTime() < new Date().getTime()) {
        errorMessage = '과거 시간에는 운동을 생성할 수 없습니다.';
      }
    }
    set(prev => ({...prev, status: {...prev.status, exerciseStartTime: input}, errors: {...prev.errors, time: errorMessage}}));
  },
  setEndTime: input => {
    let errorMessage = '';
    const prevStartTime = get().status.exerciseStartTime;
    if (!input) {
      errorMessage = '시작 시간을 입력해주세요.';
    }
    if (input && prevStartTime) {
      // 1. 시작시간이 종료시간보다 뒤인 경우
      if (prevStartTime.getTime() > input.getTime()) {
        errorMessage = '시작시간이 종료시간보다 뒤 입니다.';
      }
    }
    console.log('인풋 --->', input);
    set(prev => ({...prev, status: {...prev.status, exerciseEndTime: input}, errors: {...prev.errors, time: errorMessage}}));
  },
}));
