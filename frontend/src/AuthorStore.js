import axios from 'axios'

const SERVER = 'https://tw2017-hypothetical-andrei.c9users.io'

class AuthorStore{
  constructor(ee){
    this.ee = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/authors')
      .then((response) => {
        this.content = response.data
        this.ee.emit('AUTHOR_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(author){
    axios.post(SERVER + '/authors', author)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/authors/' + id) 
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, author){
    axios.put(SERVER + '/authors/' + id, author)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(id){
    axios(SERVER + '/authors/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_AUTHOR_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default AuthorStore




