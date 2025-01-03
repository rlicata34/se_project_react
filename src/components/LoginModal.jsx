import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/LoginModal.css";

function LoginModal({ closeActiveModal, handleLogin, isOpen, activeModal, isLoading, handleSignUpClick} ) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({ email: "", password: "" });
            setIsButtonActive(false);
        }
    }, [isOpen]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({ ...prevData, [name]: value}));

        const allFieldsFilled = Object.values({ ...formData, [name]: value }).every((field) => field.trim() !== "");
        setIsButtonActive(allFieldsFilled);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (evt.target.checkValidity()) {
            handleLogin(formData);
        }
    };

    
    return (  
        <ModalWithForm
            title="Log In" 
            buttonText={isLoading? "Logging in..." : "Log In"}
            isOpen={isOpen}
            activeModal={activeModal} 
            onClose={closeActiveModal}
            onSubmit={handleSubmit}
            buttonClass={`modal__submit-button-login ${isButtonActive ? "modal__submit-button_active" : ""}`}
        >
            <label className="modal__label">
                Email*{" "}
                <input 
                    type="email" 
                    className="modal__input" 
                    name="email"
                    placeholder="Email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <label className="modal__label">
                Password*{" "}
                <input 
                    type="password" 
                    name="password"
                    className="modal__input" 
                    placeholder="Password" 
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
            </label>
            <button 
                type="button" 
                className="login-modal__button" 
                onClick={handleSignUpClick}
            >
                or Sign Up
            </button>
            
        </ModalWithForm>
    );
}

export default LoginModal;