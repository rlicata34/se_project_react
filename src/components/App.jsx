import { useState } from 'react';
import Header from './Header'
import Main from './Main'
import ModalWithForm from './ModalWithForm';
import Footer from './Footer';
import '../blocks/App.css'


function App() {
const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm />
    </div>
  )
}

export default App
