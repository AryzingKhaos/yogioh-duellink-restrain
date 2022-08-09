import {FC, memo} from 'react';
import HistoryDuelPage from './history-duel-page';

interface Props {}

const Home: FC<Props> = () => {
  return <div style={{marginLeft: '20px'}}>
    <HistoryDuelPage/>
  </div>
}

export default Home;