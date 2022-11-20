// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { bookedHolidayByUser } from '../../../services/holidaysServ';
// import { bookedHotelByUser } from '../../../services/hotelsServ';
// import { format } from 'date-fns'

// import './userReservations.scss';

// const UserHolidayRes = () => {

 
//     const [holidayReservations, setTReservations]= useState([])

//     const userId = useSelector((({ AuthReducer }) => AuthReducer.user.id))

//   let user = (userId) ? userId : null

//     useEffect(()=>{
     
//         bookedHolidayByUser(user).then(res =>setTReservations(res) )
//         console.log(holidayReservations);

//     },[])
//     return (
//         <>
//        <h1>My Reservations</h1>
        
//        <section className="formCard " >
//         <h1 className='text-center'>Holidays Reservations</h1>
//         {
//             (holidayReservations)&&(
//                 holidayReservations.map((item,i)=>(

//                     <div className='reservation-card fs-6'>
//                      <p className='text-end'>createdAt: {format(new Date(item.createdAt),  'dd/mm/yyyy')}</p>
                    
//                     <p>Confirmation of Acceptance: {`${item.IsApprove}`}</p>
//                     <p>Period: {item.Period}</p>
//                     <p>RoomCount: {item.RoomCount}</p>
//                     <p>Transport: {item.Transport}</p>
//                     <p>startDate: {item.startDate}</p>
//                     <p>endDate: {item.endDate}</p>
//                     <p className='text-end'>updatedAt:{format(new Date(item.updatedAt),  'dd/mm/yyyy')}</p>



//                 </div>
//                 ))
             
//             )
//         }
//         </section>
//         </>
//     );
// };

// export default UserHolidayRes;