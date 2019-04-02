import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../store/actions/index';

import TableRow from '../components/TableRow';
import Spinner from '../components/Spinner';
import Message from '../components/Message';


class Table extends Component {
    componentDidMount() {
        this.props.dispatch(fetchData({
            currentPage: this.props.currentPage,
            ...this.props.search
        }));
    }

    render() {
        if(this.props.isLoading) {
            return <Spinner />
        } else {
            if(this.props.error)
                return  <Message message={'SOMETHING BAD HAPPENED!'} />

            if(this.props.shows.length === 0)
                return <Message message={'NOTHING FOUND!'} />

            let rows = this.props.shows.map((show, i) => {
                return <TableRow key={i} index={i + 1} show={show} />
            });

            return (
                <table>
                    <caption>
                        {this.props.tableCaption}
                    </caption>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Poster</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        shows: state.shows,
        search: state.search,
        currentPage: state.currentPage,
        isLoading: state.isLoading,
        tableCaption: state.tableCaption,
        error: state.error
    };
}

export default connect(mapStateToProps)(Table);