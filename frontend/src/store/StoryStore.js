import axios from 'axios'

const SERVER = 'http://localhost:1234'

class StoryStore{
  constructor(ee){
    this.ee = ee
    this.stories=null;
  }

  addOnePlace(place){
    axios.post(SERVER + '/place', place)
      .then(this.ee.emit('PLACE_ADDED'))
      .catch((error) => console.warn(error))
  }

  addOneStory(story){
    axios.post(SERVER + '/story', story)
      .then(this.ee.emit('STORY_ADDED'))
      .catch((error) => console.warn(error))
  }

  getAllStories(){
    axios(SERVER + '/stories')
      .then((response) => {
        this.stories = response.data
        this.ee.emit('STORIES_LOAD')
      })
      .catch((error) => console.warn(error))
  }

  updateStoryLike(id,story){
    axios.put(SERVER + '/story/'+id,story)
    .then(this.ee.emit('STORY_MOD'))
    .catch((error) => console.warn(error))
  }

  updateStoryDislike(id){
    axios.put(SERVER + '/story/'+id)
    .then(this.ee.emit('STORY_MOD'))
    .catch((error) => console.warn(error))
  }
}

export default StoryStore;




