import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate , Link } from 'react-router-dom';
import './Form.css';

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormData({
      ...formData,
      [name]: value,
    });
  
    // Clear the error for the current field when the user starts typing
    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  
    // Validate the form field as the user types
    const newErrors = findFormErrors();
    console.log('Form Errors:', newErrors); // Log the form errors
    setFormErrors(newErrors);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      // Set formErrors state to display validation errors
      setFormErrors(newErrors);
    } else {
      try {
        // Continue with form submission logic
        const response = await axios.post('http://localhost:3000/user/signup', formData);
        console.log(response.data);
        navigate('/login');
        // Reset validation state after successful submission
        setFormErrors({});
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Handle the conflict error (email already exists)
          console.log('Email already exists:', error.response.data);
          // You can display an error message to the user here
        } else {
          console.log('Other error:', error);
        }
      }
    }
  };

  const findFormErrors = () => {
    const { fullName, email, password } = formData;
    const newErrors = {};

    // name errors
    if (!fullName || fullName === '') newErrors.fullName = 'Name cannot be blank!';
    else if (fullName.length > 30) newErrors.fullName = 'Name is too long!';

    // email errors
    if (!email || email === '') newErrors.email = 'Email cannot be blank!';

    // password errors
    if (!password || password.length > 5) newErrors.password = 'Password must be between 1 and 5 characters!';

    return newErrors;
  };

  return (
    <>
     <Container className='screen'>
      <Form onSubmit={handleSubmit} className="Container">
        
          <h1 className='h1'>Sign Up</h1>
       
        <div className="FormLabel">
        <Form.Label className="FormLabell">Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=" full name eg: John Biden"
            isInvalid={!!formErrors.fullName}
            onChange={handleChange}
            value={formData.fullName}
            name="fullName"
            className="FormControl"
          />
          <Form.Control.Feedback type="invalid" className="FormFeedback">{formErrors.fullName}</Form.Control.Feedback>

        </div>
          
        <div className="FormLabel">
        <Form.Label className="FormLabel">Email Id</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="eg:exampleId@gmail.com"
            isInvalid={!!formErrors.email}
            onChange={handleChange}
            value={formData.email}
            className="FormControl"
            name="email" // Make sure the name attribute is "email"
          />

          <Form.Control.Feedback type="invalid" className="FormFeedback">
            {formErrors.email}
          </Form.Control.Feedback>
        </div>
        
        <div className="FormLabel">
        <Form.Label className="FormLabel">Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Enter the Strong Password"
              isInvalid={!!formErrors.password}
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
              className="FormControl"
            />
            <Form.Control.Feedback type="invalid" className="FormFeedback">
              {formErrors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </div>

        <div className="mb-4 FormCheck">
          <Form.Check
            required
            label="Agree to terms and conditions"
            className="FormCheckInput"
          />
        </div>

        <Button type="submit" className='signIn'>Submit form</Button>
      </Form>
    </Container>

    <div className="link">
    <span style={{fontSize : 27}}>  Already have a account ? <Link to='/login'>  Login </Link> </span>
    </div>
    </>
   
    
  );
}

export default SignIn;
