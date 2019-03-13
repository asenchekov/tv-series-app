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
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }
    */
    render() {
        return (
            <div>
                <button onClick={this.props.changePrevious}>PREV</button>
                <span>{this.props.currentPage}</span>
                <button onClick={this.props.changeNext}>NEXT</button>
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