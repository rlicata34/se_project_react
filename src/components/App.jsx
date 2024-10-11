import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import ItemModal from "./ItemModal";
import Profile from './Profile';
import AddItemModal from './AddItemModal';
import { APIkey, coordinates } from "../utils/constants";
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';

import '../blocks/App.css'


function App() {
const [weatherData, setWeatherData] = useState({ 
  type: "", 
  temp: { F: 999 },
  city: "", 
});
const [activeModal, setActiveModal] = useState("");
const [selectedCard, setSelectedCard] = useState({});
const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
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

const handleToggleSwitchChange = () => {
  if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
  if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
}

const onAddItem = (values) => {
  console.log(values);
}

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
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}} >
        <div className="page__content">
          <Header 
            handleAddClick={handleAddClick} 
            weatherData={weatherData} 
          />
          <Routes>
            <Route 
              path="/" 
              element={
              <Main 
                weatherData={weatherData} 
                handleCardClick={handleCardClick} 
                modalRef={modalRef}
              />} 
              />
            <Route path="/Profile" element={<Profile handleCardClick={handleCardClick} />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal 
          closeActiveModal={closeActiveModal} 
          onAddItem={onAddItem} 
          isOpen={activeModal === "add-garmet"} 
          modalRef={modalRef}
        />
        <ItemModal 
          activeModal={activeModal} 
          card={selectedCard} 
          onClose={closeActiveModal} 
          modalRef={modalRef}/>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
