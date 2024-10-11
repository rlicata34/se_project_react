import "../blocks/ItemCard.css";

function ItemCard({ item, onCardClick }) {

    const handleCardClick = () => {
        onCardClick(item);
    }

    return item && item.name && item.imageUrl ? ( 
        <li className="card">
            <h2 className="card__name">{item.name}</h2>
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
