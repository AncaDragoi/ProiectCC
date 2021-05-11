import React, { Component } from 'react'
import '../styles/App.css'
import Login from './login_register/Login';
import UserStore from '../store/UserStore';
import { fail } from 'assert';
import Register from './login_register/Register';
import {EventEmitter} from 'fbemitter'
import { Button } from 'react-bootstrap';
import Main from './main/Main';

const ee = new EventEmitter()
const store = new UserStore(ee)
function addUser(user){
  store.addOne(user);
}
function retainUser(user){
  store.login(user);
}
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
     isLoggedIn:1,
     user:{}
    }

    this.register=this.register.bind(this);
  }

  componentDidMount(){
    ee.addListener('USER_ADDED', () => {
      this.setState({
        isLoggedIn:1,
        user:{}
      })
    })

    ee.addListener('LOGIN_SUCCESS', () => {
      this.setState({
        isLoggedIn:2,
        user:store.user
      })
    })

    ee.addListener('LOGIN_FAILED', () => {
     alert('Login failed! Please try again!');
    })
  }

  register(){
    this.setState({
      isLoggedIn:0,
      user:{}
    })
  }
  render() {
    if(this.state.isLoggedIn===2 && this.state.user !== undefined){
      return(
        <div className="App">
        <header className="App-header">
        <h1>Hello and welcome to our travel app!</h1>
        <h4>Here you can write your stories or see live images of places.</h4>
        <h4>Have fun!</h4>
        <h4>For any feedback please contact us at wwwhotspot@gmail.com</h4>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </header>
        <br/>
        <br/>
        <div><Main user={this.state.user}/> </div>
        </div>
      )   
    }else if(this.state.isLoggedIn===1){
      return(
        <div className="App">
        <header className="App-header">
        <div><Login onLogin={retainUser}/></div>
      
        <br/>
        <div>I want to sign up!</div>
        <button className="btn btn-primary" onClick={this.register}>Sign up!</button>
        </header>
        <br/>
        <br/>
        <div><Main user={this.state.user}/> </div>

        </div>
      )
    }else{
    return (
      <div className="App">
        <header className="App-header">
        <Register onAdd={addUser}/>

        </header>
        <br/>
        <br/>
        <div><Main user={this.state.user}/> </div>
      </div>
    )
  }
  }
}

export default App
