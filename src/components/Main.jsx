import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import { defaultClothingItems } from "../utils/constants";
import "../blocks/Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";


function Main({ weatherData, handleCardClick }) {

    const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
    
    let temp = weatherData?.temp?.[currentTemperatureUnit] || 999;
    if(currentTemperatureUnit === "F") {
        temp = temp + "\u00B0" + "F";
    } else {
        temp = temp + "\u00B0" + "C";
    }

    return ( 
        <main>
            <WeatherCard weatherData={weatherData} />
            <section className="cards">
                <p className="cards__text">Today is {temp} / You may want to wear:</p>
                <ul className="cards__list">
                    {defaultClothingItems
                    .filter((item) => {
                        return item.weather === weatherData.type;
                    })
                    .map((item) => {
                        return (
                            <ItemCard 
                                key={item._id} 
                                item={item} 
                                onCardClick={handleCardClick}
                            />
                        );
                    })}
                </ul>
            </section>
        </main>
     );
}

export default Main;