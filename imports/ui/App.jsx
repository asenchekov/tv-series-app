import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Hello from './components/Hello';

const initialState = {};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Hello />
  </Provider>
);

export default App;
