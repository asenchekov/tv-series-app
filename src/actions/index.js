
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

function fetchShowsData(state) {
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
            let params = '?api_key=bcdbbabd42939d9fe3b0800ec18a70cf&external_source=imdb_id';
            const imageLinks = shows.map(show => {
                const imdbId = show.show.ids.imdb;
                const queryUrl = 'https://api.themoviedb.org/3/find/' + imdbId + params;
                
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
            });
            dispatch({
                type: 'GET_API_DATA_READY',
                data: {
                    shows,
                    imageLinks
                }
            });
            return {shows, imageLinks};
        })
        // .then(data => {
        //     dispatch({
        //         type: 'GET_API_DATA_READY',
        //         data: {
        //             ...data
        //         }
        //     });
        //     return data;
        // })
        .catch(error => {
            console.log('Fetch Error : -S', error);
        });
    }
}

export { nextPage, previousPage, fetchShowsData };
