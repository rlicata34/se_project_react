import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfileModal({ activeModal, closeActiveModal, handleUpdateProfile, isOpen, modalRef, isLoading } ) {
    
    const [formData, setFormData] = useState({ name: "", avatar: "" });
    const [isButtonActive, setIsButtonActive] = useState(false);
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: currentUser.name, avatar: currentUser.avatar });
            setIsButtonActive(false);
        }
    }, [isOpen, currentUser]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));

        const allFieldsFilled = Object.values({ ...formData, [name]: value }).every((field) => field.trim() !== "");
        setIsButtonActive(allFieldsFilled);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        if (evt.target.checkValidity()) {
            handleUpdateProfile(formData);
        }
    };

    
    return (  
        <ModalWithForm
            title="Change profile data" 
            buttonText={isLoading ? "Saving changes..." : "Save changes"}
            isOpen={isOpen} 
            onClose={closeActiveModal}
            modalRef={modalRef}
            activeModal={activeModal}
            onSubmit={handleSubmit}
            buttonClass={`modal__submit-button-edit-profile ${isButtonActive ? "modal__submit-button_active" : ""}`}
        >

            <label className="modal__label">
                Name*{" "}
                <input 
                    type="text" 
                    className="modal__input" 
                    name="name"
                    placeholder="Name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label className="modal__label">
                Avatar URL*{" "}
                <input 
                    type="url" 
                    className="modal__input" 
                    name="avatar"
                    placeholder="Avatar URL" 
                    required
                    value={formData.avatar}
                    onChange={handleChange}
                />
            </label>
            
        </ModalWithForm>
    );
}

export default EditProfileModal;