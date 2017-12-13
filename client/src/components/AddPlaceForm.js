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
                  <Form id="addPlaceForm" onSubmit={e => this.addMarkerRequest(e)}>
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

                        {
                            (this.state.isValide === false ? <Message color="orange">Proszę uzupełnić poprawnie formularz!</Message> : "")
                        }
                        {
                            this.state.isError === false ?
                                <Message positive>Dziękujemy za wysłanie znacznika!</Message>
                                :
                                (this.state.isError === true ?
                                    <Message warning>Występił błąd w zapisywaniu znacznika!</Message>
                                    :
                                    ""
                                )
                        }

                  </Form>
                  :
                  <Message info>Kliknij na mapę w celu dodania znacznika.</Message>
              }

          </Container>
      );
  }
    changeValue(e){
        this.setState({
            placeFormData:{
                ...this.state.placeFormData,
                [e.target.name]: e.target.value
            }
        })
    }

    addMarkerRequest(e){
        e.preventDefault()
        var target = e.target

        var placeData = {
            ...this.state.placeFormData,
            lat: this.props.newMarker.lat,
            lng: this.props.newMarker.lng
        }

        if(this.isFormValid()){
            this.setState({isValide: true})

            axios({
                 method: 'post',
                 url: '/addmarker',
                 data: placeData
            }).then(response => {
                if(response.data.isError){
                    this.setState({isError: response.data.isError});
                }else{
                    this.setState({isError: false, placeFormData: {}})
                    target.reset();//clear form fields
                }
            });
        }else{
            this.setState({isValide: false})
        }
    }

    isFormValid(){
        var formFields = this.state.placeFormData

        return (
            formFields.placeContent &&
            (formFields.placeContent.length > 10) &&
            formFields.placeDesc &&
            (formFields.placeDesc.length > 5) &&
            formFields.placeName &&
            (formFields.placeName.length > 5) &&
            this.isValidURL(formFields.placePictureURL) &&
            this.isValidURL(formFields.placeWikiURL)
        ) ? true : false
    }


    isValidURL(str){
       var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
       return regexp.test(str);
    }


}

export default AddPlaceForm;
