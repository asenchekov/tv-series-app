import { createStore } from 'redux';

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

const initialState = {
    shows: [],
    imageLinks: [],
    page: 1,
    limit: 5,
    tableCaption: ''
  };

const store = createStore(reducer);

export default store;