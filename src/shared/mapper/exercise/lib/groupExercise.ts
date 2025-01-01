import {Exercise, ExerciseItemResponse} from '~/shared/mapper/exercise';

type ExerciseResponseStatus = 'PROGRESS' | 'COMPLETE' | 'RECRUITING' | 'RECRUITMENT_FINISHED';
type ExerciseResponseType = 'IMPROMPTU' | 'CLUB';

export type ExerciseUserRole = 'ADMIN' | 'PARTICIPANT' | 'PENDING' | 'NON_PARTICIPANT';

/** ### GroupExercise
 * > 현재는 사용하지 않음 [2024.09.08]
 * > - exercise 관련 백엔드 api 가 한개의 DTO 로 공통화
 * > - ExerciseGroupResponse 역할 -> ExerciseResponse 하나로 통합됨
 */
export interface ExerciseGroupResponse {
  id: number;
  clubId: number;
  clubName: string;
  title: string;
  participantLimit: number;
  currentParticipant: number;
  location: string;
  exerciseStartTime: string;
  exerciseStatus: ExerciseResponseStatus;
  exerciseType: ExerciseResponseType;
  thumbnail: string;
}

/** ### GroupExercise
 * > 현재는 사용하지 않음 [2024.09.08]
 * > - exercise 관련 백엔드 api 가 한개의 DTO 로 공통화
 * > - GroupExercise 역할 -> Exercise 하나로 통합됨
 */
export class GroupExercise extends Exercise {
  constructor(input: ExerciseGroupResponse) {
    const convert: ExerciseItemResponse = {
      id: input.id,
      clubId: input.clubId,
      clubName: input.clubName,
      title: input.title,
      participantLimit: input.participantLimit,
      currentParticipant: input.currentParticipant,
      location: input.location,
      exerciseStartTime: input.exerciseStartTime,
      exerciseStatus: input.exerciseStatus,
      exerciseType: input.exerciseType,
      thumbnail: input.thumbnail,
    };
    super(convert);
  }
}
