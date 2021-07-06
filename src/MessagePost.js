import React, {Component} from 'react';
import axios from "axios";
import Card from '@material-ui/core/Card';

import './App.css';
import {CardContent} from "@material-ui/core";


class MessagePost extends Component {
    constructor(props) {
        super();
        this.state = {
            searchGiphy: '',
            openGifyCard: false,
            gifArr: ''
        }
    }

    getGiphy() {
        axios.get(`https://api.giphy.com/v1/gifs/search?q=${this.state.searchGiphy}&api_key=JRkqe8ZMxotqImvf6tE2JaImONVGcjBK&limit=5`).then(res => {
            this.setState({gifArr: res.data.data})
        })
    }

    searchText(e) {
        this.setState({searchGiphy: e.target.value})
    }


    render() {
        return (
            <div>
                <div>
                <input name={"Write something"} type={"text"}/>
            </div>
                <button  onClick={() => {
                    this.setState({openGifyCard: true})
                }}>GIFS
                </button>

                {this.state.openGifyCard ?
                    <Card>
                        <div>
                            <input name={"search"} onChange={(e) => this.searchText(e)}/>
                            <button onClick={() => this.getGiphy()}>click</button>
                        </div>
                       <CardContent>
                           { (this.state.gifArr && this.state.gifArr.length !== 0) ?
                               this.state.gifArr.map((gif,i)=>{
                                   return <picture>
                                       <list style={{listStyle: 'none'}}>
                                           <img src={gif.images.downsized.url} key={i} width="250" height="200"/>
                                       </list>
                                   </picture>
                               }):null}
                       </CardContent>

                    </Card>
                    : null}
            </div>
        );
    }
}

export default MessagePost;