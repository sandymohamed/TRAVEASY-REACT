import './BookFlight.scss';
import { useEffect, useState } from 'react';
import { getAllFlightByUser } from '../../../services/FlightService';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file
import HeaderComponent from '../../Shared/header/HeaderComponent';
////// For Header //////
import headerImg from '../../../assets/header/transportationHeader.png';
import FlightCard from '../../Shared/cards/FlightCard';
import ServiceSection from '../../Shared/serviceSection/ServiceSection';
import { setFormatDate } from '../../../services/DateformatService';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const headerTitle = <> Find your Tayara</>;
const headerParagraph = <> ana b7b masr gdn msh adaer asafr laaaa</>;

const BookFlight = () => {
  const [AirLineList, setAirLineList] = useState([]);
  const [countryTo, setcountryTo] = useState();
  const [countryFrom, setcountryFrom] = useState();
  const [dateTo, setdateTo] = useState();

  let { isLoggedIn, user } = useSelector(({ AuthReducer }) => AuthReducer);

  const FunctionSearch = (e) => {
    // Check Filter for countryTo
    switch (e.target.id) {
      case 'countryTo':
        setcountryTo(e.target.value);
        break;
      case 'countryFrom':
        setcountryFrom(e.target.value);
        break;
      case 'dateTo':
        setdateTo(setFormatDate(e.target.value));
        break;
      default:
    }
  };



  // Colling Database and Filter Data
  useEffect(() => {
    getAllFlightByUser(countryTo, dateTo, user.name).then((res) => setAirLineList(res.data));
  }, [countryTo, dateTo]);

  return (
    <>
      <h1>My Reservations</h1>

      {/* ////////////////////// */}
      <section className="formCard " >
            {AirLineList.map((AirLine) => (

              <div className='reservation-card fs-6'>
                <p >DepartureDate : {format(new Date(AirLine.Flight.DepartureDate), 'dd/mm/yyyy')}</p>
                <p >ReturnDate : {format(new Date(AirLine.Flight.ReturnDate), 'dd/mm/yyyy')}</p>
                
                <p>Flying From: {AirLine.Flight.FlyingFrom}</p>
                <p>FlyingTo: {AirLine.Flight.FlyingTo}</p>
                <p>Confirmation of Acceptance: {String(AirLine.IsBooking)}</p>
                <p>Trip Number : {AirLine.Flight.TravellerCount}</p>
                <p>Seat no: {AirLine.Flight.Child}</p>
                <p>Infant: {AirLine.Flight.Infant}</p>
                <p>Cabin Class: {AirLine.Flight.CabinClass}</p>
              
              </div>
            )

            )}
        
      </section>
    </>
  );
};

export default BookFlight;
