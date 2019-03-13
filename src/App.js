import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Table from './components/Table';
import ButtonNext from './components/ButtonNext';

/* 
  changeNext() {
    this.setState({
      page: this.state.page + 1
    });
  }

  changePrevious() {
    if(this.state.page !== 1)
      this.setState({
        page: this.state.page - 1
      });
  }

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


  componentDidMount() {
    const api_Key = '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3';
    const showsURL = 'https://api.trakt.tv/shows/trending';
    HTTP.get(showsURL, {
      params: {
          page: this.state.page,
          limit: this.state.limit
      },
      headers: {
          "Content-type": "application/json",
          "trakt-api-key": api_Key,
          "trakt-api-version": 2
      }
      }, (error, result) => {
          if(error) {
              throw new Meteor.Error(error);
          } else {
              this.setState({
                shows: [...result.data],
                table: 'Trending'
              });
          }
    });
  }

  componentDidUpdate() {
    const api_Key = '38760291a0e06beeee9e5a43a2217cea8108ee0dc6d9a2fbcf784ac9aec2bdc3';
    const showsURL = 'https://api.trakt.tv/shows/trending';
    HTTP.get(showsURL, {
      params: {
          page: this.state.page,
          limit: this.state.limit
      },
      headers: {
          "Content-type": "application/json",
          "trakt-api-key": api_Key,
          "trakt-api-version": 2
      }
      }, (error, result) => {
          if(error) {
              console.error(error);
          } else {
              this.setState({
                shows: [...result.data],
                table: 'Trending'
              });
          }
    });
  }
*/

class App extends Component {
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
