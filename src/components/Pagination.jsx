import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import store from '../store';


class Pagination extends Component {
    nextPage = () => {
        if(this.props.isLastPage) {
            return;
        }
        this.props.dispatch({ type: 'NEXT_PAGE' });
        this.props.dispatch(fetchData(store.getState()));
    }

    previousPage = () => {
        if(this.props.currentPage === 1) {
            return;
        }
        this.props.dispatch({ type: 'PREVIOUS_PAGE' });
        this.props.dispatch(fetchData(store.getState()));
    }

    render() {
        if(this.props.shows.length === 0 || this.props.isLoading) {
            return null;
        }
        return (
            <div id="pagination">
                <div id="prev">
                    <button onClick={this.previousPage}>PREV</button>
                </div>
                <div>
                    <p>page {this.props.currentPage} of {this.props.lastPageNumber}</p>
                </div>
                <div id="next">
                    <button onClick={this.nextPage}>NEXT</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shows: state.shows,
        currentPage: state.currentPage,
        isLastPage: state.isLastPage,
        lastPageNumber: state.lastPageNumber,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(Pagination);