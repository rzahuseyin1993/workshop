import React, {Component} from 'react'
import './index.scss'


class InternalError extends Component {

    constructor(props) {

        super(props)

        this.state = {}
    }


    componentDidMount = () => {}


    render() {

        return (
            <div id="internalerror" className="container-fluid section">
                <div className="row justify-content-center m-0">
                    <div className="col-12">
                        <h2 className="text-center">Internal Server Error</h2>
                    </div>
                </div>
            </div>
        )
    }
}


export default InternalError