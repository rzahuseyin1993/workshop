import React, { Component } from 'react'

class Back extends Component {


    constructor(props) {

        super(props);

        this.state = {}
    }


    componentDidMount = () => {}


    render() {

        

        return (
            <div className="back d-flex align-items-center pointer" onClick={this.props.onClick}>
                <img src="/images/back_icon.svg" alt="back_icon"/>
                <h6 className="mb-0 ml-2">{this.props.children}</h6>
            </div>
        )
    }
}

export default Back;
