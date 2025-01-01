import {create} from 'zustand';
import {Game} from '~/shared/mapper/exercise';

interface TeamInfo {
  courtNumber: string;
}

interface TeamInfoStatus {
  meta: TeamInfo;
  isNotValidMeta: boolean;
}

interface TeamInfoAction {
  setName: (input: string) => void;
  setCourtName: (input: string) => void;
  setValidMeta: (input: boolean) => void;
  resetStatus: () => void;
  loadTeamInfoStore: (input: Game) => void;
}

const INIT_STATUS: TeamInfo = {
  courtNumber: '',
};

export const useTeamMetaStore = create<TeamInfoStatus & TeamInfoAction>((set, get) => ({
  meta: INIT_STATUS,
  isNotValidMeta: false,
  setName: (input: string) => set(prev => ({...prev, meta: {...prev.meta, name: input}})),
  setCourtName: (input: string) => set(prev => ({...prev, meta: {...prev.meta, courtNumber: input}})),
  setValidMeta: valid => set(prev => ({...prev, isNotValidMeta: valid})),
  resetStatus: () => set(prev => ({...prev, meta: INIT_STATUS})),
  loadTeamInfoStore: game => {
    const courtNumber = String(game.courtNumber);
    set(prev => ({...prev, meta: {...prev.meta, courtNumber}}));
  },
}));
