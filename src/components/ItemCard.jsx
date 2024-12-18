import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
    const { currentUser } = useContext(CurrentUserContext);

    const isOwn = item.owner === currentUser._id;
    const isLiked = item.likes.some(_id => _id === currentUser._id);

    const itemLikeButtonClassName = `card__like-button ${isLiked ? "card__like-button_active" : ""}`;

    const handleCardClick = () => {
        onCardClick(item);
    }

    const handleLike = () => {
        onCardLike(item);
    }

    return item && item.name && item.imageUrl ? ( 
        <li className="card">
            <div className="card__header">
                <h2 className="card__name">{item.name}</h2>
                <button 
                    onClick={handleLike}
                    className={`${isOwn ? itemLikeButtonClassName : "card__like-button_hidden"}`}
                ></button>
            </div>
            <img 
                onClick={handleCardClick}
                className="card__image" 
                src={item.imageUrl} 
                alt={item.name} 
            />
        </li>
    ) : null;
}

export default ItemCard;
