import { useEffect, useState, useContext } from 'react';
import './bookForm.scss';

import AOS from 'aos';
import "aos/dist/aos.css"
import Form from 'react-bootstrap/Form';
import { checkPeriod, handleValidate } from '../../../services/handleForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../../../context/DarkMode';
import StripePayment from '../Stripe/StripePayment';


const BookForm = ({ initialValues, bookHotel, id, price }) => {
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const [values, setValues] = useState(initialValues);
  const [total, setTotal] = useState(null);
  const [paid, setPaid] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [err, setErr] = useState({
    // RoomCountErr: null,
    AdultCountErr: null,
    ChildErr: null,
    // PeriodErr: null,
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
    // roomCount: values.RoomCount,
    adultCount: values.AdultCount,
    child: values.Child,
    // period: values.Period,
    single: values.Single,
    double: values.Double,
    isApprove: false,
    paid: paid,
    startDate: values.startDate,
    endDate: values.endDate,
    hotels: values.Hotels,
    tourist: values.Tourist,
    // totalPrice:values.totalPrice
    // guide: values.Guide
  }




  const handleInputChange = (e) => {
    handleValidate(e, values, setValues, err, setErr, price)

  };
  const handleFocus = (e) => {
    calcTotal()

  }

  const calcTotal = () => {
    if (Number(checkPeriod(values.startDate, values.endDate)) >= 1
      && Number(values.Single + values.Double) >= 1) {
      setTotal(Number(values.Single + values.Double) * Number(checkPeriod(values.startDate, values.endDate)) * Number(price))
    }

  }
  const handleShowForm = () => {
    setShowForm(!showForm)
  }
  const handleSubmit = (e, price) => {
    e.preventDefault()
    handleValidate(e, price)


    if (err.globalErr === null) {
      bookHotel(hotelData)
      toast("booked successfully check your email!");
    }

  }

  useEffect(() => {
    AOS.init();

  }, [paid, total, values.startDate, values.endDate, values.Double, values.Single, values])


  return (
    <>

      <div className={`bookForm book${darkMode}`}>
        <div className='showForm'>
          <button className='orangeBtn' onClick={handleShowForm}> Booking Now</button>


          <Form onSubmit={(e) => { handleSubmit(e, price) }} className={`my-form row ${showForm ? 'd-none' : ''}`}>
            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicStart">
              <Form.Label > Check in</Form.Label>
              <Form.Control required type="date"
                value={values.startDate}
                name="startDate"
                placeholder="Start Date"
                onFocus={(e) => handleFocus(e)}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.startDateErr}
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicEnd">
              <Form.Label >Check out</Form.Label>
              <Form.Control required type="date"
                value={values.endDate}
                name="endDate"
                placeholder="Enter End Date"
                onFocus={(e) => handleFocus(e)}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.endDateErr}
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicSingle">
              <Form.Label >Single Room Count</Form.Label>
              <Form.Control required type="number" min="0" name="Single"
                onFocus={(e) => handleFocus(e)} placeholder="Single Room Count" value={values.Single}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.SingleErr}
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicDouble">
              <Form.Label >Double Room Count</Form.Label>
              <Form.Control required type="number" min="0" name="Double"
                onFocus={(e) => handleFocus(e)} placeholder="Double  Room Count" value={values.Double}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.DoubleErr}
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
            <Form.Label >Room Count </Form.Label>
            onFocus={(e)=>handleFocus(e)}<Form.Control required type="number" min="0" placeholder="Enter Room Count" value={values.RoomCount} name="RoomCount" 
            onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.RoomCountErr}
            </Form.Text>
          </Form.Group> */}

            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicAdultCount">
              <Form.Label >Adult Count </Form.Label>
              <Form.Control required type="number" min="0" name="AdultCount"
                onFocus={(e) => handleFocus(e)} placeholder=" Enter Adult Count" value={values.AdultCount}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.AdultCountErr}
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
              <Form.Label >Child Count </Form.Label>
              <Form.Control required type="number" min="0" name="Child"
                onFocus={(e) => handleFocus(e)} placeholder="Enter Child Count" value={values.Child}
                onChange={(e) => handleInputChange(e)} />
              <Form.Text className="text-danger">
                {err.ChildErr}
              </Form.Text>
            </Form.Group>



            {/* <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicPeriod">
            <Form.Label >Days Number</Form.Label>
            <Form.Control required type="Number" min="0" name="Period"
              onFocus={(e)=>handleFocus(e)}placeholder="Enter Days Number" value={values.Period} 
              onChange={(e) => handleInputChange(e)} />
            <Form.Text className="text-danger">
              {err.PeriodErr}
            </Form.Text>
          </Form.Group> */}

            <Form.Text className="text-danger">
              {err.globalErr}
            </Form.Text>
            <div className='bookAction'>
              <div className='price'>
                {/* <button type="button" className="orangeBtn" onClick={() => { calcTotal() }} > calc total price</button> */}
                <span className='title'>Total price</span>
                <span className='total'> {total } <span>L.E</span></span>

            </div>
            <div className='booking p-4'>
              {/* <Payment paid={paid} setPaid={setPaid} /> */}
          <div>
                <button type="button" className='pay-button'
                  onClick={(e) => {
                    e.preventDefault();
                    setPaid(true)
                  }}
                >
                  <StripePayment />

              </button>

              <input
              type="checkbox"
              className="btn btn-info fs-4"
              name="pay"
              onChange={() => {setPaid(false);}}
              />
             <label className="text-primary fs-5">Pay Later</label> 
              </div>
           
              
              <button className="primaryBtn" type="submit"> Book</button>
              <ToastContainer />

              </div>

            </div>

          </Form>
        </div>
      </div>

    </>
  );
};

export default BookForm;