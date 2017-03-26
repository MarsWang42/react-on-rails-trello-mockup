import axios from 'axios';
import {
  LOAD_BOARD_LIST,
  LOAD_BOARD_LIST_SUCCEED,
  LOAD_BOARD_LIST_FAILED,
  CREATE_BOARD,
  CREATE_BOARD_SUCCEED,
  CREATE_BOARD_FAILED,
} from '../constants/boardConstants';

export const loadBoardList = () => (
  (dispatch) => {
    dispatch({ type: LOAD_BOARD_LIST });
    axios({
      method: "GET",
      url: "/boards",
    }).then((response) => {
      dispatch({
        type: LOAD_BOARD_LIST_SUCCEED,
        data: response.data,
      });
    });
  }
);

export const createBoard = ({ title }, hideBoardModal) => (
  (dispatch) => {
    dispatch({ type: CREATE_BOARD});
    axios({
      method: "POST",
      url: "/boards",
      data: { title },
    }).then((response) => {
      hideBoardModal();
      dispatch(loadBoardList());
    });
  }
);
