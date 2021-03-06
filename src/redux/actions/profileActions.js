import { SPINNER_STATUS, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR } from '../actionTypes/profileActionTypes';
import apiCall from '../../helpers/apiCall';

export const updateSpinnerStatus = (value) => ({
  type: SPINNER_STATUS,
  spinner: value,
});


const getProfile = () => async (dispatch) => {
  const API_URL = '/users/view-profile';
  const HEADERS_REQUEST = {
    token: localStorage.getItem('token'),
  };
  try {
    const profileInformation = await apiCall.get(API_URL, { headers: HEADERS_REQUEST });
    dispatch(updateSpinnerStatus(false));
    return dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: profileInformation.data,
    });
  } catch (error) {
    dispatch(updateSpinnerStatus(false));
    return dispatch({
      type: FETCH_PROFILE_ERROR,
      payload: error.response.data,
    });
  }
};

export default getProfile;
