import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
function Home(){
    return <div>
        <center className={"h2"}>Customer List</center>
        <table className={"table table-sm"}>
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Address</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
            </tr>
            </thead>

        </table>
    </div>
}