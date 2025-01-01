import {ExerciseResponseStatus, ExerciseResponseType, ExerciseStatus, ExerciseType} from '../lib/exercise.ts';
import {GroupRole, GroupRoleResponse} from '~/shared/mapper/groups';
import {LocationDetail} from '~/pages/location/ui/LocationSearch.tsx';

export type ExerciseMyRuleResponse = 'ADMIN' | 'PARTICIPANT' | 'PENDING' | 'NON_PARTICIPANT';

export interface ExerciseIntroResponse {
  exerciseDetailView: {
    id: number;
    clubId: number | null;
    clubName: string | null;
    clubRole: GroupRoleResponse | null;
    guestLimit: number;
    currentParticipantGuest: number;
    title: string;
    description: string;
    participantLimit: number;
    currentParticipant: number;
    location: string;
    locationDetail: LocationDetail;
    exerciseStartTime: string; //'2024-08-17T07:25:13.972Z';
    exerciseEndTime: string; //'2024-08-17T07:25:13.972Z';
    exerciseStatus: ExerciseResponseStatus;
    exerciseType: ExerciseResponseType;
    thumbnail: string;
  };
  userRule: ExerciseMyRuleResponse;
}

export class ExerciseMyRule {
  readonly ADMIN: 'ADMIN';
  readonly PARTICIPANT: 'PARTICIPANT';
  readonly PENDING: 'PENDING';
  readonly NON_PARTICIPANT: 'NON_PARTICIPANT';

  static convertRole(input: ExerciseMyRuleResponse): keyof ExerciseMyRule {
    switch (input) {
      case 'ADMIN':
        return 'ADMIN';
      case 'NON_PARTICIPANT':
        return 'NON_PARTICIPANT';
      case 'PENDING':
        return 'PENDING';
      default:
        return 'PARTICIPANT';
    }
  }

  constructor() {
    this.ADMIN = 'ADMIN';
    this.PARTICIPANT = 'PARTICIPANT';
    this.PENDING = 'PENDING';
    this.NON_PARTICIPANT = 'NON_PARTICIPANT';
  }
}

export class ExerciseIntro {
  exerciseId: number;
  description: string;
  groupsId: number | null;
  groupsName: string | null;
  groupsRole: keyof GroupRole | null;
  exerciseRole: keyof ExerciseMyRule;
  exerciseStatus: keyof ExerciseStatus;
  exerciseType: keyof ExerciseType;
  guestHeadCount: number;
  currentGuestHeadCount: number;
  headCount: number;
  currentHeadCount: number;
  name: string;
  location: string;
  locationDetail: LocationDetail;
  startTime: Date;
  endTime: Date;
  exerciseThumbnail: string;
  constructor(input: ExerciseIntroResponse) {
    this.exerciseId = input.exerciseDetailView.id;
    this.description = input.exerciseDetailView.description;
    this.groupsId = input.exerciseDetailView.clubId;
    this.groupsName = input.exerciseDetailView.clubName;
    this.groupsRole = input.exerciseDetailView.clubRole ? GroupRole.convertRole(input.exerciseDetailView.clubRole) : null;
    this.exerciseRole = ExerciseMyRule.convertRole(input.userRule);
    this.exerciseStatus = ExerciseStatus.convertExerciseStatus(input.exerciseDetailView.exerciseStatus);
    this.exerciseType = ExerciseType.convertExerciseType(input.exerciseDetailView.exerciseType);
    this.guestHeadCount = input.exerciseDetailView.guestLimit;
    this.currentGuestHeadCount = input.exerciseDetailView.currentParticipantGuest;
    this.headCount = input.exerciseDetailView.participantLimit;
    this.currentHeadCount = input.exerciseDetailView.currentParticipant;
    this.name = input.exerciseDetailView.title;
    this.location = input.exerciseDetailView.location;
    this.locationDetail = input.exerciseDetailView.locationDetail;
    this.startTime = new Date(input.exerciseDetailView.exerciseStartTime);
    this.endTime = new Date(input.exerciseDetailView.exerciseEndTime);
    this.exerciseThumbnail = input.exerciseDetailView.thumbnail;
  }
}
