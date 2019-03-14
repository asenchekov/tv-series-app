import { createStore, applyMiddleware } from 'redux';
import { nextPage, previousPage } from './actions/index';
import thunk from 'redux-thunk';

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'GET_API_DATA_START':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_API_DATA_READY':
            return {
                ...state,
                isLoading: false,
                shows: action.data.shows,
                imageLinks: action.data.imageLinks
            }
        case 'NEXT_PAGE':
            return nextPage(state);

        case 'PREVIOUS_PAGE':
            return previousPage(state);
            
        default:
            return state;
    }
  }

 export const initialState = {
    shows: [],
    isLoading: true,
    imageLinks: [],
    currentPage: 1,
    limit: 10,
    tableCaption: 'Trending',
    table: 'trending'
};

const store = createStore(
    reducer,
    applyMiddleware(thunk));

export default store;