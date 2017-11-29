import React from 'react';
import axios from 'axios';
import {Container, Message, Button, Form, Icon, TextArea} from 'semantic-ui-react'

class AddPlaceForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {placeFormData: {}}
    }
  render() {
      return (
          <Container>
              {this.props.newMarker ?
                  <Form onSubmit={e => this.addMarkerRequest(e)}>
                        <Form.Field>
                              <label>Nazwa miejsca</label>
                              <input placeholder='Nazwa miejsca' name="placeName" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label>Krótki opis miejsca</label>
                              <input placeholder='Krótki opis miejsca' name="placeDesc" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label>Opis miejsca</label>
                              <TextArea placeholder='Opis miejsca' name="placeContent" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label><Icon size="big" name="picture"/> Adres URL do miniaturki</label>
                              <input placeholder='Adres URL do miniaturki' name="placePictureURL" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label><Icon size="big" name="wikipedia"/> Adres URL do wikipedii</label>
                              <input placeholder='Adres URL do wikipedii' name="placeWikiURL" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Message>
                            Współrzędne:
                            <ul>
                                <li>lat: {this.props.newMarker.lat}</li>
                                <li>lng: {this.props.newMarker.lng}</li>
                            </ul>
                        </Message>
                        <Button color="teal" type='submit'>Dodaj znacznik!</Button>
                  </Form>
                  :
                  <Message>Kliknij na mapę w celu dodania znacznika.</Message>
              }

          </Container>
      );
  }
    changeValue(e){
        console.log(e.target.name)
        this.setState({
            placeFormData:{
                ...this.state.placeFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    addMarkerRequest(e){
        e.preventDefault()
        var placeData = {
            ...this.state.placeFormData,
            lat: this.props.newMarker.lat,
            lng: this.props.newMarker.lng
        }

        console.log(placeData)

        axios({
             method: 'post',
             url: '/addmarker',
             data: placeData
        }).then(response => {
            if(response.data.isError){
                this.setState({isError: response.data.isError});
            }else{
                this.state = {isError: false}
            }
        });

    }
}

export default AddPlaceForm;
