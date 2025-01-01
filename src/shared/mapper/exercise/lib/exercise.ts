export type ExerciseResponseStatus = 'PROGRESS' | 'COMPLETE' | 'RECRUITING' | 'RECRUITMENT_FINISHED';
export type ExerciseUserRole = 'ADMIN' | 'PARTICIPANT' | 'PENDING' | 'NON_PARTICIPANT';
export type ExerciseResponseType = 'IMPROMPTU' | 'CLUB';

export interface ExerciseItemResponse {
  id: number;
  clubId: number | null;
  clubName: string | null;
  title: string;
  participantLimit: number;
  currentParticipant: number;
  location: string;
  exerciseStartTime: string;
  exerciseStatus: ExerciseResponseStatus;
  exerciseType: ExerciseResponseType;
  thumbnail: string;
}

export interface MyExerciseResponse {
  myUpcomingExercise: ExerciseItemResponse[];
  myClubExercises: ExerciseItemResponse[];
  myParticipatedExercises: ExerciseItemResponse[];
}

export class ExerciseStatus {
  readonly RECRUITING: '모집중';
  readonly RECRUITMENT_FINISHED: '모집완료';
  readonly PROGRESS: '운동중';
  readonly COMPLETE: '운동완료';

  static convertExerciseStatus(input: ExerciseResponseStatus): keyof ExerciseStatus {
    switch (input) {
      case 'RECRUITING':
        return 'RECRUITING';
      case 'RECRUITMENT_FINISHED':
        return 'RECRUITMENT_FINISHED';
      case 'PROGRESS':
        return 'PROGRESS';
      case 'COMPLETE':
        return 'COMPLETE';
    }
  }

  constructor() {
    this.RECRUITING = '모집중';
    this.RECRUITMENT_FINISHED = '모집완료';
    this.PROGRESS = '운동중';
    this.COMPLETE = '운동완료';
  }
}

export class ExerciseType {
  readonly IMPROMPTU: '번개운동';
  readonly CLUB: '모임운동';

  static convertExerciseType(input: ExerciseResponseType): keyof ExerciseType {
    switch (input) {
      case 'CLUB':
        return 'CLUB';
      case 'IMPROMPTU':
        return 'IMPROMPTU';
      default:
        return 'IMPROMPTU';
    }
  }

  constructor() {
    this.IMPROMPTU = '번개운동';
    this.CLUB = '모임운동';
  }
}

export type ExerciseDetailType = {
  type: keyof ExerciseType;
  groupsId: number | null;
};

export class Exercise {
  exerciseId: number;
  region: string;
  exerciseType: keyof ExerciseType;
  exerciseStatus: keyof ExerciseStatus;
  startDate: string;
  location: string;
  headCount: number;
  currentHeadCount: number;
  name: string | null;
  groupsId: number | null;
  groupName: string;
  exerciseThumbnail?: string;
  constructor(input: ExerciseItemResponse) {
    this.exerciseId = input.id;
    this.name = input.title;
    this.groupsId = input.clubId;
    this.region = input.location;
    this.startDate = input.exerciseStartTime;
    this.location = input.location;
    this.headCount = input.participantLimit;
    this.currentHeadCount = input.currentParticipant;
    this.exerciseThumbnail = input?.thumbnail;
    this.groupName = input.clubName ? input.clubName : '';
    this.exerciseStatus = ExerciseStatus.convertExerciseStatus(input.exerciseStatus);
    this.exerciseType = ExerciseType.convertExerciseType(input.exerciseType);
  }
}

export class MyExercise {
  myUpcomingExercise: Exercise[];
  myClubExercises: Exercise[];
  myParticipatedExercises: Exercise[];

  constructor(response: MyExerciseResponse) {
    if (response.myUpcomingExercise) {
      this.myUpcomingExercise = response.myUpcomingExercise.map(resItem => new Exercise(resItem));
    } else {
      this.myUpcomingExercise = [];
    }
    if (response.myClubExercises) {
      this.myClubExercises = response.myClubExercises.map(resItem => new Exercise(resItem));
    } else {
      this.myClubExercises = [];
    }
    if (response.myParticipatedExercises) {
      this.myParticipatedExercises = response.myParticipatedExercises.map(resItem => new Exercise(resItem));
    } else {
      this.myParticipatedExercises = [];
    }
  }
}

/** 임시로  비활성화
 * 나중에 백엔드 업데이트 할 때 다시 부활할 예정
 */
// type ExerciseRegularResponseType = keyof {
//   0: '';
//   1: '매주 월요일';
//   2: '매주 화요일';
//   3: '매주 수요일';
//   4: '매주 목요일';
//   5: '매주 금요일';
//   6: '매주 토요일';
//   7: '매주 일요일';
// };

/** 임시로  비활성화
 * 나중에 백엔드 업데이트 할 때 다시 부활할 예정
 */
export type ExerciseRegularType = keyof {
  0: '';
  1: '매주 월요일';
  2: '매주 화요일';
  3: '매주 수요일';
  4: '매주 목요일';
  5: '매주 금요일';
  6: '매주 토요일';
  7: '매주 일요일';
};
