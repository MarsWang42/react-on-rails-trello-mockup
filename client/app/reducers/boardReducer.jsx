import {
  LOAD_BOARD_LIST,
  LOAD_BOARD_LIST_SUCCEED,
  LOAD_BOARD_LIST_FAILED,
} from '../constants/boardConstants';

const BoardReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_BOARD_LIST:
      return { ...state,
        isLoading: true,
        list: [],
      };
    case LOAD_BOARD_LIST_SUCCEED:
      return { ...state,
        isLoading: false,
        list: action.data.boards,
      };
    case LOAD_BOARD_LIST_FAILED:
      return { ...state,
        isLoading: false,
        list: [],
      };
    default:
      return state;
  }
};

export default BoardReducer;
