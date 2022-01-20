import React, { useState, useEffect } from "react";
import "./Allcss/changepsd.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";





const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

const theme = createTheme();
export default function ChangePassword() {

  const [data, setdata] = useState({
    oldpsd: "",
    newpsd: "",
  });
  const [valid, setvalid] = useState({
    isoldpasshow: false,
    ispassword: false,
    btnisdesable: true,
    showpassword: false,
  });

  const changepsd = async () => {

   
    
    let id = JSON.parse(localStorage.getItem("userData")).id;
    await pmlAPI
      .patch(`/api/forgot/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          swal({
            title: "success",
            text: res.data.massage,
            icon: "success",
          });
        } else {
          swal({
            title: "Error",
            text: res.data.massage,
            icon: "error",
            dangerMode: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>

<div className="fullPart row">
      <div className="firstPart col-sm-7">
        <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-437061,resizemode-1,msid-78201700/wealth/spend/planning-a-holiday-in-next-few-months-avail-these-discounts-on-flights-hotels-travel-packages-now.jpg"></img>
      </div>
      <div className="secondPart col-sm-5">
        <div className="row">
        <div className="jass9 col-sm-12">
        <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="jass10" sx={{ m: 0, bgcolor: "#3e4166", width: "55px", height: "55px"}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
           Change Password
          </Typography>
          <Box
            //component="form"
           // onSubmit={changepsd}
            //noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label=" Old Password"
              type={valid.isoldpasshow ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setdata({
                  ...data,
                  oldpsd: e.target.value,
                });
              }}
              required
              sx={{
                maxWidth:500

              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setvalid({
                        ...valid,
                        isoldpasshow: !valid.isoldpasshow,
                      });
                    }}
                  >
                    {valid.isoldpasshow ? (
                      <VisibilityOffIcon className="iconpassword" />
                    ) : (
                      <VisibilityIcon className="iconpassword" />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <br></br>
            
           
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type={valid.showpassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setdata({
                  ...data,
                  newpsd: e.target.value,
                });
              }}
              required
              sx={{
                maxWidth:500

              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => {
                      setvalid({
                        ...valid,
                        showpassword: !valid.showpassword,
                      });
                    }}
                  >
                    {valid.showpassword ? (
                      <VisibilityOffIcon className="iconpassword" />
                    ) : (
                      <VisibilityIcon className="iconpassword" />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <br></br>
          

            <Button
              id="btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, fontSize: 14, bgcolor: "#3e4166", }}
              onClick={()=>{changepsd()}}
            >
              Change Password
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </div>
        </div>
    </div>
    </div>
     
    </>
  );
}
