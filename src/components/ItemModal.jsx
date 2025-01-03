import { useContext } from "react";
import { useEffect, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../blocks/ItemModal.css";

function ItemModal({ activeModal, onClose, card, handleOpenConfirmationModal, isOpen }) {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(evt) {
            console.log("Modal Ref:", modalRef.current);
            console.log("Event Target:", evt.target);

            // Close the modal if the click is outside the modal content
            if (modalRef.current && !modalRef.current.contains(evt.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]); 

    if (activeModal !== "preview") return null;

    const { currentUser } = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

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