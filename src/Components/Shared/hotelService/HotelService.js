import React from 'react';
import "./hotelService.scss"
const HotelService = ({ setSearch, filterHotels, city, setCity, cities }) => {
  return (
    <>
      <div className="hDetails">
        <div className='container'>
          <div className="hotelDetails_hotel">
            <input
              className=""
              type="search"
              name="hotel"
              placeholder="Find Your Hotel"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="orangeBtn" onClick={() => filterHotels('name')}>
              Find
            </button>
          </div>
          <div className="hotelDetails_select">
            <select
              className=""
              id="dropdown-basic"
              defaultValue={city}
              onClick={() => filterHotels('city')}
              onChange={(e) => {
                setCity(e.target.value);
              }}>
              {cities &&
                cities.map((city, i) => (
                  <option
                    key={i}
                    value={city?.City_Name}>
                    {city?.City_Name}
                  </option>
                ))}
            </select>
          </div>


        </div>



      </div>
    </>
  );
};

export default HotelService;