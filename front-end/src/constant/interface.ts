export interface DuelRecord {
  id?: number;
  deck: string;
  skill: string;
  fault: boolean;
  victory: boolean;
  updateTime?: string;
  remarks?: string;
}
