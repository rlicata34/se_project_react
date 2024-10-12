import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import AddItemModal from './AddItemModal';
import ConfirmationModal from './ConfirmationModal';
import ItemModal from "./ItemModal";
import Profile from './Profile';
import { APIkey, coordinates } from "../utils/constants";
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import { getItems, addNewItem, deleteItem } from '../utils/api';

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
const [clothingItems, setClothingItems] = useState([]);
const [saveToDelete, setSaveToDelete] = useState({})

const handleCardClick = (card) => {
  setActiveModal("preview");
  setSelectedCard(card);
}

const handleAddClick = () => {
  setActiveModal("add-garmet")
};

const handleOpenConfirmationModal = (itemId) => {
  setActiveModal("confirm");
  setSaveToDelete(itemId)
  console.log(itemId)
}

const handleCardDelete = ()=> {
  deleteItem(saveToDelete)
    .then(() => {
      setClothingItems((prevItems) => prevItems.filter(item => item._id !== saveToDelete));
      closeActiveModal();
      setSaveToDelete({});
    })
    .catch((err) => {
      console.error("Error deleting item", err);
    });
}

const closeActiveModal = () => {
  setActiveModal("");
};

const handleToggleSwitchChange = () => {
  if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
  if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
}

const onAddItem = (item) => {
  addNewItem(item.name, item.imageUrl, item.weather)
    .then((newItem) => {
      setClothingItems((prevItems) => [...prevItems, newItem]);
    })
    .catch((err) => {
      console.error("Error addint item:", err);
    });
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
  getItems()
    .then((data) => {
      setClothingItems(data);
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
                clothingItems={clothingItems}
              />} 
              />
            <Route path="/Profile" element={<Profile handleCardClick={handleCardClick} clothingItems={clothingItems} />} />
          </Routes>
          <Footer />
        </div>
        <AddItemModal 
          closeActiveModal={closeActiveModal} 
          onAddItem={onAddItem} 
          isOpen={activeModal === "add-garmet"} 
          modalRef={modalRef}
          activeModal={activeModal}
        />
        <ItemModal 
          activeModal={activeModal} 
          card={selectedCard} 
          onClose={closeActiveModal} 
          modalRef={modalRef}
          handleOpenConfirmationModal={handleOpenConfirmationModal}
        />
        <ConfirmationModal 
          activeModal={activeModal}
          modalRef={modalRef}
          onClose={closeActiveModal}
          handleCardDelete={handleCardDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
