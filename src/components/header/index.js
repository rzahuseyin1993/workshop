import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleCartDlg } from 'store/actions'
import './index.scss'

class Header extends Component {

    constructor(props){

        super(props);

        this.state = {

            isScrollUp: false
        }

        this.headerRef = React.createRef()
    }

    componentDidMount = () => { 

        if (window) window.addEventListener('scroll', this.stickyHeader)
    }

    componentWillUnmount = () => {

        if (window) window.removeEventListener('scroll', this.stickyHeader)
    }

    stickyHeader = () => {

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop

        if (winScroll > 150 && !this.headerRef.current.className.includes('scrol-up')) {

            this.headerRef.current.className = 'scrol-up'

            this.setState({isScrollUp: true})
        }

        if (winScroll <= 150 && this.headerRef.current.className.includes('scrol-up')) {

            this.headerRef.current.className = this.headerRef.current.className.replace('scrol-up', '')

            this.setState({isScrollUp: false})
        }
    }


    render() {

        const getCartItemCount = () => {

            let count = 0;
            
            this.props.cart.forEach(item => count += item.quantity)

            return count;
        }

        return (

            <header id="header" ref={this.headerRef}>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-6 col-md-9 d-flex align-items-center">
                            <a href="/" className="logo"><img src="/images/logo.svg"  alt="logo"/></a>
                        </div>
                        <div className="col-6 col-md-3 d-flex align-items-center justify-content justify-content-end justify-content-lg-start cart pointer" 
                            onClick={() => {
                                if (this.props.cart.length > 0) this.props.toggleCartDlg(true)
                            }}>
                            <div className="cart-icon mr-2">
                                <img src="/images/cart.svg" alt="cart"/>
                                {
                                    getCartItemCount() > 0 && <div className="badge"></div>
                                }
                            </div>
                            <h6 className="text-black cart-content-text d-none d-lg-block">
                                {
                                    getCartItemCount() === 0 ? 'Cart is Empty' : `${getCartItemCount()} Workshop in Cart`
                                }
                            </h6>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}



const mapStateToProps = ({ workshop }) =>{

    const { cart } = workshop;

    return { cart };
}

export default withRouter(connect(mapStateToProps, { toggleCartDlg })(Header));
