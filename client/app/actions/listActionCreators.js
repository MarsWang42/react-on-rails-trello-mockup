import axios from 'axios';
import {
  LOAD_ALL_LISTS,
  LOAD_ALL_LISTS_SUCCEED,
  LOAD_ALL_LISTS_FAILED,
  CREATE_LIST,
  CREATE_LIST_SUCCEED,
  CREATE_LIST_FAILED,
} from '../constants/listConstants';
import { loadBoardDetail } from './boardActionCreators';


export const createList = ({ title }, boardId, hideDropdown) => (
  (dispatch) => {
    dispatch({ type: CREATE_LIST });
    axios({
      method: "POST",
      url: `/boards/${boardId}/lists`,
      data: { title },
    }).then((response) => {
      hideDropdown();
      dispatch({ type: CREATE_LIST_SUCCEED });
      dispatch(loadBoardDetail(boardId));
    }).catch((response) => {
      dispatch({
        type: CREATE_LIST_FAILED,
        data: response.response.data,
      });
    });
  }
);
