
import "./footer.scss";
import React , {useContext} from "react";
import logo from "../../assets/logoWhite.png"
import { DarkModeContext } from '../../context/DarkMode';

const  Footer =()=> {
    const { toggleDarkMode, darkMode } = useContext(DarkModeContext);
    return (
        <>
            <footer className={` footer${darkMode}`}>
                <div className="logo">
                    <img src={logo}></img>
                </div>
                <div className="copyright">
                    <p>© 2022 Copyright: <span>  ITI Project</span></p>
                </div>
            </footer>

        </>
    )
}
export default Footer;