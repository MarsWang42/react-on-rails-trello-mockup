import {
  LOAD_BOARD_LIST,
  LOAD_BOARD_LIST_SUCCEED,
  LOAD_BOARD_LIST_FAILED,
  LOAD_BOARD_DETAIL,
  LOAD_BOARD_DETAIL_SUCCEED,
  LOAD_BOARD_DETAIL_FAILED,
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
    case LOAD_BOARD_DETAIL:
      return { ...state,
        detailIsLoading: true,
        currentBoard: {},
      };
    case LOAD_BOARD_DETAIL_SUCCEED:
      return { ...state,
        detailIsLoading: false,
        currentBoard: action.data.currentBoard,
      };
    case LOAD_BOARD_DETAIL_FAILED:
      return { ...state,
        detailIsLoading: false,
        currentBoard: {},
        error: action.data.error,
      };
    default:
      return state;
  }
};

export default BoardReducer;
