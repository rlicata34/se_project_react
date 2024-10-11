import { defaultClothingItems } from "../utils/constants";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({handleCardClick}) {
    return ( 
        <div className="clothes-section" >
            <div className="clothes-section__text-container" >
                <h3 className="clothes-section__title" >Your items</h3>
                <button className="clothes-section__button" >+ Add New</button>
            </div>
            <ul className="clothes-section__list">
                {defaultClothingItems.map((item) => {
                    return (
                        <ItemCard 
                            key={item._id} 
                            item={item} 
                            // ToDo - Pass as prop
                            onCardClick={handleCardClick}
                        />
                    );
                })}
            </ul>
        </div>
     );
}

export default ClothesSection;