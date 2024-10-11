import Sidebar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({handleCardClick}) {
    return ( 
        <div className="profile" >
            <section className="profile__sidebar">
                <Sidebar  />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection handleCardClick={handleCardClick} />
            </section>
        </div>
     );
}

export default Profile;