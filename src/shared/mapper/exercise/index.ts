/** 1. interface, type 관리
 */
export type {ExerciseIntroResponse} from '~/shared/mapper/exercise/lib/exerciseIntro.ts';
export type {
  ExerciseUserRole,
  MyExerciseResponse,
  ExerciseItemResponse,
  ExerciseRegularType,
  ExerciseDetailType,
} from '~/shared/mapper/exercise/lib/exercise';
export type {
  GameType,
  GameResponse,
  DetailGameResponse,
  GameTeamTypeResponse,
  GameTeamUserResponse,
  GameTeamUserRequest,
  GameStatusResponse,
} from './lib/game';
export type {ExerciseResponse_TEMP} from './lib/exercise_mock'; // 임시 mock 데이터 전용 Mapper 클래스
export type {
  ExerciseMemberResponse,
  ExerciseMemberStatusResponse,
  ExerciseGameMemberResponse,
  ExerciseGuestMemberResponse,
} from './lib/exerciseMember';
export type {GameCourtResponse} from './lib/gameCourt.ts';

/** 2. Class 관리
 */
export {ExerciseIntro, ExerciseMyRule} from '~/shared/mapper/exercise/lib/exerciseIntro.ts';
export {MyExercise, Exercise, ExerciseStatus, ExerciseType} from '~/shared/mapper/exercise/lib/exercise';
export {Game, GameStatus, DetailGame, FilterGameStatus, GameTeam} from '~/shared/mapper/exercise/lib/game';
export {
  ExerciseMember,
  ExerciseMemberRole,
  ExerciseMemberStatus,
  ExerciseGameMemberStatus,
  ExerciseGameMember,
  ExerciseGuestMember,
} from './lib/exerciseMember.ts';
export {Exercise_TEMP} from './lib/exercise_mock'; // 임시 mock 데이터 전용 Mapper 클래스
export {GameCourt} from './lib/gameCourt.ts';
