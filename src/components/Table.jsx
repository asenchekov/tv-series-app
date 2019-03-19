import React, { Component } from 'react';
import { connect } from 'react-redux';


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
            if(this.props.error) {
                return  <div>
                            <h1>SOMETHING BAD HAPPENED!</h1>
                            {/* <h1>{this.props.error}</h1> */}
                        </div>;
            }

            if(this.props.shows.length === 0) {
                return <h1>NOTHING FOUND!</h1>
            }

            let rows = this.props.shows.map((show, i) => {
                return <tr key={i}>
                            <th width="5%">{i + 1}</th>
                            <td width="100px">
                                <img
                                    src={show.poster}
                                    alt={'"' + show.title + '" poster.'}
                                    width='100px'
                                />
                            </td>
                            <td>{show.title}</td>
                            <td width="10%">{show.year}</td>
                            <td width="10%">{show.country ? show.country.join(', ') : "n/a"}</td>
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
        isLoading: state.isLoading,
        tableCaption: state.tableCaption,
        error: state.error
    };
}

export default connect(mapStateToProps)(Table);