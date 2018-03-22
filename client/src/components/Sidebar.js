import React from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import MarkerContent from '../components/MarkerContent';
import AddPlaceForm from '../components/AddPlaceForm';

class Sidebar extends React.Component {
    constructor(props){
        super(props)

    }

    render() {
      return (<Container fluid>
          {
          this.props.appMode === 'addPlace' ?
              <AddPlaceForm
                  newMarker={this.props.newMarker}
                  newMarkerAdded={this.newMarkerAdded.bind(this)}
              />

              :

              (this.props.appMode === 'showMarkerContent' ?
                  (this.props.clickedMarkerLoading ?
                      <Dimmer active>
                          <Loader size='large'>Loading</Loader>
                      </Dimmer>
                      :
                      <MarkerContent clickedMarker={this.props.clickedMarker}/>
                  )
                  :
                  ""
              )
          }
      </Container>);
    }

    newMarkerAdded(){
        this.props.newMarkerAdded()
    }



}

export default Sidebar;
