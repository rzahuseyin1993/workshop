import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import loadable from '@loadable/component'
import {connect} from 'react-redux';
import './index.scss'


const Loader = loadable(() => import('components/loader'))

class CommonLoader extends Component {

    render() {

        return (
            <div id="common-loader">
                {
                    this.props.isLoader &&
                    <Loader/>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ workshop }) =>{

    const {isLoader} = workshop;

    return {isLoader};
}

export default withRouter(connect(mapStateToProps, {})(CommonLoader));
