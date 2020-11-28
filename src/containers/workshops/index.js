import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import loadable from '@loadable/component'
import {
    showFullLoader,
    updateCart
} from 'store/actions'
import {
    searchCategories,
    searchWorkshops
} from 'apis'
import './index.scss'


const CategoryFilter = loadable(() => import('components/categoryfilter'));
const WorkshopList = loadable(() => import('components/workshoplist'));
const Loader = loadable(() => import('components/loader'));

const LIMIT_COUNT = 9;


class Workshops extends Component {

    constructor(props) {

        super(props)

        this.state = {

            selectedCategory: 'All',

            categories: [],
            
            workshops: [],

            loading: false
        }
    }


    componentDidMount = () => {

        this.searchCategories()
    }


    searchCategories = () => {

        this.props.showFullLoader(true)

        searchCategories().then(data => {

            this.props.showFullLoader();

            this.setState({ categories: data})

            this.searchWorkshops()

        }).catch(error => console.log(error))
    }


    searchWorkshops = (limit) => {

        const params = { 
            
            _page: 1, _limit: limit ? limit : 9, _sort: "date", _order: "desc",
            
            category: this.state.selectedCategory === 'All' ? undefined : this.state.selectedCategory,
        }

        this.setState({ loading: true })

        searchWorkshops(params).then(data => {

            this.setState({workshops: data})

            this.setState({ loading: false })

        }).catch(error => console.log(error))
    }

    

    selectCategory = (category) => {

        this.setState({selectedCategory: category}, this.searchWorkshops)
    }


    addToCart = (workshop) => {

        const newCart = [...this.props.cart]

        const index = newCart.findIndex(ws => ws.id === workshop.id);

        if (index < 0) newCart.push({...workshop, quantity: 1})

        else newCart[index] = {...newCart[index], quantity: newCart[index].quantity + 1}

        this.props.updateCart(newCart)
    }


    selectWorkshop = (workshop) => {

        this.props.history.push(`/workshops/${workshop.id}`)
    }


    loadmore = () => {

        this.searchWorkshops(this.state.workshops.length + LIMIT_COUNT)
    }


    render() {

        return (
            <div id="workshops" className="container-fluid">
                <div className="row justify-content-center m-0">
                    <div className="col-xl-11">
                        <div className="row">
                            <div className="col-lg-3">
                                <CategoryFilter 
                                    selectedCategory={this.state.selectedCategory}
                                    categories={this.state.categories} 
                                    onSelect={this.selectCategory}
                                />
                            </div>
                            <div className="col-lg-9">
                                <WorkshopList 
                                    workshops={this.state.workshops}
                                    onSelect={this.selectWorkshop}
                                    onAddToCart={this.addToCart}
                                />
                                {
                                    this.state.workshops.length >= LIMIT_COUNT &&
                                    <p className="loadmore text-black" onClick={this.loadmore}>Load More</p>
                                }
                                {
                                    this.state.loading &&<div className="w-100 d-flex justify-content-center align-items-center"><Loader/></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (reducer) =>{

    const { cart } = reducer;

    return { cart };
}

export default withRouter(connect(mapStateToProps, {
    
    showFullLoader, updateCart

})(Workshops));