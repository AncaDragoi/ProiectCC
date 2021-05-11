import axios from 'axios'

const SERVER = 'http://localhost:1234'
 var countries;
 var continents;
 var location;

class LocationStore{
  constructor(ee){
    this.ee = ee
  }
  getAllContinents(){
    axios(SERVER + '/continents')
      .then((response) => {
        this.continents = response.data
        this.ee.emit('CONTINENTS_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOneContinent(continent){
    axios.post(SERVER + '/continent', continent)
      .then(this.ee.emit('CONTINENT_ADDED'))
      .catch((error) => console.warn(error))
  }
  getOneContinent(id){
    axios(SERVER + '/continent/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_CONTINENT_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  getAllCountries(){
    axios(SERVER + '/countries')
      .then((response) => {
        this.countries = response.data
        this.ee.emit('COUNTRIES_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOneCountry(country){
    axios.post(SERVER + '/country', country)
      .then(this.ee.emit('COUNTRY_ADDED'))
      .catch((error) => console.warn(error))
  }
  getOneCountry(id){
    axios(SERVER + '/country/' + id)
      .then((response) => {
        this.selected = response.data
        console.log(this.selected)
        this.ee.emit('SINGLE_COUNTRY_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  getLocation(){
    axios(SERVER + '/getLocation')
    .then((response) => {
      this.location = response.data.attributes;
      console.log(this.selected)
      this.ee.emit('LOCATION_LOAD')
    })
    .catch((error) => console.warn(error))
  }


}

export default LocationStore