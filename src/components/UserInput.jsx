import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/index';
import store from '../store';


class UserInput extends Component {
    submitHandler = (event) => {
        event.preventDefault();

        const query = {
            queryString: this.refs.searchString.value,
            years: this.refs.searchYear.value,
            country: this.refs.searchCountry.value
        }

        this.props.dispatch({ type: 'SEARCH_QUERY_SUBMIT', search: query });
        this.props.dispatch(fetchData(store.getState()));
    }

    render() {
        if(this.props.isLoading || this.props.error) {
            return null;
        }

        const countryList = this.props.countryList.map((country, key) => {
            return <option key={key} value={country.code}>{country.name}</option>
        });

        return (
            <div id="userInput">
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="searchString">Title: </label>
                    <input
                        type="text"
                        ref="searchString"
                        name="searchString"
                        placeholder="Search shows..."
                    />
                    <label htmlFor="searchYear">Year: </label>
                    <input type="number"
                        min="1900"
                        max={new Date().getFullYear()}
                        ref="searchYear"
                        name="searchYear"
                        // defaultValue={new Date().getFullYear()}
                    />
                    <label htmlFor="searchCountry">Country: </label>
                    <select ref="searchCountry" name="searchCountry">
                        <option defaultValue></option>
                        {countryList}
                    </select>
                    <button type="submit">Search...</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        countryList: state.countryList,
        isLoading: state.isLoading,
        error: state.error
    };
}

export default connect(mapStateToProps)(UserInput);