import "../blocks/ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
    return ( 
        <div className={`modal ${activeModal === "add-garmet" && "modal_opened"}`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <button className="modal__close" type="button" onClick={onClose}></button>
                <form className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
     );
}

export default ModalWithForm;