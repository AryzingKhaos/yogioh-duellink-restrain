import {FC, memo, useState} from 'react';
import { DuelRecord } from '../constant/interface';
import HistoryDuelList from '../component/history-duel-list';
import RecordTool from '../component/record-tool';

interface Props {}

const HistoryDuelPage: FC<Props> = () => {
  const [historyDuelArray, setHistoryDuelArray] = useState<Array<DuelRecord>>([]);

  return <div>
    <RecordTool historyDuelArray={historyDuelArray} setHistoryDuelArray={setHistoryDuelArray}/>
    <HistoryDuelList historyDuelArray={historyDuelArray} setHistoryDuelArray={setHistoryDuelArray}/>
  </div>
}

export default HistoryDuelPage;