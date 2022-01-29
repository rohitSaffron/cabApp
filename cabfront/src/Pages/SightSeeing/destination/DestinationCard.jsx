import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DestinationCard.css'

const DestinationCard = ({ image, title, price, location, type, rating }) => {
  const navigate =useNavigate()
  console.log({ image, title, price, location, type, rating })
  return (
    <div className='destination__wrapper'>
      <div className='destination__card'>
        <div className='card-header'>
          <img
            src='https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg'
            alt='rover'
          />
        </div>
        <div className='card-body'>
          <span className='tag tag-teal'>{location}</span>
          <h4>{title}</h4>
          <div className='user'>
            <div className='user-info'>
              <h5>Price Starting</h5>
              <h3>INR {price}</h3>
            </div>
            <button onClick={()=>{
              navigate('/local-sight-seeing')
            }} >Book Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard
