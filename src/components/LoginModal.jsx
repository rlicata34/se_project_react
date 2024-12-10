import { useState, useEffect, useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function LoginModal({ closeActiveModal, handleLogin, isOpen, modalRef, activeModal, isLoading} ) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { updateCurrentUser } = useContext(CurrentUserContext); // Access context function to update user

    useEffect(() => {
        if(isOpen) {
            setEmail("");
            setPassword("");
        }
    }, [isOpen])
    

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value)
    }

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value)
    }


    const handleSubmit = (evt, user) => {
        evt.preventDefault();
        if (user) {
            handleLogin({ email, password });
            updateCurrentUser(user); 
        }
        return console.error

    }

    
    return (  
        <ModalWithForm
            title="Log In" 
            buttonText={isLoading? "Logging in..." : "Log In"}
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
            
        </ModalWithForm>
    );
}

export default LoginModal;