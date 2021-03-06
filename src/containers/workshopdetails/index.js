import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import loadable from '@loadable/component'
import {
    showFullLoader,
    updateCart,
    handleHTTPError
} from 'store/actions'
import {
    getWorkshop,
    getUser,
    searchWorkshops
} from 'apis'
import './index.scss'


const SimilarWorkshops = loadable(() => import('components/similarworkshops'));
const Back = loadable(() => import('components/back'));
const PricePanel = loadable(() => import('components/pricepanel'));
const DateInfo = loadable(() => import('components/dateinfo'));
const MobilePricePanel = loadable(() => import('components/pricepanel/mobile'));
const Loader = loadable(() => import('components/loader'));


class WorkshopDetails extends Component {

    constructor(props) {

        super(props)

        this.state = {

            workshop: null,

            user: null,

            similarWorkshops: [],

            loading: false,
        }
    }


    componentDidMount = () => {

        this.getWorkshop();
    }

    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.match.params.id !== this.props.match.params.id) {

            this.getWorkshop();
        }
    }


    getWorkshop = () => {

        const id = this.props.match.params.id

        if (!id) this.props.history.push('/workshops')

        const params = { id: id}

        this.props.showFullLoader(true)

        getWorkshop(params).then(data => {

            this.props.showFullLoader(false)

            this.setState({ 
                
                workshop: data, 

                user: null,

                similarWorkshops: [],
            
            }, () => {

                this.getUser();

                this.searchSimilarWorkshops();
            })

        }).catch(error => this.props.handleHTTPError(error, this.props))
    }


    getUser = () => {

        const params = { id: this.state.workshop.userId}

        this.props.showFullLoader(true)

        getUser(params).then(data => {

            this.props.showFullLoader(false)

            this.setState({user: data})

        }).catch(error => this.props.handleHTTPError(error, this.props))
    }

    searchSimilarWorkshops = () => {

        const params = { 
            
            id_ne: this.state.workshop.id, _page: 1, _limit: 3, 
            
            _sort: "date", _order: "desc",
            
            category: this.state.workshop.category,
        }

        this.setState({loading: true})

        searchWorkshops(params).then(data => {

            this.setState({similarWorkshops: data, loading: false})
        
        }).catch(error =>this.props.handleHTTPError(error, this.props))
    }


    addToCart = (workshop, quantity) => {

        const newCart = [...this.props.cart]

        const index = newCart.findIndex(ws => ws.id === workshop.id);

        if (index < 0) newCart.push({...workshop, quantity: quantity ? quantity : 1})

        else newCart[index] = {...newCart[index], quantity: newCart[index].quantity + (quantity ? quantity : 1)}

        this.props.updateCart(newCart)
    }


    selectWorkshop = (workshop) => {

        this.props.history.push(`/workshops/${workshop.id}`)
    }

   
    goBack = () => {

        this.props.history.push('/workshops')
    }

    render() {

        if (!this.state.user) return null;

        return (
            <div id="workshops-details" className="container-fluid section">
                <div className="row justify-content-center m-0">
                    <div className="col-xl-11">
                        <div className="row">
                            <div className="col-lg-3 mb-3">
                                <Back onClick={this.goBack}>Back</Back>
                            </div>
                            <div className="col-lg-9 workshop-content">
                                <img className="photo mb-5" src={this.state.workshop.imageUrl} alt="workshop"/>
                                <div className="row">
                                    <div className="col-md-8">
                                        <DateInfo date={this.state.workshop.date}/>
                                        <h1 className="text-primary title">{this.state.workshop.title}</h1>
                                        <div className="text-black mb-4 user">With <span className="h4">{this.state.user.name}</span></div>
                                        <p>{this.state.workshop.desc}</p>
                                    </div>
                                    <div className="col-md-4 d-md-block d-none">
                                        <PricePanel 
                                            workshop={this.state.workshop}
                                            onAddToCart={this.addToCart}
                                        />
                                    </div>
                                </div>
                                <div className=" fixed-bottom d-block d-md-none">
                                    <MobilePricePanel
                                        workshop={this.state.workshop}
                                        onAddToCart={this.addToCart}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.loading ? <div className="w-100 d-flex justify-content-center align-items-center"><Loader/></div>:
                    <React.Fragment>
                        {
                            this.state.similarWorkshops.length > 0 &&
                            <SimilarWorkshops
                                workshops={this.state.similarWorkshops}
                                onSelect={this.selectWorkshop}
                                onAddToCart={this.addToCart}
                            />
                        }
                    </React.Fragment>
                }
            </div>
        )
    }
}



const mapStateToProps = ({ workshop }) =>{

    const { cart } = workshop;

    return { cart };
}

export default withRouter(connect(mapStateToProps, {
    
    showFullLoader, updateCart, handleHTTPError

})(WorkshopDetails));