import axios from 'axios'

const SERVER = 'http://localhost:1234'
 var user;

class UserStore{
  constructor(ee){
    this.ee = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/users')
      .then((response) => {
        this.content = response.data
        this.ee.emit('USERS_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(user){
    axios.post(SERVER + '/user', user)
      .then(this.ee.emit('USER_ADDED'))
      .catch((error) => console.warn(error))
  }
  getOne(id){
    axios(SERVER + '/user/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_USER_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  login(user){
    axios.post(SERVER + '/login', user)
      .then((response) => {
          if(response.data.user_id===-1){
            this.ee.emit('LOGIN_FAILED');
          }else{
            this.user=response.data;
            this.ee.emit('LOGIN_SUCCESS'); 
          }
        
      })
      .catch((error) => console.warn(error))
  }

}

export default UserStore




