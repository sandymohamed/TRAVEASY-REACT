import './Flight.scss';
import { useEffect, useState } from 'react';
import { getAllFlight } from '../../../services/FlightService';
import HeaderComponent from '../../Shared/header/HeaderComponent';
////// For Header //////
import headerImg from '../../../assets/header/transportationHeader.png';
import FlightCard from '../../Shared/cards/FlightCard';
import ServiceSection from '../../Shared/serviceSection/ServiceSection';
import SlideBar from '../../Shared/slideBar/Slidebar';
import { setFormatDate } from '../../../services/DateformatService';


const headerTitle = <>We don’t need objects, we need adventures.</>;
const headerParagraph = <> Once a year, go someplace you’ve never been before.</>;

const Flight = () => {
  const [AirLineList, setAirLineList] = useState(null);
  const [countryTo, setcountryTo] = useState();
  const [countryFrom, setcountryFrom] = useState();
  const [selectedClass, SetselectedClass] = useState();
  const [dateFrom, setdateFrom] = useState();
  const [dateTo, setdateTo] = useState();
  const [price, setPrice] = useState();
  const [isBook, setIsBook] = useState();


  const FunctionSearch = (e) => {
    // Check Filter for Class Filter
    if (e.target.name === 'classFilter') {
      SetselectedClass(e.target.id);
    }

    // Check Filter for countryTo
    switch (e.target.id) {
      case 'countryTo':
        setcountryTo(e.target.value);
        break;
      case 'countryFrom':
        setcountryFrom(e.target.value);
        break;
      case 'dateFrom':
        setdateFrom(setFormatDate(e.target.value));
        break;
      case 'dateTo':
        setdateTo(setFormatDate(e.target.value));
        break;
      default:
    }
  };

  const serviceSection = (
    <>
      <div className="flightDetails">
        <div className="row">
          <div className="flightDetails_country">
            <div>
              <input
                list="country"
                name="country"
                placeholder="From"
                id="countryFrom"
                onChange={(e) => {
                  FunctionSearch(e);
                }}
              />
              <i className="fa-solid fa-map-location-dot"></i>
              <datalist id="country">
                <option value="Egypt" />
                <option value="Roma" />
                <option value="UAE" />
                <option value="USA" />
                <option value="Paris" />
              </datalist>
            </div>

            <div className="">
              <input
                list="country"
                name="country"
                placeholder="To"
                id="countryTo"
                onChange={(e) => {
                  FunctionSearch(e);
                }}
              />
              <i className="fa-solid fa-map-location"></i>
              <datalist id="country">
                <option value="Egypt" />
                <option value="Roma" />
                <option value="UAE" />
                <option value="USA" />
                <option value="Paris" />
              </datalist>
            </div>
          </div>
          <div className="">
            <div className="flightDetails_date">
              <input
                type={'date'}
                name="date"
                placeholder="From"
                id="dateFrom"
                onChange={(e) => {
                  FunctionSearch(e);
                }}
              />

              <input
                type={'date'}
                name="date"
                placeholder="To"
                id="dateTo"
                onChange={(e) => {
                  FunctionSearch(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
  const serviceFilter = (
    <>
      <span>Class</span>
      <div>
        <input
          type="radio"
          name="classFilter"
          id="economy"
          checked={selectedClass === 'economy'}
          onChange={(e) => {
            FunctionSearch(e);
          }}
        />
        <label htmlFor="economy">Economy Class</label>
      </div>
      <div>
        <input
          type="radio"
          name="classFilter"
          id="business"
          checked={selectedClass === 'business'}
          onChange={(e) => {
            FunctionSearch(e);
          }}
        />
        <label htmlFor="business">Business Class</label>
      </div>
      <div>
        <input
          type="radio"
          name="classFilter"
          id="first"
          checked={selectedClass === 'first'}
          onChange={(e) => {
            FunctionSearch(e);
          }}
        />
        <label htmlFor="first">First Class</label>
      </div>
    </>
  );
  useEffect(() => {
    getAllFlight(countryFrom, countryTo, dateFrom, dateTo, selectedClass, price).then((res) => setAirLineList(res.data));
    setIsBook(false);
  }, [countryTo, dateTo, selectedClass, price, isBook]);

  return (
    <>
      <HeaderComponent
        title={headerTitle}
        paragraph={headerParagraph}
        img={headerImg}
      />
      <ServiceSection serviceSection={serviceSection} />

      <section className="flightcomponent">
        <div className="row">
          <section className=" col-md-3 ">
            <SlideBar
              serviceFilter={serviceFilter}
              setPrice={setPrice}
            />
          </section>
          <section className="cardsArea col-md-8 ">
            {AirLineList &&
            AirLineList?.map((AirLine) => {

              return (
                <FlightCard
                  key={AirLine._id}
                  Flightobj={AirLine}
                  setIsBook={setIsBook}
                />
              );
            })}
          </section>
        </div>
      </section>


    </>
  );
};

export default Flight;
