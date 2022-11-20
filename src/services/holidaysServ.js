import { ENDPOINTS } from '../utils/endPoints';
import { instance } from './authAPI';
import authHeader from './auth-header';

// get all hotels
export const getHolidays = () => {
  return instance
    .get(`${ENDPOINTS.GETHOLIDAYS}`)

    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// get limited holidays 
export const geHolidaysLimit = () => {
  return instance.get(`${ENDPOINTS.GETHOLIDAYSLIMIT}`)

  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}

// get holiday by id 
export const getHolidayById = (id) => {
  console.log( id);
   return instance.get(`${ENDPOINTS.GETHOLIDAYS}`+id, { headers: authHeader() })
 
   .then(res => {return(res.data)})
   .catch(err => console.log(err))
 }

// get holiday by price
export const getHolidayByPrice = (price) => {
  return instance
    .get(`${ENDPOINTS.GETHOLIDAYBYPRICE}?price=${price}`)

    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// get holidays by it's rate
export const getHolidaysByRate = (rate) => {
  console.log('lol');
  return instance
    .get(`${ENDPOINTS.GETHOLIDAYSBYRATE}?rate=${rate}`)

    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// get all holidays by city
export const getHolidaysByCityName = (city) => {
  return instance
    .get(`${ENDPOINTS.GETHOLIDAYSBYCITY}?city=${city}`)

    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};



// Book holiday
export const bookHoliday = (bookData) => {
  console.log(bookData);
  return instance.post(`${ENDPOINTS.BOOKHOLIDAY}`,bookData, { headers: authHeader() } )

  .then(res => console.log(res))
  .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log("server responded");
      } else if (error.request) {
        console.log("network error");
      } else {
        console.log(error);
      }
    });

}

// get UserReservations 
export const bookedHolidayByUser = (userName) => {
  return instance.get(`${ENDPOINTS.BOOKHOLIDAYBYUSER}${userName}`, { headers: authHeader() })

  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}

// get total price
export const getTotalPrice = (id) => {
  return instance.get(`${ENDPOINTS.HTOTALPRICE}${id}`)
  .then(res => {return(res.data.totalAmount)})
  .catch(err => console.log(err))
}