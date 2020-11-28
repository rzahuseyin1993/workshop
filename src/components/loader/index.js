import React, { Component } from 'react'
import './index.scss'

class Loader extends Component {

    render() {

        return (

            <div id="loader" style={{

                width: `${this.props.size ? `${this.props.size}px` : '30px'}`,

                height: `${this.props.size ? `${this.props.size}px` : '30px'}`
                
            }} className={this.props.className}></div>
        )
    }
}

export default Loader
