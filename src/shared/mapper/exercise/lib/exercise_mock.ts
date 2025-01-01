import {ExerciseDetailType, ExerciseStatus, ExerciseType} from '~/shared/mapper/exercise';

export interface ExerciseIntroResponse_TEMP {
  exerciseId: number;
  description: string;
  createDate: string;
  editDate: string;
}

export class ExerciseIntro_TEMP {
  exerciseId: number;
  description: string;
  createDate: string;
  editDate: string;
  constructor(input: ExerciseIntroResponse_TEMP) {
    this.exerciseId = input.exerciseId;
    this.description = input.description;
    this.createDate = input.createDate;
    this.editDate = input.editDate;
  }
}

export interface ExerciseResponse_TEMP {
  exerciseId: number;
  region: string;
  exerciseType: ExerciseDetailType;
  exerciseStatus: keyof ExerciseStatus;
  startDate: string;
  location: string;
  headCount: number;
  currentHeadCount: number;
  name: string;
  exerciseThumbnail?: string;
}

export class Exercise_TEMP {
  exerciseId: number;
  region: string;
  exerciseType: keyof ExerciseType;
  exerciseStatus: keyof ExerciseStatus;
  startDate: string;
  location: string;
  headCount: number;
  currentHeadCount: number;
  name: string;
  exerciseThumbnail?: string;
  constructor(input: ExerciseResponse_TEMP) {
    this.exerciseId = input.exerciseId;
    this.name = input.name;
    this.region = input.region;
    this.startDate = input.startDate;
    this.location = input.location;
    this.headCount = input.headCount;
    this.currentHeadCount = input.currentHeadCount;
    this.exerciseStatus = input.exerciseStatus;
    this.exerciseType = input.exerciseType.type;
    this.exerciseThumbnail = input.exerciseThumbnail;
  }
}
