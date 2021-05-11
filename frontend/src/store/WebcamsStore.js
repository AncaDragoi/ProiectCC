import axios from 'axios'

const SERVER = 'http://localhost:1234'


class WebcamsStore{
   
  constructor(ee){
    this.ee = ee;
    this.webcams=null;
  }
  getWebcamByBbox(nlat,nlng,sLat,sLng){
    axios.get(SERVER + '/webcamByBbox?neLat='+nlat +'&neLng='+nlng+'&swLat='+sLat+'&swLng='+sLng)
      .then((response) => {
        this.webcams = response.data;
        this.ee.emit('WEBCAMS_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  
  getWebcamByContinent(continent){
    axios.get(SERVER + '/webcamByContinent?continent='+continent)
      .then((response) => {
        this.webcams = response.data;
        this.ee.emit('WEBCAMS_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  getWebcamByCountry(country){
    axios.get(SERVER + '/webcamByCountry?country='+country)
      .then((response) => {
        this.webcams = response.data;
        this.ee.emit('WEBCAMS_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  getWebcamByCategory(category){
    axios.get(SERVER + '/webcamByCategory?category='+category)
      .then((response) => {
        this.webcams = response.data;
        this.ee.emit('WEBCAMS_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  getWebcamList(){
    axios.get(SERVER + '/webcamList?limit='+10)
      .then((response) => {
        this.webcams = response.data;
        this.ee.emit('WEBCAMS_LOAD')
      })
      .catch((error) => console.warn(error))
  }


}

export default WebcamsStore;