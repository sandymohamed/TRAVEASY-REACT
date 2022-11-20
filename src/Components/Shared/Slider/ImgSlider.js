import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getHolidayById } from '../../../services/holidaysServ';
import { getHotelById } from '../../../services/hotelsServ';
import './imgSlider.scss'

function ImgSlider({hotelId}) {

    const [imgs, setImgs] = useState([])


    useEffect(()=>{
        console.log(hotelId);
        getHotelById(`${hotelId}`).then((res)=>setImgs(res.ImgURL))
        console.log(imgs);
      getHolidayById(`${hotelId}`).then((res)=>setImgs(res.ImgURL))
    },[])

  return (
    <Carousel className='mySlider'>
      {
        (imgs)?(
          imgs.map((item, i)=> (
            <Carousel.Item className="item" key={i}>
            <img
              className="d-block w-100"
              src={item}
              alt="First slide"
            />
          </Carousel.Item>
          ))
        ): (<>
        <Carousel.Item className="item">
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/buildings-modern-hotels-miami-summer-time_107791-2508.jpg?size=626&ext=jpg&uid=R16902548&ga=GA1.2.1932154363.1665712397&semt=sph"
          alt="Second slide"
        />

      </Carousel.Item>

      <Carousel.Item className="item">
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/kids-aquapark-amusement-aqua-park-attractions_107791-1465.jpg?size=626&ext=jpg&uid=R16902548&ga=GA1.2.1932154363.1665712397&semt=sph"
          alt="Third slide"
        />
        </Carousel.Item>
        </>)
      }

{/* 
      <Carousel.Item className="item">
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/buildings-modern-hotels-miami-summer-time_107791-2508.jpg?size=626&ext=jpg&uid=R16902548&ga=GA1.2.1932154363.1665712397&semt=sph"
          alt="Second slide"
        />

      </Carousel.Item>

      <Carousel.Item className="item">
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-vector/kids-aquapark-amusement-aqua-park-attractions_107791-1465.jpg?size=626&ext=jpg&uid=R16902548&ga=GA1.2.1932154363.1665712397&semt=sph"
          alt="Third slide"
        />

      </Carousel.Item> */}
    </Carousel>
  );
}

export default ImgSlider;