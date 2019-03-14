import  { initialState } from '../store';

function nextPage(state) {
    return {
        ...state,
        currentPage: state.currentPage + 1
    };
}

function previousPage(state) {
    if(state.currentPage === 1) {
        return state;
    }
    return {
        ...state,
        currentPage: state.currentPage - 1
    };
}

function fetchShowsData(state = initialState) {
    const apiUrl = 'https://api.trakt.tv/shows/';
    const { currentPage, limit, table } = state;
    const queryUrl = apiUrl + table + '?page=' + currentPage + '&limit=' + limit;
    console.log(queryUrl);
    return dispatch => {
        dispatch({
            type: 'GET_API_DATA_START'
        });
        return fetch(queryUrl, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'trakt-api-key': '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3',
                'trakt-api-version': 2
            }
        }).then(response => {
            if(response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            return response.json();
        }).then(shows => {
            dispatch({
                type: 'GET_API_DATA_READY',
                data: shows
            });
            return shows;
        })
        .catch(error => {
            console.log('Fetch Error : -S', error);
        });
    }
}

export { nextPage, previousPage, fetchShowsData };
