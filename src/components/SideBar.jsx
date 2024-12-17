import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/SideBar.css";

function Sidebar({ handleEditProfileClick,handleLogout }) {
    const { currentUser } = useContext(CurrentUserContext);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogout();
    }

    return ( 
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={currentUser.avatar} alt={currentUser.name} className="sidebar__avatar" />
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            <button  
                type="button" 
                className="sidebar__button-edit" 
                onClick={handleEditProfileClick} 
            >
                Change profile data
            </button>
            <button 
                type="submit" 
                className="sidebar__button-logout" 
                onClick={handleSubmit} 
            >
                Log out
            </button>
        </div>
    );
}

export default Sidebar;