import sunny from "../assets/sunny.png"
import "../blocks/WeatherCard.css"

function WeatherCard() {
    return ( 
        <section className="weather-card">
            <p className="weather-card__temp">75&deg; F</p>
            <img src={sunny} alt="sunny background" className="weather-card__image" />
        </section>
     );
}

export default WeatherCard;