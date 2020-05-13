import React, { Component } from 'react';
import SocketDataStream from './SocketDataStream';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string'

class SocketToComponentManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channel: this.props.match.params.channel,
            meterVal: 0,
            routeTo: null
        }
    }
    
    render() {
        var routeElement = null
        if (this.state.routeTo != null) {
            routeElement = <Redirect to={"/" + this.state.routeTo}/>
        }

        const values = queryString.parse(this.props.location.search);
        var alwaysShow = values.alwaysShow === undefined ? false : values.alwaysShow;

        return (
            <div className="App" style={{justifyContent: "center", marginLeft: "auto", marginRight: "auto"}}>
                {routeElement}
                {this.props.components.map(c => React.cloneElement(c, { meterValue: this.state.meterVal, alwaysShow: alwaysShow }))}
                <SocketDataStream channelId={this.state.channel} 
                                  callbackOnReceive={this.responseUpdate.bind(this)}
                                  callbackOnFail={this.handleFailedToConnectToSocket.bind(this)}/>
            </div>
        );
    }

    handleFailedToConnectToSocket() {
        var newChannelId = window.prompt("Failed to connect to channel '" + this.state.channel + "'. Please enter a different channel id", "Enter channel id")
        if (newChannelId !== null && newChannelId !== "") {
            this.setState({routeTo: newChannelId})
        }
    }

    responseUpdate(response) {
        this.setState({meterVal: parseInt(response.sum)})
    }
}

export default SocketToComponentManager; 