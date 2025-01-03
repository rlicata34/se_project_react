import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import "../blocks/RegisterModal.css";

function RegisterModal({ closeActiveModal, handleRegistration, isOpen, activeModal, isLoading, handleSignInClick } ) {
    const [formData, setFormData] = useState({ name: "", avatar: "", email: "", password: "" });
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: "", avatar: "", email: "", password: "" });
            setIsButtonActive(false);
        }
    }, [isOpen]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        const allFieldsFilled = Object.values({ ...formData, [name]: value }).every((field) => field.trim() !== "");
        setIsButtonActive(allFieldsFilled);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (evt.target.checkValidity()) {
            handleRegistration(formData);
        }
    };

    
    return (  
        <ModalWithForm
            title="Sign Up" 
            buttonText={isLoading ? "Signing Up..." : "Sign Up"}
            isOpen={isOpen} 
            activeModal={activeModal}
            onClose={closeActiveModal}
            onSubmit={handleSubmit}
            buttonClass={`modal__submit-button-register ${isButtonActive ? "modal__submit-button_active" : ""}`}
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
                    minLength="3"
                    value={formData.password}
                    onChange={handleChange}
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
            <button 
                type="button" 
                className="register-modal__button" 
                onClick={handleSignInClick}
            >
                or Log In
            </button>
            
        </ModalWithForm>
    );
}

export default RegisterModal;