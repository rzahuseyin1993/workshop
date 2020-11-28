import React, { Component } from 'react'
import loadable from '@loadable/component'
import './index.scss'

const PrimaryButton = loadable(() => import('components/form/primarybutton'));
const DateInfo = loadable(() => import('components/dateinfo'));


class Workshop extends Component {


    constructor(props) {

        super(props);

        this.state = {

            
        }
    }


    componentDidMount = () => {

    }


    render() {


        return (
            <div className="workshop">
                <div className="thumbnail" style={{
                    backgroundImage: `url(${this.props.workshop.imageUrl})`,
                    backgroundSize: 'cover ',
                    backgroundPosition: 'center'
                }} onClick={this.props.onSelect}></div>
                <div className="content">
                    <DateInfo date={this.props.workshop.date}/>
                    <h4 className="text-primary title" onClick={this.props.onSelect}>{this.props.workshop.title}</h4>
                    <div className="d-flex flex-row flex-lg-column align-items-center justify-content-between">
                        <h3 className="text-black price">{this.props.workshop.price}<sub>EUR</sub></h3>
                        <PrimaryButton className="w-100 d-none d-lg-block " onClick={this.props.onAddToCart}>Add to Cart</PrimaryButton>
                        <PrimaryButton className="w-100 d-block d-lg-none" onClick={this.props.onAddToCart}>
                            <img src="/images/cart.svg" alt="cart"/>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        )
    }
}


export default Workshop