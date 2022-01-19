import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import "./Allcss/header.css";
import { Drawer, ListItem, Divider, List, ListItemText } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Header = () => {
  const navigate = useNavigate();
  const [key, setkey] = useState("");
  const [userdata, setuserData] = useState("");
  const [refresh, setrefresh] = useState("hiiii");
  const matches = useMediaQuery("(max-width:700px)");
  const [drawerOpen, setdrawer] = useState(false);

  const vvvv = localStorage.getItem("userData");
  const ggg = vvvv;
  const jsonnn = JSON.parse(ggg);

  const setDrawerOpen = (isDrawerOpen) => {
    setdrawer({
      drawerOpen: isDrawerOpen,
    });
  };

  const toggleDrawer = () => {
    setdrawer(!drawerOpen);
  };

  return (
    <>
      {matches ? (
        <>
          <div className="header">
            <div className="header__container">
              <img
                src="/assets/logo.png"
                alt=""
                className="header__logo"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="header__container inside">
              <ul className="header__navlist">
                <li>
                  <Link to="#">
                    <MenuIcon
                      className="svg_icons"
                      onClick={() => {
                        toggleDrawer();
                      }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Drawer anchor="right" openSecondary={true} open={drawerOpen}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
              component="nav"
              aria-label="mailbox folders"
            >
              <ListItem className="minusdiv">
                <HighlightOffIcon
                  className="svg_iconsminus"
                  onClick={() => {
                    toggleDrawer();
                  }}
                />
              </ListItem>
              <ListItem>
                <h3>{jsonnn?.name}</h3>
              </ListItem>
              <Divider />
              <ListItem button divider>
                <Link
                  to="/"
                  onClick={() => {
                    toggleDrawer();
                  }}
                >
                  <h4 className="heaing">Cabs</h4>
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemText
                  sx={{ fontSize: 70 }}
                  primary="About"
                  onClick={() => {
                    toggleDrawer();
                  }}
                />
              </ListItem>
              <Divider light />
              {jsonnn?.token ? (
                <ListItem button>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      toggleDrawer();
                    }}
                  >
                    <h4 className="heaing">Dashboard</h4>
                  </Link>
                </ListItem>
              ) : (
                ""
              )}

              {jsonnn?.name == "" ? (
                <>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/login"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Login</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/signup"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">SignUp</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                </>
              ) : (
                <>
                  <Divider light />
                  <ListItem button>
                    <a>
                      {" "}
                      <Link
                        to="/changepsd"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Change Password</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <a
                      onClick={() => {
                        let data = {
                          name: "",
                        };

                        localStorage.setItem("userData", JSON.stringify(data));
                        setuserData(data);
                        setkey("");
                      }}
                    >
                      {" "}
                      <Link
                        to="/"
                        onClick={() => {
                          toggleDrawer();
                        }}
                      >
                        <h4 className="heaing">Log Out</h4>
                      </Link>
                    </a>
                  </ListItem>
                  <Divider light />
                </>
              )}
            </List>
          </Drawer>
        </>
      ) : (
        <>
          <div className="header">
            <div className="header__container">
              <img
                src="/assets/logo.png"
                alt=""
                className="header__logo"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="header__container">
              <ul className="header__navlist">
                <li>
                  <Link to="/">Cabs</Link>
                </li>
                {jsonnn?.token ? (
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                ) : (
                  ""
                )}

                <li>
                  <a href="/">About us</a>
                </li>
              </ul>
            </div>

            <div className="header__container">
              {jsonnn?.name == "" ? (
                <ul className="header__navlist">
                  <li>
                    <a>
                      {" "}
                      <Link to="/login">Login</Link>
                    </a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <Link to="/signup">SignUp</Link>
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="header__navlist">
                  <li>
                    <a>{jsonnn?.name}</a>
                  </li>
                  <li>
                    <a>
                      {" "}
                      <Link to="/changepsd">Change Password</Link>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        let data = {
                          name: "",
                        };

                        localStorage.setItem("userData", JSON.stringify(data));
                        setuserData(data);
                        setkey("");
                      }}
                    >
                      {" "}
                      <Link to="/">Log Out</Link>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>{" "}
        </>
      )}

      <div className="header__ghost"></div>
    </>
  );
};

export default Header;
