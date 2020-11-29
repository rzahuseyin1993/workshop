import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, FormGroup, Label, Input} from 'reactstrap'
import loadable from '@loadable/component'
import moment from 'moment-timezone'
import { toggleCheckoutDlg, updateCart } from 'store/actions'
import { createOrder } from 'apis'
import utils from 'utils'
import './index.scss'



const PrimaryButton = loadable(() => import('components/form/primarybutton'))
const Checkbox = loadable(() => import('components/form/checkbox'))
const Loader = loadable(() => import('components/loader'))


class CheckoutDlg extends Component {

    constructor(props){

        super(props);

        this.state = {

            values: { 

                firstName: '',

                lastName: '',

                email: '',

                address: '',
                
                dob: moment().format('YYYY-MM-DD'),

                gender: 'Other',

                agree: true,

                zipcode: ''
            },

            validateErrors: {},

            loading: false,

            isCompleted: false,
        }
    }
    

    componentDidMount = () => { 

    }


    handleChange = (field, value) => {

        const newValues = {...this.state.values}

        newValues[field] = value

        this.setState({ values: newValues }, this.formValudate)
    }


    formValudate = () => {

        const newValidateErrors = {}

        Object.keys(this.state.values).forEach(key => {

            if (key === "firstName" && !utils.validateName(this.state.values[key]))

                newValidateErrors[key] = "Your first name contains invalid symbol!"

            else if (key === "lastName" && !utils.validateName(this.state.values[key]))

                newValidateErrors[key] = "Your last name contains invalid symbol!"
            
            else if (key === "email" && !utils.validateEmail(this.state.values[key]))

                newValidateErrors[key] = "Your email address is invalid"
            
            else if (key === "address" && !this.state.values[key])

                newValidateErrors[key] = "Your address is empty"

            else if (key === "zipcode" && (!this.state.values[key] || !utils.validateZipcode(this.state.values[key])))

                newValidateErrors[key] = "Your zipcode is invalid"
        })

        this.setState({ validateErrors: newValidateErrors })

        return Object.keys(newValidateErrors).length === 0
    }


    calculatePrice = () => {

        let price = 0;

        this.props.cart.forEach(prod => {

            price += prod.quantity * prod.price
        })

        return price
    }


    checkOut = () => {

        if (!this.formValudate()) return;

        if (Object.keys(this.state.validateErrors).length > 0) return;

        if (Object.keys(this.state.values).length < 8) return;

        if (!this.state.values["agree"]) return;

        const params = {

            products: this.props.cart,

            total: this.calculatePrice()
        }

        this.setState({ loading: true })

        createOrder(params).then(data => {

            this.setState( {
                
                loading: false,  isCompleted: true,

                values: {}, validateErrors: {}
            })

            this.props.updateCart([])

        }).catch(error => console.log(error))
    }


    backToShop = () => {

        this.setState({ isCompleted: false}, () => {

            this.props.toggleCheckoutDlg(false);

            this.props.history.push('/workshops')
        })
    }


    render() {

        return (
            <Modal isOpen={this.props.showCheckoutDlg}>
                <ModalBody>
                    {
                        !this.state.isCompleted ? 
                        <div className="row checkoutdlg-body">
                            <div className="col-12">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="text-black font-weight-bold">Checkout</h2>
                                    <img className="pointer" src="/images/close-icon.svg" alt="close-icon" onClick={() => this.props.toggleCheckoutDlg(false)}/>
                                </div>
                                <h6 className="text-light-grey mb-5">What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</h6>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center w-100 label-group">
                                        <Label htmlFor="firstName" className="text-black d-block">First Name</Label>
                                        { 
                                            this.state.validateErrors["firstName"] && 
                                            <small className="error-msg text-danger">{this.state.validateErrors["firstName"]}</small> 
                                        }
                                    </div>
                                    <Input id="firstName" name="firstName" type="text" placeholder="Type your first name here" value={this.state.values["firstName"] || ""}
                                        invalid={this.state.validateErrors["firstName"] ? true : false} valid={!this.state.validateErrors["firstName"] && (this.state.values["firstName"] ? true : false)}
                                        onChange={(e) => { this.handleChange( "firstName", e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center w-100 label-group">
                                        <Label htmlFor="lastName" className="text-black d-block">First Name</Label>
                                        { 
                                            this.state.validateErrors["lastName"] && 
                                            <small className="error-msg text-danger">{this.state.validateErrors["lastName"]}</small> 
                                        }
                                    </div>
                                    <Input id="lastName" name="lastName" type="text" placeholder="Type your last name here" value={this.state.values["lastName"] || ""}
                                        invalid={this.state.validateErrors["lastName"] ? true : false} valid={!this.state.validateErrors["lastName"] && (this.state.values["lastName"] ? true : false)}
                                        onChange={(e) => { this.handleChange( "lastName", e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center w-100 label-group">
                                        <Label htmlFor="email" className="text-black d-block">Email Address</Label>
                                        { 
                                            this.state.validateErrors["email"] && 
                                            <small className="error-msg text-danger">{this.state.validateErrors["email"]}</small> 
                                        }
                                    </div>
                                    <Input id="email" name="email" type="text" placeholder="Type your email address here" value={this.state.values["email"] || ""}
                                        invalid={this.state.validateErrors["email"] ? true : false} valid={!this.state.validateErrors["email"] && (this.state.values["email"] ? true : false)}
                                        onChange={(e) => { this.handleChange( "email", e.target.value)}}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="exampleDate">Date of Birth</Label>
                                    <Input type="date" name="date" id="exampleDate" placeholder="DD.MM.YYYY" valid value={this.state.values["dob"]} 
                                        onChange={(e) => { this.handleChange( "dob", e.target.value)}}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input type="select" name="gender" id="gender" valid value={this.state.values["gender"]}
                                        onChange={(e)=>{ this.handleChange( "gender", e.target.value)}}>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-12">
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center w-100 label-group">
                                        <Label htmlFor="address" className="text-black d-block">Address</Label>
                                        { 
                                            this.state.validateErrors["address"] && 
                                            <small className="error-msg text-danger">{this.state.validateErrors["address"]}</small> 
                                        }
                                    </div>
                                    <Input id="address" name="address" type="text" placeholder="Type your address here" value={this.state.values["address"] || ""}
                                        invalid={this.state.validateErrors["address"] ? true : false} valid={!this.state.validateErrors["address"] && (this.state.values["address"] ? true : false)}
                                        onChange={(e) => { this.handleChange( "address", e.target.value)}}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <div className="d-flex justify-content-between align-items-center w-100 label-group">
                                        <Label htmlFor="zipcode" className="text-black d-block">Zip Code</Label>
                                        { 
                                            this.state.validateErrors["zipcode"] && 
                                            <small className="error-msg text-danger">{this.state.validateErrors["zipcode"]}</small> 
                                        }
                                    </div>
                                    <Input id="zipcode" name="zipcode" type="text" placeholder="eg. 21310" value={this.state.values["zipcode"] || ""}
                                        invalid={this.state.validateErrors["zipcode"] ? true : false} valid={!this.state.validateErrors["zipcode"] && (this.state.values["zipcode"] ? true : false)}
                                        onChange={(e) => { this.handleChange( "zipcode", e.target.value)}}
                                    />
                                </FormGroup>
                                <Checkbox id="agree" className="mb-3" value={this.state.values["agree"] || false} 
                                    onChange={() => { this.handleChange( "agree", !this.state.values["agree"])}}
                                >I agree</Checkbox>
                                <PrimaryButton className="px-5 d-flex align-items-center justify-content-center" onClick={this.checkOut}> 
                                    {this.state.loading && <Loader size={20} className="mr-3"/>}CheckOut
                                </PrimaryButton>
                            </div>
                        </div>:
                        <div className="row thanks-body">
                            <div className="col-12">
                                <h2 className=" font-weight-bold">Thank you!</h2>
                                <h6 className="text-light-grey mb-5">What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</h6>
                                <PrimaryButton className="px-5" onClick={this.backToShop}>Back to Shop</PrimaryButton>
                            </div>
                        </div>
                    }   
                </ModalBody>
            </Modal>
        )
    }
}



const mapStateToProps = (reducer) =>{

    const { cart, showCheckoutDlg } = reducer;

    return { cart, showCheckoutDlg };
}

export default withRouter(connect(mapStateToProps, { 
    
    toggleCheckoutDlg,

    updateCart

})(CheckoutDlg));
