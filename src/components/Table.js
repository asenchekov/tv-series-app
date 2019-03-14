import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Table.css';

class Table extends Component {
    render() {
        if(this.props.isLoading) {
            return (
                <div>LOADING...</div>
            );
        }

        let rows = this.props.shows.map((show, i) => {
            return <tr key={i}>
                        <th>{i + 1}</th>
                        <td>n/a</td>
                        <td>{show.show.title}</td>
                        <td>{show.show.year}</td>
                        <td>n/a</td>
                    </tr>
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
                        <th>Show name</th>
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

function mapStateToProps(state) {
    return {
        shows: state.shows,
        imageLinks: state.imageLinks,
        isLoading: state.isLoading,
        tableCaption: state.tableCaption
    };
}

export default connect(mapStateToProps)(Table);