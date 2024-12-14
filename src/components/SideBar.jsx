import avatar from "../assets/avatar.png";
import "../blocks/SideBar.css";

function Sidebar({ handleEditProfileClick,handleLogout }) {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogout();
    }

    return ( 
        <div className="sidebar">
            <div className="sidebar__header">
                <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
                <p className="sidebar__username">Terrence Tegegne</p>
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