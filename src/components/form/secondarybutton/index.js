import React, { Component } from 'react'
import './index.scss'

class SecondaryButton extends Component {

    render() {

        return (
            <button className={`secondary-btn ${this.props.className} text-black`} onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}


export default SecondaryButton
