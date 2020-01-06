import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import apiCall from '../../../helpers/apiCall';
import {
  addNewRoomsAction,
  createAccommodationAction,
  newAccommodationPhotos,
  roomsModalAction,
  getCitiesAction,
  newAccommodationInput,
} from '../../../redux/actions/createAccommodationActions';

import {
  retrievedCitiesAction,
  retrievedCitiesApi,
  createAccommodationApi,
  createAccommodationMockAction,
  createAccommodationMockError,
  createAccommodationMockApiError,
} from '../../../__mocks__/accommodation/createAccommodation';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Password reset Actions', () => {
  beforeEach(() => {
    moxios.install(apiCall);
  });

  afterEach(() => {
    moxios.uninstall(apiCall);
  });
  it('it Should dispatch getCitiesAction', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(retrievedCitiesApi);
    });
    store = mockStore({});
    await store.dispatch(getCitiesAction()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(retrievedCitiesAction);
    });
  });
  it('it Should dispatch on createAccommodation', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(createAccommodationApi);
    });
    store = mockStore({});
    await store
      .dispatch(createAccommodationAction())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(createAccommodationMockAction);
      });
  });
  it('it Should dispatch error on createAccommodation', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(createAccommodationMockApiError);
    });
    store = mockStore({});
    await store.dispatch(createAccommodationAction()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(createAccommodationMockError);
    });
  });
});
