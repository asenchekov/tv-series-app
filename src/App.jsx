import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { fetchData } from './actions/index';

import './static/css/App.css';

import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Table from './components/Table.jsx';
import Pagination from './components/Pagination.jsx';


class App extends Component {
  componentWillMount() {
    store.dispatch(fetchData(store.getState()));
  }
  

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
