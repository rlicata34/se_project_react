import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";

import "../blocks/AddItemModal.css";

function AddItemModal({closeActiveModal, onAddItem, isOpen, modalRef, }) {

    const [name, setName] = useState("");
    const [link, setUrl] = useState("");
    const [weather, setWeather] = useState("")
    
    useEffect(() => {
        if(isOpen) {
            setName("");
            setUrl("");
            setWeather("");
        }
    }, [isOpen])
    
    const handleNameChange = (evt) => {
        console.log(evt.target.value);
        setName(evt.target.value);
    }

    
    const handleUrlChange = (evt) => {
        console.log(evt.target.value);
        setUrl(evt.target.value);
    }

    const handleWeatherChange = (evt) => {
        console.log(evt.target.value);
        setWeather(evt.target.value)
    }


    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddItem({ name, link, weather });
        closeActiveModal();
    }

    return ( 
        <ModalWithForm 
          title="New garmet" 
          buttonText="Add garmet" 
          isOpen={isOpen} 
          onClose={closeActiveModal}
          modalRef={modalRef}
          onSubmit={handleSubmit}
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
              value={link}
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