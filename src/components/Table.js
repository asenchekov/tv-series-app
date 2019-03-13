import React, { Component } from 'react';

import './Table.css';

class Table extends Component {
    render() {
        const rows = [...this.props.shows].map((show, index) => {
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td></td>
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

export default Table;