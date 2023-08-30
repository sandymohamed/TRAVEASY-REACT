import './vcard.scss';
import dummyImg from '../../../assets/card/dummy-image.jpg';
import { useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../../context/DarkMode';
import { getImage } from '../../../services/hotelsServ';

function Vcart({ link, title, city, description, Evaluation, Price, hotelId, img }) {
  
  const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
  const [imgs, setImgs] = useState(null);

  useEffect(() => {
    
    AOS.init();
    getImage(`${img}`).then((res=> setImgs(res)))

  }, []);

  return (
    <section id="vcart" className={`v${darkMode} m-2`}>
      <div
        className={` cartBody `}>
        <div
          className="cartBody_img"
          data-aos="fade-up"
          data-aos-delay="300">
          <img
          // src={imgs? imgs[0]?.url :dummyImg}
          src={dummyImg}
            alt={title}></img>
        </div>
        <article
          className="cartBody_details"
          data-aos="zoom-out"
          data-aos-delay="200">
          <h3>{title}</h3>
          <div className="cartBody_details_data">
            <div className="cartBody_details_data_text">
              <span className="spanMajor">{city}</span>
              <span className="spanMinor">{description}</span>
              <span className=" review spanMinor"> {Evaluation} <i className="fa-solid fa-star"></i></span>
            </div>
            <div className="cartBody_details_data_price">
              <span className="stars">price: </span>
              <span className="itemPrice">{Price}</span>
              <span className="priceCurrency">$</span>
            </div>
          </div>
          <button className="primaryBtn">
            <Link to={link}>Details</Link>
          </button>
        </article>
      </div>
    </section>
  );
}
export default Vcart;
