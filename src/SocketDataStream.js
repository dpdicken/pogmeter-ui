import { Component } from 'react';

const serverUrl = "35.238.100.1";
// const serverUrl = "localhost"

class PogMeter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            port: null,
            callbackOnReceive: props.callbackOnReceive,
            callbackOnFail: props.callbackOnFail
        }
    }

    componentDidMount() {
        var id = this.props.channelId;
        fetch('https://' + serverUrl + '/api/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({channel: id})
        })
        .then(response => {
            if (!response.ok) {
                this.state.callbackOnFail()
            } else {
                response.json()
                    .then(responseJson => {
                        if (responseJson.success) {
                            this.setState({port: responseJson.port})
                            this.instantiateSocket(responseJson.port)
                        }
                    });
            }
        })
        .catch(this.state.callbackOnFail)
    }

    instantiateSocket(port) {
        var ws = new WebSocket('wss://' + serverUrl + ":443/ws?channelId=" + this.props.channelId)

        ws.onopen = () => {
            this.setState({socket: ws})
        }

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            this.state.callbackOnReceive(JSON.parse(evt.data))
        }

        ws.onclose = () => {
            console.log('disconnected')
        }
    }

    render() {
        return null;
    }

}

export default PogMeter; 