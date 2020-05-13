import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer"
import './Hide.css';

const SHOW_WHEN_REACH_PERCENTAGE = 0.33;
const MAX_ALLOWABLE_OVERRAGE_PERCENTAGE = 0.05;

class PogMeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            speedometerValue: props.meterValue,
            jitterValue: 0,
            alwaysShow: this.props.alwaysShow
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            speedometerValue: props.meterValue + state.jitterValue,
            alwaysShow: props.alwaysShow
        }
    }

    componentDidMount() {
        this.applyJitter.bind(this)()
    }

    applyJitter() {
        const speedometerValue = this.state.speedometerValue
        const negatePossible = Math.round(Math.random()) === 0 ? -1 : 1;
        var jitteredSpeedometerValue = negatePossible * Math.round(speedometerValue * 0.02)
        this.setState({jitterValue: jitteredSpeedometerValue})
        setTimeout(this.applyJitter.bind(this), 100)
    }

    capAllowableValue(val) {
        // console.log( val > this.props.maxPogValue 
        //     ? Math.min(MAX_ALLOWABLE_OVERRAGE_PERCENTAGE * this.props.maxPogValue, val)
        //     : val)
        return val > this.props.maxPogValue 
            ? Math.ceil(Math.min((1 + MAX_ALLOWABLE_OVERRAGE_PERCENTAGE) * this.props.maxPogValue, val))
            : val;
    }

    render() {
        var classNames = "fade-in";
        if (!this.state.alwaysShow
             && (this.props.maxPogValue * SHOW_WHEN_REACH_PERCENTAGE) > this.state.speedometerValue) {
            classNames += " hide";
        }

        return (
            <div className={classNames}>     
               <ReactSpeedometer
                    maxValue={this.props.maxPogValue}
                    minValue={0}
                    value={this.capAllowableValue(this.state.speedometerValue)}
                    needleColor="black"
                    needleTransitionDuration={1000}
                    startColor="green"
                    endColor="red"
                    segments={10}
                    maxSegmentLabels={5}
                    />
            </div>
        )
    }
}

export default PogMeter; 