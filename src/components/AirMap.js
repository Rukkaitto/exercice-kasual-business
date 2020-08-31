import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export class AirMap extends React.Component {
   constructor() {
      super();
      this.state = {
         zoom: 13,
      }
   }

   render() {
      return (
         <Map center={this.props.position} zoom={this.state.zoom}>
            <TileLayer
               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.props.measurements.map((measurement, key) => (
               <Marker key={key} position={[measurement["coordinates"]["latitude"], measurement["coordinates"]["longitude"]]}>
                  <Popup key={key}>
                     {measurement["city"] + "\n" + measurement["value"] + " " + measurement["unit"]}
                  </Popup>
               </Marker>
            ))}
         </Map>
      )
   }
}