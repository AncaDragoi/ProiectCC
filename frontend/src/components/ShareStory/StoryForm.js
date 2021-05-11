import React, { Component } from 'react'
import LocationStore from '../../store/LocationStore';
import { EventEmitter } from 'events';
import StoryStore from '../../store/StoryStore';

var ee=new EventEmitter();
var storyStore=new StoryStore(ee);
var store=new LocationStore(ee);

class StoryForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedCountry:null,
            user:this.props.user,
            place:'',
            text:'',
            added:false,
            countries:null
        }

        this.handleChangeCountry=this.handleChangeCountry.bind(this);
        this.handleClick=this.handleClick.bind(this);

        this.handleChange = (event) => {
            this.setState({
              [event.target.name] : event.target.value
            })
            console.warn(this.state)
          }

      }

      componentDidMount(){
          ee.addListener('COUNTRIES_LOAD', () => {
            this.setState({
                countries:store.countries
            })
          })
          store.getAllCountries();   
      }

      handleChangeCountry(e) {
        this.setState({
            selectedCountry:e.target.value,
        }); 
      }

      handleClick(){
          ee.addListener('STORY_ADDED', () => {
            this.setState({
                added:true
            })

            alert('Story was published! Thanks for sharing!');
          })
         storyStore.addOnePlace({place:this.state.place,countryId:this.state.selectedCountry});
         storyStore.addOneStory({text:this.state.text,userId:this.state.user.id,placeName:this.state.place});
      }

      render(){
          return(
              <div className="p-3 mb-2 bg-gradient-primary text-white">
                  <h4>Tell us your story!</h4>
                <br/>
                <div class="row">
                <div class="col-md-2">
        <label>Countries</label>
        {this.state.countries? 
             <select onChange={this.handleChangeCountry}>
                 { this.state.countries.map((c) => 
                     <option value={c.id}>{c.name}</option> )  }
        </select>  : null }
        </div>
        </div>

        <div class="row">
        <form className="form-horizontal smallMarginTop">
        <div className="form-group">
        <div className="row">
        <label className="control-label">What's the place?</label>
        <div></div>
        <input className="control-label" type="text" name="place" onChange={this.handleChange}  />
        </div>
        <br/>
        <div className="row">
        <label className="control-label">What's the story?</label>
        <textarea rows="10" className="control-label" type="text" name="text" onChange={this.handleChange}></textarea>
        </div>
        <div className="row">
        <button type="button" className="btn btn-primary btn-lg" onClick={this.handleClick}><i class="fa fa-paper-plane" aria-hidden="true"></i>Send story</button>
        </div>
        </div>
         </form>
         </div>
                  </div>
          )
      }

}
export default StoryForm;