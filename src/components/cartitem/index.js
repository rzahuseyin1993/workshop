import React, { Component } from 'react'
import { Input } from 'reactstrap'
import './index.scss'



class CartItem extends Component {


    constructor(props) {

        super(props);

        this.state = { }
    }


    componentDidMount = () => {

    }


    render() {

        const  generateQuantityOptions = () => {

            let options = []

            for (let i = 1; i <= 30; i++) options.push(<option key={i}>{i}</option>)
            
            return options;
        }


        return (
            <div className="cart-item">
                <div className="thumbnail" style={{
                    backgroundImage: `url(${this.props.workshop.imageUrl})`,
                    backgroundSize: 'cover ',
                    backgroundPosition: 'center'
                }}></div>
                <div className="content">
                    <div className="d-flex align-items-start justify-content-between">
                        <h4 className="text-primary title" >{this.props.workshop.title}</h4>
                        <img className="ml-2 pointer" src="/images/delete_icon.svg" alt="delete_icon" onClick={this.props.onRemoveCartItem}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <Input className="quantity" type="select" name={`quantity ${this.props.workshop.id}`} id={`quantity ${this.props.workshop.id}`} 
                            value={this.props.workshop.quantity} 
                            onChange={(e) => {
                                this.props.onUpdateQuantity(this.props.workshop, Number(e.target.value))
                            }}
                        >{generateQuantityOptions()}</Input>
                        <h5 className="text-black w-100 price ml-3">{this.props.workshop.price * this.props.workshop.quantity}<sub>EUR</sub></h5>
                    </div>
                </div>
            </div>
        )
    }
}


export default CartItem