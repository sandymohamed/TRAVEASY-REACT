import { useEffect, useState, useContext } from 'react';
import './hotelDetails.scss';
import { getHotelById } from '../../../services/hotelsServ'
import AOS from 'aos';
import "aos/dist/aos.css"
import { DarkModeContext } from '../../../context/DarkMode';

const HotelDetails = ({ hotelId }) => {
    const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
    const [hotel, setHotel] = useState({})

    useEffect(() => {
        AOS.init();
        getHotelById(`${hotelId}`).then((res) => setHotel(res))
    }, [])

    return (
        <>
            <section className={`hotelDetails hotelDetails${darkMode}`}>
                <div className='container'>
                    <div className='det-container' data-aos="fade-out" data-aos-delay="400">
                        {(hotel) && (
                            <>
                                <div className='row'>
                                    <article className='hotel-details col-md-6'>
                                        <div>
                                            <h3 className='hotelName'>{hotel.HotelName}</h3>
                                        </div>
                                        <div className='hotel-details-data'>
                                            <span className='title'> City</span>
                                            {(hotel.City) && (<span className='data hotelCity'>{hotel.City.City_Name}</span>)}
                                        </div>
                                        <div className='hotel-details-data'>
                                            <span className='title'> Rate</span>
                                            <span className=' data hotelStar'>
                                                {hotel.Evaluation} <i className="fa-solid fa-star"></i>
                                            </span>
                                        </div>
                                        <div className='hotel-details-data'>
                                            <span className='title'> Price </span>

                                            <span className='data'>{hotel.Price}$</span>
                                        </div>
                                        <div className='hotel-details-data'>
                                            <span className='title'> Description </span>
                                            <span className='data'>{hotel.Description}</span>
                                        </div>
                                    </article>
                                    <div className="mapouter  col-md-6">
                                        <div className="gmap_canvas">
                                            {(hotel.City) && (
                                                <iframe
                                                    title='map'
                                                    id="gmap_canvas"
                                                    src={`https://maps.google.com/maps?q=${hotel.HotelName},${hotel.City.City_Name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}

                                                    frameBorder="0"
                                                    scrolling="no"
                                                    marginHeight="0"
                                                    marginWidth="0">
                                                </iframe>
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </>
                        )}

                    </div>
                </div>
            </section>
        </>
    );
};

export default HotelDetails;