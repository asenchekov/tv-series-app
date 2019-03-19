import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import store from '../store';

import './UserInput.css';


class UserInput extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        // {
        //     addToUrl: 'shows/trending',
        //     queryString: '',
        //     years: '',
        //     country: '',
        // }
        const query = {
            queryString: this.refs.searchString.value,
            years: this.refs.searchYear.value,
            country: this.refs.searchCountry.value
        }
        this.props.dispatch({ type: 'SEARCH_QUERY_SUBMIT', search: query });
        this.props.dispatch(fetchData(store.getState()));
    }

    render() {
        if(this.props.isLoading) {
            return null;
        }

        const countryList = this.props.countryList.map((country, key) => {
            return <option key={key} value={country.code}>{country.name}</option>
        });

        return (
            <form id="userInput" onSubmit={this.submitHandler}>
            Title : <input type="text"
                        ref="searchString"
                    />
            Year : <input type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        ref="searchYear"
                    />
            Country: <select ref="searchCountry">
                        <option defaultValue></option>
                        {countryList}
                    </select>
                <button type="submit">Search...</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        countryList: state.countryList,
        isLoading: state.isLoading
    };
}

export default connect(mapStateToProps)(UserInput);