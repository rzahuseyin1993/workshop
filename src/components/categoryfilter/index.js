import React, { Component } from 'react'
import './index.scss'



class CategoryFilter extends Component {


    constructor(props) {

        super(props);

        this.state = {

            icons: {},

            showFilter: false
        }
    }


    componentDidMount = () => {

        this.setState({icons: {

            "marketing" : "marketing_icon", 
            
            "backend": "backend_icon", 
            
            "frontend": "frontend_icon", 
            
            "design": "design_icon"
        }})
    }

    toggleFilter = () => {

        this.setState({ showFilter: !this.state.showFilter})
    }

    selectCategory = (category) => {

        this.props.onSelect(category)

        this.toggleFilter();
    }


    render() {

        const displayCategory = () => {

            return ["All", ...this.props.categories].map((category, index) => {

                return <li key={index} onClick={() => this.selectCategory(category)} className={category === this.props.selectedCategory ? 'text-primary' : 'text-black'}>
                    { 
                        index !== 0 ? 
                        <img src={`/images/${this.state.icons[category]}${category === this.props.selectedCategory ? '_active' : ''}.svg`} alt="category-icon"/>:
                        <div style={{width: '32px'}}></div>
                    }
                    <h5 className="ml-2 text-capitalize">{category}</h5>
                </li>
            })
        }

        return (
            <div id="category-filter">
                <h6 className="text-light-grey filter-label ml-2">Filter by category:</h6>
                <div className="mobile d-block d-lg-none ">
                    <div className="d-flex align-items-center mb-2 pointer selected-category" onClick={this.toggleFilter}>
                        <img src="/images/arrow_icon.svg" alt="arrow" className={this.state.showFilter ? 'rotate' : ''}/>
                        <h6 className="text-capitalize mb-0 text-primary">{this.props.selectedCategory}</h6>
                    </div>
                    {
                        this.state.showFilter &&
                        <ul >{displayCategory()}</ul>
                    }
                </div>
                <div className="d-none d-lg-block">
                    <ul >{displayCategory()}</ul>
                </div>
            </div>
        )
    }
}

export default CategoryFilter;
