export interface DuelRecord {
  id?: number;
  myDeckName: string;
  deckName: string;
  deckSkill: string;
  gameResult: GameResult;
  operationErrorNumber: number;
  modelId?: number;
  updateTime?: string;
  remarks?: string;
}

export enum GameResult {
  WIN = 'win',
  LOSE = 'lose',
}

export const mainColor = '#1890ff';
