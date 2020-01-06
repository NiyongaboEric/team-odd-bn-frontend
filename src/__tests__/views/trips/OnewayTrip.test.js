import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import store from '../../../redux/store';
import OnewayTrip from '../../../containers/TripsContainer/oneway';
import initialState from '../../../redux/store/initialState';
import {
  init,
} from '../../../__mocks__/trips/requests';

const mockStore = configureStore([]);
let wrapper;
let stores;
describe('On Oneway page', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(
      <Provider store={store}>
        <Router>
          <OnewayTrip />
        </Router>
      </Provider>,
      div,
    );
  });
  it('Test snapshot using the initial state', () => {
    stores = mockStore(initialState);
    wrapper = mount(<Provider store={stores}><Router><OnewayTrip /></Router></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
