import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import './Form.css'

function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { userId, token } = req.params;


    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/user/reset-password/${userId}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }
  return (
   <>
   <Container>
 
 <Form  onSubmit={handleSubmit} className="Container">
 <h1 className='h1'>Forgot Password</h1>
     <div className="FormLabel"> 
     <Form.Label className="FormLabel">New Password</Form.Label>

     
      <Form.Control
        required
        type="email"
        placeholder="eg:exampleId@gmail.com"
     
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        className="FormControl"
      />
</div>
  <Button type="submit" className='signIn' OnC>Submit form</Button>
  </Form>
 
 
 </Container>
   
   
   </>
  )
}

export default ResetPassword