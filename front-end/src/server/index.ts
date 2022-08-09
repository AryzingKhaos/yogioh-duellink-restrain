import axios from 'axios';
import { DuelRecord } from '../constant/interface';

const HOSTNAME = 'http://127.0.0.1:5000';

// todos 应该有一个request的filter来拦截非200的返回
const requestUtil = {
  getRestrainDeck: () => {
    return axios
      .get(`${HOSTNAME}/read_restrain_deck`)
      .then((data) => data.data);
  },
  getRestrainCard: () => {
    return axios
      .get(`${HOSTNAME}/read_restrain_card`)
      .then((data) => data.data);
  },
  getHistoryDuel: () => {
    return axios.get(`${HOSTNAME}/read_history_duel`).then((data) => data.data);
  },
  addHistoryDuelRecord: (duelInfo: DuelRecord) => {
    return axios
      .post(`${HOSTNAME}/add_history_duel`, { duelInfo })
      .then((data) => data.data);
  },
  addDuelNewModel: () => {
    return axios
      .get(`${HOSTNAME}/add_duel_new_model`)
      .then((data) => data.data);
  },
  deleteHistoryDuelRecord: (deleteId: number) => {
    return axios
      .post(`${HOSTNAME}/delete_history_duel`, { deleteId })
      .then((data) => data.data);
  },
  clearDeletedHistoryDuelRecord: () => {
    return axios
      .post(`${HOSTNAME}/clear_delete_history_duel`)
      .then((data) => data.data);
  },
};

export default requestUtil;
