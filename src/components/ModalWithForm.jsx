
import "../blocks/ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, onClose, modalRef, activeModal, onSubmit, buttonClass }) {
    

    return ( 
        activeModal && (
            <div className={`modal ${isOpen ? "modal_opened" : ""}`} >
                <div className="modal__content" ref={modalRef} >
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" type="button" onClick={onClose}></button>
                    <form className="modal__form" onSubmit={onSubmit} >
                        {children}
                        <button type="submit" className={buttonClass}>
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}

export default ModalWithForm;