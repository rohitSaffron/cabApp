import React, { useState ,useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  StateDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";

import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import indianCitiesDatabase from "indian-cities-database";

const gridStyle = {
  textAlign: "center",
  paddingLeft: 2,
  paddingRight: 2,
};
const fromControlstylr = {
  width: {
    xxs: 100,
    xs: 150,
    sm: 200,
    md: 300,
    lg: 400,
    xl: 500,
  },
};

const theme = createTheme();
const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButtonRoot = styled("button")`
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
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}



const CabCreationForm = ({ setCabCreation }) => {
  const navigate = useNavigate();
  const [loading , setloading]=useState(false)
  const citess = indianCitiesDatabase.cities;
  const [citeies , setciteies]=useState([])
  const [cabData, setcabData] = useState({
    userId: JSON.parse(localStorage.getItem("userData")).id,
    carModel: "",
    luggage: "",
    seats: "",
    price: "",
    cabImage: "",
    region: "",
    city:''
  });

  let allstate = [
    {
      abbreviation: "AN",
      name: "Andaman and Nicobar Islands",
    },
    {
      abbreviation: "AP",
      name: "Andhra Pradesh",
    },
    {
      abbreviation: "AR",
      name: "Arunachal Pradesh",
    },
    {
      abbreviation: "AS",
      name: "Assam",
    },
    {
      abbreviation: "BR",
      name: "Bihar",
    },
    {
      abbreviation: "CG",
      name: "Chandigarh",
    },
    {
      abbreviation: "CH",
      name: "Chhattisgarh",
    },
    {
      abbreviation: "DH",
      name: "Dadra and Nagar Haveli",
    },
    {
      abbreviation: "DD",
      name: "Daman and Diu",
    },
    {
      abbreviation: "DL",
      name: "Delhi",
    },
    {
      abbreviation: "GA",
      name: "Goa",
    },
    {
      abbreviation: "GJ",
      name: "Gujarat",
    },
    {
      abbreviation: "HR",
      name: "Haryana",
    },
    {
      abbreviation: "HP",
      name: "Himachal Pradesh",
    },
    {
      abbreviation: "JK",
      name: "Jammu and Kashmir",
    },
    {
      abbreviation: "JH",
      name: "Jharkhand",
    },
    {
      abbreviation: "KA",
      name: "Karnataka",
    },
    {
      abbreviation: "KL",
      name: "Kerala",
    },
    {
      abbreviation: "LD",
      name: "Lakshadweep",
    },
    {
      abbreviation: "MP",
      name: "Madhya Pradesh",
    },
    {
      abbreviation: "MH",
      name: "Maharashtra",
    },
    {
      abbreviation: "MN",
      name: "Manipur",
    },
    {
      abbreviation: "ML",
      name: "Meghalaya",
    },
    {
      abbreviation: "MZ",
      name: "Mizoram",
    },
    {
      abbreviation: "NL",
      name: "Nagaland",
    },
    {
      abbreviation: "OR",
      name: "Odisha",
    },
    {
      abbreviation: "PY",
      name: "Puducherry",
    },
    {
      abbreviation: "PB",
      name: "Punjab",
    },
    {
      abbreviation: "RJ",
      name: "Rajasthan",
    },
    {
      abbreviation: "SK",
      name: "Sikkim",
    },
    {
      abbreviation: "TN",
      name: "Tamil Nadu",
    },
    {
      abbreviation: "TS",
      name: "Telangana",
    },
    {
      abbreviation: "TR",
      name: "Tripura",
    },
    {
      abbreviation: "UP",
      name: "Uttar Pradesh",
    },
    {
      abbreviation: "UK",
      name: "Uttarakhand",
    },
    {
      abbreviation: "WB",
      name: "West Bengal",
    },
  ];


  useEffect(() => {

    

    let data = citess?.filter((w)=>{
      return w.state == cabData?.region
    })


    setciteies(data)
   
  }, [cabData]);
  

  const handleCabFormSubmit = async (e) => {
   
    setloading(true)
    

    console.log(cabData);

    await pmlAPI
      .post(`/api/addCab`, cabData)
      .then((res) => {
        if (res?.data) {
          swal({
            title: "Success",
            text: res.data.massage,
            icon: "success",
          });
          setloading(false)
          navigate("/dashboard/allcabs");
        } else {
          swal({
            title: "Error",
            text: res.data.massage,
            icon: "error",
            dangerMode: true,
          });
          setloading(false)
        }

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
          dangerMode: true,
        });
        setloading(false)
      });

    setCabCreation(false);
  };

  

  return (
    <>
      <br></br>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              paddingTop: 3,
              paddingBottom: 3,
            }}
          >
            <Grid item xs={12} sx={gridStyle}>
              <FormControl sx={fromControlstylr}>
                <InputLabel sx={{ fontSize: 15 }} id="StateName">
                  Region
                </InputLabel>
                <Select
                  labelId="StateName"
                  id="StateName"
                  name="statename"
                  value={cabData.region}
                  sx={fromControlstylr}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "black" },
                  }}
                  label="State "
                  onChange={(e)=>{
                    setcabData({
                      ...cabData,
                      region: e.target.value,
                    });
                  }}
                >
                  {allstate?.map((w) => {
                    return (
                      <MenuItem sx={{ fontSize: 13 }} value={w.name}>
                        {w.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <FormControl sx={fromControlstylr}>
                <InputLabel sx={{ fontSize: 15 }} id="StateName">
                  City 
                </InputLabel>
                <Select
                  labelId="StateName"
                  id="StateName"
                  name="statename"
                  value={cabData.city}
                  sx={fromControlstylr}
                  InputLabelProps={{
                    style: { fontSize: 15, color: "black" },
                  }}
                  label="State "
                  onChange={(e)=>{
                    setcabData({
                      ...cabData,
                      city: e.target.value,
                    });
                  }}
                >
                  {citeies?.map((w) => {
                    return (
                      <MenuItem sx={{ fontSize: 13 }} value={`${w.city}  ${w.state}`}>
                        {w.city}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="carModel"
                name="carModel"
                label="Car model..."
                type="url"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setcabData({
                    ...cabData,
                    carModel: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                type='number'
                id="carLuggage"
                label="Luggage space"
                name="carLuggage"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setcabData({
                    ...cabData,
                    luggage: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="carSeats"
                label="Available seats"
                name="carSeats"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setcabData({
                    ...cabData,
                    seats: e.target.value,
                  });
                }}
              />
            </Grid>


            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price per KM"
                name="price"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setcabData({
                    ...cabData,
                    price: e.target.value,
                  });
                }}
              />
            </Grid>



            
            
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="carImage"
                name="carImage"
                label=" Car image URL "
                type="url"
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
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
                onChange={(e) => {
                  setcabData({
                    ...cabData,
                    cabImage: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} sx={gridStyle}>
              <CustomButton
                id="btn_sin"
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 1,
                  fontSize: 14,
                  bgcolor: "#3e4166",
                  width: {
                    xxs: 100,
                    xs: 150,
                    sm: 200,
                    md: 300,
                    lg: 400,
                    xl: 500,
                  },
                }}
                onClick={() => {
                 handleCabFormSubmit();
                 
                }}
              >
               {loading ? 'Loading...': ' Add Site Seen'}
              </CustomButton>
            </Grid>

            
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CabCreationForm;
