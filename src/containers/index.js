import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import loadable from '@loadable/component'

const Header = loadable(() => import('components/header'));
const Footer = loadable(() => import('components/footer'));
const FullLoader = loadable(() => import('components/fullloader'))
const CommonLoader = loadable(() => import('components/commonloader'))
const CartDlg = loadable(() => import('components/cartdlg'))
const CheckoutDlg = loadable(() => import('components/checkoutdlg'))
const Workshops = loadable(() => import('./workshops'))
const WorkshopDetails = loadable(() => import('./workshopdetails'))



class RouteApp extends Component {

    constructor(props) {

        super(props)

        this.state = {}
    }

    componentDidMount = () => {}

    render() {


        return (
            <React.Fragment>
                <FullLoader/>
                <Header/>
                <Switch>
                    <Route path='/workshops/:id' component={WorkshopDetails}/>
                    <Route exact path='/workshops' component={Workshops}/>
                    <Redirect path='/' to='/workshops'/>
                </Switch>
                <Footer/>
                <CommonLoader/>
                <CartDlg/>
                <CheckoutDlg/>
            </React.Fragment>
        )
    }
}

export default RouteApp;
