import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import deck from '../constant/deck';
import { DuelRecord } from '../constant/interface';

interface Props {
  historyDuelArray: DuelRecord[];
  setHistoryDuelArray: any;
};

const RecordTool: FC<Props> = ({
  historyDuelArray,
  setHistoryDuelArray,
}) => {
  const deckList = useRef(Object.keys(deck));
  const [currentSkill, setCurrentSkill] = useState<string[]>([]);
  const [selectedDefaultSkill, setSelectedDefaultSkill] = useState<string>();

  // useEffect(() => {
  //   setSelectedDefaultSkill
  // }, []);

  const deckChange = useCallback((e: any) => {
    const deckName = e.target.value;
    const defaultSkill = deck[deckName].defaultSkill;
    const otherSkill = deck[deckName].otherSkill;
    const skillArray = [defaultSkill].concat(otherSkill);
    setCurrentSkill(skillArray);
    setSelectedDefaultSkill(defaultSkill);
  }, []);

  return (
    <>
      <label htmlFor="deck">卡组</label>
      <select name="deck" id="deck" onChange={deckChange}>
        {
          deckList.current.map(item => {
            return (<option key={item} value={item}>{item}</option>);
          })
        }
      </select>

      <label htmlFor="skill">技能</label>
      <select name="skill" id="skill" defaultValue={selectedDefaultSkill}>
        {
          currentSkill.map((item, index) => {
            return (<option key={item} value={item}>{item}</option>);
          })
        }
      </select>
    </>
  );
}

export default RecordTool;

