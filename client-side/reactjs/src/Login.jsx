import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import { useNavigate , Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [token , setToken] = useState( '')
  const [formErrors, setFormErrors] = useState({});

  const handleChange =   (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

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
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      console.log('FormData:', formData);
      const response = await axios.post('http://localhost:3000/user/login', formData);
      console.log(response.data);
  
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
  
      // Navigate to the home page
      navigate('/contact');
      setValidated(true);
    } catch (error) {
      console.log(error);
    }
  }
};
const findFormErrors = () => {
  const { email, password } = formData;
  const newErrors = {};

  // name errors
  
  // email errors
  if (!email || email === '') newErrors.email = 'Email cannot be blank!';

  // password errors
  if (!password || password.length > 5) newErrors.password = 'Enter the Correct Password';

  return newErrors;
};
  

  return (
    <>
    <Container>
    <Form  onSubmit={handleSubmit} className="Container">
   
    <h1 className='h1'>Login</h1>
       
    <div className="FormLabel">
    <Form.Label className="FormLabel">Email ID</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="eg:exampleId@gmail.com"
          isInvalid={!!formErrors.email}
          onChange={handleChange}
          value={formData.email}
          name="email"
          className="FormControl"
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
           className="FormControl"
           required
          />
          <Form.Control.Feedback type="invalid" className="FormFeedback">
          {formErrors.password}
          </Form.Control.Feedback>
        </InputGroup> </div>
        <Link to="/forgotPassword">Forgot Password</Link>

    
  
  
    <Button type="submit" className='signIn'>Submit form</Button>
    <br />
    <br />
    
  </Form>
 
    </Container>

    <div className="link">
    <p style={{fontSize : 27}}>  Create have a account ? <Link to='/signup'>  Sign Up</Link> </p>
    </div>
  
    
    </>
  )
}

export default Login