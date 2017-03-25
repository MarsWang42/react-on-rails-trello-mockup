import {
  USER_SIGN_OUT_SUCCEED,
  USER_SIGN_IN_SUCCEED,
  USER_SIGN_IN_FAILED,
  USER_SIGN_UP_SUCCEED,
  USER_SIGN_UP_FAILED,
} from '../constants/navbarConstants';

const UserReducer = (state = '', action) => {
  switch (action.type) {
    case USER_SIGN_OUT_SUCCEED:
      return { ...state,
        isSignedIn: false,
        csrfToken: action.data.csrfToken,
        currentUser: null,
      };
    case USER_SIGN_IN_SUCCEED:
      return { ...state,
        isSignedIn: true,
        csrfToken: action.data.csrfToken,
        currentUser: action.data.currentUser,
        signInError: "",
      };
    case USER_SIGN_IN_FAILED:
      return { ...state,
        signInError: action.data.error,
      };
    case USER_SIGN_UP_SUCCEED:
      return { ...state,
        isSignedIn: true,
        csrfToken: action.data.csrfToken,
        currentUser: action.data.currentUser,
      };
    case USER_SIGN_UP_FAILED:
      return { ...state,
        signUpError: action.data.error,
      };
    default:
      return state;
  }
};

export default UserReducer;
