import axios from 'axios';
import {
  LOAD_ALL_LISTS,
  LOAD_ALL_LISTS_SUCCEED,
  LOAD_ALL_LISTS_FAILED,
  CREATE_LIST,
  CREATE_LIST_SUCCEED,
  CREATE_LIST_FAILED,
} from '../constants/listConstants';

export const loadAllLists = (id) => (
  (dispatch) => {
    dispatch({ type: LOAD_ALL_LISTS });
    axios({
      method: "GET",
      url: `/boards/${id}`,
    }).then((response) => {
      dispatch({
        type: LOAD_ALL_LISTS_SUCCEED,
        data: response.data,
      });
    });
  }
);

export const createBoard = ({ title }, hideBoardModal) => (
  (dispatch) => {
    dispatch({ type: CREATE_LIST});
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
