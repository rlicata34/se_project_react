import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import validator from "validator";
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import AddItemModal from './AddItemModal';
import ConfirmationModal from './ConfirmationModal';
import ItemModal from "./ItemModal";
import Profile from './Profile';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import ProtectedRoute from "./ProtectedRoute";
import { APIkey, coordinates } from "../utils/constants";
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { getItems, addNewItem, deleteItem } from '../utils/api';
import { setToken, getToken } from "../utils/token";
import * as auth from "../utils/auth";

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
  const [saveToDelete, setSaveToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: "", email: "", avatar: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  const updateCurrentUser = (user) => setCurrentUser(user);
  const clearCurrentUser = () => setCurrentUser({ username: "", email: "", avatar: "" });
  
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
  }

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

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

  // Generic form validation function using `validator` library
  const validateForm = (fields) => {
    const validations = {
      email: (value) => validator.isEmail(value), // Valid email
      password: (value) => validator.isLength(value, { min: 3 }), // At least 6 characters
      name: (value) => validator.isLength(value.trim(), { min: 1, max: 30 }),
      avatar: (value) => validator.isURL(value), // Valid URL
      imageUrl: (value) => validator.isURL(value), //Valid URL
      weather: (value) => ["hot", "warm", "cold"].includes(value), // weather choice
    };

    // Validate all fields based on their corresponding validator method
    const isValid = Object.entries(fields).every(([key, value]) =>
      validations[key] ? validations[key](value) : true
    );

    setIsFormValid(isValid); // Update form validity state
    return isValid;
  };

  const onAddItem = (item) => {
    addNewItem(item.name, item.imageUrl, item.weather)
      .then((newItem) => {
        setIsLoading(true);
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error addint item:", err);
      })
      .finally(()=> {
        setIsLoading(false);
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
    function handleOutsideClick(evt) {
      if (modalRef.current && !modalRef.current.contains(evt.target)) {
        closeActiveModal();
      }
    }

    function handleEscapeKey(evt) {
      if (evt.key === "Escape") {
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

  useEffect(() => {
    const jwt = getToken();
  
    if (!jwt) {
      console.warn("No token found");
      return;
    }
  
    // Call the function, passing it the JWT.
    auth
      .getUserInfo(jwt)
      .then(({ name, email, avatar }) => {
        // If the response is successful, log the user in, save their 
        // data to state
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar });
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
  }, []);


  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, password, email) 
      .then(() => auth.login(email, password)) // Log in immediately
      .then((data) => {
        setIsLoading(true);
        console.log("Registration response:", data);
        if (data.token) {
          setToken(data.token); // Save the token
          setCurrentUser({ name, email, avatar });
          setIsLoggedIn(true);
          closeActiveModal();
        } else {
          console.error("No token in registration response:", data);
        }

      })
      .catch((err) => {
        console.error("Error during registration or login:", err);
        // Optionally, handle errors by showing feedback to the user
      })
      .finally(() => {
        setIsLoading(false); // Stop loading indicator
      });
  };

  const handleLogin = ({ email, password }) => {

    if (!email || !password) {
      console.error("Missing email or password");
      return;
    }    
    
  auth
    .login(email, password)
      .then((data) => {
        setIsLoading(true);
        if (data.token) {
          setToken(data.token);
          setCurrentUser(data.user);  // save user's data to state
          setIsLoggedIn(true); // log the user in
          closeActiveModal();    
        } else {
          console.error("No token in login response:", data);
        } 
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false); 
      });
    };


  return (
    <div className="page">
      <CurrentUserContext.Provider value={{currentUser, updateCurrentUser, clearCurrentUser}}>
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}} >
          <div className="page__content">
            <Header 
              handleAddClick={handleAddClick} 
              handleSignUpClick={handleSignUpClick}
              handleSignInClick={handleSignInClick}
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
              <Route 
                path="/Profile" 
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile 
                      handleCardClick={handleCardClick} 
                      clothingItems={clothingItems} 
                      handleAddClick={handleAddClick} 
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <RegisterModal 
                    closeActiveModal={closeActiveModal} 
                    handleRegistration = {handleRegistration} 
                    isOpen={activeModal === "sign-up"} 
                    modalRef={modalRef}
                    activeModal={activeModal}
                    isLoading={isLoading}
                    validateForm={validateForm} // Pass validation function
                    isFormValid={isFormValid} // Pass form validity state
                  />
                } 
              />
              <Route 
                path="/signin" 
                element={
                  <LoginModal 
                    closeActiveModal={closeActiveModal} 
                    handleLogin = {handleLogin} 
                    isOpen={activeModal === "sign-in"} 
                    modalRef={modalRef}
                    activeModal={activeModal}
                    isLoading={isLoading}
                    validateForm={validateForm} // Pass validation function
                    isFormValid={isFormValid} // Pass form validity state
                  />
                } 
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal 
            closeActiveModal={closeActiveModal} 
            onAddItem={onAddItem} 
            isOpen={activeModal === "add-garmet"} 
            modalRef={modalRef}
            activeModal={activeModal}
            isLoading={isLoading}
            validateForm={validateForm} // Pass validation function
            isFormValid={isFormValid} // Pass form validity state
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
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
