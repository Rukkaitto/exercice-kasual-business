import React from 'react';
import '../App.css';

export class ValueInput extends React.Component {
   constructor() {
      super();
      this.state = {
         value: 0,
      };
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) { // Moves state up
      this.setState({
         value: event.target.value,
      });
      this.props.handleValueChange(event.target.value);
   }

   componentDidMount() {
      this.setState({ value: this.props.defaultValue });
   }

   render() {
      return (
         <div>
            <label htmlFor={this.props.name}>
               {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}
               <input type="number" name={this.props.name} value={this.state.value} onChange={this.handleChange} />
            </label>
         </div>
      )
   }
}