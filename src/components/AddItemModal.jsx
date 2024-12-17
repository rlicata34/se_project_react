import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

import "../blocks/AddItemModal.css";

function AddItemModal({closeActiveModal, onAddItem, isOpen, modalRef, isLoading, /*isActive, validationRules, validateForm,*/ isFormValid}) {

    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [weather, setWeather] = useState("");
    
    useEffect(() => {
        if(isOpen) {
            setName("");
            setImageUrl("");
            setWeather("");
        }
    }, [isOpen])

    // useEffect(() => {
    //     // Validate the form whenever fields change
    //     validateForm({ name, imageUrl, weather }, validationRules, isActive);
    // }, [name, imageUrl, weather, validateForm, validationRules, isActive]);
    
    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    
    const handleUrlChange = (evt) => {
        setImageUrl(evt.target.value);
    }

    const handleWeatherChange = (evt) => {
        setWeather(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddItem({ name, imageUrl, weather });
    }

    return ( 
        <ModalWithForm 
          title="New garmet" 
          buttonText={isLoading? "Saving..." : "Add garment"}
          isOpen={isOpen} 
          onClose={closeActiveModal}
          modalRef={modalRef}
          onSubmit={handleSubmit}
          buttonClass={`modal__submit-button-add-item ${isFormValid ? "modal__submit-button_active" : ""}`}
        >
          <label className="modal__label">
            Name{" "}
            <input 
              type="text" 
              className="modal__input" 
              name="name"
              minLength="1"
              maxLength="30"
              placeholder="Name" 
              required
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <label className="modal__label">
            Image{" "}
            <input 
              type="url" 
              className="modal__input" 
              placeholder="Image URL" 
              required
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </label>
          <fieldset className="modal__fieldset-radio">
            <legend className="modal__legend">Select the weather type:</legend>
            <div className="modal__radio-div">
              <input 
                value="hot"
                type="radio" 
                className="modal__radio-input" 
                name="weather-type"
                id="choice-1"
                onChange={handleWeatherChange}
              />
              <label htmlFor="choice-1" className="modal__label modal__label_type_radio">Hot</label>
            </div>
            <div className="modal__radio-div">
              <input 
                value="warm"
                type="radio" 
                className="modal__radio-input" 
                name="weather-type"
                id="choice-2"
                onChange={handleWeatherChange}
              />
            <label htmlFor="choice-2" className="modal__label modal__label_type_radio">Warm</label>
            </div>
            <div className="modal__radio-div">
              <input 
                value="cold"
                type="radio" 
                className="modal__radio-input" 
                name="weather-type"
                id="choice-3"
                onChange={handleWeatherChange}
              />
              <label htmlFor="choice-3" className="modal__label modal__label_type_radio">Cold</label>
            </div>
          </fieldset>
        </ModalWithForm>
     );
}

export default AddItemModal;