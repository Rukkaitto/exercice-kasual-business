import React from 'react';
import './App.css';
import { AirMap } from './components/AirMap';
import {CountrySelector} from './components/CountrySelector';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      measurements: {},
      countries: [],
    }
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  // Calls the /measurements endpoint with a country code as the argument
  fetchMeasurements(countryCode) {
    fetch('https://api.openaq.org/v1/measurements?country=' + countryCode)
      .then(response => response.json())
      .then(data => this.setState({ 
        measurements: data["results"],
        lat: data["results"][0] ? data["results"][0]["coordinates"]["latitude"] : 0,
        lng: data["results"][0] ? data["results"][0]["coordinates"]["longitude"] : 0,
      }));
  }

  // Re-calls the API when the selected country changes
  handleCountryChange(value) {
    this.fetchMeasurements(value);
  }

  componentDidMount() {
    // Calls the /countries endpoint to get a list of countries and country codes
    fetch('https://api.openaq.org/v1/countries')
      .then(response => response.json())
      .then(data => this.setState({
        countries: data["results"],
      }));

    // Measurements
    this.fetchMeasurements("FR");
  }

  render() {
    const position = [this.state.lat, this.state.lng] // The position of the center of the map
    var measurements = [];
    var countries = [];

    if (this.state.measurements[0]) { // Checks if the measurements array has at least one element
      measurements = this.state.measurements;
      
    }
    if (this.state.countries[0]) { // Checks if the countries array has at least one element
      countries = this.state.countries;
    }

    return (
      <React.Fragment>
        <AirMap measurements={measurements} position={position}/>
        <div id="filters">
          <CountrySelector countries={countries} handleCountryChange={this.handleCountryChange}/>
        </div>
      </React.Fragment>
    )
  }
}

export default App;