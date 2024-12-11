import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/Header.css"
import logo from "../assets/logo.svg"
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, handleSignUpClick, handleSignInClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
    const { currentUser } = useContext(CurrentUserContext);
    const isLoggedIn = !!currentUser?.email; // Check if email exists

    const generatePlaceholder = (name) => {
        const firstLetter = name?.charAt(0).toUpperCase() || "?";
        return (
            <div className="header__avatar-placeholder">
                {firstLetter}
            </div>
        );
    };

    return ( 
        <header className="header">
            <Link to="/" >
                <img src={logo} alt="logo" className="header__logo"  />
            </Link>
            <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
            <div className="header__container">
                <ToggleSwitch />
                {isLoggedIn ? (
                    <>
                        <button
                        type="button"
                        className="header__add-clothes-button"
                        onClick={handleAddClick}
                        >
                        + Add clothes
                        </button>
                        <Link to="/profile" className="header__link">
                        <p className="header__username">{currentUser.name}</p>
                        {currentUser.avatar ? (
                            <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="header__avatar"
                            />
                        ) : (
                            generatePlaceholder(currentUser.name)
                        )}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="header__sign-up-link">
                            <button
                                type="button"
                                className="header__sign-up-button"
                                onClick={handleSignUpClick}
                            >
                                Sign Up
                            </button>
                        </Link>
                        <Link to="/signin" className="header__sign-in-link">
                            <button
                                type="button"
                                className="header__sign-in-button"
                                onClick={handleSignInClick}
                            >
                                Sign In
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </header>
     );
}

export default Header;