import React, { useState, useEffect } from 'react'
import './Allcss/changepsd.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import pmlAPI from '../api/pmlAPI'
import swal from 'sweetalert'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Modal, Form, Container, Row, Col } from 'react-bootstrap'

import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import { styled } from '@mui/system'

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
}

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

export default function ChangePassword() {
  const [data, setdata] = useState({
    oldpsd: '',
    newpsd: '',
  })
  const [valid, setvalid] = useState({
    isoldpasshow: false,
    ispassword: false,
    btnisdesable: true,
    showpassword: false,
  })

  const changepsd = async () => {
    let id = JSON.parse(localStorage.getItem('userData')).id
    await pmlAPI
      .patch(`/api/forgot/${id}`, data)
      .then((res) => {
        console.log(res)
        if (res.data.result) {
          swal({
            title: 'success',
            text: res.data.massage,
            icon: 'success',
          })
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

  return (
    <>
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
                  Change Password
                </Typography>
                <Box
                  //component="form"
                  // onSubmit={changepsd}
                  //noValidate
                  sx={{ mt: 1, paddingLeft: 9, paddingRight: 9 }}
                >
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label=' Old Password'
                    type={valid.isoldpasshow ? 'text' : 'password'}
                    id='password'
                    autoComplete='current-password'
                    onChange={(e) => {
                      setdata({
                        ...data,
                        oldpsd: e.target.value,
                      })
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
                    InputLabelProps={{
                      style: { fontSize: 15, color: 'black' },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position='end'
                          onClick={() => {
                            setvalid({
                              ...valid,
                              isoldpasshow: !valid.isoldpasshow,
                            })
                          }}
                        >
                          {valid.isoldpasshow ? (
                            <VisibilityOffIcon className='iconpassword' />
                          ) : (
                            <VisibilityIcon className='iconpassword' />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br></br>

                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='New Password'
                    type={valid.showpassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='current-password'
                    onChange={(e) => {
                      setdata({
                        ...data,
                        newpsd: e.target.value,
                      })
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

                  <CustomButton
                    id='btn_sin'
                    type='submit'
                    fullWidth
                    variant='contained'
                    onClick={() => {
                      changepsd()
                    }}
                    sx={{
                      mt: 1,
                      mb: 1,
                      fontSize: 14,
                      bgcolor: '#3e4166',
                      width: {
                        xxs: 100,
                        xs: 150,
                        sm: 200,
                        md: 300,
                        lg: 400,
                        xl: 500,
                      },
                    }}
                  >
                    Change Password
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