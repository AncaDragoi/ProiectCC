import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'

class WebcamElement extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props.data,
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        data:nextProps.data
    })
  }

  render() {
    return (
            <tr>
                <td>{this.state.data.title}</td>
                <td><a href={this.state.data.image.current.preview}><img src={this.state.data.image.current.preview}/></a></td>
                <td>{this.state.data.location.city + ' ' 
                + this.state.data.location.country + ' ' 
                + this.state.data.location.region}</td>
                <td>{this.state.data.status}</td>

            </tr>
    )
  }
}

export default WebcamElement;