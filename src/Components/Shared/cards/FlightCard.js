import './flightcard.scss';
import dummyImg from '../../../assets/card/dummy-image.jpg';
import { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { bookedFlight } from '../../../services/FlightService';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Payment from '../../Payment/Payment';
import { DarkModeContext } from '../../../context/DarkMode';



function FlightCard({ Flightobj, setIsBook }) {
  useEffect(() => {
    AOS.init();
  }, []);
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);

  let DepartureDate = new Date(Flightobj.DepartureDate);
  let ReturnDate = new Date(Flightobj.ReturnDate);
  /* Date format you have */
  let DepartureDateMDY = `${DepartureDate.getDate()}-${DepartureDate.getMonth() + 1
    }-${DepartureDate.getFullYear()}`;
  let ReturnDateMDY = `${ReturnDate.getDate()}-${ReturnDate.getMonth() + 1}-${ReturnDate.getFullYear()}`;
  /* Date converted to MM-DD-YYYY format */

  let { isLoggedIn, user } = useSelector(({ AuthReducer }) => AuthReducer);
  const history = useHistory();
  // Function Booking
  const FunctionBooking = () => {
    if (!isLoggedIn) {
      toast.info(`Login is requrid`, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        history.push('/login');
      }, 3000);

    }

    try {
      bookedFlight(user.id, Flightobj._id, PassportNumber, paid).then((res) => res);
      setIsBook(true);
      setShowBook(false);
      toast.success(`booking confirmed`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [show, setShow] = useState(false);
  const [ShowBook, setShowBook] = useState(false);
  const [paid, setPaid] = useState(false)
  const [PassportNumber, setPassportNumber] = useState()
  const [errors, setErrors] = useState({
    PassportNumberErr: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowBook = () => setShowBook(true);
  const handleCloseBook = () => setShowBook(false);


  const regex = /^(?!^0+$)[a-zA-Z0-9]{7,20}$/;
  const changeDetails = (e) => {
    if (e.target.name === 'PassportNumber') {
      setPassportNumber(e.target.value);
      setErrors({
        PassportNumberErr: !regex.test(e.target.value) ? 'Invalid Passport Number.' : null,
      });
    }
  };


  const submitData = (e) => {
    e.preventDefault();


    if (!errors.PassportNumberErr) {
      try {
        FunctionBooking();
      } catch (error) {
        return toast.info(`Something Wrong! try again`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.info(`Something Wrong!`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

  };



  return (
    <>
      <section
        className={`flightCard flightCard${darkMode}`}
        data-aos="fade-up"
        data-aos-delay="20">

        <ToastContainer />
        <div className="cardBody">
          <div
            className="cardBody_img col-md-4 "
            data-aos="fade-up"
            data-aos-delay="50">
            <img
              src="https://w7.pngwing.com/pngs/901/129/png-transparent-hurghada-international-airport-cairo-borg-el-arab-airport-egyptair-airbus-a330-others-text-egypt-logo-thumbnail.png" //{dummyImg}
              alt="Item_Name"></img>
          </div>
          <article
            className="cardBody_details col-md-7 col-sm-12"
            data-aos="zoom-out"
            data-aos-delay="50">
            <div className="cardBody_details_data">
              <div className="spacer"></div>
              <div className="container">
                <span className="line">

                  - - - - - - -
                  <span className='icon'>

                    <i className="fa-solid fa-plane"></i>{' '}
                  </span>{' '}
                  - - - - - - -
                </span>
                <div className="container_data">
                  <div className="spacer"></div>
                  <div className="data">
                    <span className="data_from">{Flightobj.FlyingFrom}</span>
                    <span className="data_to">{Flightobj.FlyingTo}</span>
                  </div>
                </div>
              </div>

              <div className="container">
                <span className="line">
                  {' '}
                  - - - - - - -
                  <span className='icon'>
                    <i className="fa-solid fa-calendar-days"></i>
                  </span>{' '}
                  - - - - - - -
                </span>
                <div className="container_data">
                  <div className="data">
                    <span className="data_from">{DepartureDateMDY}</span>
                    <span className="data_to">{ReturnDateMDY}</span>
                  </div>
                </div>

              </div>




              <Button variant="primary" onClick={handleShowBook}
                className={Flightobj.NumberTickets > 0 ? "primaryBtn" : "orangeBtn"}
                disabled={Flightobj.NumberTickets > 0 ? false : true}
              >
                Booking
              </Button>
              <Button className="secondaryBtn" variant="primary" onClick={handleShow}>
                Details
              </Button>
            </div>
          </article>
        </div>
      </section>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>     </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="cardBody_details_data">
            <div className="spacer"></div>
            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                <span>
                  {' '}
                  <FontAwesomeIcon
                    className="fs-3"
                    icon={faPlane}
                  />{' '}
                </span>{' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="spacer"></div>
                <div className="data">
                  <p className="data_from"> FlyingFrom :  {Flightobj.FlyingFrom} </p>
                  <p className="data_to"> FlyingTo : {Flightobj.FlyingTo} </p>
                </div>
              </div>
            </div>

            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                </span>{' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="data">
                  <p className="data_from"> DepartureDate :  {DepartureDateMDY} </p>
                  <p className="data_to"> ReturnDate :  {ReturnDateMDY} </p>
                </div>
              </div>

            </div>
            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                {' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="data">
                  <p className="data_to"> Number Tickets : {Flightobj.NumberTickets}</p>
                  <p className="data_to"> Cabin Class : {Flightobj.CabinClass}</p>
                  <p className="data_to"> Price : {Flightobj.Price}</p>
                </div>
              </div>
            </div>
          </div>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>


      <Modal show={ShowBook} onHide={handleCloseBook}>
        <Modal.Header closeButton>
          <Modal.Title>  reservation confirmation   </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="cardBody_details_data">
            <div className="spacer"></div>
            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                <span>
                  {' '}
                  <FontAwesomeIcon
                    className="fs-3"
                    icon={faPlane}
                  />{' '}
                </span>{' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="spacer"></div>
                <div className="data">
                  <p className="data_from"> FlyingFrom :  {Flightobj.FlyingFrom} </p>
                  <p className="data_to"> FlyingTo : {Flightobj.FlyingTo} </p>
                </div>
              </div>
            </div>

            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                <span>
                  <i className="fa-solid fa-calendar-days"></i>
                </span>{' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="data">
                  <p className="data_from"> DepartureDate :  {DepartureDateMDY} </p>
                  <p className="data_to"> ReturnDate :  {ReturnDateMDY} </p>
                </div>
              </div>

            </div>
            <div className="container">
              <span className="line">
                {' '}
                - - - - - - -
                {' '}
                - - - - - - -
              </span>
              <div className="container_data">
                <div className="data">
                  <p className="data_to"> NumberTickets : {Flightobj.NumberTickets}</p>
                  <p className="data_to"> CabinClass : {Flightobj.CabinClass}</p>
                  <p className="data_to"> Price : {Flightobj.Price}</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => submitData(e)}>
              <div>
                <label
                  htmlFor="PassportNumber"
                  className="form-label">
                  PassportNumber
                </label>
                <input
                  type="PassportNumber"
                  className={`form-control ${errors.PassportNumberErr && 'border-danger'} `}
                  name="PassportNumber"
                  value={PassportNumber}
                  onChange={(e) => changeDetails(e)}
                />

                <p className="text-danger"> {errors.PassportNumberErr} </p>
                <div className="d-flex flex-column align-items-center">
                  <button
                    className={Flightobj.NumberTickets > 0 ? "primaryBtn" : "orangeBtn"}
                    disabled={errors.usernameErr || Flightobj.NumberTickets > 0 ? false : true}
                    type="submit">
                    Booking
                  </button>

                </div>
              </div>
            </form>



            <Payment paid={paid} setPaid={setPaid} />

          </div>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBook}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>


    </>
  );
}
export default FlightCard;
