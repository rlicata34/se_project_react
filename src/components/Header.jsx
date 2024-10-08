import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return ( 
        <header className="header">
            <img src={logo} alt="logo" className="header__logo" />
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <div className="header__container">
                <ToggleSwitch />
                <button type="button" className="header__add-clothes-button" onClick={handleAddClick}>+ Add clothes</button>
                <p className="header__username">Terrence Tegegne</p>
                <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
            </div>
        </header>
     );
}

export default Header;