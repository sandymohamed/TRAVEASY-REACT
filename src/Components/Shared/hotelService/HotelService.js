import React from 'react';

const HotelService = ({ setSearch, filterHotels, city, setCity, cities }) => {
  return (
    <>
      <div className="hotelDetails">
        <div className="hotelDetails_hotel">
          <input
            className="me-1"
            type="search"
            name="hotel"
            placeholder="Find Your Hotel"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="p-2"
            onClick={() => filterHotels('name')}>
            find
          </button>
        </div>

        <select
          className=" bg-warning m-2 p-2 border border-0 rounded city-option"
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
                value={city.City_Name}>
                {city.City_Name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default HotelService;