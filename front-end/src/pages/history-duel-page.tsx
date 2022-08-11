import {FC, memo, useState} from 'react';
import { DuelRecord } from '../constant/interface';
import HistoryDuelList from '../component/history-duel-list';
import RecordTool from '../component/record-tool';
import Analysis from '../component/analysis';

import './history-duel-page.css';

interface Props {}

const HistoryDuelPage: FC<Props> = () => {
  const [historyDuelArray, setHistoryDuelArray] = useState<Array<DuelRecord>>([]);

  return <div>
    <RecordTool/>
    <div className="main-area">
      <HistoryDuelList/>
      <Analysis/>
    </div>
  </div>
}

export default HistoryDuelPage;