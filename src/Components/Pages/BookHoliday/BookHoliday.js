import { useEffect, useState } from 'react';
import style from './bookHoliday.module.scss';
import AOS from 'aos';
import "aos/dist/aos.css"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getHolidayById } from '../../../services/holidaysServ';
import HolidayForm from '../../Shared/holidayForm/HolidayForm';
const BookHoliday = () => {
    // hotel id
    const { id } = useParams()
    const [holiday, setHoliday] = useState({})
    const [price, setPrice] = useState(null)

    const userId = useSelector((({ AuthReducer }) => AuthReducer.user.id))  
    let user = (userId) ? userId : null

    const initialValues = {
        RoomCount: "",
        AdultCount: "",
        Child: "",
        Period: "",
        Transport: "",
        IsApprove: false,
        Paid: false,
        startDate: "",
        endDate: "",
        Holidays: `${id}`,
        Tourist: `${user}`,
        // Guide: `${user}``
    };

    useEffect(() => {
        AOS.init();
        getHolidayById(id).then(res => setHoliday(res))
        getHolidayById(`${id}`).then((res) => setPrice(res.Price))
    }, [])
    return (
        <section className='bookHoliday'>
            <div className='container'>
            <div className='d-block book-container'>
                {/* <section className='slider m-0 p-0'>
                    <ImgSlider hotelId={id} />
                </section> */}
                <section className="formCard center" data-aos="fade-up" data-aos-delay="100">
                    <div className='det-container' data-aos="fade-out" data-aos-delay="400">
                        {(holiday) && (
                            <>
                                {(holiday.City) && (<h3>{holiday.City.City_Name}</h3>)}
                                <p>{holiday.Evaluation} stars holiday</p>
                                <p>{holiday.Period} days</p>
                                <p>{holiday.Description}</p>
                                <p>Price: {holiday.Price}$</p>
                            </>
                        )}
                    </div>
                </section>
                <br />
                <section className={`${style.bookCard}`} data-aos="fade-up" data-aos-delay="200">
                    <HolidayForm initialValues={initialValues} id={id} price={price} />
                </section>
            </div>
            </div>
        </section>
    );
};
export default BookHoliday;