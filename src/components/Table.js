import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Table.css';

class Table extends Component {
    render() {
        let rows = [];
        this.props.shows.forEach((show, index) => {
            console.log(show);
            rows.push(
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>n/a</td>
                    <td>{show.show.title}</td>
                    <td>{show.show.year}</td>
                    <td>n/a</td>
                </tr>
            );
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
        tableCaption: state.tableCaption
    };
}

export default connect(mapStateToProps)(Table);