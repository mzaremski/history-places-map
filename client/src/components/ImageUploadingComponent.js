import React from 'react';
import axios from 'axios';
import {Dimmer, Container, Loader, Segment, Icon, Input, Message} from 'semantic-ui-react'

class ImageUploadingComponent extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
             uploading: false,
             firstClick: true
         }


        window.onclick = (e)=>{
            var ImageUploadingComponent = document.getElementById("ImageUploadingComponent")

            if(!this.state.firstClick &&  !this.isElementInPatch(e.path, ImageUploadingComponent)){
                this.props.hideImageUploadingComponent();
            }
            if(this.state.firstClick && ImageUploadingComponent){
                this.setState({firstClick:false})
            }
        }
    }


    render() {
        return (
            <Container style={{"position":"absolute", "top": 0, "width":"100%", "height":"100%"}}>
                <Dimmer active inverted>
                    <Segment raised id="ImageUploadingComponent" style={{ "top" : "45%" }}>
                            {/* <Icon name='attach'size="large"/> */}

                            {this.state.uploading ?
                                <Dimmer active inverted>
                                      <Loader inverted>Loading</Loader>
                                </Dimmer>
                                :
                                ""
                            }

                            <input type="file" accept="image/*" data-max-size="5000" onChange={e => this.uploadImage(e)} />

                            {this.state.error ?
                                <Message color='red'>Błąd!</Message>
                            :
                                ""
                            }
                    </Segment>
                </Dimmer>
            </Container>
        );
    }


    uploadImage(e){
        var data = new FormData();
        data.append('image', e.target.files[0]);
        data.append('album', "acFS9IforLb0Qi3");

        this.setState({uploading: true})

        axios({
             method: 'POST',
             headers: {
                'Authorization': 'Client-ID 969f27a869eb799',
           },
             url: 'https://api.imgur.com/3/image/',
             data
        }).then(response => {
            if(response.data.success){
                this.insertImageDataToDB(response.data.data)
            }else{
                this.setState({error: true, uploading:false})
            }
        });

    }

    insertImageDataToDB(data){
        const imgurData = {
            id: data.id,
            datetime: data.datetime,
            link: data.link,
            tags: data.tags,
            deletehash: data.deletehash
        }
        imgurData.tags = JSON.stringify(imgurData.tags)
        console.log(imgurData)

        axios({
             method: 'POST',
             url: '/addimage',
             data: imgurData
        }).then(response => {
            console.log(response)
            const data = response.data
            if(!data.isError){
                if(imgurData.link){
                    this.props.imageUrlHandler(imgurData.link)
                    this.props.hideImageUploadingComponent()
                    this.setState({error: data.isError, uploading:false})
                }else{
                    this.setState({error: true, uploading:false})
                }
            }else{
                this.setState({error: true})
            }
        });
    }

    isElementInPatch(patch, element){
        var isInPatch = false

        patch.forEach((item)=>{
            if(item === element){
                isInPatch = true
            }
        })

        return isInPatch
    }
}

export default ImageUploadingComponent;
