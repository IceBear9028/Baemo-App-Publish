import {create} from 'zustand';
import {ExerciseEditInfoStatus} from '../api/fetchEditThunderExercise.ts';
import {ExerciseIntro} from '~/shared/mapper/exercise';

interface ActionExerciseStatus {
  status: ExerciseEditInfoStatus;
  errors: {
    title: string;
    participate: string;
    location: string;
    time: string;
    participantLimit: string;
  };
  resetStatus: () => void;
  loadStatus: (input: ExerciseIntro) => void;
  isValidExercise: () => boolean;
  setTitle: (input: ExerciseEditInfoStatus['title']) => void;
  setDescription: (input: ExerciseEditInfoStatus['description']) => void;
  setLocation: (input: ExerciseEditInfoStatus['location']) => void;
  setLocationDetail: (input: ExerciseEditInfoStatus['locationDetail']) => void;
  setParticipate: (input: string) => void;
  setStartTime: (input: ExerciseEditInfoStatus['exerciseStartTime']) => void;
  setEndTime: (input: ExerciseEditInfoStatus['exerciseEndTime']) => void;
}

const INIT_STORE: ExerciseEditInfoStatus = {
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
  exerciseStartTime: null, // '2024-07-06T09:18:01.211Z'
  exerciseEndTime: null, // '2024-07-06T09:18:01.211Z'
};
const INIT_ERRORS = {
  title: '',
  participate: '',
  location: '',
  time: '',
  participantLimit: '',
};

export const useEditThunderExerciseStore = create<ActionExerciseStatus>((set, get) => ({
  status: INIT_STORE,
  errors: INIT_ERRORS,
  isValidExercise: () => {
    const errorMessage = get().errors;
    const {description, ...status} = get().status;
    return Object.values(errorMessage).every(item => item === '') && Object.values(status).every(item => !!item);
  },
  resetStatus: () => set(prev => ({prev, status: INIT_STORE, errors: INIT_ERRORS})),
  loadStatus: initIntro => {
    const convertData: ExerciseEditInfoStatus = {
      title: initIntro.name,
      description: initIntro.description,
      participantLimit: initIntro.headCount,
      location: initIntro.location,
      locationDetail: initIntro.locationDetail,
      exerciseStartTime: initIntro.startTime,
      exerciseEndTime: initIntro.endTime,
    };
    set(prev => ({...prev, status: convertData}));
  },
  setTitle: input => {
    let errorMessage = '';
    if (input.length < 0) {
      errorMessage = '운동 이름을 입력해주세요.';
    }
    set(prev => ({...prev, status: {...prev.status, title: input}, errors: {...prev.errors, title: errorMessage}}));
  },
  setDescription: input => {
    set(prev => ({...prev, status: {...prev.status, description: input}}));
  },
  setLocation: input => {
    let errorMessage = '';
    if (input.length < 0) {
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
    const prevEndTime = get().status.exerciseEndTime;
    if (!input) {
      errorMessage = '시작 시간을 입력해주세요.';
    }
    if (input && prevEndTime) {
      // 1. 시작시간이 종료시간보다 뒤인 경우
      if (input.getTime() > prevEndTime.getTime()) {
        errorMessage = '시작시간이 종료시간보다 뒤 입니다.';
      }
      // 2. 시작시간 입력 시 현재시간보다 과거인경우
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
    set(prev => ({...prev, status: {...prev.status, exerciseEndTime: input}, errors: {...prev.errors, time: errorMessage}}));
  },
}));
