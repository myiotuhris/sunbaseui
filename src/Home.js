import React, {Component, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import {Modal} from "react-bootstrap"
const FormModal=(props)=>{
    const customer= props.customer
    const [state,setState]=useState({
        first_name: customer?.first_name||'',
        last_name: customer?.last_name||'',
        address: customer?.address||'',
        street: customer?.street||'',
        city: customer?.city||'',
        state: customer?.state||'',
        email: customer?.email||'',
        phone: customer?.phone||'',
    })

    const handleChange=(e)=>{
        setState({
            ...state,
            [`${e.target.name}`]: e.target.value,
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(customer) props.callFunction(state,customer.uuid)
        else props.callFunction(state)
        // document.getElementById("customerForm").reset()
    }
    return <Modal show={props.show} onHide={props.toggle}>
        <Modal.Body>
            <form id={"customerForm"}>
                <div className="mb-3 row">
                    <label htmlFor="first_name" className="col-sm-2 col-form-label" onClick={(e)=>console.log(state)}>First Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="first_name"
                               value={state.first_name} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="last_name" className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="last_name"
                               value={state.last_name} onChange={handleChange} required/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="street" className="col-sm-2 col-form-label">Street</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="street"
                               value={state.street} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="address"
                               value={state.address} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="city"
                               value={state.city} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="state" className="col-sm-2 col-form-label">State</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="state"
                               value={state.state} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control-plaintext" name="email"
                               value={state.email} onChange={handleChange}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control-plaintext" name="phone"
                               value={state.phone} onChange={handleChange}/>
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <button className={"btn btn-primary"} onClick={handleSubmit}>Save</button>
        </Modal.Footer>
    </Modal>
}
function Home(){
    const [customers, setCustomers] = useState([]);
    const [selected,setSelected]=useState(null)
    const [showModal,setShowModal]=useState(false)
    const [showEditModal,setShowEditModal]=useState(false)
    const API_URL=" https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp"
    const auth_header={Authorization: `Bearer ${localStorage.getItem('token')}`}
    const getCustomers=()=>{
        axios.get(API_URL,{params:{
            cmd: 'get_customer_list'
            },
        headers:auth_header})
            .then(res=>{
                setCustomers(res.data)
            })
            .catch(err=>window.alert(err.response.data))
    }
    const deleteAction=(customerUUID)=>{
        if (!window.confirm("Do you really want to delete?")) {
            return;
        }
        axios.post(API_URL,null,{params:{
            cmd:'delete',
                uuid:customerUUID
            },
            headers:auth_header
        }).then(res=>{
            window.alert("Customer deleted.")
        })
            .catch(err=>window.alert(err.response.data.trim()))
        getCustomers()
    }
    const addAction=(customerDetails)=>{
        axios.post(API_URL,customerDetails,{
            params:{cmd:'create'},
            headers:auth_header
        }).then(res=>{
            window.alert("Customer added.")
        })
            .catch(err=>window.alert(err.response.data.trim()))
        getCustomers()
    }
    const updateAction=(customerDetails,uuid)=>{
        axios.post(API_URL,customerDetails,{
            params:{cmd:'update',uuid:uuid},
            headers:auth_header
        }).then(res=>{
            window.alert("Customer updated.")
        })
            .catch(err=>window.alert(err.response.data.trim()))
        getCustomers()
    }

    useEffect(()=>{
        getCustomers()
    },[])
    return <div>
        <div className={"container-fluid"}>
            <div className="row">
                {/*<button className="col-1 float-left btn btn-sm btn-danger ms-1 m-auto" onClick={(e)=>localStorage.removeItem('token')} >Logout</button>*/}
                <h2 className="col-9 text-center">Customer List</h2>
                <button className="col float-right btn btn-sm btn-success me-1 m-auto" onClick={(e)=>setShowModal(true)}>Add new customer</button>
            </div>
        </div>
        {/*Add customer modal*/}
        <FormModal show={showModal} callFunction={addAction} toggle={()=>setShowModal(!showModal)}/>
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
            <tbody>
            {/*Update customer details modal*/}
            <FormModal show={showEditModal} key={selected?selected.uuid:-1} customer={selected} callFunction={updateAction} toggle={()=>setShowEditModal(!showEditModal)}/>
            {customers.map((customer,index)=>{
                // console.log(customers)
                return <tr key={index}>
                    <th scope={"row"}>{index+1}</th>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.street}</td>
                    <td>{customer.city}</td>
                    <td>{customer.state}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>

                    <td>
                        <button className={"btn btn-sm btn-primary"} onClick={(e)=> {
                            setSelected(customer)
                            setShowEditModal(true)
                        }}>Edit</button>
                        <button className={"btn btn-sm btn-danger ms-1"} onClick={(e)=>deleteAction(customer.uuid)}>
                            Delete</button>
                    </td>
                </tr>

            })}
            </tbody>
        </table>
    </div>
}
export default Home;