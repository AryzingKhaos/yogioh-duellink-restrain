import { FC, useState, createContext, useContext, ReactNode, SetStateAction, Dispatch } from 'react';
import { DuelRecord } from '../constant/interface';

export interface GlobalDataContextType {
  historyDuelArray: DuelRecord[];
  setHistoryDuelArray: Dispatch<SetStateAction<DuelRecord[]>>;
  myDeckName: string;
  setMyDeckName: Dispatch<SetStateAction<string>>;
  deckName: string;
  setDeckName: Dispatch<SetStateAction<string>>;
};

export const GlobalDataContext = createContext<GlobalDataContextType>({} as GlobalDataContextType);

export const GlobalDataProvider: FC<{children: ReactNode}> = (props) => {
  const [historyDuelArray, setHistoryDuelArray] = useState<DuelRecord[]>([]);
  const [myDeckName, setMyDeckName] = useState<string>('');
  const [deckName, setDeckName] = useState<string>('');

  return (
    <GlobalDataContext.Provider
      value={{
        historyDuelArray,
        setHistoryDuelArray,
        myDeckName,
        setMyDeckName,
        deckName,
        setDeckName,
      }}
    >
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};
