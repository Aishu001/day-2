import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Form.css'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


function ForgetPassword() {
    const [email, setEmail] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
     
        e.preventDefault()
        axios.post('http://localhost:3000/missed/forgotpassword', { email }, { withCredentials: true })
        .then(res => {
            if (res.data.Status === "Success") {
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    }
  return (
   <>
   <Container>
 
   <Form  onSubmit={handleSubmit} className="Container">
   <h1 className='h1'>Forgot Password</h1>
       <div className="FormLabel"> 
       <Form.Label className="FormLabel">Email ID</Form.Label>

       
        <Form.Control
          required
          type="email"
          placeholder="eg:exampleId@gmail.com"
       
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="FormControl"
        />
 </div>
    <Button type="submit" className='signIn' >Submit </Button>
    </Form>
   
   
   </Container>

   
    
   
   </>
  )
}

export default ForgetPassword

