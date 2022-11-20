

import "./serviceSection.scss"
import { Link, NavLink } from "react-router-dom"
import { useContext } from "react";
import { DarkModeContext } from "../../../context/DarkMode";


function ServiceSection(props) {

    const { toggleDarkMode, darkMode } = useContext(DarkModeContext);

    return (
        <>

            <section id="flight" >
                <div className={`service_container  s${darkMode}`}
                >
                    {/* {`services s${darkMode}`} */}
                    <section className='services'>

                        {/* --------------: Hotel :-------------- */}
                        <NavLink className="nav__link" to="/hotels" activeClassName="active">
                            <div className={` serviceItem services_hotels s${darkMode} `}>
                                <div className='icon'>
                                    <i className="fa-solid fa-hotel"></i>
                                </div>
                                <span>Hotels</span>
                            </div>

                        </NavLink>

                        {/* --------------: Flight :-------------- */}

                        <NavLink className="nav__link" to="/flight" activeClassName="active">
                            <div className={`serviceItem services_flights  s${darkMode}`}>
                                <div className='icon'>
                                    <i className="fa-solid fa-plane"></i>
                                </div>
                                <span>Flights</span>
                            </div>

                        </NavLink>
                        {/* --------------: Holiday :-------------- */}

                        <NavLink className="nav__link " to="/holidays" activeClassName="active">

                            <div className={`serviceItem services_holiday s${darkMode}`}>
                                <div className='icon'>
                                    <i className="fa-solid fa-suitcase-rolling"></i>
                                </div>
                                <span>Holiday</span>
                            </div>

                        </NavLink>
                        {/* --------------: TourGuid :-------------- */}

                        {/* <NavLink className="nav__link" to="/TourGuiding" activeClassName="active">
                            <div className=' serviceItem services_tourGuide'>
                                <div className='icon'>
                                    <i className="fa-solid fa-language"></i>
                                </div>
                                <span>Tour Guide</span>
                            </div>

                        </NavLink> */}




                    </section>
                    <section>
                        {props.serviceSection}
                    </section>

                </div>


            </section>



        </>

    )
}

export default ServiceSection;