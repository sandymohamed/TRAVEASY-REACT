import { useEffect, useState } from 'react';
import './bookHotel.scss';
import AOS from 'aos';
import "aos/dist/aos.css"
import { bookHotel, deleteHotelFeedback, getHotelById, getHotelFeedback } from '../../../services/hotelsServ';
import { useParams } from 'react-router-dom'
import BookForm from '../../Shared/BookForm/BookForm';
import { useSelector } from 'react-redux';
import ImgSlider from '../../Shared/Slider/ImgSlider';
import HotelDetails from '../../Shared/hotelDetails/HotelDetails';
import PostFeedback from '../../Shared/PostFeedback/PostFeedback';
import { setFormatDate } from '../../../services/DateformatService';
import { ToastContainer, toast } from 'react-toastify';
const BookHotel = () => {
  // hotel id
  const { id } = useParams()
  const [feedback, setFeedback] = useState([])
  const [price, setPrice] = useState(null)
  const userId = useSelector((({ AuthReducer }) => AuthReducer.user.id))
  const username = useSelector((({ AuthReducer }) => AuthReducer.user.username))
  let user = (userId) ? userId : null
  const userName = (username) ? username : null
  const initialValues = {
    // RoomCount: "",
    AdultCount: "",
    Child: "",
    // Period: "",
    Single: "",
    Double: "",
    IsApprove: false,
    Paid: false,
    startDate: "",
    endDate: "",
    Hotels: `${id}`,
    Tourist: `${user}`,
    // totalPrice:0

    // Guide: `${user}`
  };

  const handleDelete = (id, user) => {
    deleteHotelFeedback(id)
    toast(`Deleted Successfully!`);

  }

  useEffect(() => {
    AOS.init();
    getHotelFeedback(id).then(res => setFeedback(res))
    getHotelById(`${id}`).then((res) => setPrice(res.Price))
  }, [feedback])
  return (
    <section className='hotelBook'>
      <div className='container'>
        <section className=" center" data-aos="fade-up" data-aos-delay="100">
          <HotelDetails hotelId={id} />
        </section>
        <section className=" center" data-aos="fade-up" data-aos-delay="200">
          <BookForm initialValues={initialValues} id={id} bookHotel={bookHotel} price={price} />
        </section>
        <div className='feedback-container'>
          <div className='row'>
            <div className='col-md-6'>
              <section className="feedbacks " data-aos="fade-up" data-aos-delay="200">
                <label>Hotel Feedbacks</label>
                {
                  (feedback) && (
                    feedback.map((item, i) => {
                      return (<div className='feedback-card fw-semibold position-relative mb-2' key={i}>
                        {

                          (item.Tourist) ?
                            (item.Tourist.username === userName) ? (<button
                              className='btn btn-danger position-absolute end-0 me-5'
                              onClick={() => handleDelete(item._id, item.Tourist.username)}
                            >delete</button>
                            ) : null
                            : null
                        }
                        <ToastContainer />

                        {(item.Tourist) && (<h4>{item.Tourist.username}</h4>)}
                        <p className='text-secondary '>{item.Description}</p>
                        {/* <p className='text-end fst-italic'><span >{format(new Date(item.createdAt), 'dd/mm/yyyy')}</span></p> */}
                        <p className='text-end fst-italic'><span >{setFormatDate(item.createdAt)}</span></p>
                        <hr />
                      </div>)
                    })
                  )
                }
              </section>
            </div>
            <div className='col-md-6'>
              <section className=" center" data-aos="fade-up" data-aos-delay="200">
                <PostFeedback
                  hotelId={id}
                  userId={user}
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};
export default BookHotel;