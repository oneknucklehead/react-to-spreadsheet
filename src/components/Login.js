import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
const Login = () => {
  const [showLogin, setShowLogin] = useState(true)
  const [showLogout, setShowLogout] = useState(false)
  const [loginDetails, setLoginDetails] = useState({})
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('')
  const [state, setState] = useState('')
  const clientId =
    '897828852205-isjv1j0a9gh1otrid5c73dvs1hnfv46b.apps.googleusercontent.com'

  const loginSuccess = (res) => {
    console.log('Login successful', res.profileObj)
    setLoginDetails(res.profileObj)

    setShowLogout(true)
    setShowLogin(false)
  }
  const loginFailure = (res) => {
    console.log('Login Failure', res)
  }
  const logoutSuccess = (res) => {
    console.log('Logged out successfully', res)
    setLoginDetails({})
    setShowLogout(false)
    setShowLogin(true)
  }
  const formSubmitHandler = (e) => {
    e.preventDefault()
    const data = {
      age: age,
      gender: gender,
      state: state,
    }

    axios.post(`https://sheetdb.io/api/v1/jcmfvgeqsyqk3`, data).then((res) => {
      console.log(res)
      setAge(0)
      setGender('')
      setState('')
    })
  }
  return (
    <div>
      {showLogin ? (
        <GoogleLogin
          clientId={clientId}
          buttonText='Login'
          onSuccess={loginSuccess}
          onFailure={loginFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : null}
      {showLogout ? (
        <>
          <div>Hello {loginDetails.givenName}, Nice to meet you!</div>
          <Form onSubmit={formSubmitHandler}>
            <Form.Group className='mb-3' controlId='Age'>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Your Age'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text> */}
            </Form.Group>

            <Form.Group className='mb-3' controlId='Gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                placeholder='Password'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Click on the dropdown to select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='State'>
              <Form.Label>State of residence</Form.Label>
              <Form.Control
                type='text'
                placeholder='Normal text'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <GoogleLogout
            clientId={clientId}
            buttonText='Logout'
            onLogoutSuccess={logoutSuccess}
          ></GoogleLogout>
        </>
      ) : null}
    </div>
  )
}

export default Login
