import React, { Component } from 'react';

import './UserInput.css';


class UserInput extends Component {
    render() {
        return (
            <div id="userInput">
                <input type="text" />
                <button>Search...</button>
                <input type="checkbox" /> sort by ........
                <input type="checkbox" /> sort by ........
            </div>
        );
    }
}

export default UserInput;