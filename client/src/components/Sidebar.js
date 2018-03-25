import React from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import MarkerContent from '../components/MarkerContent';
import MarkerSearchPanel from '../components/MarkerSearchPanel';
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

              (this.props.appMode === 'showAllMarkersMode' ?
                  (this.props.clickedMarkerLoading ?
                      <Dimmer active>
                          <Loader size='large'>Loading</Loader>
                      </Dimmer>
                      :
                      (this.props.clickedMarker ?
                          <MarkerContent clickedMarker={this.props.clickedMarker} closeMarkerContent={this.props.closeMarkerContent}/>
                          :
                          <MarkerSearchPanel addFoundMarkersToMap={this.addFoundMarkersToMap.bind(this)}/>
                      )
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
    addFoundMarkersToMap(markers){
        this.props.addFoundMarkersToMap(markers)
    }

    // closeMarkerContent(){
    //     this.props.closeMarkerContent()
    // }

}

export default Sidebar;
