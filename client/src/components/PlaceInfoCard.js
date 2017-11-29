import React from 'react';
import {Header, Icon, Container, Image} from 'semantic-ui-react'

class PlaceInfoCard extends React.Component {
    constructor(props) {
         super(props);
         this.state = {...this.props.placeData}
    }
  render() {
      return (
          <Container style={{paddingTop: "30px"}}>
              <Header as='h2' icon textAlign='center'>
                   <Icon name='marker'size="tiny"/>
                   <Header.Content>
                       {this.state.placeName}
                   </Header.Content>
              </Header>
              <Image src={this.state.placePictureURL} alt={this.state.placeName} />
              {this.state.placeContent}
          </Container>

      );
  }
}

export default PlaceInfoCard;
