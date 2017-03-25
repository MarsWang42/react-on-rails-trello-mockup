import axios from 'axios';
import {
  USER_SIGN_OUT_SUCCEED,
  USER_SIGN_IN_SUCCEED,
  USER_SIGN_IN_FAILED,
  USER_SIGN_UP_SUCCEED,
  USER_SIGN_UP_FAILED,
} from '../constants/navbarConstants';
import UserHelpers from '../helpers/userHelpers';

export const logoutUser = csrfToken => (
  (dispatch) => {
    axios({
      method: "DELETE",
      url: "/user/sign_out.json",
      data: {
        // If csrfToken has been updated, use the new csrfToken.
        // Otherwise get it from metadata.
        authenticity_token: csrfToken || UserHelpers.getMetaContent("csrf-token"),
      },
    }).then((respond) => {
      dispatch({
        type: USER_SIGN_OUT_SUCCEED,
        data: respond.data,
      });
    });
  }
);

export const loginUser = ({ email, password }, csrfToken, hideSignInModal) => (
  (dispatch) => {
    axios({
      method: "post",
      url: "/user/sign_in.json",
      data: {
        user: {
          email,
          password,
        },
        // If csrfToken has been updated, use the new csrfToken.
        // Otherwise get it from metadata.
        authenticity_token: csrfToken || UserHelpers.getMetaContent("csrf-token"),
      },
    }).then((response) => {
      hideSignInModal();
      dispatch({
        type: USER_SIGN_IN_SUCCEED,
        data: response.data,
      });
    }).catch((error) => {
      dispatch({
        type: USER_SIGN_IN_FAILED,
        data: error.response.data,
      });
    });
  }
);


export const registerUser = ({ email, password, username }, csrfToken, hideSignUpModal) => (
  (dispatch) => {
    axios({
      method: "post",
      url: "/user.json",
      data: {
        user: {
          username,
          email,
          password,
        },
        // If csrfToken has been updated, use the new csrfToken.
        // Otherwise get it from metadata.
        authenticity_token: csrfToken || UserHelpers.getMetaContent("csrf-token"),
      },
    }).then((respond) => {
      hideSignUpModal();
      dispatch({
        type: USER_SIGN_UP_SUCCEED,
        data: respond.data,
      });
    }).catch((error) => {
      dispatch({
        type: USER_SIGN_UP_FAILED,
        data: error.response.data,
      });
    });
  }
);
