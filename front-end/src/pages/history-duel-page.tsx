import {FC, memo, useState} from 'react';
import { DuelRecord } from '../constant/interface';
import HistoryDuelList from '../component/history-duel-list';
import RecordTool from '../component/record-tool';
import Analysis from '../component/analysis';

import './history-duel-page.css';

interface Props {}

const HistoryDuelPage: FC<Props> = () => {
  const [historyDuelArray, setHistoryDuelArray] = useState<Array<DuelRecord>>([]);

  return (
    <div className="history-duel-page">
      <RecordTool/>
      <div className="main-area">
        <div className="content-section">
          <div className="section-header">
            <h3 className="section-title">历史对战</h3>
          </div>
          <div className="section-content">
            <HistoryDuelList/>
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h3 className="section-title">数据分析</h3>
          </div>
          <div className="section-content">
            <Analysis/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryDuelPage;