import {Game, GameCourt} from '~/shared/mapper/exercise';
import {create} from 'zustand';

interface CourtStore {
  selectCourt: GameCourt | null;
  targetGame: Game | null;
  onSelectCourt: (select: GameCourt) => void;
  onSelectGame: (select: Game) => void;
  resetCourt: () => void;
}

const INIT_COURT = null;
const INIT_GAME = null;

export const useSelectCourtNumberStore = create<CourtStore>((set, get) => ({
  selectCourt: INIT_COURT,
  targetGame: INIT_GAME,
  onSelectCourt: court => set(prev => ({...prev, selectCourt: court})),
  onSelectGame: game => set(prev => ({...prev, targetGame: game})),
  resetCourt: () => set(prev => ({...prev, selectCourt: INIT_COURT, targetGame: INIT_GAME})),
}));
