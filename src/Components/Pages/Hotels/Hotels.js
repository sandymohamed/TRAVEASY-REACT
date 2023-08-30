import HeaderComponent from '../../Shared/header/HeaderComponent';
import './hotels.scss';
//// Header Data ////
import headerimg from '../../../assets/header/hotelHeader.png';
import Vcart from '../../Shared/cards/Vcard';
import {
  getHotels,
  getHotelsByRate,
  getCities,
  getHotelsByCityName,
  getHotelByName,
  getHotelByPrice,
} from '../../../services/hotelsServ';
import { useEffect, useState } from 'react';
import ServiceSection from '../../Shared/serviceSection/ServiceSection';
import SlideBar from '../../Shared/slideBar/Slidebar';
import StarRating from '../../Shared/Stars/Stars';
import HotelService from '../../Shared/hotelService/HotelService';

const headerTitle = <>Life is short, and the world is wide.</>;
const headerParagraph = <> Live life with no excuses, travel with no regret. <br></br> Indulgent holiday offers, family packages, business bundles and more.</>;

const Hotels = () => {
  const [hotels, setHotels] = useState(null);
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState(null);
  const [rate, setRate] = useState(null); 

  const filterHotels = (filter) => {
    switch (filter) {
      case 'getHotelsByRate':
        getHotelsByRate(rate).then((res) => setHotels(res));
        break;

      case 'city':
        getHotelsByCityName(city).then((res) => setHotels(res));
        break;
      case 'name':
        getHotelByName(search).then((res) => setHotels(res));
        break;
      case 'price':
        getHotelByPrice(price).then((res) => setHotels(res));
        break;

      default:
        getHotels().then((res) => setHotels(res));

        break;
    }
  };

  useEffect(() => {
    getCities().then((res) => setCities(res));

    getHotels().then((res) =>{ setHotels(res);
      console.log(hotels)});
  }, []);

  const serviceSection = (
    <HotelService
      setSearch={setSearch}
      filterHotels={filterHotels}
      city={city}
      setCity={setCity}
      cities={cities}
    />
  );

  return (
    <>
      <HeaderComponent
        img={headerimg}
        title={headerTitle}
        paragraph={headerParagraph}
      />
      <ServiceSection serviceSection={serviceSection} />

      <section className="hotelcomponent  ">
        <div className="d-flex hotel-container ">
          <section
            className="slide-bar"
            style={{ width: '30%' }}>
            <SlideBar
              className="filter-bar "
              serviceFilter={
                <StarRating
                  filterHotels={filterHotels}
                  setRate={setRate}
                />
              }
              setPrice={setPrice}
              filterHotels={filterHotels}
            />
          </section>
          <section
            className="cardsArea  "
            style={{ width: '65%' }}>
            <div className="cards-container ">
              {hotels &&
                hotels.map((hotel, i) => (
                  <Vcart
                    key={i}
                    title={hotel?.HotelName}
                    city={hotel?.City?.City_Name}
                    Evaluation={hotel?.Evaluation}
                    Price={hotel?.Price}
                    img={hotel?.HotelName.split(' ')[0]}
                    // description={hotel.Description}
                    hotelId={hotel?._id}
                    link={`hotels/${hotel?._id}`}
                  />
                ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Hotels;
