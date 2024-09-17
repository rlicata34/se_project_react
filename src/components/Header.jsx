import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import avatar from "../assets/avatar.png"

function Header() {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return ( 
        <header className="header">
            <img src={logo} alt="logo" className="header__logo" />
            <p className="header__date-and-location">{currentDate}, LOCATION</p>
            <button className="header__add-clothes-button">+ Add clothes</button>
            <div className="header__user-container">
                <p className="header__username">Terrence Tegegne</p>
                <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
            </div>
        </header>
     );
}

export default Header;