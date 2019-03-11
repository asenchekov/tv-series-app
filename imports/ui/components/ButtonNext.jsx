import React, { Component } from 'react';


class ButtonNext extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.changePrevious}>PREV</button>
                <span>{this.props.currentPage}</span>
                <button onClick={this.props.changeNext}>NEXT</button>
            </div>
        );
    }
}

export default ButtonNext;