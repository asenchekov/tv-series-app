import { GET_API_DATA_START, GET_API_DATA_READY, GET_API_DATA_ERROR } from "./actionTypes";

// action functions

// Trakt API info in variables
const traktApi = {
    baseUrl:  'https://api.trakt.tv/',
    headers: {
        'Content-type': 'application/json',
        'trakt-api-key': '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3',
        'trakt-api-version': 2
    }
}

// dispatch creator function with redux thunk calls before monting the app component
function fetchData(state) {
    return dispatch => {
        dispatch({type: GET_API_DATA_START});

        const shows = getShowsData(state);
        shows.then(data => {
            Promise.all(data.shows.map(show => {
                return getImagesData(show);
            })).then(result => {
                    fetch(traktApi.baseUrl + 'countries/shows', {
                        headers: traktApi.headers
                    }).then(response => response.json())
                    .then(countryList => {
                        const caption = state.search
                            && state.search.queryString
                            ? "Search '" + state.search.queryString + "'"
                            : "Trending";
                        dispatch(onSuccess({
                            shows: result,
                            countryList: countryList,
                            tableCaption: caption,
                            isLastPage: data.isLastPage,
                            lastPageNumber: data.lastPageNumber
                        }));
                    });
                });
        }).catch(error => dispatch(onError(error)));

        
    }
}

function onSuccess(payload) {
    return {
        type: GET_API_DATA_READY,
        data: {
            shows: payload.shows,
            countryList: payload.countryList,
            tableCaption: payload.tableCaption,
            isLastPage: payload.isLastPage,
            lastPageNumber: payload.lastPageNumber
        }
    };
}

function onError(error) {
    return {
        type: GET_API_DATA_ERROR,
        error: error
    };
}

// Used to get the shows data from trakt API
function getShowsData(state) {
    const { currentPage, search } = state;
    let queryUrl = '';
    let isLastPage = false;
    let lastPageNumber;
    if(!search) {
        queryUrl = traktApi.baseUrl + 'shows/trending?extended=full&page=' + currentPage
    } else {
        queryUrl = traktApi.baseUrl + 'search/show?extended=full&page='
                    + currentPage + '&years=' + search.years
                    + '&fields=title&query=' + search.queryString
                    + '&countries=' + search.country + '&limit=10';
    }

    return fetch(queryUrl, {
        headers: traktApi.headers
    }).then(response => {
        if(response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        const pageCount = lastPageNumber = response.headers.get("X-Pagination-Page-Count");
        const thisPage = response.headers.get("X-Pagination-Page");
        isLastPage = (pageCount === thisPage);
        return response.json();
    }).then(data => {
        console.log(data);
        return {
            shows: data,
            isLastPage: isLastPage,
            lastPageNumber
        }
    })
    .catch(error => {
        return error;
    });
}

// Used to fetch image links for posters
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
            if(data.tv_results.length !== 0 && data.tv_results[0].poster_path) {
                const link = 'https://image.tmdb.org/t/p/w200' + data.tv_results[0].poster_path;
                return {
                    title: show.show.title,
                    poster: link,
                    year: show.show.year,
                    country: show.show.country
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

export { fetchData };