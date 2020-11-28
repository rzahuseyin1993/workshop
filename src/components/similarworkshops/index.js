import React, { Component } from 'react'
import loadable from '@loadable/component'
import './index.scss'

const Workshop = loadable(() => import('components/workshop'));

class SimilarWorkshops extends Component {


    constructor(props) {

        super(props);

        this.state = { }
    }


    componentDidMount = () => {
        
    }

    

    render() {

        const displaySimilarWorkshops = () => {

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
            <div id="similar-workshops">
                <div className="row justify-content-center m-0">
                    <div className="col-xl-11">
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-9 similar-workshops">
                                <h2 className="text-black mb-3 mb-lg-5 px-3">Similar Workshops</h2>
                                <div className="row m-0">
                                    {displaySimilarWorkshops()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimilarWorkshops;
