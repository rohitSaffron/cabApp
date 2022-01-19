import React, { useState, useEffect } from "react";
import "./Allcss/changepsd.css";
import pmlAPI from "../api/pmlAPI";
import swal from "sweetalert";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};
export default function ChangePassword() {
  const [data, setdata] = useState({
    oldpsd: "",
    newpsd: "",
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
      <div className="mainbackround">
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 maindiv">
              <div className="row">
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5 headingdiv">
                      <h3>Change Password</h3>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5 icondiv">
                      <PermIdentityIcon className="myicon"/>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>

                <div className="col-sm-12 formdiv">
                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-5">
                      <form>
                        <div class="form-group">
                          <label for="oldpsd" className="lable">
                            Old Password :
                          </label>
                          <br></br>
                          <input
                            type="text"
                            id="oldpsd"
                            name="oldpsd"
                            className="inputpsd"
                            id="exampleInputEmail1"
                            onChange={(e) => {
                              setdata({
                                ...data,
                                oldpsd: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div class="form-group">
                          <label for="newpsd" className="lable">
                            New Password :
                          </label>
                          <br></br>
                          <input
                            type="text"
                            id="newpsd"
                            name="newpsd"
                            className="inputpsd"
                            onChange={(e) => {
                              setdata({
                                ...data,
                                newpsd: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <br></br>
                        <button type="submit" onClick={()=>{changepsd()}} class="btn btn-primary">
                        Change Password
                        </button>
                      </form>
                    </div>
                    <div className="col-sm-4"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
