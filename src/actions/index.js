// action functions

//function to get to next page of the search
// needs updating now works only for trending page
function nextPage(state) {
    return {
        ...state,
        currentPage: state.currentPage + 1
    };
}

//function to get to previous page of the search
// needs updating now works only for trending page
function previousPage(state) {
    if(state.currentPage === 1) {
        return state;
    }
    return {
        ...state,
        currentPage: state.currentPage - 1
    };
}

//function to fetch data for the current search
// gets called when user presses search button
//needs updating because its very similar to the fuction that gets initial data
function getSearch(query) {
    return dispatch => {
        dispatch({
            type: 'GET_API_DATA_START'
        });

        const getShows = getShowsQuery(query);

        getShows.then(data => {
            Promise.all(data.map(show => {
                return getImagesData(show);
            })).then(result => {
                    fetch('https://api.trakt.tv/countries/shows', {
                        headers: {
                            'Content-type': 'application/json',
                            'trakt-api-key': '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3',
                            'trakt-api-version': 2
                        }
                    }).then(response => response.json())
                    .then(countryList => {
                        onSuccess({
                            shows: result,
                            countryList: countryList,
                            tableCaption: "Searching " + Object.values(query).join(', ')
                        });
                    });
                });
        }, error => onError(error));


        function onSuccess(payload) {
            return dispatch({
                type: 'GET_API_DATA_READY',
                data: {
                    shows: payload.shows,
                    countryList: payload.countryList,
                    tableCaption: payload.tableCaption
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

//fetch function to get the searched info
function getShowsQuery(query) {
    
    const queryUrl = `https://api.trakt.tv/search/show?page=1&years=${query.year}&fields=title&query=${query.string}&countries=${query.country}`;

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
    }).then(data => {
        console.log(data);
        return data;
    })
    .catch(error => {
        console.log('Fetch Error : -S', error);
    });
}

function fetchData(state) {
    return dispatch => {
        dispatch({
            type: 'GET_API_DATA_START'
        });

        const shows = getShowsData(state);
        shows.then(data => {
            Promise.all(data.map(show => {
                return getImagesData(show);
            })).then(result => {
                    fetch('https://api.trakt.tv/countries/shows', {
                        headers: {
                            'Content-type': 'application/json',
                            'trakt-api-key': '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3',
                            'trakt-api-version': 2
                        }
                    }).then(response => response.json())
                    .then(countryList => {
                        onSuccess({
                            shows: result,
                            countryList: countryList,
                            tableCaption: "Trending"
                        });
                    });
                });
        }, error => onError(error));

        function onSuccess(payload) {
            return dispatch({
                type: 'GET_API_DATA_READY',
                data: {
                    shows: payload.shows,
                    countryList: payload.countryList,
                    tableCaption: payload.tableCaption
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
            if(data.tv_results.length !== 0) {
                const link = 'https://image.tmdb.org/t/p/w200' + data.tv_results[0].poster_path;
                return {
                    title: show.show.title,
                    poster: link,
                    year: show.show.year,
                    country: data.tv_results[0].origin_country
                };
            }
            return {
                title: show.show.title,
                poster: "",
                year: show.show.year,
                country: ""
            };
        })
        .catch(error  => {
            console.log('Fetch Error : -S', error);
        });
}

export { nextPage, previousPage, fetchData, getSearch };
