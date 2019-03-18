import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSearch } from '../actions/index';

import './UserInput.css';


class UserInput extends Component {
    submitHandler = (event) => {
        event.preventDefault();
        const query = {
            string: this.refs.searchString.value,
            year: this.refs.searchYear.value,
            country: this.refs.searchCountry.value
        }
        this.props.dispatch(getSearch(query));
    }

    render() {
        if(this.props.isLoading) {
            return null;
        }

        const countryList = this.props.countryList.map(country => {
            return <option value={country.code}>{country.name}</option>
        });

        return (
            <form id="userInput" onSubmit={this.submitHandler}>
            Title : <input type="text"
                        ref="searchString"
                        // required
                    />
            Year : <input type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        ref="searchYear"
                    />
            Country: <select ref="searchCountry">
                        <option value="" selected></option>
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