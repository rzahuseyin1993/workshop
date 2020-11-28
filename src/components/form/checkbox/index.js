import React, { Component } from 'react'
import './index.scss'

class CheckBox extends Component {

    render() {
        return (
            <div className={`custom-checkbox ${this.props.className}`} >
                <input id={this.props.id} type="checkbox" onChange={()=>{this.props.onChange()}} checked={this.props.value || false}/>
                <label htmlFor={this.props.id} className={this.props.className}>{this.props.children}</label>
            </div>
        )
    }
}

export default CheckBox
