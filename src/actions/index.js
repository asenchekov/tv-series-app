
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

function fetchData(state) {
    return dispatch => {
        dispatch({
            type: 'GET_API_DATA_START'
        });

        const shows = getShowsData(state);
        shows.then(data => onSuccess(data), error => onError(error));

        function onSuccess(success) {
            return dispatch({
                type: 'GET_API_DATA_READY',
                data: {
                    ...state,
                    shows: success
                }
            });
        }

        function onError(error) {
            return dispatch({
                type: 'GET_API_DATA_ERROR',
                error: error
            });
        }
    }
}

function fetchImages(state) {
    return dispatch => {
        dispatch({
            type: 'GET_API_DATA_START'
        });
        console.log(state);
        const images = getImagesData(state.shows[0]);
        images.then(data => onSuccess(data), error => onError(error));

        function onSuccess(success) {
            return dispatch({
                type: 'GET_API_DATA_READY',
                data: {
                    ...state,
                    imageLinks: success
                }
            });
        }

        function onError(error) {
            return dispatch({
                type: 'GET_API_DATA_ERROR',
                error: error
            });
        }
    }
}

function getShowsData(state) {
    const apiUrl = 'https://api.trakt.tv/shows/';
    const { currentPage, limit, table } = state;
    const queryUrl = apiUrl + table + '?page=' + currentPage + '&limit=' + limit;
    console.log(queryUrl);
    
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
    }).then(data => data)
    .catch(error => {
        console.log('Fetch Error : -S', error);
    });
}

function getImagesData(show) {
    const params = '?api_key=bcdbbabd42939d9fe3b0800ec18a70cf&external_source=imdb_id';

    console.log(show);
        const queryUrl = 'https://api.themoviedb.org/3/find/' + show.show.ids.imdb + params;
        
        return fetch(queryUrl)
            .then(response => {
                if(response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                return response.json();
            })
            .then(data => {
                const link = 'https://image.tmdb.org/t/p/w200' + data.tv_results[0].poster_path;
                console.log(link);
                return link;
            })
            .catch(error  => {
                console.log('Fetch Error : -S', error);
            });
    // });

    // return {
    //     ...state,
    //     imageLinks: imageLinks
    // }
}

export { nextPage, previousPage, fetchData, fetchImages };
