
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({handleCardClick, clothingItems, handleAddClick, onCardLike}) {
    const { currentUser } = useContext(CurrentUserContext);

    const userItems = clothingItems.filter(item => item.owner === currentUser._id);

    return ( 
        <div className="clothes-section" >
            <div className="clothes-section__text-container" >
                <h3 className="clothes-section__title" >Your items</h3>
                <button className="clothes-section__button" onClick={handleAddClick} >+ Add New</button>
            </div>
            <ul className="clothes-section__list">
                {
                    userItems.length > 0 ? (
                        userItems.map((item) => {
                            return (
                                <ItemCard 
                                    key={item._id} 
                                    item={item} 
                                    onCardClick={handleCardClick}
                                    onCardLike={onCardLike}
                                />
                            );
                        }) 
                    ) : []
                }
            </ul>
        </div>
    );
}

export default ClothesSection;

