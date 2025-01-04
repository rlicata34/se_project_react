import { useEffect, useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { getItems, addNewItem, deleteItem, addCardLike, removeCardLike } from '../utils/api';
import { setToken, getToken, removeToken } from "../utils/token";
import * as auth from "../utils/auth";

import '../blocks/App.css'


function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "", 
    temp: { F: 999, C: 999 },
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
  const [isLiked, setIsLiked] = useState(false);

  const updateCurrentUser = (user) => setCurrentUser(user);
  const clearCurrentUser = () => setCurrentUser({ name: "", email: "", avatar: "" });

  const token = getToken();
  
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C")
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F")
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };

  const handleOpenConfirmationModal = (itemId) => {
    console.log("Opening confirmation modal for item ID:", itemId);
    setActiveModal("confirm");
    setSaveToDelete(itemId)
  }

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCardDelete = ()=> {

    deleteItem(saveToDelete, token)
      .then(() => {
        setClothingItems((prevItems) => prevItems.filter(item => item._id !== saveToDelete));
        closeActiveModal();
        setSaveToDelete({});
      })
      .catch((err) => {
        console.error("Error deleting item", err);
      });
  }

  const handleCardLike = ({ _id }, isLiked) => {

    !isLiked
      ?
        addCardLike(_id, token)
          .then((response) => {
            const updatedCard = response.item;
            setIsLiked(true);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : 
        removeCardLike(_id, token) 
          .then((response) => {
            const updatedCard = response.item;
            setIsLiked(false);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    auth
      .register(name, avatar, password, email) 
      .then(() => auth.login(email, password)) 
      .then((data) => {
        console.log("Registration response:", data);
        if (data.token) {
          setToken(data.token); 
          setCurrentUser({ name, email, avatar });
          setIsLoggedIn(true);
          closeActiveModal();
        } else {
          console.error("No token in registration response:", data);
        }

      })
      .catch((err) => {
        console.error("Error during registration or login:", err);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  const handleLogin = ({ email, password }) => {

    if (!email || !password) {
      console.error("Missing email or password");
      return;
    }
    
    setIsLoading(true);
    
    auth
      .login(email, password)
        .then((data) => {
          if (data.token) {
            setToken(data.token); 
            return auth.getUserInfo(data.token); 
          } else {
            throw new Error("No token in login response.");
          }
        })
        .then(({name, email, avatar, _id}) => {
          setCurrentUser({name, email, avatar, _id});  // save user's data to state
          setIsLoggedIn(true); // log the user in
          closeActiveModal();
          console.log("Logged in successfully");

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
  };

  const handleUpdateProfile =({name, avatar}) => {
    if (!token) {
      console.error("No token found, cannot update profile");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    auth
      .updateUserInfo(name, avatar, token)
      .then(({name, avatar, email}) => {
        setCurrentUser((prev) => ({
          ...prev,
          name,
          avatar,
          email
      }));
        closeActiveModal();
        console.log("Profile updated successfully");
      })
      .catch((err) => {
      console.error("Profile update failed:", err);
      })
      .finally(() => {
        setIsLoading(false); // Stop the loading indicator
      });
  };


  const onAddItem = (item) => {
    setIsLoading(true);
    addNewItem(item.name, item.imageUrl, item.weather, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        setIsLiked(false);
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

    function handleEscapeKey(evt) {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    }

    if (activeModal) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = getToken();
    console.log("JWT:", jwt);
  
    if (!jwt) {
      console.warn("No token found");
      return;
    }
  
    auth
      .getUserInfo(jwt)
      .then(({ name, email, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar, _id });
      })
      .catch((err) => {
        console.error("Error fetching user info:", err);
      });
  }, []);


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
                  onCardLike={handleCardLike}
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
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
          />
          <ItemModal 
            activeModal={activeModal} 
            card={selectedCard} 
            onClose={closeActiveModal} 
            modalRef={modalRef}
            handleOpenConfirmationModal={handleOpenConfirmationModal}
            isOpen={activeModal === "preview"}
          />
          <ConfirmationModal 
            activeModal={activeModal}
            modalRef={modalRef}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal} 
            isOpen={activeModal === "edit-profile"} 
            modalRef={modalRef}
            isLoading={isLoading}
            handleUpdateProfile={handleUpdateProfile}
          />
          <RegisterModal 
            closeActiveModal={closeActiveModal} 
            handleRegistration = {handleRegistration} 
            isOpen={activeModal === "sign-up"} 
            modalRef={modalRef}
            activeModal={activeModal}
            isLoading={isLoading}
            handleSignInClick={handleSignInClick}
          />
          <LoginModal 
            closeActiveModal={closeActiveModal} 
            handleLogin = {handleLogin} 
            isOpen={activeModal === "sign-in"} 
            modalRef={modalRef}
            activeModal={activeModal}
            isLoading={isLoading}
            handleSignUpClick={handleSignUpClick}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
