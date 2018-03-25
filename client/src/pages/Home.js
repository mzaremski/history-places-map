import React from 'react';
import axios from 'axios';
import { Grid, Dimmer, Loader} from 'semantic-ui-react'

import MapContainer from '../components/MapContainer';
import Sidebar from '../components/Sidebar';


class Home extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
             placeData: false,
             placeLoading:false,
             config:{
                     addMarker: this.props.appMode === "addPlace" ? true : false,
                     showAllMarkersMode: this.props.appMode === "showAllMarkersMode" ? true: false
             }
         }
    }

    render() {
        return (
            <Grid style={{height:"98vh"}}>
                <Grid.Row >
                     <Grid.Column className="sidePanel"  width={4}>
                             <Sidebar
                                 appMode={ this.props.appMode }
                                 newMarker={ this.state.newMarker ? this.state.newMarker : false }
                                 newMarkerAdded={ this.newMarkerAdded.bind(this) }
                                 clickedMarker={ this.state.clickedMarker ? this.state.clickedMarker : false }
                                 clickedMarkerLoading={ this.state.clickedMarkerLoading }
                                 closeMarkerContent={ ()=>{ this.setState({clickedMarker: false}) } }
                                 addFoundMarkersToMap={ this.addFoundMarkersToMap.bind(this) }
                             ></Sidebar>
                     </Grid.Column>

                     <Grid.Column width={12}>
                        <MapContainer
                            config={this.state.config}
                            addNewMarker={this.addNewMarker.bind(this)}
                            onMarkerClick={this.onMarkerClick.bind(this)}
                            deleteClickedMarker={this.state.deleteClickedMarker}
                            foundMarkers={this.state.foundMarkers}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    onMarkerClick(clickedMarker){
        this.setState({clickedMarkerLoaging: true})

        axios.get('/markers/' + clickedMarker.id)
          .then(function (response) {
              this.setState({clickedMarker: response.data[0]})
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });

        this.setState({clickedMarker})
    }

    addNewMarker(newMarker){
        this.setState({newMarker})
    }

    newMarkerAdded(){
        this.setState({newMarker: false})
    }

    addFoundMarkersToMap(markers){
        this.setState({foundMarkers: markers})
    }
}

export default Home;
