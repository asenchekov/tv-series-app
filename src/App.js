import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { fetchData } from './actions/index';

import './App.css';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Table from './components/Table';
import ButtonNext from './components/ButtonNext';


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
        <ButtonNext />
      </Provider>
    );
  }
}

export default App;
