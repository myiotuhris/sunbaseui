import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";

const Login=()=>{
    const API_URL='https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp'
    const history=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const body={
            login_id : e.target.elements.loginId.value,
            password :e.target.elements.password.value
        }
        axios.post(API_URL,body,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }}).then(res=> {
                localStorage.setItem('token',res.access_token)
            history('/',{ replace: true })
            }).catch(err=>window.alert("Login Failure"))
    }
    return <div>
        <center className={"h2"}>Login Page</center>
        <form onSubmit={handleSubmit}>
            <div className="form-container ms-2 me-2">
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="loginId">Enter Login ID</label>
                        <input name="loginId" type="email" className="form-control" required placeholder={'Login ID'}/>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="password">Enter Password</label>
                        <input name="password" type="password" className="form-control" required placeholder={'Password'}/>
                    </div>
                </div>
                <center>
                    <button className="btn btn-primary mt-3" id="loginBtn" type="submit" >Submit</button>
                </center>
            </div>
        </form>
    </div>
}
export default Login;