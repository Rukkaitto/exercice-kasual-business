import React from 'react';
import './App.css';
import { AirMap } from './components/AirMap'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      measurements: {},
    }
  }

  componentDidMount() {
    fetch('https://api.openaq.org/v1/measurements?country=FR')
      .then(response => response.json())
      .then(data => this.setState({ 
        measurements: data["results"],
        lat: data["results"][0]["coordinates"]["latitude"],
        lng: data["results"][0]["coordinates"]["longitude"],
      }));
  }

  render() {
    var position = [this.state.lat, this.state.lng];
    var measurements = [];
    if (this.state.measurements[0]) {
      measurements = this.state.measurements;
    }

    return (
      <AirMap measurements={measurements} position={position}/>
    )
  }
}

export default App;