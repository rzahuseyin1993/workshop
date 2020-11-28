import React, { Component } from 'react'
import loadable from '@loadable/component'
import {Input} from 'reactstrap'
import './index.scss'

const PrimaryButton = loadable(() => import('components/form/primarybutton'));


class PricePanel extends Component {


    constructor(props) {

        super(props);

        this.state = {

            quantity: 1
        }
    }


    componentDidMount = () => {}

    render() {

        
        const  generateQuantityOptions = () => {

            let options = []

            for (let i = 1; i <= 10; i++) options.push(<option key={i}>{i}</option>)
            
            return options;
        }

        return (
            <div className="addcart-panel">
                <h4 className="mb-3">Buy Your Ticket</h4>
                <h2 className="text-black price">{this.props.workshop.price}<sub>EUR</sub></h2>
                <div className="d-flex align-items-center mb-2">
                    <Input className="quantity mr-2" type="select" name={`quantity ${this.props.workshop.id}`} id={`quantity ${this.props.workshop.id}`} 
                        value={this.state.quantity} 
                        onChange={(e) => {this.setState({ quantity: e.target.value})}}
                    >{generateQuantityOptions()}</Input>
                    <PrimaryButton className="w-100" onClick={() => {
                        this.props.onAddToCart(this.props.workshop, Number(this.state.quantity))
                        this.setState({ quantity: '1' })
                    }}>Add to Cart</PrimaryButton>
                </div>
                <h6 className="text-light-grey text-right">Subtotal: {Number(this.state.quantity) * this.props.workshop.price} EUR</h6>
            </div>
        )
    }
}

export default PricePanel;
