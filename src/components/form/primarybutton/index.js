import React, { Component } from 'react'
import './index.scss'

class PrimaryButton extends Component {

    render() {

        return (
            <button className={`primary-btn ${this.props.className} text-black`} onClick={this.props.onClick}>{this.props.children}</button>
        )
    }
}


export default PrimaryButton
