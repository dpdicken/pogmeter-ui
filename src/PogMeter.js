import React, { Component } from 'react';
import ReactSpeedometer from "react-d3-speedometer"
import './Hide.css';
import './Gauge.css';

const SHOW_WHEN_REACH_PERCENTAGE = 0.33; 
const MAX_ALLOWABLE_OVERRAGE_PERCENTAGE = 0.05;

class PogMeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            speedometerValue: props.meterValue,
            jitterValue: 0,
            alwaysShow: this.props.alwaysShow,
            negateJitter: false
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
        const negate = this.state.negateJitter;
        var jitteredSpeedometerValue = negate * (speedometerValue / 100)  * Math.exp(speedometerValue / 100);
        this.setState({jitterValue: jitteredSpeedometerValue, negateJitter: !negate})
        setTimeout(this.applyJitter.bind(this), 200)
    }

    capAllowableValue(val) {
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

        var style = {
            textAlign: "center"
        }
        
        var descriptionStyle = {
            marginTop: "-120px",
            fontFamily: 'Permanent Marker',
            color: "red"
        }

        return (
            <div className={classNames} 
            style={style}
            >     
               <ReactSpeedometer
                    maxValue={this.props.maxPogValue}
                    minValue={0}
                    value={this.capAllowableValue(this.state.speedometerValue)}

                    needleColor="black"
                    needleTransitionDuration={200}

                    textColor="red"
                    paddingVertical={20}
                    valueTextFontSize="36px"
                    currentValueText="POG METER"

                    labelFontSize="16px"
                    paddingHorizontal={20}

                    ringWidth={40}
                    startColor="green"
                    endColor="red"
                    segments={100}
                    maxSegmentLabels={5}
                    > 
                    </ReactSpeedometer>

                    <p style={descriptionStyle}># of POGs in last 5 seconds</p>

            </div>
        )
    }
}

export default PogMeter; 