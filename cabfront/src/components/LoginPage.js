import React, { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import pmlAPI from '../api/pmlAPI'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import PasswordField from 'material-ui-password-field'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ChangePassword from './ChangePassword'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Modal, Form, Container, Row, Col } from 'react-bootstrap'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'

import './Allcss/login.css'
import { fontSize } from '@mui/system'
import { red } from '@mui/material/colors'

const theme = createTheme()

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
}

const CustomButtonRoot = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />
}
export default function LoginPage() {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    email: '',
    password: '',
  })

  const [modalone, setmodalone] = useState(false)
  const [modaltwo, setmodaltwo] = useState(false)
  const [modalthree, setmodalthree] = useState(false)
  const [loading, setloading] = useState(false)
  const [forgotdata, setforgotdata] = useState({
    email: '',
    otp: '',
    id: '',
    verifyotp: '',
    showpassword: false,
    newshowpassword: false,
    oldpsd: '',
    newpsd: '',
  })
  const [textwidth, settextwidth] = useState(400)
  const [valid, setvalid] = useState({
    isemail: false,
    ispassword: false,
    btnisdesable: true,
    showpassword: false,
  })

  const matches = useMediaQuery('(max-width:750px)')
  useEffect(() => {
    if (matches) {
      settextwidth(200)
    }
  }, [matches])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let vard = {
      email: data.get('email'),
      password: data.get('password'),
    }

    await pmlAPI
      .post('/api/login', vard)
      .then((res) => {
        if (res.data.data) {
          localStorage.setItem('userData', JSON.stringify(res.data.data))
          navigate('/')
        } else {
          swal({
            title: 'Error',
            text: res.data.massage,
            icon: 'error',
            dangerMode: true,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const sendotp = async () => {
    setloading(true)
    await pmlAPI
      .post('/forgotpassword', forgotdata)
      .then((res) => {
        if (res.data.result) {
          setforgotdata({
            ...forgotdata,
            otp: res.data.Opt,
            id: res.data.id,
          })
          swal({
            title: 'Success',
            text: res.data.massage,
            icon: 'success',
          })
          setmodalone(false)
          setmodaltwo(true)
          setloading(false)
        } else {
          swal({
            title: 'Error',
            text: res.data.massage,
            icon: 'error',
            dangerMode: true,
          })
          setloading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        swal({
          title: 'Error',
          text: 'Something Went Wrong',
          icon: 'error',
          dangerMode: true,
        })
        setloading(false)
      })
  }

  const forgotpassword = async () => {
    setloading(true)
    let id = forgotdata.id

    let values = {
      email: forgotdata.email,
      newpsd: forgotdata.newpsd,
    }

    await pmlAPI
      .patch(`/api/forgotpass/${id}`, values)
      .then((res) => {
        console.log(res)
        if (res.data.result) {
          swal({
            title: 'success',
            text: res.data.massage,
            icon: 'success',
          })
          setloading(false)
          setmodalthree(false)
          setmodaltwo(false)
          setmodalone(false)
        } else {
          swal({
            title: 'Error',
            text: res.data.massage,
            icon: 'error',
            dangerMode: true,
          })
          setloading(false)
        }
      })
      .catch((err) => {
        console.log(err)
        swal({
          title: 'Error',
          text: 'Something Went Wrong plz Check Internet Connection',
          icon: 'error',
          dangerMode: true,
        })
        setloading(false)
      })
  }

  const handleClose = () => {
    setmodalone(false)
  }
  const handleClosetwo = () => {
    setmodaltwo(false)
  }

  const handleClosethree = () => {
    setmodalthree(false)
  }

  const verfyotpbtn = () => {
    setloading(true)

    if (Number(forgotdata.verifyotp) == Number(forgotdata.otp)) {
      swal({
        title: 'Success',
        text: 'Verefication SuccessFull You can change Password now',
        icon: 'success',
        dangerMode: true,
      })
      setloading(false)
      setmodalthree(true)
    } else {
      swal({
        title: 'Error',
        text: 'Otp Does Not Match',
        icon: 'error',
        dangerMode: true,
      })
      setloading(false)
    }
  }

  useEffect(()=>{
  



    
  },[])
  return (
    <>
      <Modal
        show={modalone}
        backdrop='static'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title className='modaltitle'>
            Enter Registered email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={forgotdata.email}
            className='formcss'
            onChange={(e) => {
              setforgotdata({
                ...forgotdata,
                email: e.target.value,
              })
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}
            sx={{
              fontSize: 16,
              color: 'red',
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => sendotp()}
            sx={{
              fontSize: 16,
              color: 'blue',
            }}
            disabled={loading}
          >
            {loading ? 'loading...' : 'Send OTP'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modaltwo}
        backdrop='static'
        backdrop='static'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title className='modaltitle'> Enter Otp </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type='text'
            placeholder='Enter Otp'
            className='formcss'
            onChange={(e) => {
              setforgotdata({
                ...forgotdata,
                verifyotp: e.target.value,
              })
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClosetwo}
            sx={{
              fontSize: 16,
              color: 'red',
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => verfyotpbtn()}
            sx={{
              fontSize: 16,
              color: 'blue',
            }}
            disabled={loading}
          >
            {loading ? 'Verifing Otp...' : 'Verfy Otp'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalthree}
        backdrop='static'
        backdrop='static'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title className='modaltitle'> Enter Otp </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <lable className='psdchange'>New password</lable>
          <br></br>
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type={forgotdata.newshowpassword ? 'text' : 'password'}
            id='password'
            required
            sx={{
              maxWidth: 400,
            }}
            InputLabelProps={{
              style: { fontSize: 17 },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position='end'
                  onClick={() => {
                    setforgotdata({
                      ...forgotdata,
                      newshowpassword: !forgotdata.newshowpassword,
                    })
                  }}
                >
                  {forgotdata.newshowpassword ? (
                    <VisibilityOffIcon className='iconpassword' />
                  ) : (
                    <VisibilityIcon className='iconpassword' />
                  )}
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setforgotdata({
                ...forgotdata,
                newpsd: e.target.value,
              })
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClosethree}
            sx={{
              fontSize: 16,
              color: 'red',
            }}
          >
            Close
          </Button>
          <Button
            variant='primary'
            sx={{
              fontSize: 16,
              color: 'blue',
            }}
            disabled={loading}
            onClick={() => forgotpassword()}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='divLogin'>
        <Container>
          <Row>
            <Col sm={3}></Col>
            <Col sm={6} className='colloginform'>
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  className='jass10'
                  sx={{
                    m: 0,
                    bgcolor: '#3e4166',
                    width: '55px',
                    height: '55px',
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h3'>
                  Log In
                </Typography>
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    mt: 1,
                    paddingLeft: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    type='email'
                    required
                    sx={{
                      width: {
                        xxs: 100,
                        xs: 150,
                        sm: 200,
                        md: 300,
                        lg: 400,
                        xl: 500,
                      },
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
                    onChange={(e) => {
                      const regex =
                        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

                      if (
                        !e.target.value ||
                        regex.test(e.target.value) === false
                      ) {
                        setvalid({
                          ...valid,
                          isemail: true,
                          btnisdesable: true,
                        })
                      } else {
                        setvalid({
                          ...valid,
                          isemail: false,
                        })
                      }
                    }}
                    InputLabelProps={{
                      style: {
                        width: '-webkit-fill-available',
                      },
                    }}
                  />
                  <br></br>
                  {valid.isemail ? (
                    <>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '15px',
                        }}
                      >
                        {' '}
                        Enter Valid email{' '}
                      </span>{' '}
                      <br></br>
                    </>
                  ) : (
                    ''
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type={valid.showpassword ? 'text' : 'password'}
                    id='password'
                    // autoComplete="current-password"
                    onChange={(e) => {
                      if (e.target.value.length < 8) {
                        setvalid({
                          ...valid,
                          ispassword: true,
                          btnisdesable: true,
                        })
                      } else {
                        setvalid({
                          ...valid,
                          ispassword: false,
                          btnisdesable: false,
                        })
                      }
                    }}
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
                    required
                    sx={{
                      width: {
                        xxs: 100,
                        xs: 150,
                        sm: 200,
                        md: 300,
                        lg: 400,
                        xl: 500,
                      },
                    }}
                    InputProps={{
                      style: {
                        width: '-webkit-fill-available',
                      },

                      endAdornment: (
                        <InputAdornment
                          position='end'
                          onClick={() => {
                            setvalid({
                              ...valid,
                              showpassword: !valid.showpassword,
                            })
                          }}
                        >
                          {valid.showpassword ? (
                            <VisibilityOffIcon className='iconpassword' />
                          ) : (
                            <VisibilityIcon className='iconpassword' />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br></br>
                  {valid.ispassword ? (
                    <>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '15px',
                        }}
                      >
                        {' '}
                        Password Should be least 8 Character{' '}
                      </span>{' '}
                      <br></br>
                    </>
                  ) : (
                    ''
                  )}

                  {/* <Button
                    id="btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1, fontSize: 14, bgcolor: "#3e4166" }}
                    disabled={valid.btnisdesable}
                  >
                    Log In
                  </Button> */}

                  <CustomButton
                    id='btn'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 1,
                      mb: 1,
                      fontSize: 14,
                      bgcolor: valid.btnisdesable ? 'red' : '#3e4166',
                      width: {
                        xxs: 100,
                        xs: 150,
                        sm: 200,
                        md: 300,
                        lg: 400,
                        xl: 500,
                      },
                    }}
                    disabled={valid.btnisdesable}
                  >
                    Log In
                  </CustomButton>
                  <br></br>

                  {/* <Button
                    id="btn_two"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1, fontSize: 14, color: "#3e4166" }}
                    onClick={() => setmodalone(true)}
                  >
                    <p>forget password?</p>
                  </Button> */}
                  <CustomButton
                    id='btn'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 1,
                      mb: 1,
                      fontSize: 14,
                      color: '#3e4166',
                      bgcolor: 'white',
                      width: {
                        xxs: 100,
                        xs: 150,
                        sm: 200,
                        md: 300,
                        lg: 400,
                        xl: 500,
                      },
                    }}
                    onClick={() => setmodalone(true)}
                  >
                    <p>forget password?</p>
                  </CustomButton>
                </Box>
              </Box>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </Container>
      </div>

      {/* <div className="fullPart row">
        <div className="firstPart col-sm-7">
          <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-437061,resizemode-1,msid-78201700/wealth/spend/planning-a-holiday-in-next-few-months-avail-these-discounts-on-flights-hotels-travel-packages-now.jpg"></img>
        </div>
        <div className="secondPart col-sm-5">
          <div className="row">
            <div className="jass9 col-sm-12">
              <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                 
                </Container>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}