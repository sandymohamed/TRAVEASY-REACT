import { useEffect, useState, useContext } from 'react';

import AOS from 'aos';
import "aos/dist/aos.css"
import Form from 'react-bootstrap/Form';
import './holidayForm.scss';
import { checkPeriod, handleValidate } from '../../../services/handleForm';
import { bookHoliday } from '../../../services/holidaysServ';
import Payment from '../../Payment/Payment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../../../context/DarkMode';
import StripePayment from '../Stripe/StripePayment';


const HolidayForm = ({ initialValues, price }) => {
    const { toggleDarkMode, darkMode } = useContext(DarkModeContext);

    const [values, setValues] = useState(initialValues);
    const [paid, setPaid] = useState(false)
    const [total, setTotal] = useState(null);


    const [err, setErr] = useState({
        RoomCountErr: null,
        AdultCountErr: null,
        ChildErr: null,
        // PeriodErr: null,
        TransportErr: null,
        IsApproveErr: null,
        startDateErr: null,
        endDateErr: null,
        HotelsErr: null,
        TouristErr: null,
        globalErr: null


    })

    let holidayData = {
        roomCount: values.RoomCount,
        adultCount: values.AdultCount,
        child: values.Child,
        // period: values.Period,
        transport: values.Transport,
        isApprove: false,
        paid: paid,
        startDate: values.startDate,
        endDate: values.endDate,
        holidays: values.Holidays,
        tourist: values.Tourist,
    }


    const handleInputChange = (e) => {
        handleValidate(e, values, setValues, err, setErr)

    };

    const handleFocus = (e) => {
        calcTotal()

    }

    const calcTotal = () => {

        if (Number(checkPeriod(values.startDate, values.endDate)) >= 1
            && Number(values.RoomCount) >= 1) {
            setTotal(Number(values.RoomCount) * Number(checkPeriod(values.startDate, values.endDate)) * Number(price))

        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        handleValidate(e)


        if (err.globalErr === null) {
            bookHoliday(holidayData)
            toast("booked successfully check your email!");
        }

    }

    useEffect(() => {
        AOS.init();
    }, [paid])


    return (<>
        <div className={`holidayForm holiday${darkMode}`}>
            <Form onSubmit={(e) => { handleSubmit(e) }} className="my-form row">
                <h2>Book Now</h2>


                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicStart">
                    <Form.Label >Start date</Form.Label>
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
                    <Form.Label >End date</Form.Label>
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

                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
                    <Form.Label >Room Count </Form.Label>
                    <Form.Control required type="number" min="0" placeholder="Enter Room Count" value={values.RoomCount} name="HRoomCount"
                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => handleInputChange(e)} />
                    <Form.Text className="text-danger">
                        {err.RoomCountErr}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicAdultCount">
                    <Form.Label >Adult Count </Form.Label>
                    <Form.Control required type="number" min="0" name="AdultCount"
                        placeholder=" Enter Adult Count" value={values.AdultCount}
                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => handleInputChange(e)} />
                    <Form.Text className="text-danger">
                        {err.AdultCountErr}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicRoomCount">
                    <Form.Label >Child Count </Form.Label>
                    <Form.Control required type="number" min="0" name="Child"
                        placeholder="Enter Child Count" value={values.Child}
                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => handleInputChange(e)} />
                    <Form.Text className="text-danger">
                        {err.ChildErr}
                    </Form.Text>
                </Form.Group>


                {/* 
                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicPeriod">
                    <Form.Label >Days Number</Form.Label>
                    <Form.Control required type="Number" min="0" name="Period"
                        placeholder="Enter Days Number" value={values.Period} 
                        onFocus={(e)=> handleFocus(e)}
                        onChange={(e) => handleInputChange(e)} />
                    <Form.Text className="text-danger">
                        {err.PeriodErr}
                    </Form.Text>
                </Form.Group> */}

                <Form.Group className="col-md-3 inputContainer" data-aos="fade-up" data-aos-delay="400" controlId="formBasicSingle">
                    <Form.Label >Transport: </Form.Label>
                    <Form.Check name="Transport"
                        value='Flight'
                        type='radio'
                        id='Flight'
                        label='Flight '

                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <Form.Check name="Transport"
                        value='Bus'
                        type='radio'
                        id='Bus'
                        label='Bus'

                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                    <Form.Check name="Transport"
                        value='Car'
                        type='radio'
                        id='Car'
                        label='Car'

                        onFocus={(e) => handleFocus(e)}
                        onChange={(e) => { handleInputChange(e) }}
                    />
                </Form.Group>

                <Form.Text className="text-danger">
                    {err.globalErr}
                </Form.Text>
                <div className='bookAction'>
                    <div className='price'>
                        <span>Total price: {total}</span>
                    </div>
                    <div className='booking'>
                        {/* <Payment paid={paid} setPaid={setPaid} /> */}
                        <div>
              <button type="button" className='pay-button'
               onClick={(e)=> 
                {e.preventDefault(); 
                setPaid(true)}}
                >
              <StripePayment  />

              </button>

              <input
              type="checkbox"
              className="btn btn-info fs-4"
              name="pay"
              onChange={() => {setPaid(false);}}
              />
             <label className="text-primary fs-5">Pay Later</label> 
              </div>

                        <button className="primaryBtn " type="submit"> Book</button>
                        <ToastContainer />

                    </div>
                </div>

            </Form>


        </div>
    </>
    );
};

export default HolidayForm;