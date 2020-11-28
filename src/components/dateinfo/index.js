import React, { Component } from 'react'
import moment from 'moment-timezone'
import './index.scss'



class DateInfo extends Component {


    constructor(props) {

        super(props);

        this.state = {}
    }


    componentDidMount = () => {
        
    }

    
    render() {

        return (
            <div className="date">
                <img src="/images/calendar_icon.svg" alt="calendar_icon"/>
                <div className="text-black mb-0 ml-1 mr-3">{moment(this.props.date).format('DD. MM. YYYY.')}</div>
                <img src="/images/time_icon.svg" alt="time_icon"/>
                <div className="text-black mb-0 ml-1">{moment(this.props.date).format('HH:mm A')}</div>
            </div>
        )
    }
}

export default DateInfo;
