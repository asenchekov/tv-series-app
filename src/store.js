import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

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
                shows: action.data.shows,
                countryList: action.data.countryList,
                tableCaption: action.data.tableCaption,
                isLastPage: action.data.isLastPage,
                lastPageNumber: action.data.lastPageNumber,
                isLoading: false,
            }
        case 'GET_API_DATA_ERROR':
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case 'SEARCH_QUERY_SUBMIT':
            return {
                ...state,
                currentPage: 1,
                search: action.search
            }
        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1
            };

        case 'PREVIOUS_PAGE':
            return {
                ...state,
                currentPage: state.currentPage - 1
            };
            
        default:
            return state;
    }
  }

 export const initialState = {
    shows: [],
    isLoading: true,
    currentPage: 1,
    tableCaption: '',
    isLastPage: false,
    error: false,
    search: null
};

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger));

export default store;