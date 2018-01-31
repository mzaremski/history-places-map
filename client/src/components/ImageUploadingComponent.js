import React from 'react';
import axios from 'axios';
import {Dimmer, Loader, Segment, Icon, Input, Message} from 'semantic-ui-react'

class ImageUploadingComponent extends React.Component {
    constructor(props) {
         super(props);
         this.state = {
             uploading: false,
             firstClick: true
         }


        window.onclick = (e)=>{
            var ImageUploadingComponent = document.getElementById("ImageUploadingComponent")
            console.log("CLICK")
            //if(!this.state.firstClick &&  (e.path[0] !== ImageUploadingComponent)){
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
            <Segment raised id="ImageUploadingComponent" style={{"position":"absolute", "top": this.props.mousePositionOfClick - 75 +"px" }}>
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
            console.log(response)

            if(response.data.success){
                this.insertImageDataToDB(response.data.data)
            }else{
                this.setState({error: true, uploading:false})
            }
        });

    }

    insertImageDataToDB(data){
        var dataxd = {
            id: data.id,
            datetime: data.datetime,
            link: data.link,
            tags: data.tags,
            deletehash: data.deletehash
        }

        if(dataxd.link){
            this.props.insertImageToEditor(dataxd.link)
            this.setState({error: false, uploading:false})
        }else{
            this.setState({error: true, uploading:false})
        }
    }

    // axios({
    //      method: 'POST',
    //      headers: {
    //         'Authorization': 'Client-ID 969f27a869eb799',
    //    },
    //      url: 'https://api.imgur.com/3/image/',
    //      data
    // }).then(response => {
    //     console.log(response)
    //
    //     if(response.success){
    //         this.insertImageDataToDB(response.data)
    //     }else{
    //         this.setState({success: false})
    //     }
    //
    // });

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
