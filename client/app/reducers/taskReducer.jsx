import {
  CREATE_TASK,
  CREATE_TASK_SUCCEED,
  CREATE_TASK_FAILED,
  LOAD_ARCHIVED_TASKS,
  LOAD_ARCHIVED_TASKS_SUCCEED,
  LOAD_ARCHIVED_TASKS_FAILED,
  LOAD_TASK_DETAIL,
  LOAD_TASK_DETAIL_SUCCEED,
  LOAD_TASK_DETAIL_FAILED,
  ARCHIVE_TASK,
  ARCHIVE_TASK_SUCCEED,
  ARCHIVE_TASK_FAILED,
} from '../constants/taskConstants';


const TaskReducer = (state = '', action) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state,
        isCreating: true,
        creatingError: null,
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
    case LOAD_ARCHIVED_TASKS:
      return { ...state,
        archivedIsLoading: true,
        archivedTasks: {},
        archivedError: null,
      };
    case LOAD_ARCHIVED_TASKS_SUCCEED:
      return { ...state,
        archivedIsLoading: false,
        archivedTasks: action.data.archivedTasks,
      };
    case LOAD_ARCHIVED_TASKS_FAILED:
      return { ...state,
        archivedIsLoading: false,
        archivedTasks: {},
        detailError: action.data.error,
      };
    case ARCHIVE_TASK:
      return { ...state,
        isArchiving: true,
        archivingError: null,
      };
    case ARCHIVE_TASK_SUCCEED:
      return { ...state,
        isArchiving: false,
      };
    case ARCHIVE_TASK_FAILED:
      return { ...state,
        isArchiving: false,
        archivingError: action.data.error,
      };
    case LOAD_TASK_DETAIL:
      return { ...state,
        detailIsLoading: true,
        taskDetail: {},
        detailError: null,
      };
    case LOAD_TASK_DETAIL_SUCCEED:
      return { ...state,
        detailIsLoading: false,
        taskDetail: action.data.task,
      };
    case LOAD_TASK_DETAIL_FAILED:
      return { ...state,
        detailIsLoading: false,
        taskDetail: {},
        detailError: action.data.error,
      };
    default:
      return state;
  }
};

export default TaskReducer;
