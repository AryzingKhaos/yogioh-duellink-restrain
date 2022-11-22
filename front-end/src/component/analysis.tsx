import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DuelRecord } from '../constant/interface';
import requestUtil from '../server';
import DuelRecordOne from './duel-record-one';
import { useGlobalData } from '../hooks/useGlobalData';
import { effectRestrainDeck, deckFear } from '../constant/effect-restrain-deck';
// import { deckCountermeasure } from '../constant/deck-countermeasures';
import { Select } from 'antd';
import { isDef, pureReverse } from '../utils/utils';

import './analysis.css';

const { Option } = Select;

type analysisSessionsOne = {
  number: number;
  text: string;
}

const analysisSessionsArray: analysisSessionsOne[] = [
  {
    number: 0,
    text: 'model',
  }, {
    number: 5,
    text: '5场',
  }, {
    number: 10,
    text: '10场',
  }, {
    number: 15,
    text: '15场',
  }, {
    number: 20,
    text: '20场',
  },
];

interface FrequencyHistoryArrayOne{
  deckName: string;
  frequency: number;
}

interface FearHistoryArrayOne{
  fearAttribute: string;
  score: number;
}


interface Props{}

const Analysis: FC<Props> = ({}) => {
  const {
    historyDuelArray,
    setHistoryDuelArray,
    myDeckName,
    setMyDeckName,
    deckName,
    setDeckName
  } = useGlobalData();

  const [limit, setLimit] = useState<number>(0);

  // useEffect(() => {
  //   console.log('deckCountermeasure', deckCountermeasure);
  // }, [deckCountermeasure]);

  const analysisSessionsChangeHandler = useCallback((value: number) => {
    setLimit(value);
  }, []);

  const modelId = useMemo(() => {
    if(!historyDuelArray || !historyDuelArray.length) return 0;
    return pureReverse(historyDuelArray)[0].modelId;
  }, [historyDuelArray]);

  const calcHistoryArray = useMemo(() => {
    if (limit === 0) {
      if (!historyDuelArray || !historyDuelArray.length) return [];
      if (!isDef(modelId)) return [];
      return historyDuelArray.filter(item => item.modelId === modelId);
    }
    return pureReverse(historyDuelArray).slice(0, limit);
  }, [limit, historyDuelArray, modelId]);

  const analysisHistoryFrequency = useMemo(() => {
    return calcHistoryArray.reduce((arr: FrequencyHistoryArrayOne[], item) => {
      const result = arr.find((_item: FrequencyHistoryArrayOne) => _item.deckName === item.deckName);
      if (!result) arr.push({
        deckName: item.deckName,
        frequency: 1,
      });
      else result.frequency += 1;
      return arr;
    }, []).sort((a, b) => b.frequency - a.frequency);
  }, [calcHistoryArray]);


  const analysisHistoryFear = useMemo(() => {
    return analysisHistoryFrequency.map(item => {
      return new Array(item.frequency).fill(null).map(_ => deckFear(item.deckName)).flat();
    }).flat().reduce((arr: FearHistoryArrayOne[], item: any[]) => {
      const result = arr.find((_item: FearHistoryArrayOne) => item[0] === _item.fearAttribute);
      if (!result) arr.push({
        fearAttribute: item[0],
        score: item[1],
      });
      else result.score += item[1];
      return arr;
    }, []).sort((a, b) => b.score - a.score);
  }, [analysisHistoryFrequency]);

  console.log('analysisHistoryFear', analysisHistoryFear);

  return <div className='big-box'>
    <div className="line-box">
      <div className="cell-box img-cell-box">
        对手卡组可能卡：
        <div className="img-box">
          <img src={`../img/${deckName}可能卡.png`} alt="" />
        </div>
      </div>
      <div className="cell-box">
        我的卡组害怕：
        {deckFear(myDeckName).map((item, index) =>(<p key={index}>{`${item[0]}：${item[1]}` }</p>))}
      </div>
      <div className="cell-box">
        对手卡组害怕：
        {deckFear(deckName).map((item, index) =>(<p key={index}>{`${item[0]}：${item[1]}` }</p>))}
      </div>
      
    </div>
    <div className="line-box">
      <div className="column-box">
        <div className="cell-box no-border" style={{width: '100%'}}>
          最近
          <Select onChange={analysisSessionsChangeHandler} defaultValue={0} style={{width: 120}}>
            {analysisSessionsArray.map(item => (<Option key={item.number} value={item.number}>{item.text}</Option>))}
          </Select>
          分析
        </div>
        <div className="line-box">
          <div className="cell-box">
            卡组出现频次：
            {analysisHistoryFrequency && analysisHistoryFrequency.map((item: any) => (<p key={item.deckName}>{`${item.deckName}：${item.frequency}`}</p>))}
          </div>
          <div className="cell-box">
            卡组害怕程度 x 频次：
            {analysisHistoryFear.map((item) =>(<p key={item.fearAttribute}>{`${item.fearAttribute}：${item.score}` }</p>))}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Analysis;