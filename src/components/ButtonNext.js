import React, { Component } from 'react';
import { connect } from 'react-redux';


class ButtonNext extends Component {
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

  //implement this with the functions up top
  nextPage = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }
    */

    nextPage = () => {
        this.props.dispatch({ type: 'NEXT_PAGE' });
    }

    previousPage = () => {
        this.props.dispatch({ type: 'PREVIOUS_PAGE' });
    }

    render() {
        return (
            <div>
                <button onClick={this.previousPage}>PREV</button>
                <span>{this.props.currentPage}</span>
                <button onClick={this.nextPage}>NEXT</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentPage: state.currentPage
    };
}

export default connect(mapStateToProps)(ButtonNext);