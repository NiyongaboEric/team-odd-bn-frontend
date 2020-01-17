const state = {
  auth: {
    signup: {
      spinnerStatus: false,
      signupInputData: {},
      signupData: { },
      signupError: { },
    },
    signin: {
      spinnerStatus: false,
      signinInputData: {},
      signinData: {},
      signinError: {},
    },
  },
  trips: {
    requests: {
      requestsData: [],
      singleRequestData: {},
      requestCommentsData: {},
      requestsError: {},
    },
  },
  viewProfile: {
    profile: {},
  },
};
export default state;
