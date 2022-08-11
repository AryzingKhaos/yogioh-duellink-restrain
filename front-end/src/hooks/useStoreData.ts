import { useState } from 'react';
import { DuelRecord } from '../constant/interface';

export const useHistoryDuelArray = () => {
  const [historyDuelArray, setHistoryDuelArray] = useState<Array<DuelRecord>>(
    []
  );
  return [historyDuelArray, setHistoryDuelArray];
};
