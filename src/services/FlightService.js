import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://traveasy.herokuapp.com/',
});
// Get all Flight
export function getAllFlight(countryFrom,countryTo,dateFrom, dateTo, selectedClass, price) {

  let Url ='flight'
  let isFrist = true ;
  // Filtertion For country
  if(countryFrom)
    { 
      Url += `?FlyingFrom=${countryFrom}` ;
      isFrist = false ;
   }
  if(countryTo)
    { 
      Url += isFrist ? `?FlyingTo=${countryTo}` : `&FlyingTo=${countryTo}` ;
      isFrist = false ;
   }
   if(dateFrom)
    { 
      Url += isFrist ? `?DepartureDate=${dateFrom}` :  `&DepartureDate=${dateFrom}` ;
      isFrist = false ;
    }
  if(dateTo)
    { 
      Url += isFrist ? `?ReturnDate=${dateTo}` :  `&ReturnDate=${dateTo}` ;
      isFrist = false ;
    }
  if(selectedClass)
  {
     Url += isFrist ? `?CabinClass=${selectedClass}` :  `&CabinClass=${selectedClass}`
     isFrist = false ;
  }
  if(price)
  {
     Url += isFrist ? `?Price=${price}` :  `&Price=${price}`
     isFrist = false ;
  }


  return instance({
    url: Url ,//`flight`,
    method: 'get'
  })
    .then((response) => response)
    .catch((err) => alert(err));
}



// Get all Flight ByUser
export function getAllFlightByUser(countryTo ,  dateTo ,user) {

  let Url ='flightBooking'
  let isFrist = true ;
  // Filtertion For country
  if(countryTo)
    { 
      Url += `?FlyingTo=${countryTo}` ;
      isFrist = false ;
   }
  if(dateTo)
    { 
      Url += isFrist ? `?ReturnDate=${dateTo}` :  `&ReturnDate=${dateTo}` ;
      isFrist = false ;
    }
  if(user)
  {
     Url += isFrist ? `?Tourist=${user}` :  `&Tourist=${user}`
  }


  return instance({
    url: Url ,//`flight`,
    method: 'get'
  })
    .then((response) => response)
    .catch((err) => alert(err));
}

export const bookedFlight = (UserID , Flight , PassportNumber ,IsPaid) => {

  const UserBooking = {
    IsBooking  : false ,
    Tourist : UserID ,
    Flight : Flight  ,
    PassportNumber :PassportNumber ,
    IsPaid : IsPaid
  }
  
  return instance.post(`flightBooking`,UserBooking)
  .then(res => res)
  .catch((error) => {      
        console.log(error);     
    });

}
