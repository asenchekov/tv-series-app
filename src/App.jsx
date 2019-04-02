import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import './static/css/App.css';

import Header from './components/Header';
import UserInput from './containers/UserInput';
import Table from './containers/Table';
import Pagination from './containers/Pagination';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <UserInput />
        <Table />
        <Pagination />
      </Provider>
    );
  }
}

export default App;
