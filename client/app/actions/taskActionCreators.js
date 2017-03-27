import axios from 'axios';
import {
  LOAD_ALL_TASKS,
  LOAD_ALL_TASKS_SUCCEED,
  LOAD_ALL_TASKS_FAILED,
  CREATE_TASK,
  CREATE_TASK_SUCCEED,
  CREATE_TASK_FAILED,
} from '../constants/taskConstants';
import { loadBoardDetail } from './boardActionCreators';


export const createTask = ({ title }, listId, boardId) => (
  (dispatch) => {
    dispatch({ type: CREATE_TASK });
    axios({
      method: "POST",
      url: `/lists/${listId}/tasks`,
      data: { title },
    }).then((response) => {
      dispatch({ type: CREATE_TASK_SUCCEED });
      dispatch(loadBoardDetail(boardId));
    }).catch((response) => {
      dispatch({
        type: CREATE_TASK_FAILED,
        data: response.response.data,
      });
    });
  }
);
