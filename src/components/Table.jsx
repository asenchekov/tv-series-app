import React, { Component } from 'react';
import { HTTP } from 'meteor/http';

import './Table.css';

class Table extends Component {
    imageLink(imdb) { 
        const link = HTTP.get('https://api.themoviedb.org/3/find/'+ imdb, {
            params: {
                api_key: 'bcdbbabd42939d9fe3b0800ec18a70cf',
                external_source: 'imdb_id'
            }
        }, (error, result) => {
            if(error) {
                throw new Meteor.Error(error);
            } else {
                return 'https://image.tmdb.org/t/p/w500' + result.data.tv_results[0].poster_path
            }
        });
        console.log(link);
        return link;
    }

    render() {
        const rows = [...this.props.shows].map((show, index) => {
            const imdb = show.show.ids.imdb;
            const image = this.imageLink(imdb);
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                        <img src={image} />
                    </td>
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