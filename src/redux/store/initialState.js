const state = {
  auth: {
    signup: {
      signupInputData: {},
      signupData: { blockSpinner: 'blockSpinner' },
      signupError: { blockSpinner: 'blockSpinner' },
    },
    signin: {
      signinInputData: {},
      signinData: { blockSpinner: 'blockSpinner' },
      signinError: { blockSpinner: 'blockSpinner' },
    },
  },
  trips: {
    tripRequests: {
      getCity: [],
      onewayData: {},
      onewayError: {},
      onewayInput: {},
    },
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
  profileError: {},
};
export default state;
