import './home.scss';

import FlightCard from '../../Shared/cards/FlightCard';
import Vcart from '../../Shared/cards/Vcard';
import Carousel from 'react-bootstrap/Carousel';
import testslider from "../../../assets/cover/testcover.jpg"
import flightImg from "../../../assets/header/flight.png"
import hotelImg from "../../../assets/hotel-home.png"
import hotelImg2 from "../../../assets/hotel-home-2.png"
import tourImg from "../../../assets/home-tour.png"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getHotelsLimit } from '../../../services/hotelsServ';
import { geHolidaysLimit } from '../../../services/holidaysServ';
import { Link } from 'react-router-dom';
import { getAllFlight } from '../../../services/FlightService';

const Home = () => {

  const [hotels, setHotels] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [AirLineList, setAirLineList] = useState([]);

  let { isLoggedIn, user } = useSelector(({ AuthReducer }) => AuthReducer);
  let { message } = useSelector((MessageReducer) => MessageReducer);
  console.log('Message =>', message);

  useEffect(() => {
    getAllFlight().then((res) => setAirLineList(res.data));
    getHotelsLimit().then((res) => setHotels(res));
    geHolidaysLimit().then((res) => setHolidays(res));
  }, []);

  return (
    <>

      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block "
            src={testslider}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 data-aos="fade-up"
              data-aos-delay="200">First slide label</h3>
            <p data-aos="fade-up"
              data-aos-delay="300">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block"
            src={testslider}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={testslider}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <section className='home'>

        <section className='home_FlightContainer '>
          <div className='container'>
            <article className='flightContainer_article'>
              <p>Explore Wonderful Experience</p>
              <h3>Visite popular Destinations</h3>
              <span>In The World</span>
            </article>
            <div className='flightContainer_discover'>
              <div className='row'>

                <div className='discover_cards  col-md-7'>

                  {AirLineList.map((AirLine , index) =>
                   { if(index < 3) {
                    return (
                      <FlightCard
                        Flightobj={AirLine}                      
                      />
                    );
                  }
                  })}

                </div>
                <div className='discover_img col-md-4'>
                  <img src={flightImg} loading="lazy"></img>
                  <button className='orangeBtn'>Discover Now</button>

                </div>
              </div>



            </div>


          </div>


        </section>
        <section className='home_hotelContainer'>
          <svg id="svg" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg" className="waveSvg transition duration-300 ease-in-out delay-150">

            <path d="M 0,400 C 0,400 0,100 0,100 C 124.07142857142858,90.89285714285714 248.14285714285717,81.78571428571429 379,88 C 509.85714285714283,94.21428571428571 647.4999999999999,115.74999999999999 747,121 C 846.5000000000001,126.25000000000001 907.8571428571429,115.21428571428571 1017,109 C 1126.142857142857,102.78571428571429 1283.0714285714284,101.39285714285714 1440,100 C 1440,100 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#ffb14b" fill-opacity="0.4" className="transition-all duration-300 ease-in-out delay-150 path-0"></path>

            <path d="M 0,400 C 0,400 0,200 0,200 C 104.75,187.71428571428572 209.5,175.42857142857142 324,181 C 438.5,186.57142857142858 562.7500000000001,209.99999999999994 675,224 C 787.2499999999999,238.00000000000006 887.5,242.5714285714286 1013,237 C 1138.5,231.4285714285714 1289.25,215.7142857142857 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#ffb14b" fill-opacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-1"></path>

            <path d="M 0,400 C 0,400 0,300 0,300 C 91,308.6071428571429 182,317.2142857142857 323,315 C 464,312.7857142857143 655,299.75 786,292 C 917,284.25 988,281.7857142857143 1087,284 C 1186,286.2142857142857 1313,293.1071428571429 1440,300 C 1440,300 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#ffb14b" fill-opacity="1" className="transition-all duration-300 ease-in-out delay-150 path-2"></path>
          </svg>
          <div className='container'>
            <div className="row">
              <div className='hotel-img col-md-2'>
                <img src={hotelImg2} loading="lazy"></img>
              </div>
              <div className='hotel-article col-md-8'>
                <article>
                  <p>Away From Your Home !?</p>
                  <h3>Select your Home</h3>
                  <img src={hotelImg} loading="lazy"></img>

                  <Link className='orangeBtn' to='hotels'>Discover Now </Link>

                </article>

              </div>


            </div>

          </div>





        </section>
        <section className='home-tourContaier'>
          <div className='container'>
            <div className='row'>
              <div className='tour-img col-md-5 d-flex ' >

{holidays &&
  holidays.map((holiday, i) => (
   <div >
         <Vcart
                    key={i}
                    title={holiday.HotelName}
                    city={holiday.City.City_Name}
                    Evaluation={holiday.Evaluation}
                    Price={holiday.Price}
                    img={holiday.ImgURL[0]}
                    // description={holiday.Description}
                    link={`holidays/${holiday._id}`}
                  />
    </div>
  ))}

              </div>
              <article className='tour-article col-md-6'>
                <h3>HOLIDAYS</h3>
                <h3>The Perfect Place </h3>
                <p>And journey.</p>
                <img src={tourImg} loading="lazy" ></img>
                <Link className='orangeBtn' to='holidays'>Discover Now </Link>

              </article>
            </div>


          </div>

          <br />


        </section>

      </section>


    </>

  );
};

export default Home;
