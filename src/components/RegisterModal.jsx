import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({ closeActiveModal, handleRegistration, isOpen, modalRef, activeModal, isLoading} ) {
    const [name, setName] = useState("");
    const [avatar, setAvatarUrl] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if(isOpen) {
            setName("");
            setAvatarUrl("");
            setPassword("");
            setEmail("");
        }
    }, [isOpen])
    
    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    
    const handleUrlChange = (evt) => {
        setAvatarUrl(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleRegistration({ name, avatar, password, email });
    }

    
    return (  
        <ModalWithForm
            title="Sign Up" 
            buttonText={isLoading? "Signing Up..." : "Sign Up"}
            isOpen={isOpen} 
            onClose={closeActiveModal}
            modalRef={modalRef}
            onSubmit={handleSubmit}
        >
            <label className="modal__label">
                Email*{" "}
                <input 
                    type="email" 
                    className="modal__input" 
                    name="email"
                    placeholder="Email" 
                    required
                    value={email}
                    onChange={handleEmailChange}
                />
            </label>
            <label className="modal__label">
                Password*{" "}
                <input 
                    type="password" 
                    className="modal__input" 
                    placeholder="Password" 
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
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

export default RegisterModal;