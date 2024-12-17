import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../blocks/ItemModal.css";

function ItemModal({ activeModal, onClose, card, modalRef, handleOpenConfirmationModal }) {
    if (activeModal !== "preview") return null;

    const { currentUser } = useContext(CurrentUserContext);

    console.log("Current user ID:", currentUser._id);
    console.log("Card owner ID:", card.owner);

    // Checking if the current user is the owner of the current clothing item
    const isOwn = card.owner?.toString() === currentUser._id?.toString();

    // Creating a variable which you'll then set in `className` for the delete button
    const itemDeleteButtonClassName = (
        `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
    );

    return (
        <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
            <div className="modal__content modal__content_type_image" ref={modalRef} >
                <button className="modal__close" type="button" onClick={onClose}></button>
                <img src={card.imageUrl} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <div>
                        <h2 className="modal__caption">{card.name}</h2>
                        <p className="modal__weather-type">Weather: {card.weather}</p>
                    </div>
                    <button className={itemDeleteButtonClassName} onClick={() => handleOpenConfirmationModal(card._id)} >Delete item</button>
                </div>
            </div>
        </div>
     );
}

export default ItemModal;