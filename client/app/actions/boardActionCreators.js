import axios from 'axios';
import {
  LOAD_BOARD_LIST,
  LOAD_BOARD_LIST_SUCCEED,
  LOAD_BOARD_LIST_FAILED,
  LOAD_BOARD_DETAIL,
  LOAD_BOARD_DETAIL_SUCCEED,
  LOAD_BOARD_DETAIL_FAILED,
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
    }).catch((response) => {
      dispatch({
        type: LOAD_BOARD_LIST_FAILED,
        data: response.data,
      });
    });
  }
);

export const loadBoardDetail = id => (
  (dispatch) => {
    dispatch({ type: LOAD_BOARD_DETAIL });
    axios({
      method: "GET",
      url: `/boards/${id}`,
    }).then((response) => {
      dispatch({
        type: LOAD_BOARD_DETAIL_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: LOAD_BOARD_DETAIL_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const createBoard = ({ title }, hideBoardModal) => (
  (dispatch) => {
    dispatch({ type: CREATE_BOARD });
    axios({
      method: "POST",
      url: "/boards",
      data: { title },
    }).then((response) => {
      hideBoardModal();
      dispatch({ type: CREATE_BOARD_SUCCEED })
      dispatch(loadBoardList());
    }).catch((response) => {
      dispatch({
        type: CREATE_BOARD_FAILED,
        data: response.response.data,
      });
    });
  }
);
