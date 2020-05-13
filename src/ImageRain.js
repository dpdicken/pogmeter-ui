import React, { Component } from 'react';
import dangPOG from './resources/dangPog.png';
import dangPogU from './resources/dangPOGU-112.png';
import './ImageRain.css';
import './Hide.css';

const lengthOfImageSide = "40px";

class ImageRain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sum: 0,
            alwaysShow: this.props.alwaysShow,
            images: [],
            imageId: 0
        }
    }

    componentDidMount() {
        this.addImage();
    }
    
    static getDerivedStateFromProps(props, state) {
        return {
            sum: props.meterValue,
            alwaysShow: props.alwaysShow
        }
    }

    addImage() {
        const imageSourceToAdd = Math.round(Math.random()) === 0 ? dangPOG : dangPogU;
        const newImageRef = React.createRef();
        const horizontalPercent = Math.round(Math.random() * 100);

        const id = this.state.imageId;
        this.setState({ imageId: id + 1 })

        const imageToAdd = <img style={{left: horizontalPercent + "%"}}
                                key={"img" + id}
                                ref={newImageRef} 
                                className="float back-and-forth" 
                                src={imageSourceToAdd} 
                                height={lengthOfImageSide} 
                                width={lengthOfImageSide} 
                                alt="POG" />
        
        var toUpdate = this.state.images;
        toUpdate.push(imageToAdd);
        this.setState({images: toUpdate})

        var i;
        for (i = 0; i < toUpdate.length; i++) {
            if (toUpdate[i].ref.current == null) {
                continue;
            }
            const bounding = toUpdate[i].ref.current.getBoundingClientRect();
            if (bounding.top >= window.innerHeight) {
                toUpdate.shift();
            } 
        }
        setTimeout(this.addImage.bind(this), 500)
    }

    render() {
        var classNames = "fade-in";
        if (!this.state.alwaysShow && this.props.maxPogValue > this.state.sum) {
            classNames += " hide";
        }

        return (
            <div className={classNames}>
                {this.state.images}
            </div>
        );
    }

}

export default ImageRain; 