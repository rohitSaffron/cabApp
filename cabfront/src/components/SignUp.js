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
import axios from 'axios'
import pmlAPI from '../api/pmlAPI'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import date from 'date-and-time'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import { Modal, Form, Container, Row, Col } from 'react-bootstrap'

import './Allcss/signUp.css'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'

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
export default function SignUp() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [forrefresh, setforrefresh] = useState()
  const [loading, setloading] = useState(false)
  const [localverify, setlocalverify] = useState({
    otp: '',
    time: '',
  })
  const [verify, setverify] = useState()
  const [showerr, setshowerr] = useState(false)
  const [userdata, setuserdata] = useState([])
  const [valid, setvalid] = useState({
    isemail: false,
    ispassword: false,
    isphone: false,
    btnisdesable: true,
    showpassword: false,
  })

  const handleSubmit = async (event) => {
    setloading(true)

    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    let ValueDta = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      password: data.get('password'),
    }
    setuserdata(ValueDta)

    await pmlAPI
      .post('/api/register', ValueDta)
      .then((res) => {
        if (res.data.result && res.data.Opt) {
          setlocalverify({
            ...localverify,
            otp: res.data.Opt,
            time: res.data.currentDate,
          })
          swal({
            title: 'Otp Sent',
            text: res.data.massage,
            icon: 'success',
          })
          setShow(true)
        } else {
          setloading(false)

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

  const handleClose = async () => {
    swal({
      title: 'warning',
      text: 'For Any Technical Eror Plz Contact Us',
      icon: 'warning',
    })

    setShow(false)
    setloading(false)
  }

  const handleCheckOtp = async () => {
    let id = JSON.parse(localStorage.getItem('userData')).id

    const now = new Date()
    let currentDatefront = date.format(now, 'YYYY/MM/DD HH:mm:ss')

    var t1 = new Date(currentDatefront)
    var t2 = new Date(localverify.time)
    var dif = t1.getTime() - t2.getTime()

    var Seconds_from_T1_to_T2 = dif / 1000 / 60
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2)
    let convertinnumber = parseInt(Seconds_Between_Dates)

    if (verify == localverify.otp) {
      if (convertinnumber < 20000) {
        console.log(localverify)
        console.log({ userdata })
        console.log(typeof convertinnumber)

        let ValueDta = {
          name: userdata.name,
          email: userdata.email,
          phone: userdata.phone,
          password: userdata.password,
          status: 'verified',
        }

        await pmlAPI
          .post(`/api/verify/${id}`, ValueDta)
          .then((res) => {
            console.log(res.data)

            if (res.data.result && res.data.data) {
              swal({
                title: 'success',
                text: res.data.massage,
                icon: 'success',
              })
              setlocalverify([])
              setshowerr(false)
              localStorage.setItem('userData', JSON.stringify(res.data.data))

              setShow(false)
              setloading(false)
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
            swal({
              title: 'Error',
              text: ' Please Check your internet ',
              icon: 'error',
              dangerMode: true,
            })
          })
      } else {
        console.log('dsadsfasfsdfasdf')
        swal({
          title: 'error',
          text: 'Otp Expire ',
          icon: 'error',
        })
      }
    } else {
      setshowerr(true)
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className='modaltitle'>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modalbody'>
            {showerr ? (
              <label className='modalbtninvalid'> Invalid OTP </label>
            ) : (
              <label className='modalbtn'> Verify OTP</label>
            )}

            <input
              type='text'
              id='verifyotp'
              name='verifyotp'
              className='modalinput'
              onChange={(e) => {
                setverify(e.target.value)
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              handleClose()
            }}
          >
            <h4>Close</h4>
          </Button>
          <Button variant='primary' onClick={() => handleCheckOtp()}>
            <h4>Verify</h4>
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
                  Sign Up
                </Typography>
                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    mt: 1,
                    paddingLeft: 9,
                    paddingRight: 9,
                  }}
                  justifyContent='center'
                  alignItems='center'
                >
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label=' Full Name'
                    name='name'
                    autoComplete='name'
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
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
                  />
                  <br></br>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
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
                    id='phone'
                    label='Phone No.'
                    name='phone'
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
                    autoFocus
                    onChange={(e) => {
                      var re =
                        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                      if (!re.test(e.target.value)) {
                        setvalid({
                          ...valid,
                          isphone: true,
                        })
                      } else {
                        setvalid({
                          ...valid,
                          isphone: false,
                        })
                      }
                    }}
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
                  />
                  <br></br>
                  {valid.isphone ? (
                    <>
                      <span
                        style={{
                          color: 'red',
                          fontSize: '15px',
                        }}
                      >
                        {' '}
                        Phone No. is Incorrect formate{' '}
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
                    autoComplete='current-password'
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
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
                    id='btn_sin'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 1, mb: 1, fontSize: 14, bgcolor:valid.btnisdesable ? "red" :  '#3e4166'  }}
                    disabled={valid.btnisdesable}
                  >
                    {loading ? 'Loading ........' : 'Sign Up'}
                  </Button> */}

                  <CustomButton
                    id='btn_sin'
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
                    {loading ? 'Loading ........' : 'Sign Up'}{' '}
                  </CustomButton>
                </Box>
              </Box>
            </Col>
            <Col sm={3}></Col>
          </Row>
        </Container>
      </div>
    </>
  )
}