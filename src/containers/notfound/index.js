import React, {Component} from 'react'
import './index.scss'


class NotFound extends Component {

    constructor(props) {

        super(props)

        this.state = {}
    }


    componentDidMount = () => {}


    render() {

        return (
            <div id="notfound" className="container-fluid section">
                <div className="row justify-content-center m-0">
                    <div className="col-12">
                        <h2 className="text-center">Not Found</h2>
                    </div>
                </div>
            </div>
        )
    }
}


export default NotFound