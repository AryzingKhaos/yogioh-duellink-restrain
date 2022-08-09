import { FC, memo, useCallback, useEffect, useState } from 'react';
import { DuelRecord } from '../constant/interface';
import requestUtil from '../server';
import DuelRecordOne from './duel-record-one';

interface Props {
  historyDuelArray: DuelRecord[];
  setHistoryDuelArray: any;
};

const HistoryDuelList: FC<Props> = ({
  historyDuelArray,
  setHistoryDuelArray
}) => {

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
    <table border={0}>
      <thead></thead>
      <tbody>
        <tr className='DuelRecordOne'>
          <td>id</td>
          <td>我的卡组</td>
          <td>对手卡组</td>
          <td>对手卡组</td>
          <td>结果</td>
          <td>失误</td>
          <td>模块ID</td>
          <td>时间</td>
          <td>备注</td>
          <td>功能</td>
        </tr>
        {historyDuelArray.reverse().map((item, index) => <DuelRecordOne
          {...item}
          key={item.id}
          remarks={item.remarks}
          isDivision={historyDuelArray.reverse()[index+1] && item.modelId !== historyDuelArray.reverse()[index+1].modelId ? true : false }
          onChange={duelRecordOneChange}
          onDelete={duelRecordOneDelete}
        />)}
      </tbody>
    </table>
  )
}

export default HistoryDuelList;