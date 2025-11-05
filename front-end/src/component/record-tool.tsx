import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import deckSkillDatabase from '../constant/deck-skill-database';
import { DuelRecord, GameResult, mainColor } from '../constant/interface';
import { Select, Button } from 'antd';
import requestUtil from '../server';
import { useGlobalData } from '../hooks/useGlobalData';
import { removeDuplicate } from '../utils/utils';
import './record-tool.css';

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
    <div className="record-tool-container">
      <div className="record-tool-header">
        <h2 className="record-tool-title">对战记录</h2>
      </div>

      <div className="record-form">
        <div className="form-group">
          <label className="form-label">我的卡组</label>
          <Select
            value={myDeckName}
            onChange={myDeckChange}
            className="form-select"
            placeholder="选择我的卡组"
          >
            {
              deckList.current.map(item => {
                return (<Option key={item} value={item}>{item}</Option>);
              })
            }
          </Select>
        </div>

        <div className="form-group">
          <label className="form-label">对手卡组</label>
          <Select
            value={deckName}
            onChange={deckChange}
            className="form-select"
            placeholder="选择对手卡组"
          >
            {
              deckList.current.map(item => {
                return (<Option key={item} value={item}>{item}</Option>);
              })
            }
          </Select>
        </div>

        <div className="form-group">
          <label className="form-label">对手技能</label>
          <Select
            value={deckSkill}
            onChange={onSkillChange}
            className="form-select"
            placeholder="选择对手技能"
          >
            {
              deckSkillArray.map((item, index) => {
                return (<Option key={index} value={item}>{item}</Option>);
              })
            }
          </Select>
        </div>

        <div className="form-group">
          <label className="form-label">胜负结果</label>
          <Select
            value={gameResult}
            defaultValue={GameResult.WIN}
            onChange={changeGameResult}
            className={`form-select ${gameResult === GameResult.WIN ? 'win-select' : 'lose-select'}`}
          >
            <Option key={GameResult.WIN} value={GameResult.WIN}>胜利</Option>
            <Option key={GameResult.LOSE} value={GameResult.LOSE}>失败</Option>
          </Select>
        </div>

        <div className="form-group">
          <label className="form-label">操作失误</label>
          <Select
            value={operationErrorNumber}
            defaultValue={0}
            onChange={changeOperationErrorNumber}
            className="form-select"
          >
            {
              new Array(OPERATION_ERROR_NUMBER_UPPER).fill(0).map((_, index) => {
                return (<Option key={index} value={index}>{index}次</Option>)
              })
            }
          </Select>
        </div>

        <div className="form-group">
          <label className="form-label">&nbsp;</label>
          <div className="button-group">
            <Button
              type="primary"
              onClick={onAddRecord}
              className="primary-button"
              size="large"
            >
              添加记录
            </Button>
            <Button
              onClick={onAddNewModel}
              className="secondary-button"
              size="large"
            >
              新建模型
            </Button>
            <Button
              onClick={onClearDeletedHistoryDuelRecord}
              className="secondary-button"
              size="large"
              danger
            >
              清理数据
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordTool;

