import React from 'react';
import axios from 'axios';
import {Container, Dimmer, Message, Button, Form, Icon, TextArea,  Dropdown, Checkbox} from 'semantic-ui-react'


class MarkerSearchPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            placeFormData: {},
            idForm: "markerSearchForm"
        }
    }


  render() {
      return (
          <Container className="markerSearchForm">
                  <Form id={this.state.idForm} onSubmit={e => this.searchMarkers(e)}>
                        <Form.Field>
                              <label>Nazwa miejsca</label>
                              <input placeholder='Nazwa miejsca' name="placeName" onChange={e => this.changeValue(e)}/>
                        </Form.Field>
                        <Form.Field>
                                <label>Rodzaj miejsca</label>
                                {this.getCheckboxTypeOfMarkers()}
                        </Form.Field>
                        <Form.Field>
                                <label>Stan zachowania obiektu</label>
                                <Checkbox disabled label="Ruina"/>
                                <Checkbox disabled label="Stan dobry"/>
                        </Form.Field>

                        <Button color="teal" type='submit' onSubmit={ e => this.searchMarkers(e) }>Szukaj!</Button>
                        <Button color="teal" type='button' color="grey" onClick={ e => this.clearForm(e) }>Wyczyść</Button>
                  </Form>

                  {this.state.message ?
                        <Message color="orange">{this.state.message}</Message>
                    :
                        ""
                  }

          </Container>
      );
  }

    changeValue(e, dropdown){
        var target = e.target;

        if( this.hasClass(target.parentNode, "checkbox") || this.hasClass(target, "checkbox")){//if input is checkbox
            // when clicked on div.ui.checkbox(from semantic-ui) outside label the target is div.ui.checkbox
            // when clicked on label in div.ui.checkbox the target is label
            var inputCheckbox = this.hasClass(target, "checkbox") ?
                                    target.querySelector("input")
                                    :
                                    target.parentNode.querySelector("input");

            this.setState({
                placeFormData:{
                    ...this.state.placeFormData,
                    type: {
                        ...this.state.placeFormData.type,
                        [inputCheckbox.getAttribute("name")]: !this.hasClass(inputCheckbox.parentNode, "checked")
                    }
                }
            })
        }else{
            this.setState({
                placeFormData:{
                    ...this.state.placeFormData,
                    [target.name || "type"]: target.value || dropdown && dropdown.value
                }
            })
        }



    }

    getCheckboxTypeOfMarkers(){
        const checkboxes = []
        const typeOfMarkers =  [
            { key: 'grave', value: 'grave', text: 'Cmentarz/Grób' },
            { key: 'church', value: 'church', text: 'Kościół' },
            { key: 'monument', value: 'monument', text: 'Pomnik' },
            { key: 'museum', value: 'museum', text: 'Muzeum' },
        ]

        typeOfMarkers.forEach((item, index)=>{
            checkboxes.push(
                <Checkbox
                    label={item.text}
                    key={index}
                    checked={ this.checkStateIfChecked(item) }
                    name={item.value}
                    onChange={e => this.changeValue(e)}
                />)
        })

        return checkboxes
    }

    checkStateIfChecked(item){
        var placeFormData = this.state.placeFormData
        return (placeFormData && placeFormData.type && placeFormData.type[item.value]) ? true : false
    }


    searchMarkers(e){
        e.preventDefault()

        var placeFormData = this.state.placeFormData
        var typesToSearch = [];

        for(var i in placeFormData.type){
            if(placeFormData.type[i] === true){
                typesToSearch.push(i)
            }
        }

        var markerSearchData = {
            placeName: "",//default
            ...this.state.placeFormData,
            type: typesToSearch
        }

        axios({
             method: 'post',
             url: '/searchmarkers',
             data: markerSearchData
        }).then(response => {
            var data = response.data
            if(data.isError){
                this.setState({isError: response.data.isError});
            }else{
                if(data.length !== 0){
                    this.props.addFoundMarkersToMap(data)
                    this.setState({isError: false, message: false})
                }else{
                    let message = "Brak znaczników!"
                    this.setState({isError: false, message})
                }

                this.setState({isError: false})
            }
        });
    }

    clearForm(e){
        this.setState({placeFormData: {}, message: false})
        this.props.addFoundMarkersToMap(false)
        e.target.parentNode.reset()
    }

    hasClass( target, className ) {
        return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
    }
}

export default MarkerSearchPanel;
