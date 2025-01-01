import {create} from 'zustand';
import {PlayerProfile} from '~/shared/mapper/userProfile';
import {Game, GameTeam, GameTeamUserRequest} from '~/shared/mapper/exercise';

interface TeamInfo {
  aTeamName: string;
  bTeamName: string;
  aTeamPlayers: PlayerProfile[];
  bTeamPlayers: PlayerProfile[];
  players: PlayerProfile[];
  isSpecifyTeam: boolean;
}

interface TeamStatus {
  teams: TeamInfo;
  isNotValidTeam: boolean;
}

interface ActionTeamStatus {
  // 팀 지정 여부
  checkSpecifyGame: (isSpecify: boolean) => void;

  // 팀 선택 컨트롤
  addTeamPlayers: (teamType: 'a' | 'b', player: PlayerProfile) => void;
  deleteTeamPlayers: (teamType: 'a' | 'b', player: PlayerProfile) => void;

  // 인원 선택
  addPlayers: (player: PlayerProfile) => void;
  deletePlayers: (player: PlayerProfile) => void;

  resetStore: () => void;
  loadPlayerStore: (game: Game) => void;
  setValidTeam: (isValid: boolean) => void;
  getReqPlayerList: () => GameTeamUserRequest[];
  getReqSpecifyTeam: () => GameTeamUserRequest[];
}

const INIT_STATUS: TeamInfo = {
  aTeamName: '',
  bTeamName: '',
  aTeamPlayers: [],
  bTeamPlayers: [],
  players: [],
  isSpecifyTeam: false,
};

export const useSpecifyTeamStore = create<TeamStatus & ActionTeamStatus>((set, get) => ({
  teams: INIT_STATUS,
  isNotValidTeam: false,
  checkSpecifyGame: isSpecify => {
    // + 팀지정 상태 여부 업데이트
    // + 팀지정 상태 변경에 따른 aTeamPlayers, bTeamPlayers, players 저장상태 초기화
    if (isSpecify) {
      set(prev => ({...prev, teams: {...prev.teams, isSpecifyTeam: isSpecify}}));
    } else {
      const resetATeam: PlayerProfile[] = [];
      const resetBTeam: PlayerProfile[] = [];
      const rollbackPlayerList = [...get().teams.aTeamPlayers, ...get().teams.bTeamPlayers, ...get().teams.players];
      set(prev => ({
        ...prev,
        teams: {...prev.teams, isSpecifyTeam: isSpecify, aTeamPlayers: resetATeam, bTeamPlayers: resetBTeam, players: rollbackPlayerList},
      }));
    }
  },
  addTeamPlayers: (teamType, player) =>
    set(prev => {
      const prevPlayers = get().teams[`${teamType}TeamPlayers`];
      if (prevPlayers.length >= 2 || prevPlayers.includes(player)) {
        return {...prev};
      } else {
        const delPlayers = get().teams.players.filter(user => user.userId !== player.userId);
        return {...prev, teams: {...prev.teams, [`${teamType}TeamPlayers`]: [...prevPlayers, player], players: delPlayers}};
      }
    }),
  addPlayers: player =>
    set(prev => {
      const allPlayers = [...get().teams.players, ...get().teams.aTeamPlayers, ...get().teams.bTeamPlayers];
      const playersCount = allPlayers.length;

      if (get().teams.players.find(prevPlayer => player.userId === prevPlayer.userId)) {
        const filteredPlayers = get().teams.players.filter(user => user.userId !== player.userId);
        return {...prev, teams: {...prev.teams, players: filteredPlayers}};
      }
      if (get().teams.aTeamPlayers.find(prevPlayer => player.userId === prevPlayer.userId)) {
        const filteredPlayers = get().teams.aTeamPlayers.filter(user => user.userId !== player.userId);
        return {...prev, teams: {...prev.teams, aTeamPlayers: filteredPlayers}};
      }
      if (get().teams.bTeamPlayers.find(prevPlayer => player.userId === prevPlayer.userId)) {
        const filteredPlayers = get().teams.bTeamPlayers.filter(user => user.userId !== player.userId);
        return {...prev, teams: {...prev.teams, bTeamPlayers: filteredPlayers}};
      }
      // 더이상 추가하지 않음
      if (playersCount >= 4) {
        return {...prev};
      }
      return {...prev, teams: {...prev.teams, players: [...prev.teams.players, player]}};
    }),
  deleteTeamPlayers: (teamType, player) =>
    set(prev => {
      const delTeamPlayers = get().teams[`${teamType}TeamPlayers`].filter(user => user.userId !== player.userId);
      const addPlayers = [...get().teams.players, player];
      return {...prev, teams: {...prev.teams, [`${teamType}TeamPlayers`]: delTeamPlayers, players: addPlayers}};
    }),
  deletePlayers: player =>
    set(prev => {
      const delPlayers = get().teams.players.filter(user => user.userId !== player.userId);
      return {...prev, teams: {...prev.teams, players: delPlayers}};
    }),
  resetStore: () => set(prev => ({...prev, teams: INIT_STATUS})),
  setValidTeam: isValid => set(prev => ({...prev, isNotValidTeam: isValid})),
  loadPlayerStore: game => {
    // 1. 팀 미지정게임인 경우
    if (game.gameType === 0) {
      const isSpecifyTeam = false;
      const allPlayer = [...game.teamA.player, ...game.teamB.player];
      set(prev => ({...prev, teams: {...prev.teams, isSpecifyTeam, players: allPlayer, aTeamPlayers: [], bTeamPlayers: []}}));
      return;
    }
    // 2. 팀 지정게임인 경우
    if (game.gameType === 1) {
      const aTeamPlayers = game.teamA.player;
      const bTeamPlayers = game.teamB.player;
      const isSpecifyTeam = true;
      set(prev => ({...prev, teams: {...prev.teams, isSpecifyTeam, aTeamPlayers, bTeamPlayers, players: []}}));
      return;
    }
  },
  getReqPlayerList: () => {
    if (get().teams.isSpecifyTeam) {
      const aTeamPlayer = get().teams.aTeamPlayers;
      const bTeamPlayer = get().teams.bTeamPlayers;
      const reqATeamPlayer = GameTeam.convertReqTeam(aTeamPlayer, 'TEAM_A');
      const reqBTeamPlayer = GameTeam.convertReqTeam(bTeamPlayer, 'TEAM_B');
      return [...reqATeamPlayer, ...reqBTeamPlayer];
    } else {
      const allPlayer = get().teams.players;
      return GameTeam.convertReqTeam(allPlayer, 'UNDEFINED');
    }
  },
  getReqSpecifyTeam: () => {
    const aTeamPlayer = get().teams.aTeamPlayers;
    const bTeamPlayer = get().teams.bTeamPlayers;
    const reqATeamPlayer = GameTeam.convertReqTeam(aTeamPlayer, 'TEAM_A');
    const reqBTeamPlayer = GameTeam.convertReqTeam(bTeamPlayer, 'TEAM_B');
    return [...reqATeamPlayer, ...reqBTeamPlayer];
  },
}));
