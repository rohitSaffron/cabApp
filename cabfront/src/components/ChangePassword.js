import React , {useState , useEffect} from "react";
import "./Allcss/changepsd.css";
import pmlAPI from "../api/pmlAPI";
import swal from 'sweetalert';

export default function ChangePassword() {
    const [data , setdata]=useState({
      oldpsd:'',
      newpsd:''
    })


     const  changepsd= async ()=>{
         let id = JSON.parse(localStorage.getItem('userData')).id
         await pmlAPI.patch(`/api/forgot/${id}`,  data)
         .then(res=>{
           console.log(res)
           if(res.data.result){
            swal({
              title: "success",
              text: res.data.massage,
              icon: "success",
             
            })

           }else{
            swal({
              title: "Error",
              text: res.data.massage,
              icon: "error",
              dangerMode: true,
            })

           }
         }).catch(err=>{
           console.log(err)
         })

     } 




  return (
    <div className="container mainchange">
      <div className="seconddivchange">
        <div className="innerdivpsd">
          <div className="innerdivsecond">
            <label for="oldpsd" className="lable">Old Password :</label><br></br>
            <input type="text" 
            id="oldpsd" 
            name="oldpsd" 
            className="inputpsd" 
            onChange={(e)=>{
                setdata({
                    ...data,
                    oldpsd:e.target.value
                })
            }}
            
            />
            <br></br>
            <label for="newpsd" className="lable" >New Password :</label><br></br>
            <input type="text" 
            id="newpsd" 
            name="newpsd" 
            className="inputpsd" 
            onChange={(e)=>{
                setdata({
                    ...data,
                    newpsd:e.target.value
                })
            }}
            
            />
            <br></br>
            <br></br>
            
          </div>
          <div className="btndivpsd" ><button className="psdbtn" onClick={()=>{changepsd()}}>Change Password</button></div>
        </div>
      </div>
    </div>
  );
}
