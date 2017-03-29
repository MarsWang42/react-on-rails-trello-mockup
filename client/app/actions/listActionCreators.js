import axios from 'axios';
import {
  LOAD_ALL_LISTS,
  LOAD_ALL_LISTS_SUCCEED,
  LOAD_ALL_LISTS_FAILED,
  CREATE_LIST,
  CREATE_LIST_SUCCEED,
  CREATE_LIST_FAILED,
  UPDATE_LIST,
  UPDATE_LIST_SUCCEED,
  UPDATE_LIST_FAILED,
  ARCHIVE_LIST,
  ARCHIVE_LIST_SUCCEED,
  ARCHIVE_LIST_FAILED,
} from '../constants/listConstants';

export const createList = ({ title }, boardId, hideDropdown) => (
  (dispatch) => {
    dispatch({ type: CREATE_LIST });
    axios({
      method: "POST",
      url: `/boards/${boardId}/lists`,
      data: { title },
    }).then((response) => {
      hideDropdown();
      dispatch({
        type: CREATE_LIST_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: CREATE_LIST_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const updateList = ({ title, id }) => (
  (dispatch) => {
    dispatch({ type: UPDATE_LIST });
    axios({
      method: "PUT",
      url: `/lists/${id}`,
      data: { title },
    }).then((response) => {
      dispatch({
        type: UPDATE_LIST_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: UPDATE_LIST_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const archiveList = (id, boardId) => (
  (dispatch) => {
    dispatch({ type: ARCHIVE_LIST });
    axios({
      method: "GET",
      url: `/lists/${id}/archive`,
    }).then((response) => {
      dispatch({
        type: ARCHIVE_LIST_SUCCEED,
        data: response.data,
      });
    })
  }
);
