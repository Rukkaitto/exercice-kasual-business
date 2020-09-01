import React from "react";
import "./App.css";
import { AirMap } from "./components/AirMap";
import { CountrySelector } from "./components/CountrySelector";
import { ValueInput } from "./components/ValueInput";
import loadingGif from "./images/loading.gif";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 0,
      lng: 0,
      measurements: {},
      countries: [],
      loading: false,
    };
    this.from = 0;
    this.to = 100;
    this.countryCode = "FR";

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Calls the /measurements endpoint with a country code as the argument
  fetchMeasurements(countryCode, from, to) {
    const url = "https://api.openaq.org/v1/measurements?country=" + countryCode + "&value_from=" + from + "&value_to=" + to;
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ 
        measurements: data["results"],
        lat: data["results"][0] ? data["results"][0]["coordinates"]["latitude"] : 0,
        lng: data["results"][0] ? data["results"][0]["coordinates"]["longitude"] : 0,
      }))
      .then(() => {
        this.setState({loading: false});
      });
      
  }

  handleCountryChange(countryCode) {
    this.countryCode = countryCode;
  }

  handleFromChange(from) {
    this.from = from;
  }

  handleToChange(to) {
    this.to = to;
  }

  // Calls the API with the values present in the state and shows the loading spinner
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true});
    this.fetchMeasurements(this.countryCode, this.from, this.to);
  }

  componentDidMount() {
    // Calls the /countries endpoint to get a list of countries and country codes
    fetch("https://api.openaq.org/v1/countries")
      .then((response) => response.json())
      .then((data) => this.setState({
        countries: data["results"],
      }));

    // Measurements
    this.fetchMeasurements("FR", 0, 100);
  }

  render() {
    const position = [this.state.lat ?? 0, this.state.lng ?? 0]; // The position of the center of the map
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
          <ValueInput name="from" defaultValue={0} handleValueChange={this.handleFromChange}/>
          <ValueInput name="to" defaultValue={100} handleValueChange={this.handleToChange}/>
          <button onClick={this.handleSubmit}>Apply filters</button>
          {this.state.loading ? <img src={loadingGif} alt="spinner gif" height="50px"></img> : ""}
        </div>
      </React.Fragment>
    );
  }
}

export default App;