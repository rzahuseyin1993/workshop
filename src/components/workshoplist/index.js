import React, { Component } from 'react'
import loadable from '@loadable/component'
import './index.scss'


const Workshop = loadable(() => import('components/workshop'));


class WorkshopList extends Component {


    constructor(props) {

        super(props);

        this.state = {}
    }


    componentDidMount = () => {

    }


    render() {


        const displayList = () => {

            return this.props.workshops.map((workshop, index) => {

                return <div className="col-xl-4 col-md-6" key={index}>
                    <Workshop 
                        workshop={workshop} 
                        onSelect={() => this.props.onSelect(workshop)}
                        onAddToCart={() => this.props.onAddToCart(workshop)}
                    />
                </div>
            })
        }
        
        return (
            <div id="workshop-list">
                <h2 className="text-black">Workshops</h2>
                <h6 className="text-light-grey mb-4">Displayed: {this.props.workshops.length}</h6>
                <div className="row">
                    {displayList()}
                </div>
            </div>
        )
    }
}


export default WorkshopList;