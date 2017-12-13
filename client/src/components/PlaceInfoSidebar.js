import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Icon, Image, Loader, Dimmer,  Message} from 'semantic-ui-react'


class PlaceInfoSidebar extends React.Component {
    constructor(props){
        super(props)
    }

  render() {
      return (
        <Container fluid>
            {this.props.clickedMarker ?

                <Container fluid style={{paddingTop: "30px"}}>
                    <Header as='h2' icon textAlign='center'>
                         <Icon name='marker'size="tiny"/>
                         <Header.Content>
                             {this.props.clickedMarker.placeName}
                         </Header.Content>
                    </Header>


                    <Image style={{height: "150px", width: "100%", objectFit: "cover"}} src={this.props.clickedMarker.placePictureURL} alt={this.props.clickedMarker.placeName} />

                    <p>
                        {this.props.clickedMarker.placeContent}
                    </p>

                    <a href={this.props.clickedMarker.placeWikiURL} target="blank">
                        <strong>
                            <Icon size="big" name="wikipedia"/>
                            Czytaj więcej!
                        </strong>
                    </a>
                </Container>

                :

                <Message info>"Jeśli chcesz zobaczyć informacje na temat miejsca. Kliknij w wybrany znacznik na mapie."</Message>
            }
        </Container>
      );
  }
}

export default PlaceInfoSidebar;
