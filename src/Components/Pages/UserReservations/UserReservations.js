import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bookedHolidayByUser } from '../../../services/holidaysServ';
import { bookedHotelByUser, getTotalPrice } from '../../../services/hotelsServ';
import calenderIcon from "../../../assets/calender.png"

import dummyHotel from "../../../assets/card/dummyhotel.jpg"
import dummyFlight from "../../../assets/card/dummyFlight.jpg"

import './userReservations.scss';
import { setFormatDate } from '../../../services/DateformatService';
import { getAllFlightByUser } from '../../../services/FlightService';

const UserReservations = () => {

    const [hotelReservations, setHReservations] = useState([])
    const [holidayReservations, setTReservations] = useState([])
    const [FlightReservations, setFlightReservations] = useState([])
     

    const userId = useSelector((({ AuthReducer }) => AuthReducer.user.username))
    let user = (userId) ? userId : null

    const GetTotal =({id})=>{
        const [total, setTotal]= useState(0);
        getTotalPrice(id).then(res => console.log(res))
        console.log(total);

      return   <span className='data'>{total}</span>

    }
    useEffect(() => {
        bookedHotelByUser(user).then(res => setHReservations(res))
        bookedHolidayByUser(user).then(res => setTReservations(res))
        getAllFlightByUser(null, null, user).then((res) => setFlightReservations(res.data));

    }, [])
    return (
        <>

            <section className='userReservations'>
                <div className='container'>
                    <div className='userReservations_Img'>
                        <span className='cloud'></span>
                        <img src={calenderIcon}></img>
                        <h2 className='text-center'>Hotels Reservations</h2>
                    </div>
                    <div className='userReservations_data'>
                        <div className='container'>
                            <div className='row'>

                                <div className='data_card col-md-12'>
                                    {
                                        (hotelReservations) && (
                                            hotelReservations.map((item, i) => (
                                                <div className='reservation-card mb-1' key={i}>


                                                    <div className='row'>
                                                        <div className='cardImg col-md-3'>
                                                            <img src={(item.ImgURL)? item.ImgURL[0] :dummyHotel}></img>
                                                        </div>

                                                        {/* /////// */}
                                                        <div className='cardData col-md-9'>
                                                            <span className='cardData_name text-center'> {item.Hotels.HotelName}</span>

                                                            <div className='cardData_container'>
                                                                <div className='cardInformation'>
                                                                    <div className='confirmation'>
                                                                        <span className='title'>Acceptance:</span>
                                                                        <span className='data pending'> {String(item.IsApprove)}</span>
                                                                        {/* <span className='data confirmed'>Confirmed</span>
                                                            <span className='data canceled'>Confirmed</span> */}

                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Period</span>
                                                                        <span className='data'>{item.Period}</span>
                                                                    </div>
                                                                    <div className='roomCount'>
                                                                        <span className='title'>Room Count</span>
                                                                        <span className='data'> {item.RoomCount}</span>
                                                                    </div><br />
                                                                    {/* <div className='period'> */}
                                                                        {/* <span className='title'>Total Price</span> */}
                                                                        {/* <GetTotal id={item._id} /> */}

                                                                        {/* <span className='data'>{getTotal(item._id)}</span> */}
                                                                    {/* </div> */}
                                                                    <div className='period'>
                                                                        <span className='title'>created At</span>
                                                                        <span className='data'>{setFormatDate(item.createdAt)}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>updated At</span>
                                                                        <span className='data'>{setFormatDate(item.updatedAt)}</span>
                                                                    </div>
                                                                </div>
                                                                <div className='cardDate'>
                                                                    <div className='checkIn'>
                                                                        <span className='type'>Check in</span>

                                                                        <span className='day'>{(new Date(item.startDate)).getUTCDate()} </span>
                                                                        <span className='month'>{(new Date(item.startDate)).getUTCMonth() + 1}</span>
                                                                        <span className='year'>{(new Date(item.startDate)).getUTCFullYear()}</span>
                                                                    </div>
                                                                    <div className='checkOut'>

                                                                        <span className='type'>Check Out</span>
                                                                        <span className='day'>{(new Date(item.endDate)).getUTCDate()} </span>
                                                                        <span className='month'>{(new Date(item.endDate)).getUTCMonth() + 1}</span>
                                                                        <span className='year'>{(new Date(item.endDate)).getUTCFullYear()}</span>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            ))

                                        )
                                    }
                                </div>

                            </div>
                        </div>


                    </div>

                    {/* ******************************** Holiday *****************************  */}
                    {/* <div className='userReservations_Img'>
                        <span className='cloud'></span>
                        <img src={calenderIcon}></img>
                        <h2 className='text-center'>Holiday Reservations</h2>
                    </div> */}
                    <div className='userReservations_data'>
                        <div className='container'>
                            <div className='row'>

                                <div className='data_card col-md-12 '>
                                    {
                                        (holidayReservations) && (
                                            holidayReservations.map((item, i) => (
                                                <div className='reservation-card mb-1' key={i}>


                                                    <div className='row'>
                                                        <div className='cardImg col-md-3'>
                                                        <img src={(item.ImgURL)? item.ImgURL[0] :dummyHotel}></img>
                                                        </div>

                                                        {/* /////// */}
                                                        <div className='cardData col-md-9'>

                                                            <div className='cardData_container'>
                                                                <div className='cardInformation'>
                                                                    <div className='confirmation'>
                                                                        <span className='title'>Acceptance: </span>
                                                                        <span className='data pending'> {String(item.IsApprove)}</span>
                                                                        {/* <span className='data confirmed'>Confirmed</span>
                                                            <span className='data canceled'>Confirmed</span> */}

                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Period</span>
                                                                        <span className='data'>{item.Period}</span>
                                                                    </div>
                                                                    <div className='roomCount'>
                                                                        <span className='title'>RoomCount</span>
                                                                        <span className='data'> {item.RoomCount}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Transport</span>
                                                                        <span className='data'>{item.Transport}</span>
                                                                    </div>
                                                                    <br />
                                                                    <div className='period'>
                                                                        <span className='title'>createdAt</span>
                                                                        <span className='data'>{setFormatDate(item.createdAt)}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>updatedAt</span>
                                                                        <span className='data'>{setFormatDate(item.updatedAt)}</span>
                                                                    </div>

                                                                </div>
                                                                <div className='cardDate'>
                                                                    <div className='checkIn'>
                                                                        <span className='type'>Check in</span>

                                                                        <span className='day'>{(new Date(item.startDate)).getUTCDate()} </span>
                                                                        <span className='month'>{(new Date(item.startDate)).getUTCMonth() + 1}</span>
                                                                        <span className='year'>{(new Date(item.startDate)).getUTCFullYear()}</span>
                                                                    </div>
                                                                    <div className='checkOut'>

                                                                        <span className='type'>Check Out</span>
                                                                        <span className='day'>{(new Date(item.endDate)).getUTCDate()} </span>
                                                                        <span className='month'>{(new Date(item.endDate)).getUTCMonth() + 1}</span>
                                                                        <span className='year'>{(new Date(item.endDate)).getUTCFullYear()}</span>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            ))

                                        )
                                    }
                                </div>

                            </div>
                        </div>


                    </div>


                     {/* ******************************** Flight *****************************  */}
                     {/* <div className='userReservations_Img'>
                        <span className='cloud'></span>
                        <img src={calenderIcon}></img>
                        <h2 className='text-center'>Flight Reservations</h2>
                    </div> */}
                    <div className='userReservations_data'>
                        <div className='container'>
                            <div className='row'>

                                <div className='data_card col-md-12 '>
                                    {
                                        (FlightReservations) && (
                                            FlightReservations.map((item, i) => (
                                                <div className='reservation-card mb-1' key={i}>


                                                    <div className='row'>
                                                        <div className='cardImg col-md-3'>
                                                            <img src={dummyFlight}></img>
                                                        </div>

                                                        {/* /////// */}
                                                        <div className='cardData col-md-9'>

                                                            <div className='cardData_container'>
                                                                <div className='cardInformation'>
                                                                    <div className='confirmation'>
                                                                        <span className='title'>Acceptance: </span>
                                                                        <span className='data pending'> {String(item.IsBooking)}</span>
                                                                       
                                                                    </div>
                                                                    {
                                                                        (item.Flight)&&(
<>
                                                                    
                                                                    <div className='period'>
                                                                        <span className='title'>Departure Date</span>
                                                                        <span className='data'>{setFormatDate(item.Flight.DepartureDate)}</span>
                                                                    </div>
                                                                    <div className='roomCount'>
                                                                        <span className='title'>Return Date</span>
                                                                        <span className='data'> {setFormatDate(item.Flight.ReturnDate)}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Flying From</span>
                                                                        <span className='data'>{item.Flight.FlyingFrom}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Flying To</span>
                                                                        <span className='data'>{item.Flight.FlyingTo}</span>
                                                                    </div>
                                                                    <br />
                                                                    <div className='period'>
                                                                        <span className='title'>Trip Number</span>
                                                                        <span className='data'>{item.Flight.TravellerCount}</span>
                                                                    </div>
                                                                    <div className='period'>
                                                                        <span className='title'>Seat no</span>
                                                                        <span className='data'>{item.Flight.Child}</span>
                                                                    </div>

                                                                    <div className='period'>
                                                                        <span className='title'>Infant</span>
                                                                        <span className='data'>{item.Flight.Infant}</span>
                                                                    </div>

                                                                    <div className='period'>
                                                                        <span className='title'>Cabin Class</span>
                                                                        <span className='data'>{item.Flight.CabinClass}</span>
                                                                    </div>
                                                                    </>  )
}
                                                                </div>
                                                                
                                                            </div>
                                                        </div>

                                                    </div>


                                                </div>
                                            ))

                                        )
                                    }
                                </div>

                            </div>
                        </div>


                    </div>


                </div>

            </section>




        </>
    );
};

export default UserReservations;