import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";


function EditProfileModal({ closeActiveModal, handleRegistration, isOpen, modalRef, isActive, isLoading, validationRules, validateForm, isFormValid } ) {
    const [name, setName] = useState("");
    const [avatar, setAvatarUrl] = useState("");

    useEffect(() => {
        if(isOpen) {
            setName("");
            setAvatarUrl("");
        }
    }, [isOpen])

    // useEffect(() => {
    
    //     // Validate the form whenever fields change
    //     validateForm({ name, avatar, password, email }, validationRules, isActive);
    //     console.log(isFormValid);
    // }, [name, avatar, password, email, validateForm, validationRules, isActive]);
    
    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    
    const handleUrlChange = (evt) => {
        setAvatarUrl(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleRegistration({ name, avatar });
    }

    
    return (  
        <ModalWithForm
            title="Change profile data" 
            buttonText={isLoading ? "Saving changes..." : "Save changes"}
            isOpen={isOpen} 
            onClose={closeActiveModal}
            modalRef={modalRef}
            onSubmit={handleSubmit}
            buttonClass={`modal__submit-button-edit-profile ${isFormValid ? "modal__submit-button_active" : ""}`}
        >

            <label className="modal__label">
                Name*{" "}
                <input 
                    type="text" 
                    className="modal__input" 
                    name="name"
                    placeholder="Name" 
                    required
                    value={name}
                    onChange={handleNameChange}
                />
            </label>
            <label className="modal__label">
                Avatar URL*{" "}
                <input 
                    type="url" 
                    className="modal__input" 
                    name="avatar-url"
                    placeholder="Avatar URL" 
                    required
                    value={avatar}
                    onChange={handleUrlChange}
                />
            </label>
            
        </ModalWithForm>
    );
}

export default EditProfileModal;