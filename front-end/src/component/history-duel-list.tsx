import { FC, memo, useEffect, useState } from 'react';
import { DuelRecord } from '../constant/interface';
import requestUtil from '../server';

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

  return <div></div>
}

export default HistoryDuelList;