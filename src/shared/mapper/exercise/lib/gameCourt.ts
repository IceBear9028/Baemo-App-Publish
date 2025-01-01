export interface GameCourtResponse {
  courtId: number;
  exerciseId: number;
  courtNumber: number;
  isProgress: boolean;
}

export class GameCourt {
  courtId: number;
  exerciseId: number;
  courtNumber: number;
  isProgress: boolean;

  constructor(res: GameCourtResponse) {
    this.courtId = res.courtId;
    this.exerciseId = res.exerciseId;
    this.courtNumber = res.courtNumber;
    this.isProgress = res.isProgress;
  }
}
