import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import SocketToComponentManager from './SocketToComponentManager';
import ImageRain from './ImageRain';
import PogMeter from './PogMeter';

// TODO can we read from an env variable?
const MAX_POG_METER = 50;

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/rain/:channel" render={(props) => <SocketToComponentManager {...props} 
            components={[<ImageRain key="rain" maxPogValue={MAX_POG_METER}/>]}/>}/>
          <Route path="/gauge/:channel" render={(props) => <SocketToComponentManager {...props} 
            components={[<PogMeter key="meter" maxPogValue={MAX_POG_METER}/>]}/>}/>
          <Route path="/combo/:channel" render={(props) => <SocketToComponentManager {...props} 
            components={[
                <ImageRain key="rain" maxPogValue={MAX_POG_METER}/>,
                <PogMeter  key="meter" maxPogValue={MAX_POG_METER}/>
              ]}/>}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
