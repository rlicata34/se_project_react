import Sidebar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";

function Profile({handleCardClick, clothingItems, handleAddClick, handleEditProfileClick, handleLogout, onCardLike}) {
    return ( 
        <div className="profile" >
            <section className="profile__sidebar">
                <Sidebar  
                    handleEditProfileClick={handleEditProfileClick}
                    handleLogout={handleLogout}
                />
            </section>
            <section className="profile__clothing-items">
                <ClothesSection 
                    handleCardClick={handleCardClick} 
                    clothingItems={clothingItems} 
                    handleAddClick={handleAddClick}
                    onCardLike={onCardLike}
                />
            </section>
        </div>
     );
}

export default Profile;