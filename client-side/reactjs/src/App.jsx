import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  HashRouter as Router, Route, Routes  } from "react-router-dom"
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'
import SignIn from './SignIn'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
      <Route path ="/" exact Component={SignIn} ></Route>
              <Route path ="/login" exact Component={Login} ></Route> 
      <Route path="/forgotPassword" element={<ForgetPassword />}></Route>
      <Route path="/reset_password/:userId/:token" element={<ResetPassword />}></Route>
      </Routes>
   
    </Router>
    
    </>
  )
}

export default App
