import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Table.css';

class Table extends Component {

    render() {
        if(this.props.isLoading) {
            return (
                <div id="loadingSVG">
                    <img src='91.svg' alt='...LOADING' />
                    <h2>loading...</h2>
                </div>
            );
        } else {
            let rows = this.props.shows.map((show, i) => {
                return <tr key={i}>
                            <th>{i + 1}</th>
                            <td>
                                <img
                                    src={show.poster}
                                    alt={'"' + show.title + '" poster.'}
                                    width='100px'
                                />
                            </td>
                            <td>{show.title}</td>
                            <td>{show.year}</td>
                            <td>{show.country ? show.country.join(', ') : "n/a"}</td>
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
}

function mapStateToProps(state) {
    return {
        shows: state.shows,
        isLoading: state.isLoading,
        tableCaption: state.tableCaption
    };
}

export default connect(mapStateToProps)(Table);