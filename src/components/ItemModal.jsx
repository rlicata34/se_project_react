import "../blocks/ItemModal.css";

function ItemModal({ activeModal, onClose, card, modalRef }) {
    if (activeModal !== "preview") return null;

    return (
        <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
            <div className="modal__content modal__content_type_image" ref={modalRef} >
                <button className="modal__close" type="button" onClick={onClose}></button>
                <img src={card.imageUrl} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather-type">Weather: {card.weather}</p>
                </div>
            </div>
        </div>
     );
}

export default ItemModal;