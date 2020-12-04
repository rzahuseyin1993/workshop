import React, { Component } from 'react';
import { connect } from 'react-redux';
import loadable from '@loadable/component'
import { 
    toggleCartDlg, 
    updateCart, 
    toggleCheckoutDlg 
} from 'store/actions'
import './index.scss'


const CartItem = loadable(() => import('components/cartitem'));
const SecondaryButton = loadable(() => import('components/form/secondarybutton'))



class CartDlg extends Component {

    constructor(props){

        super(props);

        this.state = {

            
        }
    }
    

    componentDidMount = () => { 

    }


    componentDidUpdate = (prevProps, prevState) => {

        if (this.props.cart.length === 0) this.props.toggleCartDlg(false)
    }


    updateQuantity = (workshop, quantity) => {

        const newCart = [...this.props.cart]

        const index = newCart.findIndex(ws => ws.id === workshop.id)

        if (index > -1) newCart[index].quantity = quantity;

        this.props.updateCart(newCart)
    }


    removeCartItem = (index) => {

        const newCart = [...this.props.cart]

        newCart.splice(index, 1);

        this.props.updateCart(newCart)
    }


    calculatePrice = () => {

        let price = 0;

        this.props.cart.forEach(prod => {

            price += prod.quantity * prod.price
        })

        return price
    }

    
    render() {

        const getCartItemCount = () => {

            let count = 0;
            
            this.props.cart.forEach(item => count += item.quantity)

            return count;
        }


        const displayProductions = () => {

            return this.props.cart.map((prod, index) => {

                return <CartItem key={index} workshop={prod} 
                
                    onUpdateQuantity={this.updateQuantity}

                    onRemoveCartItem={()=>this.removeCartItem(index)}
                />
            })
        }
        

        return (

            <div id="cart-dlg" className={ this.props.showCartDlg ? 'show' : ''}>
                <div className="cart-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center align-items-center">
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
                    <img className="close-btn pointer" src="/images/close-icon.svg" alt="close-icon" onClick={()=>{this.props.toggleCartDlg(false)}}/>
                </div>
                <div className="cart-content">
                    { displayProductions() }
                </div>
                <div className="cart-summary">
                    <h6 className="text-light-grey">SUBTOTAL</h6>
                    <h2 className="text-black w-100 price">{this.calculatePrice()}<sub>EUR</sub></h2>
                    <SecondaryButton className="w-100" onClick={() => this.props.toggleCheckoutDlg(true)}>Checkout</SecondaryButton>
                </div>
            </div>
        )
    }
}



const mapStateToProps = ({ workshop }) =>{

    const { cart, showCartDlg } = workshop;

    return { cart, showCartDlg };
}

export default connect(mapStateToProps, {
    
    toggleCartDlg, 

    updateCart,

    toggleCheckoutDlg

})(CartDlg);
