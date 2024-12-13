import avatar from "../assets/avatar.png";
import "../blocks/SideBar.css";

function Sidebar({ handleEditProfileClick }) {
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
        </div>
    );
}

export default Sidebar;