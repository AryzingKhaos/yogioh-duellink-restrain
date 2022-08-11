import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import deckSkillDatabase from '../constant/deck-skill-database';
import { DuelRecord, GameResult, mainColor } from '../constant/interface';
import { Select, Button } from 'antd';
import requestUtil from '../server';
import { useGlobalData } from '../hooks/useGlobalData';
import { removeDuplicate } from '../utils/utils';

const { Option } = Select;

const OPERATION_ERROR_NUMBER_UPPER = 5;
const SELECT_WIDTH = 90;

const marginLeftStyle = {marginLeft: '20px'};

interface Props {};

const RecordTool: FC<Props> = () => {
  const deckList = useRef(Object.keys(deckSkillDatabase));
  const [deckSkillArray, setDeckSkillArray] = useState<string[]>([]);
  const [deckSkill, setDeckSkill] = useState<string>('');
  const [gameResult, setGameResult] = useState<GameResult>(GameResult.WIN);
  const [operationErrorNumber, setOperationErrorNumber] = useState<number>(0);

  const {
    historyDuelArray,
    setHistoryDuelArray,
    myDeckName,
    setMyDeckName,
    deckName,
    setDeckName
  } = useGlobalData();

  const myDeckChange = useCallback((selectMyDeckName: string) => {
    setMyDeckName(selectMyDeckName);
  }, []);

  const deckChange = useCallback((selectDeckName: string) => {
    setDeckName(selectDeckName);
    const { defaultSkill, otherSkill, allSkill = [] } = deckSkillDatabase[selectDeckName]
    const skillArray = [defaultSkill].concat(otherSkill).concat(allSkill);
    setDeckSkill(defaultSkill);
    setDeckSkillArray(removeDuplicate(skillArray));
  }, []);

  const onSkillChange = useCallback((selectSkill: string) => {
    setDeckSkill(selectSkill);
  }, []);

  const changeGameResult = useCallback((result: GameResult) => {
    setGameResult(result);
  }, []);

  const changeOperationErrorNumber = useCallback((num: number) => {
    setOperationErrorNumber(num);
    
  }, []);

  const initRecordValue = useCallback(() => {
    setDeckName('');
    setDeckSkill('');
    setGameResult(GameResult.WIN);
    setOperationErrorNumber(0);
  }, []);

  const recordOne: DuelRecord = useMemo(() => {
    return {
      myDeckName,
      deckName,
      deckSkill,
      gameResult,
      operationErrorNumber,
    }
  }, [myDeckName, deckName, deckSkill, gameResult, operationErrorNumber]);

  const onAddRecord = useCallback(async () => {
    console.log('recordOne', recordOne); // todos
    const result = await requestUtil.addHistoryDuelRecord(recordOne);
    console.log('resultArray', result.data); // todos
    setHistoryDuelArray(result.data);
    setTimeout(() => {
      initRecordValue();
    }, 500);
  }, [recordOne]);

  const onAddNewModel = useCallback(async () => {
    requestUtil.addDuelNewModel();
  }, []);

  const onClearDeletedHistoryDuelRecord = useCallback(() => {
    requestUtil.clearDeletedHistoryDuelRecord();
  },[])

  return (
    <div style={{width: 'calc(100% - 40px)', borderBottom: `${mainColor} 2px solid`, padding: '10px'}}>
      <label>我的卡组</label>
      <Select value={myDeckName} onChange={myDeckChange} style={{ width: SELECT_WIDTH }}>
        {
          deckList.current.map(item => {
            return (<Option key={item} value={item}>{item}</Option>);
          })
        }
      </Select>

      <label style={marginLeftStyle}>对手卡组</label>
      <Select value={deckName} onChange={deckChange} style={{ width: SELECT_WIDTH }}>
        {
          deckList.current.map(item => {
            return (<Option key={item} value={item}>{item}</Option>);
          })
        }
      </Select>

      <label style={marginLeftStyle}>对手技能</label>
      <Select value={deckSkill} onChange={onSkillChange} style={{ width: 120 }}>
        {
          deckSkillArray.map((item, index) => {
            return (<Option key={index} value={item}>{item}</Option>);
          })
        }
      </Select>

      <label style={marginLeftStyle}>胜负</label>
      <Select value={gameResult} defaultValue={GameResult.WIN} onChange={changeGameResult} style={{ width: SELECT_WIDTH }}>
        <Option key={GameResult.WIN} value={GameResult.WIN}>{GameResult.WIN}</Option>
        <Option key={GameResult.LOSE} value={GameResult.LOSE}>{GameResult.LOSE}</Option>
      </Select>

      <label style={marginLeftStyle}>失误数量</label>
      <Select value={operationErrorNumber} defaultValue={0} onChange={changeOperationErrorNumber} style={{ width: SELECT_WIDTH }}>
        {
          new Array(OPERATION_ERROR_NUMBER_UPPER).fill(0).map((_, index) => {
            return (<Option key={index} value={index}>{index}</Option>)
          })
        }
      </Select>

      <Button style={{marginLeft: '20px', width: 120}} type="primary" onClick={onAddRecord}>添加</Button>
      <Button style={{marginLeft: '20px', width: 120}} type="primary" onClick={onAddNewModel}>添加新model</Button>
      <Button style={{marginLeft: '20px', width: 180}} type="primary" onClick={onClearDeletedHistoryDuelRecord}>永久删除已删除数据</Button>
      
    </div>
  );
}

export default RecordTool;

