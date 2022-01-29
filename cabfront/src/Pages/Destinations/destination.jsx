import React from 'react'
import { Router , useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import './destination.css'

const Destination = () => {
  const navigate= useNavigate()

  const navigatePage = (value) => {
    console.log(value)
    navigate(`/sights/${value}`)

  }
  return (
    <>
      <div className='destination'>
        <header className='destination__header'>
          <h1>sightseeing</h1>
        </header>
        <div className='destination__container'>
          <section className='popular-destinations'>
            <h1>Popular Destinations In India</h1>

            <div className='destination__grid'>
              <div onClick={() => navigatePage('Delhi')} className='item item1'>
                <span>Delhi</span>
              </div>
              <div onClick={() => navigatePage('Mumbai')} className='item item2'>
                <span>Mumbai</span>
              </div>
              <div onClick={() => navigatePage('Banglore')} className='item item3'>
                <span>Banglore</span>
              </div>
              <div onClick={() => navigatePage('Goa')} className='item item4'>
                <span>Goa</span>
              </div>
            </div>
          </section>
          <section className='popular-destinations'>
            {/* <h1>South</h1> */}
            <div className='destination__grid'>
              <div onClick={() => navigatePage('Kerla')} className='item item5'>
                <span>Kerla</span>
              </div>
              <div onClick={() => navigatePage('Pune')} className='item item6'>
                <span>Pune</span>
              </div>
              <div onClick={() => navigatePage('Pune')} className='item item7'>
                <span>Kashmir</span>
              </div>
              <div onClick={() => navigatePage('Kashi')} className='item item8'>
                <span>Kashi</span>
              </div>
            </div>
          </section>
          <section className='popular-destinations'>
            {/* <h1>Trending</h1> */}
            <div className='destination__grid'>
              <div  onClick={() => navigatePage('Shimla')} className='item item9'>
                <span>Shimla</span>
              </div>
              <div  onClick={() => navigatePage('Amritsar')} className='item item10'>
                <span>Amritsar</span>
              </div>
              <div  onClick={() => navigatePage('Agra')} className='item item11'>
                <span>Agra</span>
              </div>
              <div  onClick={() => navigatePage('Rajsthan')} className='item item12'>
                <span>Rajsthan</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Destination
