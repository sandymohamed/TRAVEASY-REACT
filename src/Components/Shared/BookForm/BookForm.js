import { useEffect, useState, useContext } from 'react';
import './bookForm.scss';

import AOS from 'aos';
import "aos/dist/aos.css"
import Form from 'react-bootstrap/Form';
import { handleValidate } from '../../../services/handleForm';
import { getTotalPrice } from '../../../services/hotelsServ';
import Payment from '../../Payment/Payment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../../../context/DarkMode';


const BookForm = ({ initialValues, bookHotel, id, price }) => {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const [values, setValues] = useState(initialValues);
  const [total, setTotal] = useState(null);
  const [paid, setPaid] = useState(false)

  const [err, setErr] = useState({
    RoomCountErr: null,
    AdultCountErr: null,
    ChildErr: null,
    PeriodErr: null,
    SingleErr: null,
    DoubleErr: null,
    IsApproveErr: null,
    startDateErr: null,
    endDateErr: null,
    HotelsErr: null,
    TouristErr: null,
    // GuideErr: null,
    globalErr: null


  })

  let hotelData = {
    roomCount: values.RoomCount,
    adultCount: values.AdultCount,
    child: values.Child,
    period: values.Period,
    single: values.Single,
    double: values.Double,
    isApprove: false,
    paid: paid,
    startDate: values.startDate,
    endDate: values.endDate,
    hotels: values.Hotels,
    tourist: values.Tourist,
    // guide: values.Guide
  }




  const handleInputChange = (e) => {
    handleValidate(e, values, setValues, err, setErr)


  };

  const calcTotal = () => {

    setTotal(Number(values.RoomCount) * Number(values.Period) * Number(price))
    console.log(total)

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleValidate(e)


    if (err.globalErr === null) {
      bookHotel(hotelData)
      toast("booked successfully check your email!");
    }

    //   getTotalPrice(id).then((res) => setTotal(res));

  }

  useEffect(() => {
    AOS.init();
  }, [paid])


  return (
    <>
   
   <div className={`bookForm book${darkMode}`}>
        <Form onSubmit={(e) => { handleSubmit(e) }} className="my-form row">
          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicSingle">
            <Form.Label >Single Room Count</Form.Label>
            <Form.Control required type="number" min="0" name="Single"
              placeholder="Single Room Count" value={values.Single} onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.SingleErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicDouble">
            <Form.Label >Double Room Count</Form.Label>
            <Form.Control required type="number" min="0" name="Double"
              placeholder="Double  Room Count" value={values.Double} onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.DoubleErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
            <Form.Label >Room Count </Form.Label>
            <Form.Control required type="number" min="0" placeholder="Enter Room Count" value={values.RoomCount} name="RoomCount" onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.RoomCountErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicAdultCount">
            <Form.Label >Adult Count </Form.Label>
            <Form.Control required type="number" min="0" name="AdultCount"
              placeholder=" Enter Adult Count" value={values.AdultCount} onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.AdultCountErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
            <Form.Label >Child Count </Form.Label>
            <Form.Control required type="number" min="0" name="Child"
              placeholder="Enter Child Count" value={values.Child} onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.ChildErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicStart">
            <Form.Label >Start date</Form.Label>
            <Form.Control required type="date"
              value={values.startDate}
              name="startDate"
              placeholder="Start Date"
              onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.startDateErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicEnd">
            <Form.Label >End date</Form.Label>
            <Form.Control required type="date"
              value={values.endDate}
              name="endDate"
              placeholder="Enter End Date"
              onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.endDateErr}
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicPeriod">
            <Form.Label >Days Number</Form.Label>
            <Form.Control required type="Number" min="0" name="Period"
              placeholder="Enter Days Number" value={values.Period} onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.PeriodErr}
            </Form.Text>
          </Form.Group>

          <Form.Text className="text-danger">
            {err.globalErr}
          </Form.Text>
          <div className='bookAction'>
            <div className='price'>
              <button type="button" className="orangeBtn" onClick={() => { calcTotal() }} > calc total price</button>
              <h2>Total price: {total}</h2>

            </div>
            <div className='booking'>
              <Payment paid={paid} setPaid={setPaid} />
              <button className="primaryBtn" type="submit"> Book</button>
              <ToastContainer />

            </div>

          </div>

        </Form>
      </div>

    </>
  );
};

export default BookForm;