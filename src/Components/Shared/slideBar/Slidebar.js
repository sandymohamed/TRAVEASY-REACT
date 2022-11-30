
import "./slideBar.scss"

import { useContext, useState } from "react";
import { DarkModeContext } from "../../../context/DarkMode";

function SlideBar({ serviceFilter, setPrice, filterHotels}) {
    const { toggleDarkMode, darkMode } = useContext(DarkModeContext);

    const [myMax, setMyMax] = useState(10000)

    return (
        <>
            <section  className={`slidebar  slidebar${darkMode}`}>
                <h4>Filters</h4>
                <div className='slidebar_container'>

                    <section className='filter priceFilter'>

                        <span>Price</span>

                        {/* <MultiRangeSlider
                            min={0}
                            max={myMax}
                            onChange={({ max }) =>{ setPrice(max) }}  
                                                  /> */}

                        <div>
                            <input type="radio" name="priceFilter" id="priceFilter1"  onChange={() =>{ setPrice(2500) ; setMyMax(2500)}} />
                            <label htmlFor="priceFilter1">
                                0- 2500 <small>L.E</small>
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="priceFilter" id="priceFilter2"  onChange={() =>{ setPrice(5000) ; setMyMax(5000)}} />
                            <label htmlFor="priceFilter2">
                                5000 <small>L.E</small>
                            </label>
                        </div>
                        <div>
                            <input type="radio" name="priceFilter" id="priceFilter3"  onChange={() =>{ setPrice(10000) ; setMyMax(10000)}} />
                            <label htmlFor="priceFilter3">
                                10000 <small>L.E</small>
                            </label>
                        </div>
                        <button className="find" onClick={() => filterHotels('price')}> find</button>

                    </section>
                    <section className='filter serviceFilter'>
                        {serviceFilter}
                    </section>
                </div>
            </section>


        </>

    )
}

export default SlideBar;