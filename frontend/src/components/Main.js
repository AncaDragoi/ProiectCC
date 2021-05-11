import React, { Component } from "react";
import './Main.css'
import Discover from "../Discover/Discover";
import StoryForm from "../ShareStory/StoryForm";
import StoriesList from "../All Stories/StoriesList";
class Main extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
           user:this.props.user,
           componentId:0
        };

        this.handleClick1=this.handleClick1.bind(this);
        this.handleClick2=this.handleClick2.bind(this);
        this.handleClick3=this.handleClick3.bind(this);
        this.handleClick4=this.handleClick4.bind(this);
        this.handleClick5=this.handleClick5.bind(this);
      }

      componentWillReceiveProps(nextProps){
        this.setState({
            user:nextProps.user
        })
      }
      handleClick1(){
        if(this.props.user){
            this.setState({
                componentId : 1
              })
          }else{
            alert('You must be logged in for this!');
        }
           
      }
      handleClick2(){
          if(this.props.user){
            this.setState({
                componentId : 2
              })
          }else{
              alert('You must be logged in for this!');
          }
     
    }
    handleClick3(){
        if(this.props.user){
            this.setState({
                componentId : 3
              })
          }else{
            alert('You must be logged in for this!');
        }
          
    }
    handleClick4(){
        if(this.props.user){
            this.setState({
                componentId : 4
              })
        }else{
            alert('You must be loggedin for this!');
        }
    
    }
    handleClick5(){
        if(this.props.user){
            this.setState({
                componentId : 5
              })
        }else{
            alert('You must be loggedin for this!');
        }
    }
      render(){
          if(this.state.componentId===1 && this.state.user.id){
              return(
             <div className="Main menuButtons">
             <div>
             <div className="col-md-3">
             <button type="button" class="btn btn-outline-primary sparkle" onClick={this.handleClick1}>Discover the world!</button>
             </div>
             <div className="col-md-3">
             <button type="button" class="btn btn-outline-secondary sparkle"  onClick={this.handleClick2}>Share your story!</button>
             </div>
             <div className="col-md-3">
             <button type="button" class="btn btn-outline-warning sparkle" onClick={this.handleClick5}>All stories</button>
             </div>
             </div>
             <br/>
              <Discover/>
              </div>
              )
          }else if(this.state.componentId==2 &&  this.state.user.id){
              return(
            <div className="Main menuButtons">
            <div>
            <div className="col-md-3">
            <button type="button" class="btn btn-outline-primary sparkle" onClick={this.handleClick1}>Discover the world!</button>
            </div>
            <div className="col-md-3">
            <button type="button" class="btn btn-outline-secondary sparkle"  onClick={this.handleClick2}>Share your story!</button>
            </div>
            <div className="col-md-3">
            <button type="button" class="btn btn-outline-warning sparkle" onClick={this.handleClick5}>All stories</button>
            </div>
            </div>
            <br/>
            <br/>
             <StoryForm user={this.state.user}/>
             </div>
              )
          }else if(this.state.componentId===5 && this.state.user.id){
            return(
                <div className="Main menuButtons">
                    <div className="col-md-3">
                    <button type="button" class="btn btn-outline-primary sparkle" onClick={this.handleClick1}>Discover the world!</button>
                    </div>
                    <div className="col-md-3">
                    <button type="button" class="btn btn-outline-secondary sparkle"  onClick={this.handleClick2}>Share your story!</button>
                   </div>
                   <div className="col-md-3">
                    <button type="button" class="btn btn-outline-warning sparkle" onClick={this.handleClick5}>All stories</button>
               </div>
               <br/>
               <br/>
               <StoriesList user={this.state.user}/>
               
                </div>
                )
          }
            else{
                    return(
                    <div className="Main menuButtons">
                        <div className="col-md-3">
                        <button type="button" class="btn btn-outline-primary sparkle" onClick={this.handleClick1}>Discover the world!</button>
                        </div>
                        <div className="col-md-3">
                        <button type="button" class="btn btn-outline-secondary sparkle"  onClick={this.handleClick2}>Share your story!</button>
                       </div>
                       <div className="col-md-3">
                        <button type="button" class="btn btn-outline-warning sparkle" onClick={this.handleClick5}>All stories</button>
                   </div>
                    </div>
                    )
                }
      }

}
export default Main;