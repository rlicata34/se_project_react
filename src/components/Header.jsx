import { Link } from "react-router-dom";
import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return ( 
        <header className="header">
            <Link to="/" >
                <img src={logo} alt="logo" className="header__logo"  />
            </Link>
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <div className="header__container">
                <ToggleSwitch />
                <button type="button" className="header__add-clothes-button" onClick={handleAddClick}>+ Add clothes</button>
                <Link to="/profile" className="header__link" >
                    <p className="header__username">Terrence Tegegne</p>
                    <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
                </Link>
            </div>
        </header>
     );
}

export default Header;