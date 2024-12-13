import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/LoginModal.css";

function LoginModal({ closeActiveModal, handleLogin, isOpen, modalRef, activeModal, isLoading, isActive, validationRules, validateForm, isFormValid} ) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // const { updateCurrentUser } = useContext(CurrentUserContext); // Access context function to update user

    useEffect(() => {
        if(isOpen) {
            setEmail("");
            setPassword("");
        }
    }, [isOpen])

    // useEffect(() => {
    //     // Validate the form whenever fields change
    //     validateForm({ password, email }, validationRules, isActive);
    // }, [password, email, validateForm, validationRules, isActive]);
    

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleLogin({ email, password });
    };  

    
    return (  
        <ModalWithForm
            title="Log In" 
            buttonText={isLoading? "Logging in..." : "Log In"}
            isOpen={isOpen} 
            onClose={closeActiveModal}
            modalRef={modalRef}
            onSubmit={handleSubmit}
            buttonClass={`modal__submit-button-login ${isFormValid ? "modal__submit-button_active" : ""}`}
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
            <button type="button" className="login-modal__button" >or Sign Up</button>
            
        </ModalWithForm>
    );
}

export default LoginModal;