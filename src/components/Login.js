import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
const Login = () => {
  const statesList = [
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Kolkata',
    'Kochin',
    'Kerala',
    'Mumbai',
    'Delhi',
    'Dehradun',
  ]
  const [showLogin, setShowLogin] = useState(true)
  const [showLogout, setShowLogout] = useState(false)
  const [loginDetails, setLoginDetails] = useState({})
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState('')
  const [state, setState] = useState('')
  const [formErrors, setFormErrors] = useState({
    ageErrorState: false,
    ageError: '',
  })
  const clientId = `${process.env.REACT_APP_CLIENT_ID}`

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
    if (age < 18) {
      setFormErrors({
        ageErrorState: true,
        ageError: 'Sorry - only candidates above 18 years of age are allowed',
      })
    } else {
      setFormErrors({
        ageErrorState: false,
        ageError: '',
      })
      const data = {
        age: age,
        gender: gender,
        state: state,
      }
      axios.post(`${process.env.REACT_APP_SHEET_LINK}`, data).then((res) => {
        console.log(res)
        setAge(0)
        setGender('')
        setState('')
      })
    }
  }

  return (
    <div>
      {showLogin ? (
        <GoogleLogin
          clientId={clientId}
          buttonText='Login to access the functionality '
          onSuccess={loginSuccess}
          onFailure={loginFailure}
          cookiePolicy={'single_host_origin'}
        />
      ) : null}
      {showLogout ? (
        <>
          <div className='container'>
            <Card>
              <Card.Title>
                Hello {loginDetails.givenName}, Nice to meet you!
              </Card.Title>

              <Form onSubmit={formSubmitHandler}>
                <Form.Group className='mb-3' controlId='Age'>
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Your Age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                  {formErrors.ageErrorState && (
                    <Form.Text style={{ color: 'red' }}>
                      {formErrors.ageError}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='Gender'>
                  <Form.Label>Gender:</Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Click on the dropdown to select</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </Form.Select>
                </Form.Group>

                <div>
                  <Form.Label>State:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='State of Residence'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <div className='dropdown'>
                    {statesList
                      .filter((val) => {
                        if (state == '') return val
                        else if (
                          val.toLowerCase().includes(state.toLowerCase())
                        )
                          return val
                      })
                      .map((val, key) => {
                        return (
                          <p
                            key={key}
                            className='dropdownItem'
                            onClick={() => {
                              setState(val)
                              const dropdown =
                                document.getElementsByClassName('dropdown')
                              dropdown[0].style.display = 'none'
                            }}
                          >
                            {val}
                          </p>
                        )
                      })}
                  </div>
                </div>
                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
              <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={logoutSuccess}
              ></GoogleLogout>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Login
