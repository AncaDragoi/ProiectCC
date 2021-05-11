import React, { Component } from "react";
import LocationStore from "../../store/LocationStore";
import { EventEmitter } from "events";
import WebcamsStore from "../../store/WebcamsStore";
import WebcamList from "../WebcamList/WebcamList";
const ee = new EventEmitter()
const ee2=new EventEmitter()
const store = new LocationStore(ee)
const webStore=new WebcamsStore(ee2)
const continents=[];
const countries=[];

class Discover extends Component{

    constructor(props){
        super(props)
        this.state = {
            continents: [],
            countries:[],
            selectedCountry:null,
            selectedContinent:null,
            location:null,
            webcams:null,
            category:''
          }

          ee2.addListener('WEBCAMS_LOAD',()=>{
            this.setState({
                webcams:webStore.webcams
            })
           })
        webStore.getWebcamList();        
        this.handleChangeContinent=this.handleChangeContinent.bind(this);
        this.handleChangeCountry=this.handleChangeCountry.bind(this);
        this.getLocation=this.getLocation.bind(this);
        this.handleCategory=this.handleCategory.bind(this)      }


      handleChangeCountry(e) {
        this.setState({
            selectedCountry:e.target.value,
            selectedContinent:null,
        }); 
          webStore.getWebcamByCountry(e.target.value);
      }

      

      handleChangeContinent(e) {
        this.setState({
            selectedCountry:null,
            selectedContinent:e.target.value,
        });
          webStore.getWebcamByContinent(e.target.value);
      }

      getLocation(){
        ee.addListener('LOCATION_LOAD',()=>{
            this.setState({
                location:store.location,
            });
            webStore.getWebcamByBbox(this.state.location.lat,this.state.location.lng,this.state.location.lat,this.state.location.lng);
           })
       store.getLocation();
      }

      handleCategory(e){

        var c=document.getElementById("categ");
        this.setState({
            category:c.value
        }); 

        webStore.getWebcamByCategory(c.value);
      }

      componentDidMount(){
        ee.addListener('CONTINENTS_LOAD', () => {
            this.setState({
                continents: store.continents
            })
          })

          ee.addListener('COUNTRIES_LOAD', () => {
            this.setState({
                countries:store.countries
            })
          })

          store.getAllContinents();
          store.getAllCountries();
          
      }
    render(){
        return(
            <div className="p-3 mb-2 bg-gradient-primary text-white">
            <br/>
            <br/>
            <div>
            <h4>Select a country or a continent.</h4>
            <br/>
        <br/>
        <div className="col-md-3">
        <label>Continents</label>
        {this.state ?  
        <select disabled={this.state.countries==null} onChange={this.handleChangeContinent}>
        { this.state.continents.map((co) => 
                    <option value={co.continent_code}>{co.name}</option> )
        }
        </select> :null }
      
        </div>
        <div class="col-md-3">
        <label>Countries</label>
        {this.state? 
             <select disabled={this.state.continents==null} onChange={this.handleChangeCountry}>
                 { this.state.countries.map((c) => 
                     <option onClick={this.handleClickCountry} value={c.country_code}>{c.name}</option> )  }
    </select>  : null }
    </div>

    <div className="col-md-3">
    <button  className="btn btn-primary smallMarginTop" onClick={this.getLocation}><i className="fa fa-globe"></i>Get my location</button>
    </div>

    <div className="col-md-2">
    <input id="categ" type="text" name="category"  className="smallMarginTop" /></div>
    <div className="col-md-1">
    <button onClick={this.handleCategory} type="button" className="btnSize2 btn btn-primary"><i class="fa fa-search" aria-hidden="true"></i></button>
    </div>
     </div>

    {this.state.webcams ?
        <div>
        <WebcamList webcams={this.state.webcams.body.result.webcams}/>
        </div> : null}
    
    </div>
    )
    }

}
export default Discover;