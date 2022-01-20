import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import '../scss/components/international.css';

const International = () => {
    const responsive = {
		superLargeDesktop: {
		  // the naming can be any, depends on you.
		  breakpoint: { max: 4000, min: 3000 },
		  items: 5
		},
		desktop: {
		  breakpoint: { max: 3000, min: 1024 },
		  items: 4
		},
		tablet: {
		  breakpoint: { max: 1024, min: 464 },
		  items: 2
		},
		mobile: {
		  breakpoint: { max: 464, min: 0 },
		  items: 1
		}
	  };

    return(
        <main className="main">
            <div className="top-routes__container">
        <h2 className="h2 h2--2  mt-big">International Packages</h2>
      </div>
	<div className="container">
	<Carousel responsive={responsive} 
	autoPlay={true}>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/WfMhk7c/Image-1.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Angkor Wat</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/tL8bzLh/Image-2.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Bali Temple</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/y5f0nYf/Image-3.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Big Ben</h3>
					<p className="paragraph truncate">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/1LC4BPH/Image-4.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Colosseum</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/Fg3RWCs/Image-5.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Eiffel Tower</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/rbqTyjX/Image-6.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Grand Canyon</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. 
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/PGV5950/Image-7.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Great Wall</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/SQgkMQn/Image-8.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Machu Picchu</h3>
					<p className="paragraph truncate">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/59fJqCs/Image-9.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Pyramids</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
					</p>
				</div>
			</div>
			<div className="card">
				<div className="card-image">
					<img src="https://i.ibb.co/cvrxczz/Image-10.jpg" loading="lazy" className="responsive" alt="Images"></img>
				</div>
				<div className="card-inner">
					<h3 className="text text-title">Saint Basil</h3>
					<p className="paragraph truncate">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
					</p>
				</div>
			</div>
			</Carousel>
	</div>
</main>

    );
};

export default International;