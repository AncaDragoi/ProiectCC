import axios from 'axios'

const SERVER = 'https://tw2017-hypothetical-andrei.c9users.io'

class MessageStore{
  constructor(ee){
    this.ee = ee
    this.content = []
  }
  getAll(authorId){
    axios(SERVER + '/authors/' + authorId + '/messages')
      .then((response) => {
        this.content = response.data
        this.ee.emit('MESSAGE_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(authorId, message){
    axios.post(SERVER + '/authors/' + authorId + '/messages', message)
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
  deleteOne(authorId, messageId){
    axios.delete(SERVER + '/authors/' + authorId + '/messages/' + messageId) 
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
  saveOne(authorId, messageId, message){
    axios.put(SERVER + '/authors/' + authorId + '/messages/' + messageId, message)
      .then(() => this.getAll(authorId))
      .catch((error) => console.warn(error))
  }
}

export default MessageStore




