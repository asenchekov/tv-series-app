import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

// Import components
import Header from './components/Header';
import UserInput from './components/UserInput';
import Table from './components/Table';
import ButtonNext from './components/ButtonNext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: '',
      page: 1,
      limit: 5,
      table: ''
    };
    this.changeNext = this.changeNext.bind(this);
    this.changePrevious = this.changePrevious.bind(this);
  }

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

  componentDidMount() {
    const auth = '4a0ffe77fcab467abe1241f72721acfca278cbd2c9d8e313f512499ecbdb2836';
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
    const auth = '4a0ffe77fcab467abe1241f72721acfca278cbd2c9d8e313f512499ecbdb2836';
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
  
  render() {
    return (
      <div>
        <Header />
        <UserInput />
        <Table
          shows={this.state.shows}
          tableCaption={this.state.table}
          page={this.state.page}
        />
        <ButtonNext
          currentPage={this.state.page}
          changeNext={this.changeNext}
          changePrevious={this.changePrevious}
        />
      </div>
    );
  }
};

export default App;
