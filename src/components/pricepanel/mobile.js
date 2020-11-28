import React, { Component } from 'react'
import loadable from '@loadable/component'
import {Input} from 'reactstrap'
import './index.scss'



const PrimaryButton = loadable(() => import('components/form/primarybutton'));


class MobilePricePanel extends Component {


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
            <div className="mobile-addcart-panel">
                <h3 className="text-black price mr-3">{this.props.workshop.price}<sub>EUR</sub></h3>
                <Input className="quantity mr-2" type="select" name={`quantity ${this.props.workshop.id}`} id={`quantity ${this.props.workshop.id}`} 
                        value={this.state.quantity} 
                        onChange={(e) => {this.setState({ quantity: e.target.value})}}
                    >{generateQuantityOptions()}</Input>
                <PrimaryButton className="w-100 ml-3" onClick={() => {
                    this.props.onAddToCart(this.props.workshop, Number(this.state.quantity))
                    this.setState({ quantity: '1' })
                }}>Add to Cart</PrimaryButton>
            </div>
        )
    }
}

export default MobilePricePanel;
