import { FC, memo } from 'react';
import { DuelRecord, GameResult, mainColor } from '../constant/interface';
import { formatTime } from '../utils/utils';
import { Button } from 'antd';

import './duel-record-one.css';

interface Props extends DuelRecord{
  isDivision?: boolean;
  onChange: (recordId: number) => void;
  onDelete: (recordId: number) => void;
};

const DuelRecordOne: FC<Props> = ({
  id,
  myDeckName,
  deckName,
  deckSkill,
  gameResult,
  operationErrorNumber,
  modelId,
  updateTime,
  remarks,
  isDivision = false,
  onChange,
  onDelete,
}) => {
  return <tr className='DuelRecordOne' style={isDivision ? {borderBottom: `${mainColor} 2px solid`} : {}}>
    <td>{id}</td>
    <td>{myDeckName}</td>
    <td>{deckName}</td>
    <td>{deckSkill}</td>
    <td>{gameResult === GameResult.WIN ? <span style={{color: 'green'}}>{'胜'}</span> : <span style={{color: 'red'}}>{'负'}</span>}</td>
    <td><span style={{color: operationErrorNumber > 0 ? 'red' : 'green'}}>{operationErrorNumber}</span></td>
    <td>{modelId}</td>
    <td style={{width: 140}}>{updateTime ? formatTime(new Date(updateTime), 'YY-MM-dd hh:mm:ss') : 'no time'}</td>
    <td>{remarks}</td>
    <td>
      <Button onClick={() => id && onDelete(id)}>删除</Button>
    </td>
  </tr>
}

export default DuelRecordOne;

