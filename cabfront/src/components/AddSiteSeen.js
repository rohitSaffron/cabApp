import React from "react";
import {
  Grid,
  Box,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

/// coustom Button
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const gridStyle = {
  textAlign: "center",
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

export default function AddSiteSeen() {
  return (
    <>
      <br></br>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <Grid item xs={12} sx={gridStyle}>
            <FormControl sx={fromControlstylr}>
              <InputLabel sx={{ fontSize: 15 }} id="StateName">
                State
              </InputLabel>
              <Select
                labelId="StateName"
                id="StateName"
                name="statename"
                sx={fromControlstylr}
                InputLabelProps={{
                  style: { fontSize: 15, color: "black" },
                }}
                label="State "
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={gridStyle}>
            
            <Grid item xs={12}>
              <label style={{
                  fontSize:'18px'
              }}> State Image</label>
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="stateimg"
                name="stateimg"
                type="file"
                accept="image/png, image/gif, image/jpeg"
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
              />
            </Grid>
          </Grid>



          <Grid item xs={12} sx={gridStyle}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
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
            />
          </Grid>
          <Grid item xs={12} sx={gridStyle}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
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
            />
          </Grid>
          <Grid item xs={12} sx={gridStyle}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="type"
              label="Type"
              name="type"
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
            />
          </Grid>

          <Grid item xs={12} sx={gridStyle}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
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
            />
          </Grid>
         <Grid item xs={12} sx={gridStyle}>
            
            <Grid item xs={12}>
              <label style={{
                  fontSize:'18px'
              }}> Featured Image</label>
            </Grid>
            <Grid item xs={12} sx={gridStyle}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="featuredimg"
                name="featuredimg"
                type="file"
                accept="image/png, image/gif, image/jpeg"
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
              />
            </Grid>
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
            >
              Add Site Seen
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
