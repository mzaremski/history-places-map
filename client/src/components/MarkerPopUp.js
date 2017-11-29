import React from 'react';
import {Card, Image, Icon} from 'semantic-ui-react'

class MarkerPopUp extends React.Component {
    constructor(props){
        super(props)

    }

    render() {
      return (
          <Card style={{position: "absolute", top: "35px"}}>
                <Image src='http://www.krakowlife.pl/images/partydir/285.jpg' />

                <Card.Content>
                      <Card.Header>
                            Matthew
                      </Card.Header>

                      <Card.Meta>
                            <span className='date'>
                              Joined in 2015
                            </span>
                      </Card.Meta>

                      <Card.Description>
                            Matthew is a musician living in Nashville.
                      </Card.Description>
                </Card.Content>

                <Card.Content extra>
                      <a>
                            <Icon name='user' />
                            22 Friends
                      </a>
                </Card.Content>
          </Card>
      );
    }
}

export default MarkerPopUp;
