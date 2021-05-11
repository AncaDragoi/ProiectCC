import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
        userLName : '',
        userFName : '',
        userEmail : '',
        userPassword : '',
        age:'',
        phone:''
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
          <h4>Create an account</h4>
          <form className="form-style-8">
        <input placeHolder="Last name" type="text" name="userLName" onChange={this.handleChange}/>
        <br/>
        <input placeHolder="First name" type="text" name="userFName" onChange={this.handleChange}/>
        <br/>
         <input placeHolder="Email" type="text" name="userEmail" onChange={this.handleChange}/>
        <br/>
         <input placeHolder="Password" type="text" name="userPassword" onChange={this.handleChange}/>
        <br/>
         <input placeHolder="Age" type="text" name="age" onChange={this.handleChange}/>
        <br/>
         <input placeHolder="Phone" type="text" name="phone" onChange={this.handleChange}/>
        <br/>
        <div> <button className="btn btn-primary"  type="button" onClick={() => 
        this.props.onAdd({fname:this.state.userFName, lname:this.state.userFName,email:this.state.userEmail,password:this.state.userPassword, age:this.state.age,phone:this.state.phone })}>
        <i className="fa fa-user-plus"></i>
        Register
        </button>
        </div>
        </form>
      </div>
    );
  }
}
export default Register;