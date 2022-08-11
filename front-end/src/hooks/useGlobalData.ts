import { FC, useState, createContext, useContext } from 'react';
import { DuelRecord } from '../constant/interface';

export interface GlobalDataContextProps {}

export interface GlobalDataContext {
  historyDuelArray: DuelRecord[];
  setHistoryDuelArray: any;
}
export const GlobalDataContext = createContext(null);

export const GlobalDataProvider: FC = (props) => {
  const [historyDuelArray, setHistoryDuelArray] = useState<DuelRecord[]>([]);

  return (
    <GlobalDataContext.Provider
      value={{
        historyDuelArray,
        setHistoryDuelArray,
      }}
    >
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  return useContext(GlobalDataProvider);
};
