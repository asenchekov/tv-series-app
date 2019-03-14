import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShowsData } from '../actions/index';
import store from '../store';


class ButtonNext extends Component {
    nextPage = () => {
        this.props.dispatch({ type: 'NEXT_PAGE' });
        this.props.dispatch(fetchShowsData(
          store.getState()
          // ...this.props.store,
          // currentPage: this.props.currentPage + 1
        ));
    }

    previousPage = () => {
        this.props.dispatch({ type: 'PREVIOUS_PAGE' });
        this.props.dispatch(fetchShowsData(
          store.getState()
          // ...this.props.store,
          // currentPage: this.props.currentPage - 1
        ));
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