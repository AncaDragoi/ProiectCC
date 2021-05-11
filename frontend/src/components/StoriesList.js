import React, { Component } from "react";
import { EventEmitter } from "events";
import StoryStore from "../../store/StoryStore";
import StoryElement from "./StoryElement";
var ee = new EventEmitter();
var store = new StoryStore(ee);
class StoriesList extends Component{

    constructor(props) {
        super(props);
        this.state = {
           user:this.props.user,
           stories:null
        };
      }

      componentDidMount(){
        ee.addListener('STORIES_LOAD',()=>{
            this.setState({
                stories:store.stories,
            });
           })

           store.getAllStories();
      }

      render(){
          return(
              <div className="p-3 mb-2 bg-gradient-primary text-white">
                   <table class="table .table-hover">
                    <thead>
                    <tr>
                        <td>Story id</td>
                        <td>Place name</td>
                        <td>Story</td>
                        <td>Like </td>
                        <td>Dislike </td>
                        <td>User ID </td>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.stories? this.state.stories.map( (s) => 
                     <StoryElement data={s}/>
                    )
                     : null }
                     </tbody>
                     </table>
                  </div>
          )
      }
}export default StoriesList;