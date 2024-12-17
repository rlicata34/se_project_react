import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import validator from "validator";
import Header from './Header'
import Main from './Main'
import Footer from './Footer';
import EditProfileModal from './EditProfileModal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import AddItemModal from './AddItemModal';
import ConfirmationModal from './ConfirmationModal';
import ItemModal from "./ItemModal";
import Profile from './Profile';
import ProtectedRoute from "./ProtectedRoute";
import { APIkey, coordinates } from "../utils/constants";
import { getWeather, filterWeatherData } from '../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { getItems, addNewItem, deleteItem } from '../utils/api';
import { setToken, getToken, removeToken } from "../utils/token";
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
  const [currentUser, setCurrentUser] = useState({ name: "", email: "", avatar: "" });
  // const [isFormValid, setIsFormValid] = useState(false);
  // const [isActive, setIsActive] = useState(false);

  const updateCurrentUser = (user) => setCurrentUser(user);
  const clearCurrentUser = () => setCurrentUser({ name: "", email: "", avatar: "" });
  
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal("add-garmet");
    // setIsActive(true);
  };

  const handleOpenConfirmationModal = (itemId) => {
    setActiveModal("confirm");
    setSaveToDelete(itemId)
  }

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
    // setIsActive(true);
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
    // setIsActive(true);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
    // setIsActive(true);
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

  // Generic validation function
  // const validateForm = (fields, rules, isActive) => {
  //   if (!isActive) {
  //     return setIsFormValid(false);
  //   }

  //   const isValid = Object.entries(fields).every(([key, value]) =>
  //     rules[key] ? rules[key](value) : true
  //   );

  //   console.log("Validation Results:", fields, isValid); // Debugging log
  //   return setIsFormValid(isValid);
  // };

  // const validationRules = {
  //   email: (value) => validator.isEmail(value), // Valid email
  //   password: (value) => validator.isLength(value, { min: 3 }), // Min 3 characters
  //   name: (value) => !validator.isEmpty(value.trim()), // Non-empty name
  //   avatar: (value) => validator.isURL(value), // Valid URL
  //   imageUrl: (value) => validator.isURL(value), // Valid URL for AddItemModal
  //   weather: (value) => ["hot", "warm", "cold"].includes(value), // Valid weather types
  // };

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
      .then(({ name, email, avatar, _id }) => {
        // If the response is successful, log the user in, save their 
        // data to state
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
  }, []);

  const navigate = useNavigate();

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
        if (data.token) {
          setToken(data.token); // Save the token
          setIsLoading(true);
          return auth.getUserInfo(data.token); // Fetch user info after login
        } else {
          throw new Error("No token in login response.");
        }
      })
      .then(({name, email, avatar}) => {
        setCurrentUser({name, email, avatar});  // save user's data to state
        setIsLoggedIn(true); // log the user in
        console.log("Logged in successfully");
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath); 
      })
      .catch((err) => {
        console.error("Login failed:", err);
      })
      .finally(() => {
        setIsLoading(false); 
      });
    };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    clearCurrentUser();
    console.log("User logged out successfully");
  }

  const handleUpdateProfile =({name, avatar}) => {
    setIsLoading(true);
    const token = getToken();
    if (!token) {
      console.error("No token found, cannot update profile");
      setIsLoading(false);
      return;
    }
    auth
      .updateUserInfo(name, avatar)
      .then(({name, avatar, email}) => {
        setCurrentUser({name, avatar, email});
        closeActiveModal();
        console.log("Profile updated successfully");
      })
      .catch((err) => {
      console.error("Profile update failed:", err);
      })
      .finally(() => {
        setIsLoading(false); // Stop the loading indicator
      });
  }


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
              isLoggedIn={isLoggedIn} 
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
                      handleEditProfileClick={handleEditProfileClick}
                      handleLogout={handleLogout} 
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
                    // isActive={isActive}
                    // validationRules={validationRules}
                    // validateForm={validateForm}
                    // isFormValid={isFormValid} // Pass form validity state
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
                    // isActive={isActive}
                    // validationRules={validationRules}
                    // validateForm={validateForm} 
                    // isFormValid={isFormValid} // Pass form validity state
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
            // isActive={isActive}
            // validationRules={validationRules}
            // validateForm={validateForm}
            // isFormValid={isFormValid} // Pass form validity state
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
          <EditProfileModal
            closeActiveModal={closeActiveModal} 
            isOpen={activeModal === "edit-profile"} 
            modalRef={modalRef}
            isLoading={isLoading}
            handleUpdateProfile={handleUpdateProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
