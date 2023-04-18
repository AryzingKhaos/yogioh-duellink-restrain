import { FC, memo, useCallback, useEffect, useState } from 'react';
import { DuelRecord } from '../constant/interface';
import requestUtil from '../server';
import DuelRecordOne from './duel-record-one';
import { useGlobalData } from '../hooks/useGlobalData';
import { pureReverse } from '../utils/utils';

import './duel-record-one.css';

interface Props {};

const HistoryDuelList: FC<Props> = () => {

  const { historyDuelArray, setHistoryDuelArray } = useGlobalData();

  useEffect(() => {
    requestUtil.getHistoryDuel().then(res => {
      console.log('res', res); // todos
      setHistoryDuelArray(res.data);
    })
  }, []);

  const duelRecordOneChange = useCallback((recordId: number) => {}, []);

  const duelRecordOneDelete = useCallback(async (recordId: number) => {
    const newHistoryDuelArray = await requestUtil.deleteHistoryDuelRecord(recordId);
    setHistoryDuelArray(newHistoryDuelArray.data);
  }, []);

  return (
    <table border={0} className='HistoryRecord'>
      <thead></thead>
      <tbody>
        <tr className='DuelRecordOne'>
          <td>id</td>
          <td style={{width: 80}}>我的卡组</td>
          <td style={{width: 90}}>对手卡组</td>
          <td style={{width: 90}}>对手技能</td>
          <td>结果</td>
          <td>失误</td>
          <td>modelId</td>
          <td>时间</td>
          <td>备注</td>
          <td>功能</td>
        </tr>
        {pureReverse(historyDuelArray).map((item, index) => <DuelRecordOne
          {...item}
          key={item.id}
          remarks={item.remarks}
          isDivision={pureReverse(historyDuelArray)[index+1] && item.modelId !== pureReverse(historyDuelArray)[index+1].modelId ? true : false }
          onChange={duelRecordOneChange}
          onDelete={duelRecordOneDelete}
        />)}
      </tbody>
    </table>
  )
}

export default HistoryDuelList;