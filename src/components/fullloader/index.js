import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import loadable from '@loadable/component'
import './index.scss'

const Loader = loadable(() => import('components/loader'))

class FullLoader extends Component {

    constructor(props) {

        super(props);

        this.state = {}
    }

    render() {

        if (this.props.isFullLoader){

            document.body.style.overflow = 'hidden';

        }else{

            document.body.style.overflow = 'auto';
        }

        return (
            <div id="full-loader" className={!this.props.isFullLoader ? 'hide' : ''}>
                <Loader size={50}/>
            </div>
        )
    }
}


const mapStateToProps = (reducer) =>{

    const {isFullLoader} = reducer;

    return {isFullLoader};
}

export default withRouter(connect(mapStateToProps, {})(FullLoader));
