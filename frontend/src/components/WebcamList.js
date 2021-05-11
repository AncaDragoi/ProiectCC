import React, { Component } from "react";
import LocationStore from "../../store/LocationStore";
import WebcamElement from "./WebcamElement";
class WebcamList extends Component {

    constructor(props){
        super(props)
        this.state = {
            webcams:this.props.webcams
        }

      }

      componentWillReceiveProps(nextProps){
        this.setState({
            webcams:nextProps.webcams
        })
      }
      render(){
          if(this.state.webcams){
            return(
                <div class="p-3 mb-2 bg-gradient-primary text-white">
                    <table class="table table-hover">
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Image</td>
                        <td>Location</td>
                        <td>Status </td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.webcams.map( (w) => 
                     <WebcamElement data={w}/>
                    )
                     }
                     </tbody>
                     </table>
                 </div>
            )
          }
       
    }
}
export default WebcamList;