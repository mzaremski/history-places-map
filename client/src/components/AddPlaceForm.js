import React from 'react';
import axios from 'axios';
import Quill from 'quill';
import {Container, Dimmer, Message, Button, Form, Icon, TextArea,  Dropdown} from 'semantic-ui-react'

import ImageUploadingComponent from './ImageUploadingComponent';



class AddPlaceForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showUploadingImageComponent: false,
            placeFormData: {},
            idForm: "addPlaceForm",
            dropdownOption: [
                { key: 'grave', value: 'grave', text: 'Cmentarz/Grób' },
                { key: 'church', value: 'church', text: 'Kościół' },
                { key: 'monument', value: 'monument', text: 'Pomnik' },
                { key: 'museum', value: 'museum', text: 'Muzeum' },
            ]
        }
    }


  render() {
      return (
          <Container>
              {this.props.newMarker ?
                  <Form id={this.state.idForm} onSubmit={e => this.addMarkerRequest(e)}>
                        <Form.Field>
                              <label>Nazwa miejsca</label>
                              <input placeholder='Nazwa miejsca' name="placeName" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label>Krótki opis miejsca</label>
                              <input placeholder='Krótki opis miejsca' name="placeDesc" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                              <label>Rodzaj miejsca</label>
                              <Dropdown placeholder='Rodzaj miejsca' openOnFocus={false} selection options={this.state.dropdownOption} onChange={(e,dropdown) => {this.changeValue(e, dropdown)}} />
                        </Form.Field>
                        <Form.Field>
                              <label>Opis miejsca</label>
                              <div id="quill-editor-container"></div>
                        </Form.Field>
                        <Form.Field>
                              <label><Icon size="big" name="picture"/> Adres URL do miniaturki</label>

                              <Button icon labelPosition='left' onClick={()=>{this.showUploadingImageComponent("Thumbnail")}}>
                                      <Icon size="large" name='upload' />
                                      {this.state.placeFormData.placePictureURL ?
                                          this.state.placeFormData.placePictureURL
                                          :
                                          "Kliknij aby ustawić miniaturkę!"
                                      }
                              </Button>

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


                        {this.state.isError === true ?
                            <Message color="red">Występił błąd podczas zapisywania znacznika! Przepraszamy!</Message>
                            :
                            ""
                        }


                        {
                            (this.state.showQuillUploadingImageComponent === true ?
                                <ImageUploadingComponent
                                    imageUrlHandler={(link)=>{this.insertImageToEditor(link)}}
                                    hideImageUploadingComponent={()=>{this.setState({showQuillUploadingImageComponent: false})}}
                                />
                            : "")
                        }
                        {
                            (this.state.showThumbnailUploadingImageComponent === true ?
                                <ImageUploadingComponent
                                    imageUrlHandler={(link)=>{
                                        this.setState({
                                            placeFormData:{
                                                ...this.state.placeFormData,
                                                placePictureURL: link
                                            }
                                        })
                                    }}
                                    hideImageUploadingComponent={()=>{this.setState({showThumbnailUploadingImageComponent: false})}}
                                />
                            : "")
                        }


                  </Form>

                  :
                  <div>
                      <Message info>Kliknij na mapę w celu dodania znacznika.</Message>
                          {
                              this.state.isError === false ?
                                  <Message positive>Znacznik został zapisany. Dziękujemy!</Message>
                                  :
                                  ""
                          }
                  </div>
              }

          </Container>
      );
  }


    componentDidUpdate(){
          this.runQuill()
    }


    runQuill(){
        var quillContainerSelector = "#quill-editor-container"

        if(!this.state.quill && document.querySelector(quillContainerSelector))
            this.setState({
                quill:new Quill(quillContainerSelector, {//create Quill object in #quill-editor-container element
                      modules: {
                        toolbar: {
                            container: [
                                  [{ header: [1, 2, 3, false] }],
                                  ['bold', 'italic', 'underline'],
                                  [{ 'color': [] }],
                                  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'align': [] }],
                                  ['image']
                            ]
                            ,
                            handlers: {
                                image: () => { this.imageHandler() }
                            }
                        }
                      },
                      placeholder: 'Opis miejsca',
                      theme: 'snow'  // or 'bubble'
                    })
            }, function(){
                    this.state.quill.on('text-change', function(delta, oldDelta, source) {//When text change in quill editor, content save to state
                        this.setState({
                            placeFormData:{
                                ...this.state.placeFormData,
                                placeContent: this.state.quill.getContents()
                            }
                        })
                  }.bind(this));
            }.bind(this))
    }


    changeValue(e, dropdown){
        this.setState({
            placeFormData:{
                ...this.state.placeFormData,
                [e.target.name || "type"]: e.target.value || dropdown && dropdown.value
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
                    target.reset(); //clear form fields
                    this.state.quill = false //delete quill object
                    this.props.newMarkerAdded()
                    this.setState({isError: false, placeFormData: {}})
                }
            });

        }else{
            this.setState({isValide: false})
        }
    }


    isFormValid(){
        var formFields = this.state.placeFormData
        var placeContent = this.state.quill.getText()

        var isValide = (
            placeContent &&
            (placeContent.length > 10) &&
            formFields.placeDesc &&
            formFields.type &&
            (formFields.placeDesc.length > 5) &&
            formFields.placeName &&
            (formFields.placeName.length > 5) &&
            this.isValidURL(formFields.placePictureURL)
        ) ? true : false

        this.setState({isValide: isValide})

        return isValide
    }


    isValidURL(str){
       var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
       return regexp.test(str);
    }


    insertImageToEditor(url){
        this.state.quill.insertEmbed(this.state.quillRange.index, "image", url, Quill.sources.USER);
    }


    imageHandler() {
        var range = this.state.quill.getSelection();
        this.setState({quillRange: range})
        this.showUploadingImageComponent("Quill")
    }


    showUploadingImageComponent(location){
        this.setState({["show"+ location + "UploadingImageComponent"]: true})
    }


}

export default AddPlaceForm;
