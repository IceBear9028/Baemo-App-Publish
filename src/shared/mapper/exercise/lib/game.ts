import {GenderResponse, PlayerLevelResponse, PlayerProfile} from '~/shared/mapper/userProfile';

export type GameTeamTypeResponse = 'TEAM_A' | 'TEAM_B' | 'UNDEFINED';
export type GameStatusResponse = 'WAITING' | 'NEXT' | 'PROGRESS' | 'PROGRESS_SCORING' | 'COMPLETE' | 'HISTORY' | 'NO_MATCH';

export interface GameTeamUserResponse {
  matchId: number;
  userId: number;
  userName: string; // 필드에 없음
  team: GameTeamTypeResponse;
  profileImage: string | null;
  level: PlayerLevelResponse;
  gender: GenderResponse;
}

export interface GameTeamUserRequest {
  userId: number;
  team: GameTeamTypeResponse;
}

export interface GameResponse {
  matchId: number;
  exerciseId: number;
  matchStatus: GameStatusResponse;
  matchOrder: number;
  courtNumber: number;
  isTeamDefined: boolean;
  matchUserList: GameTeamUserResponse[];
  teamAScore: number;
  teamBScore: number;
}

export interface DetailGameResponse extends GameResponse {
  teamAPointLog: number[];
  teamBPointLog: number[];
  referee: {
    matchId: number;
    userId: number;
    userName: string;
    profileImage: string;
  };
}

export class GameStatus {
  readonly 0 = '대기';
  readonly 1 = '다음';
  readonly 2 = '진행 중';
  readonly 3 = '점수 기록 중';
  readonly 4 = '완료';
  readonly 5 = '기록';
  readonly 6 = '게임 없음';

  /** 현재 게임을 아직 진행하지 않은 상태
   */
  static inProgressStatus: (keyof GameStatus)[] = [0, 1, 2, 3];

  /** 게임을 완료한 상태
   */
  static completedStatus: (keyof GameStatus)[] = [4, 5, 6];

  static convertStatus(resStatus: GameResponse['matchStatus']) {
    switch (resStatus) {
      case 'WAITING':
        return 0; // 대기중
      case 'NEXT':
        return 1; // 다음게임
      case 'PROGRESS':
        return 2;
      case 'PROGRESS_SCORING':
        return 3;
      case 'COMPLETE':
        return 4;
      case 'NO_MATCH':
        return 6;
      default:
        return 5;
    }
  }

  static convertResponse(status: keyof GameStatus): GameStatusResponse {
    if (status === 0) {
      return 'WAITING';
    }
    if (status === 1) {
      return 'NEXT';
    }
    if (status === 2) {
      return 'PROGRESS';
    }
    if (status === 3) {
      return 'PROGRESS_SCORING';
    }
    if (status === 4) {
      return 'COMPLETE';
    }
    if (status === 5) {
      return 'HISTORY';
    }
    return 'NO_MATCH';
  }

  static isJudge(resStatus: GameResponse['matchStatus']) {
    return resStatus === 'PROGRESS_SCORING';
  }
}

export class FilterGameStatus {
  readonly inProgress = '전체 게임';
  readonly completed = '완료 게임';
}

export class GameType {
  readonly 0: '팀미지정게임';
  readonly 1: '팀지정게임';

  static convertGameType(isTeamDef: GameResponse['isTeamDefined']) {
    return isTeamDef ? 1 : 0;
  }
}

export class GameTeam {
  readonly name: string;
  readonly player: PlayerProfile[];
  readonly score: number;

  constructor(playerList: GameTeamUserResponse[], score: number, name?: GameTeamTypeResponse) {
    this.name = name ? (name === 'TEAM_A' ? 'A팀' : 'B팀') : '';
    this.player = playerList.map(player => {
      const convertUser = {
        userId: player.userId,
        userName: player.userName ? player.userName : '',
        profileImage: player.profileImage,
        nickName: '',
        level: player.level,
        gender: player.gender,
      };
      return new PlayerProfile(convertUser);
    });
    this.score = score;
  }

  static divideTeam(player: GameTeamUserResponse[], aScore: number, bScore: number) {
    const isRandom = player[0].team === 'UNDEFINED';
    const playerCount = player.length;
    if (isRandom) {
      const aTeam = new GameTeam(player.slice(0, playerCount / 2), aScore, 'TEAM_A');
      const bTeam = new GameTeam(player.slice(playerCount / 2), bScore, 'TEAM_B');
      return {aTeam, bTeam};
    } else {
      const aTeam = new GameTeam(
        player.filter(player => player.team === 'TEAM_A'),
        aScore,
        'TEAM_A',
      );
      const bTeam = new GameTeam(
        player.filter(player => player.team === 'TEAM_B'),
        bScore,
        'TEAM_B',
      );
      return {aTeam, bTeam};
    }
  }

  static convertReqTeam(player: PlayerProfile[], teamType: GameTeamTypeResponse): GameTeamUserRequest[] {
    return player.map<GameTeamUserRequest>(player => ({
      team: teamType,
      userId: player.userId,
    }));
  }
}

export class Game {
  exerciseId: number;
  gameId: number;
  gameType: keyof GameType;
  gameStatus: keyof GameStatus;
  gameOrder: number;
  courtNumber: number;
  teamA: GameTeam;
  teamB: GameTeam;

  /** 점수 기록 중임을 알리는 정보
   * - `true` : 심판이 게임 점수 기록중인 상태(GameSettingCard 에 표시되는 UI 분기처리 필요)
   */
  judge: boolean;

  constructor(res: GameResponse) {
    const gameTeams = GameTeam.divideTeam(res.matchUserList, res.teamAScore, res.teamBScore);
    this.gameId = res.matchId;
    this.exerciseId = res.exerciseId;
    this.gameOrder = res.matchOrder;
    this.gameType = GameType.convertGameType(res.isTeamDefined);
    this.gameStatus = GameStatus.convertStatus(res.matchStatus);
    this.courtNumber = res.courtNumber;
    this.teamA = gameTeams.aTeam;
    this.teamB = gameTeams.bTeam;
    this.judge = GameStatus.isJudge(res.matchStatus); // 현재 점수기록중 임을 확인
  }
}

export class DetailGame extends Game {
  teamAPointLog: number[];
  teamBPointLog: number[];
  referee: {
    matchId: number;
    userId: number;
    userName: string;
    profileImage: string;
  };

  constructor(response: DetailGameResponse) {
    const {teamAPointLog, teamBPointLog, referee, ...responseGame} = response;
    super(responseGame);
    this.teamAPointLog = teamAPointLog;
    this.teamBPointLog = teamBPointLog;
    this.referee = referee;
  }
}
