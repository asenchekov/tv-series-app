

function getInitialState() {
    const url = 'https://api.trakt.tv/shows/trending?page=1&limit=10';
    let shows = []
    fetch(url, {
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
        
        response.json().then(function(data) {
            data.forEach(each => {
                shows.push(each);
            });
        });
    }).catch(error => {
        console.log('Fetch Error : -S', error);
    });
    return {
        shows: shows,
        imageLinks: [],
        currentPage: 1,
        limit: 10,
        tableCaption: 'Trending'
    };
}

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

export { getInitialState, nextPage, previousPage };
