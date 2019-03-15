import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import store from '../store';


class ButtonNext extends Component {
    nextPage = () => {
        this.props.dispatch({ type: 'NEXT_PAGE' });
        this.props.dispatch(fetchData( store.getState()));
    }

    previousPage = () => {
        this.props.dispatch({ type: 'PREVIOUS_PAGE' });
        this.props.dispatch(fetchData(store.getState()));
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