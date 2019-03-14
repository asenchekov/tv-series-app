import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { fetchShowsData } from './actions/index';

import './App.css';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Table from './components/Table';
import ButtonNext from './components/ButtonNext';

/* 
  imageLink(imdb) { 
    const link = HTTP.get('https://api.themoviedb.org/3/find/'+ imdb, {
        params: {
            api_key: 'bcdbbabd42939d9fe3b0800ec18a70cf',
            external_source: 'imdb_id'
        }
    }, (error, result) => {
        if(error) {
            console.error(error);
        } else {
            return 'https://image.tmdb.org/t/p/w500' + result.data.tv_results[0].poster_path
        }
    });
    console.log(link);
    return link;
  }
*/

class App extends Component {
  componentDidMount() {
    store.dispatch(fetchShowsData());
  }

  render() {
    return (
      <Provider store={store}>
        <Header />
        <UserInput />
        <Table />
        <ButtonNext />
      </Provider>
    );
  }
}

export default App;
