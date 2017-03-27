import {
  LOAD_ALL_TASKS,
  LOAD_ALL_TASKS_SUCCEED,
  LOAD_ALL_TASKS_FAILED,
  CREATE_TASK,
  CREATE_TASK_SUCCEED,
  CREATE_TASK_FAILED,
} from '../constants/taskConstants';


const TaskReducer = (state = '', action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state,
        isCreating: true,
      };
    case CREATE_TASK_SUCCEED:
      return { ...state,
        isCreating: false,
      };
    case CREATE_TASK_FAILED:
      return { ...state,
        isCreating: false,
        creatingError: action.data.error,
      };
    default:
      return state;
  }
};

export default TaskReducer;
