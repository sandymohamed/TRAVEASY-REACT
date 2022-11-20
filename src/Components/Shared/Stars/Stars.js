import React, { useState, useRef } from 'react'
import './stars.scss';

const StarRating = ({filterHotels, setRate}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    
  
    return (
      <div className="star-rating ">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <i
            id='mystar'
              type="button"
              size={24}
              key={index}
              className={`fa-solid fa-star ${ index<=(hover || rating) ? "on" : "off"}`}
              onClick={() => {filterHotels('getHotelsByRate')
              setRating(index)
            }}
              onMouseEnter={() => {
                setRate(index)
                setHover(index)
            }}
              onMouseLeave={() => { setHover(rating)}}
            >
               
            </i>
            
          );
        })}
 
      </div>
    );
  }
  export default StarRating;