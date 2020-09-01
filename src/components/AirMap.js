import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


export class AirMap extends React.Component {
   constructor() {
      super();
      this.state = {
         zoom: 5,
      }
   }

   render() {
      return (
         <Map center={this.props.position} zoom={this.state.zoom}>
            <TileLayer
               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.measurements.map((measurement, key) => { // Maps the measurements to corresponding markers and popups
               const markerPosition = [measurement["coordinates"]["latitude"], measurement["coordinates"]["longitude"]];
               return (
               <Marker key={key} position={markerPosition}>
                  <Popup key={key}>
                     <b>Location</b> : {measurement["city"]} <br/>
                     <b>Date</b> : {measurement["date"]["local"]} <br/>
                     <b>Value</b> : {measurement["value"]} {measurement["unit"]}
                  </Popup>
               </Marker>
               );
            })}
         </Map>
      )
   }
}