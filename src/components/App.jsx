import { useEffect, useState, useRef } from 'react';
import Header from './Header'
import Main from './Main'
import ModalWithForm from './ModalWithForm';
import Footer from './Footer';
import ItemModal from "./ItemModal";
import { APIkey, coordinates } from "../utils/constants";
import { getWeather, filterWeatherData } from '../utils/weatherApi';

import '../blocks/App.css'


function App() {
const [weatherData, setWeatherData] = useState({ 
  type: "", 
  temp: { F: 999 },
  city: "", 
});
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({})
const modalRef = useRef(null);

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCard(card);
}

const handleAddClick = () => {
  setActiveModal("add-garmet")
};

const closeActiveModal = () => {
  setActiveModal("");
};

useEffect(() => {
  getWeather(coordinates, APIkey)
  .then((data) => {
    const filteredData = filterWeatherData(data);
    setWeatherData(filteredData);
  })
  .catch(console.error);
}, []);


useEffect(() => {
  function handleOutsideClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeActiveModal();
    }
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeActiveModal();
    }
  }

  if (activeModal) {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("keydown", handleEscapeKey);
  };
}, [activeModal]);


  return (
    <div className="page">
      <div className="page__content">
        <Header 
          handleAddClick={handleAddClick} 
          weatherData={weatherData} 
        />
        <Main 
          weatherData={weatherData} 
          handleCardClick={handleCardClick} 
          modalRef={modalRef}
        />
        <Footer />
      </div>
      <ModalWithForm 
        title="New garmet" 
        buttonText="Add garmet" 
        isOpen={activeModal === "add-garmet"} 
        onClose={closeActiveModal}
        modalRef={modalRef}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input 
            type="text" 
            className="modal__input" 
            id="name" 
            placeholder="Name" 
            required
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input 
            type="url" 
            className="modal__input" 
            id="imageUrl" 
            placeholder="Image URL" 
            required
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
            />
            <label htmlFor="choice-3" className="modal__label modal__label_type_radio">Cold</label>
          </div>
        </fieldset>
      </ModalWithForm>
      <ItemModal 
        activeModal={activeModal} 
        card={selectedCard} 
        onClose={closeActiveModal} 
        modalRef={modalRef}/>
    </div>
  )
}

export default App
