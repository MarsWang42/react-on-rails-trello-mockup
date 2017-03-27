import {
  LOAD_ALL_LISTS,
  LOAD_ALL_LISTS_SUCCEED,
  LOAD_ALL_LISTS_FAILED,
} from '../constants/listConstants';

import {
  LOAD_BOARD_DETAIL,
  LOAD_BOARD_DETAIL_SUCCEED,
  LOAD_BOARD_DETAIL_FAILED,
} from '../constants/boardConstants';

const ListReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_BOARD_DETAIL:
      return { ...state,
        isLoading: true,
        all: [],
      };
    case LOAD_BOARD_DETAIL_SUCCEED:
      return { ...state,
        isLoading: false,
        all: action.data.lists,
      };
    case LOAD_BOARD_DETAIL_FAILED:
      return { ...state,
        isLoading: false,
        all: [],
      };
    default:
      return state;
  }
};

export default ListReducer;
