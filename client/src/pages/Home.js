import React from 'react';
import axios from 'axios';
import { Grid, Dimmer, Loader} from 'semantic-ui-react'

import MapContainer from '../components/MapContainer';
import Sidebar from '../components/Sidebar';
import AddPlaceForm from '../components/AddPlaceForm';


class Home extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
             placeData: false,
             placeLoading:false,
             config:{
                     addMarker: this.props.appMode === "addPlace" ? true : false,
                     showMarkers: this.props.appMode === "showMarkers" ? true: false
             }
         }
    }

    render() {
        return (
            <Grid style={{height:"98vh"}}>
                <Grid.Row >
                     <Grid.Column style={{paddingTop:"20px" ,position: "relative", zIndex: 1000, left: "13px", boxShadow: "5px 5px 20px 0px rgba(0,0,0,0.3)", overflowY: "scroll", boxSizing: "border-box"}}  width={4}>
                         {
                         this.props.appMode === 'addPlace' ?
                             <AddPlaceForm
                                 newMarker={this.state.newMarker ? this.state.newMarker : false}
                                 newMarkerAdded={this.newMarkerAdded.bind(this)}
                             />
                             :
                             (this.state.clickedMarkerLoading ?
                                 <Dimmer active>
                                     <Loader size='large'>Loading</Loader>
                                 </Dimmer>
                                 :
                                 <Sidebar clickedMarker={this.state.clickedMarker ? this.state.clickedMarker : false}/>
                             )
                         }
                     </Grid.Column>

                     <Grid.Column width={12}>
                        <MapContainer
                            config={this.state.config}
                            addNewMarker={this.addNewMarker.bind(this)}
                            onMarkerClick={this.onMarkerClick.bind(this)}
                            deleteClickedMarker={this.state.deleteClickedMarker}
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
}

export default Home;
