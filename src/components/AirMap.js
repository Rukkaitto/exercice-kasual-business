import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";

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
            <MarkerClusterGroup>
               {this.props.measurements.map((measurement, key) => { // Maps the measurements to corresponding markers and popups
                  if (!measurement["coordinates"]["longitude"] || !measurement["coordinates"]["latitude"]) { // Checks if the latitude or longitude are null or undefined
                     return null;
                  }
                  const markerPosition = [measurement["coordinates"]["latitude"], measurement["coordinates"]["longitude"]];
                  return (
                     <Marker key={key} position={markerPosition}>
                        <Popup key={key}>
                           <b>Location</b> : {measurement["city"]} <br />
                           <b>Date</b> : {measurement["date"]["local"]} <br />
                           <b>Value</b> : {measurement["value"]} {measurement["unit"]}
                        </Popup>
                     </Marker>
                  );
               })}
            </MarkerClusterGroup>
         </Map>
      )
   }
}