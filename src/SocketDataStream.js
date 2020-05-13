import { Component } from 'react';

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
        fetch('http://localhost:80/api/create', {
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
        var ws = new WebSocket('ws://localhost:' + port)

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