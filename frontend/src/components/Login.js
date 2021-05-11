import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userEmail : '',
        userPassword : ''
    };

    this.handleChange = (event) => {
        this.setState({
          [event.target.name] : event.target.value
        })
        console.warn(this.state)
      }
  }


  render() {
    return (
        <div>
        <br/>
        <h4>Login to your account</h4>
        <form className="form-style-8">
       <input placeholder="Email" type="text" name="userEmail" onChange={this.handleChange}/>
        <br/>
        <input placeholder="Password" type="text" name="userPassword" onChange={this.handleChange}/>
        <br/>
        <div> 
          <button 
          className="btn btn-primary" 
          type="button"
          onClick={() => this.props.onLogin({email:this.state.userEmail,password:this.state.userPassword})}>
         <i className="fa fa-sign-in"></i> Login</button></div>
        </form>
      </div>
    );
  }
}
export default Login