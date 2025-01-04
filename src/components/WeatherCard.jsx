import { weatherOptions, defaultWeatherOptions } from "../utils/constants";
import "../blocks/WeatherCard.css"
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";


function WeatherCard({weatherData}) {
    const filteredOptions = weatherOptions.filter((option) => {
        return (
            option.day === weatherData.isDay && 
            option.condition === weatherData.condition
        )
    });

    let weatherOption;
    if(filteredOptions.length === 0) {
        weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    } else {
        weatherOption = filteredOptions[0];
    }

    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

    let temp = weatherData?.temp?.[currentTemperatureUnit];
    if(currentTemperatureUnit === "F") {
        temp = temp + "\u00B0" + "F";
    } else {
        temp = temp + "\u00B0" + "C";
    }

    return ( 
        <section className="weather-card">
            <p className="weather-card__temp">{temp}</p>
            <img 
                src={weatherOption?.url} 
                alt={weatherOption?.condition} 
                className="weather-card__image" />
        </section>
     );
}

export default WeatherCard;