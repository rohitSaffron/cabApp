import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DestinationCard.css'

const DestinationCard = ({ _id, featuresImagelink, title, price, sightLocation, typePark, rating }) => {
  const navigate =useNavigate()
 // console.log({ featuresImagelink, title, price, sightLocation, typePark, rating })
  return (
    <div className='destination__wrapper' key={_id}>
      <div className='destination__card'>
        <div className='card-header'>
          <img
            src={featuresImagelink}
            alt='rover'
          />
        </div>
        <div className='card-body'>
          <span className='tag tag-teal'>{sightLocation}</span>
          <h4>{title}</h4>
          <div className='user'>
            <div className='user-info'>
              <h5>Price Starting</h5>
              <h3>INR {price}</h3>
            </div>
            <button onClick={()=>{
              navigate(`/local-sight-seeing/${title}`)
            }} >Book Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard
