import avatar from "../assets/avatar.png";
import "../blocks/SideBar.css";

function Sidebar() {
    return ( 
        <div className="sidebar">
            <img src={avatar} alt="Default avatar" className="sidebar__avatar" />
            <p className="sidebar__username">Terrence Tegegne</p>
        </div>
    );
}

export default Sidebar;