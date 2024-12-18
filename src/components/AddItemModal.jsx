import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

import "../blocks/AddItemModal.css";

function AddItemModal({closeActiveModal, onAddItem, isOpen, modalRef, isLoading}) {

    const [formData, setFormData] = useState({ name: "", imageUrl: "", weather: "" });
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [weatherError, setWeatherError] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setFormData({ name: "", imageUrl: "", weather: "" });
            setIsButtonActive(false);
            setWeatherError(false);
        }
    }, [isOpen]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === "weather" && weatherError) {
          setWeatherError(false);
        }

        const allFieldsFilled = Object.values({ ...formData, [name]: value }).every((field) => field.trim() !== "");
        setIsButtonActive(allFieldsFilled);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // Validate weather selection
        if (!formData.weather) {
          setWeatherError(true);
          return;
        }

        if (evt.target.checkValidity()) {
            onAddItem(formData);
        }
    };

    return ( 
        <ModalWithForm 
          title="New garmet" 
          buttonText={isLoading? "Saving..." : "Add garment"}
          isOpen={isOpen} 
          onClose={closeActiveModal}
          modalRef={modalRef}
          onSubmit={handleSubmit}
          buttonClass={`modal__submit-button-add-item ${isButtonActive ? "modal__submit-button_active" : ""}`}
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
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className="modal__label">
            Image{" "}
            <input 
              type="url" 
              name="imageUrl"
              className="modal__input" 
              placeholder="Image URL" 
              required
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </label>
          <fieldset className="modal__fieldset-radio">
            <legend className="modal__legend">Select the weather type:</legend>
            <div className="modal__radio-div">
              <input 
                value="hot"
                type="radio" 
                className="modal__radio-input" 
                name="weather"
                id="choice-1"
                onChange={handleChange}
              />
              <label htmlFor="choice-1" className="modal__label modal__label_type_radio">Hot</label>
            </div>
            <div className="modal__radio-div">
              <input 
                value="warm"
                type="radio" 
                className="modal__radio-input" 
                name="weather"
                id="choice-2"
                onChange={handleChange}
              />
            <label htmlFor="choice-2" className="modal__label modal__label_type_radio">Warm</label>
            </div>
            <div className="modal__radio-div">
              <input 
                value="cold"
                type="radio" 
                className="modal__radio-input" 
                name="weather"
                id="choice-3"
                onChange={handleChange}
              />
              <label htmlFor="choice-3" className="modal__label modal__label_type_radio">Cold</label>
            </div>
          </fieldset>
        </ModalWithForm>
     );
}

export default AddItemModal;