import {
  LOAD_ALL_LISTS,
  LOAD_ALL_LISTS_SUCCEED,
  LOAD_ALL_LISTS_FAILED,
} from '../constants/listConstants';

const ListReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_ALL_LISTS:
      return { ...state,
        isLoading: true,
        all: [],
      };
    case LOAD_ALL_LISTS_SUCCEED:
      console.log(action.data)
      return { ...state,
        isLoading: false,
        all: action.data.lists,
      };
    case LOAD_ALL_LISTS_FAILED:
      return { ...state,
        isLoading: false,
        all: [],
      };
    default:
      return state;
  }
};

export default ListReducer;
