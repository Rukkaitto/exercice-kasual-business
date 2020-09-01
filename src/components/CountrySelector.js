import React from 'react';
import '../App.css';

export class CountrySelector extends React.Component {
   constructor() {
      super();
      this.state = {
         value: "FR",
      }

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) { // Moves state up
      this.setState({ value: event.target.value });
      this.props.handleCountryChange(event.target.value);
   }

   render() {
      return (
         <div>
            <select name="countries" id="countries" onChange={this.handleChange} value={this.state.value}>
               {this.props.countries.map((country, key) => {
                  const countryName = country["name"];
                  const countryCode = country["code"];
                  return (
                     <option
                        key={key}
                        value={countryCode}
                     >
                        {countryName ? countryName : countryCode}
                     </option> // If there is no "name" value then the country code shall be used
                  );
               })}
            </select>
         </div>
      )
   }
}