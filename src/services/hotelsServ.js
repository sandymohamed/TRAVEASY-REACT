import {ENDPOINTS} from '../utils/endPoints' 
import authHeader from './auth-header'
import {instance} from './authAPI'

// get all hotels 
export const getHotels = () => {
    return instance.get(`${ENDPOINTS.GETHOTELS}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}

// get limited hotels 
export const getHotelsLimit = () => {
  return instance.get(`${ENDPOINTS.GETHOTELS}/limit`)

  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}

// get hotel by id 
export const getHotelById = (id) => {
  return instance.get(`${ENDPOINTS.GETHOTELS}`+id, { headers: authHeader() })

  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}


// get hotel by name
export const getHotelByName = (name) => {
    return instance.get(`${ENDPOINTS.GETHOTELBYNAME}?hotelName=${name}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}

// get hotel by price
export const getHotelByPrice = (price) => {
    return instance.get(`${ENDPOINTS.GETHOTELBYPRICE}?price=${price}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}

// get hotels by it's rate
export const getHotelsByRate = (rate) => {
    return instance.get(`${ENDPOINTS.GETHOTELSBYRATE}?rate=${rate}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}

// get all hotels by city
export const getHotelsByCityName = (city) => {
    return instance.get(`${ENDPOINTS.GETHOTELSBYCITY}?city=${city}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}

// get total price
export const getTotalPrice = (id) => {
  return instance.get(`${ENDPOINTS.TOTALPRICE}${id}`)
  .then(res => {return(res.data.totalAmount)})
  .catch(err => console.log(err))
}




// get all cities 
export const getCities = () => {
    return instance.get(`${ENDPOINTS.GETCITIES}`)

    .then(res => {return(res.data)})
    .catch(err => console.log(err))
}



// book hotel
export const bookHotel = (bookData) => {
    console.log(bookData);
    return instance.post(`${ENDPOINTS.BOOKHOTEL}`,bookData, { headers: authHeader() })

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
export const bookedHotelByUser = (userName) => {
  return instance.get(`${ENDPOINTS.BOOKHOTELBYUSER}${userName}`, { headers: authHeader() })

  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}

// get hotel feedback
export const getHotelFeedback = (id) => {
  return instance.get(`${ENDPOINTS.GETFEEDBACKBYHOTELID}${id}`)
  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}

// post feedback
export const postFeedback = (feedback) => {
  console.log(feedback);
  return instance.post(`${ENDPOINTS.POSTFEEDBACK}`,feedback, { headers: authHeader() })

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

export const deleteHotelFeedback = (id) => {
  return instance.delete(`${ENDPOINTS.POSTFEEDBACK}${id}`, { headers: authHeader() })
  .then(res => {return(res.data)})
  .catch(err => console.log(err))
}