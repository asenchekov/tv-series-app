import { createStore } from 'redux';
import { getInitialState, nextPage, previousPage } from './actions/index';

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'NEXT_PAGE':
            return nextPage(state);

        case 'PREVIOUS_PAGE':
            return previousPage(state);
            
        default:
            return state;
    }
  }

const initialState = getInitialState();

const store = createStore(reducer);

export default store;