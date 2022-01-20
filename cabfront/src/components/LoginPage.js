import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import pmlAPI from "../api/pmlAPI";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import PasswordField from "material-ui-password-field";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChangePassword from "./ChangePassword";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./Allcss/login.css";
import { fontSize } from "@mui/system";

const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
 const [textwidth , settextwidth]=useState(400)
  const [valid, setvalid] = useState({
    isemail: false,
    ispassword: false,
    btnisdesable: true,
    showpassword: false,
  });


  const matches = useMediaQuery("(max-width:750px)");
useEffect(()=>{

if(matches){
  settextwidth(200)
}


},[matches])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let vard = {
      email: data.get("email"),
      password: data.get("password"),
    };

    await pmlAPI
      .post("/api/login", vard)
      .then((res) => {
        if (res.data.data) {
          localStorage.setItem("userData", JSON.stringify(res.data.data));
          navigate("/");
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              sx={{
                maxWidth:500,
                width:textwidth

              }}
              onChange={(e) => {
                const regex =
                  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                if (!e.target.value || regex.test(e.target.value) === false) {
                  setvalid({
                    ...valid,
                    isemail: true,
                    btnisdesable: true,
                  });
                } else {
                  setvalid({
                    ...valid,
                    isemail: false,
                  });
                }
              }}
            />
            <br></br>
            {valid.isemail ? (
              <>
                <span
                  style={{
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  Enter Valid email{" "}
                </span>{" "}
                <br></br>
              </>
            ) : (
              ""
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={valid.showpassword ? "text" : "password"}
              id="password"
             // autoComplete="current-password"
              onChange={(e) => {
                if (e.target.value.length < 8) {
                  setvalid({
                    ...valid,
                    ispassword: true,
                    btnisdesable: true,
                  });
                } else {
                  setvalid({
                    ...valid,
                    ispassword: false,
                    btnisdesable: false,
                  });
                }
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
            {valid.ispassword ? (
              <>
                <span
                  style={{
                    color: "red",
                    fontSize: "15px",
                  }}
                >
                  {" "}
                  Password Should be least 8 Character{" "}
                </span>{" "}
                <br></br>
              </>
            ) : (
              ""
            )}

            <Button
              id="btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, fontSize: 14, bgcolor: "#3e4166", }}
              disabled={valid.btnisdesable}
            >
              Log In
            </Button>
            <Button
              id="btn_two"
             // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, fontSize: 14, color: "#3e4166", }}
             // disabled={valid.btnisdesable}
            >
              <p>forget password?</p>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </div>
        </div>
    </div>
    </div>
  );
}
