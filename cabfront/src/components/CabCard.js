import React , {useState, useEffect} from "react";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import LuggageIcon from "@mui/icons-material/Luggage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import pmlAPI from "../api/pmlAPI";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import moment from "moment";

import './Allcss/carcard.css'


const CabCard = ({
  carModel,
  seats,
  luggage,
  price,
  cabImage,
  dashboardDisplay,
  distance,
  cabId,
}) => {
  const [total , settotel]=useState(123)
  const [loading ,setloading]=useState(false)
  const navigate = useNavigate();
  const [locationtype , setlocationtype]=useState()
  const [driver , setdriver]=useState(400)
  
  
  useEffect(()=>{
    let datepick = JSON.parse(localStorage.getItem("travelDetail")).date;
    const date1 = new Date(datepick?.to);
    const date2 = new Date(datepick?.from);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays)
  
    if(Number(diffDays) == 0  ){
      
      setdriver(400)

    }else{
      setdriver(400*Number(diffDays))
      

    }
    

    

  },[])

  useEffect(() => {
    let data=String(JSON.parse(localStorage.getItem('travelDetail')).TypeTravel)
    setlocationtype(data)

  
  }, [])
  useEffect(()=>{
    let traveldataa= parseInt(JSON.parse(localStorage.getItem('travelDetail'))?.distance/1000)
   
      if(Number(traveldataa) > 250){
      settotel(parseInt((parseInt(distance/1000)*price)*2)  + driver)
      }else{
        settotel(parseInt((parseInt(250)*price)) + driver)
      }

  },[])

const booknowbtn =async()=>{
  

  let user=JSON.parse(localStorage.getItem('userData'))

  let traveldetails=JSON.parse(localStorage.getItem('travelDetail'))

 
  let cardDetails={
    carModel,
    seats,
    luggage,
    price,
    cabImage,
    dashboardDisplay,
    distance,
    cabId
  }


  let senddata={
    data:{
        name:user?.name,
        email:user?.email,
        phone:'',
        pickUp:traveldetails.pickup.place_name,
        dropoff:traveldetails.dropoff.place_name,
        pickupDetailAdress:'',
        dropoffDetailAdress:'',
        date: `${moment(traveldetails?.date?.to).format("MMMM Do YYYY, h:mm a")} To ${moment(traveldetails?.date?.from).format("MMMM Do YYYY, h:mm a")}`,
        passengers:{
            adults:traveldetails.passengers.adults,
            childern:traveldetails.passengers.children,
            infants:traveldetails.passengers.infants
        },
        total:total
},

     useremail:user.email,
     cabid:cabId,
     userid:user.id

        
}


let totaldata={
  cardDetails,
  senddata

}


console.log({totaldata})
localStorage.setItem('data' , JSON.stringify(totaldata))
 

navigate('/checkout')






}


  return ( <>
  
    <div className="cab-card" key={cabId}>
      <div className="cab-card__image">
        <img src={cabImage} alt="car 1" className='imgcar' />
      </div>

      <div className="cab-card__details">
        <h2 className="h2--2">{carModel}</h2>
        <div className="service">
          <div className="service__unit">
            <h3 className="h3 h3--1 colorlue" >1 Unit</h3>
          </div>
          <div className="service__seats">
            <h3 className="h3 h3--1 colorlue">
              <AirlineSeatReclineNormalIcon /> {seats} Seats
            </h3>
          </div>
          <div className="service__luggage">
            <h3 className="h3 h3--1 colorlue">
              <LuggageIcon /> {luggage} Luggage bag
            </h3>
          </div>
        </div>
        {!dashboardDisplay && (
          <>
            <div className="tags">
              <div className="tags__safety">
                <h3 className="h3">Safety Standards & Restriction</h3>
              </div>
              <div className="tags__payment">
                <h3 className="h3">Partial Payment</h3>
              </div>
            </div>

            <div className="checkmarks">
              <p className="p p--1">
                <CheckCircleIcon />
                Free cancellation
              </p>
              <p className="p p--1">
                <CheckCircleIcon />
                24 / 7 customer helpline
              </p>
            </div>
          </>
        )}
      </div>

      <div className="cab-card__price">
        {locationtype =='hourly' && <h2 className="h2--2">₹ {price} per Hour</h2>}
        {locationtype =='outstation' && <h2 className="h2--2">₹ {parseInt(total)}</h2>}
     
          <>
            <button className="btn btn--1" onClick={()=>{
              booknowbtn()
            }}
            disabled={loading}>  {
              loading ?('Loading..'):('Book Now')
            }</button>
            
          </>
     
      </div>
    </div>
    </>
  );
};

export default CabCard;