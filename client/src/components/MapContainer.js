import React from 'react';
import axios from 'axios';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';


//import MarkerPopUp from './MarkerPopUp';


export class MapContainer extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
             markers: [],
             foundMarkersIsLoaded: false,
             allMarkersIsLoaded: false,
             markerIconSrc:{
                 "default": "marker2.png",
                 "grave": "grave-icon.png",
                 "monument": "monument-icon.png",
                 "museum": "museum-icon.png",
                 "church": "church-icon.png"
             }
         }
    }

    componentDidUpdate(){
        this.loadMarkers();
    }

    render() {
        return (
                <Map
                    google={this.props.google}
                    zoom={16}
                    initialCenter={{lat: 50.158648, lng: 23.124835}}
                    onClick={this.onMapClicked.bind(this)}
                >

                    {/* {
                        this.state.markerPopUp ?
                            <MarkerPopUp/>
                            :
                            ""
                    } */}
                    {this.state.loading ?
                        ""
                        :
                        this.getArrayOfMarkersComponent(this.state)
                    }
                </Map>

        );
    }


    getArrayOfMarkersComponent(state){
        const markers = []

        state.markers.forEach((item, index) => {
            markers.push(
                <Marker
                    title={item.placeName}
                    id={item.id}
                    //name={item.markerName}
                    position={{lat: item.lat, lng:item.lng}}
                    key={index}
                    onClick={this.onMarkerClick.bind(this)}
                    //onClick conflict with onMouseover. So, it is move to Map event
                    // onMouseover={this.showPopUpOfMarker.bind(this)}
                    // onMouseout={this.hidePopUpOfMarker.bind(this)}
                    icon={{
                      url: state.markerIconSrc[item.type]//,
                      // anchor: new google.maps.Point(32,32),
                      // scaledSize: new google.maps.Size(64,64)
                    }}
                />
            )}
        );

        return markers
    }


    onMapClicked(mapProps, map, clickEvent) {
        //if config allow to add marker on click, it will be add
        if(this.props.config.addMarker){

            var marker = {
                id: Math.floor(Math.random()*1000000),
                placeName: "New Marker",
                lat: clickEvent.latLng.lat(),
                lng: clickEvent.latLng.lng(),
                type: "default"
            }

            this.setState({markers: [marker], loading: false})
            this.props.addNewMarker(marker)
        }
    }


    loadMarkers(){
        if(this.props.foundMarkers && this.props.foundMarkers != this.state.markers){
            //load found markers
            this.setState({
                markers:this.props.foundMarkers,
                foundMarkersIsLoaded: true,
                allMarkersIsLoaded: false
            })
        }else{
            //load all markers
            if(this.props.config.showAllMarkersMode && !this.state.allMarkersIsLoaded && !this.props.foundMarkers){

                this.state = {...this.state, loading: true}

                axios.get('/markers/all')
                  .then(function (response) {
                      this.setState({
                          markers: response.data,
                          loading: false,
                          foundMarkersIsLoaded: false,
                          allMarkersIsLoaded: true
                      });
                  }.bind(this))
                  .catch(function (error) {
                    console.log(error);
                  });
            }
        }
    }


    onMarkerClick(marker){
        this.props.onMarkerClick(marker)
    }


    showPopUpOfMarker(marker){
        if(!this.state.markerPopUp && !this.props.config.addMarker){
            this.setState({markerPopUp:marker})
        }
    }

    hidePopUpOfMarker(e){
        this.setState({markerPopUp:false})
    }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyDLjESJ7LGDPB668jqjmiPKVSmGhb04Rhw"
})(MapContainer)
