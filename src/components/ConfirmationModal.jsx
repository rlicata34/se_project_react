import "../blocks/ConfirmationModal.css";

function ConfirmationModal({ activeModal, modalRef, onClose }) {

    if (activeModal !== "confirm") return null;

    return ( 
        <div className={`modal ${activeModal === "confirm" && "modal_opened"}`} id="confirmation-modal">
            <div className="modal__content modal__content_type_confirm " ref={modalRef} >
                <button className="modal__close" type="button" onClick={onClose}></button>
                <p className="modal__text">Are you sure you want to delete this item? This action is irreversible.</p>
                <button className="modal__delete-button">Yes, delete item</button>
                <button className="modal__cancel-button" onClick={onClose} >Cancel</button>
            </div>
        </div>
     );
}

export default ConfirmationModal;