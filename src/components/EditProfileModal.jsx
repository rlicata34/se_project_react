import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfileModal({ closeActiveModal, handleUpdateProfile, isOpen, modalRef, isLoading/*, validationRules, validateForm*/, isFormValid } ) {
    const [name, setName] = useState("");
    const [avatar, setAvatarUrl] = useState("");
    const { currentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        if(isOpen) {
            setName(currentUser.name);
            setAvatarUrl(currentUser.avatar);
        }
    }, [isOpen, currentUser]);

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
        handleUpdateProfile({ name, avatar });
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