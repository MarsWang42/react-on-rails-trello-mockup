import axios from 'axios';
import {
  LOAD_ARCHIVED_TASKS,
  LOAD_ARCHIVED_TASKS_SUCCEED,
  LOAD_ARCHIVED_TASKS_FAILED,
  LOAD_TASK_DETAIL,
  LOAD_TASK_DETAIL_SUCCEED,
  LOAD_TASK_DETAIL_FAILED,
  CREATE_TASK,
  CREATE_TASK_SUCCEED,
  CREATE_TASK_FAILED,
  UPDATE_TASK,
  UPDATE_TASK_SUCCEED,
  UPDATE_TASK_FAILED,
  ARCHIVE_TASK,
  ARCHIVE_TASK_SUCCEED,
  ARCHIVE_TASK_FAILED,
} from '../constants/taskConstants';

export const loadArchivedTasks = boardId => (
  (dispatch) => {
    dispatch({ type: LOAD_ARCHIVED_TASKS });
    axios({
      method: "GET",
      url: `/boards/${boardId}/archived_tasks`,
    }).then((response) => {
      dispatch({
        type: LOAD_ARCHIVED_TASKS_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: LOAD_ARCHIVED_TASKS_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const updateTask = ({ title, description, id }) => (
  (dispatch) => {
    dispatch({ type: UPDATE_TASK });
    axios({
      method: "PUT",
      url: `/tasks/${id}`,
      data: { title, description },
    }).then((response) => {
      dispatch({
        type: UPDATE_TASK_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: UPDATE_TASK_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const createTask = ({ title }, listId, boardId, hideDropdown) => (
  (dispatch) => {
    dispatch({ type: CREATE_TASK });
    axios({
      method: "POST",
      url: `/lists/${listId}/tasks`,
      data: { title },
    }).then((response) => {
      hideDropdown();
      dispatch({
        type: CREATE_TASK_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: CREATE_TASK_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const loadTaskDetail = id => (
  (dispatch) => {
    dispatch({ type: LOAD_TASK_DETAIL });
    axios({
      method: "GET",
      url: `/tasks/${id}`,
    }).then((response) => {
      dispatch({
        type: LOAD_TASK_DETAIL_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: LOAD_TASK_DETAIL_FAILED,
        data: response.response.data,
      });
    });
  }
);

export const archiveTask = (id, boardId) => (
  (dispatch) => {
    dispatch({ type: ARCHIVE_TASK });
    axios({
      method: "GET",
      url: `/tasks/${id}/archive`,
    }).then((response) => {
      dispatch({
        type: ARCHIVE_TASK_SUCCEED,
        data: response.data,
      });
    }).catch((response) => {
      dispatch({
        type: ARCHIVE_TASK_FAILED,
        data: response.response.data,
      });
    });
  }
);
