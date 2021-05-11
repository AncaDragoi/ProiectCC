import React, { Component } from "react";
import StoryStore from "../../store/StoryStore";
import { EventEmitter } from "events";
var  ee = new EventEmitter();
var store = new StoryStore(ee);
class StoryElement extends Component{
    constructor(props){
        super(props)
        this.state = {
          data: this.props.data,
        };

        this.handleDislike=this.handleDislike.bind(this);
        this.handleLike=this.handleLike.bind(this);
      }
      componentWillReceiveProps(nextProps){
        this.setState({
            data: this.nextProps.data
        })
      }

      handleDislike(e){
        // var id = e.currentTarget.parrentElement.childNodes[0].innerHTML;
        // var placeName=e.currentTarget.parrentElement.childNodes[1].innerHTML;
        // var text=e.currentTarget.parrentElement.childNodes[2].innerHTML;
        // var likes=e.currentTarget.parrentElement.childNodes[3].innerHTML;
        // var dislikes=e.currentTarget.parrentElement.childNodes[4].innerHTML +1;
        // var userId=e.currentTarget.parrentElement.childNodes[5].innerHTML;
        // ee.addListener('STORY_MOD',()=>{
           
        //   })
        // store.updateStoryDislike(userId,{id:id,placeName:placeName,tex:text,likes:likes,dislikes:dislikes,userId:userId});

        alert('You disliked this post.');
      }

      handleLike(e){
        //  var id = e.currentTarget.parrentElement.childNodes[0].innerHTML;
        //  var placeName=e.currentTarget.parrentElement.childNodes[1].innerHTML;
        //  var text=e.currentTarget.parrentElement.childNodes[2].innerHTML;
        //  var likes=e.currentTarget.parrentElement.childNodes[3].innerHTML +1;
        //  var dislikes=e.currentTarget.parrentElement.childNodes[4].innerHTML;
        //  var userId=e.currentTarget.parrentElement.childNodes[5].innerHTML;
        //  ee.addListener('STORY_MOD',()=>{
            
        //    })
        //  store.updateStoryLike(userId,{id:id,placeName:placeName,tex:text,likes:likes,dislikes:dislikes,userId:userId});

        alert('You liked this post.');
      }
    
      render() {
        return (
                <tr>
                    <td id="idStory">{this.state.data.id}</td>
                    <td>{this.state.data.text}</td>
                    <td>{this.state.data.placeName}</td>
                    <td><button className="btnSize btn btn-block btn-primary " onClick={this.handleLike}><i class="fa fa-thumbs-up">{this.state.data.likes}</i></button></td>
                    <td><button className="btnSize btn btn-block btn-primary " onClick={this.handleDislike}><i class="fa fa-thumbs-down">{this.state.data.likes}</i></button></td>
                    <td>{this.state.data.userId}</td>
                </tr>
        )
      }
}
export default StoryElement;