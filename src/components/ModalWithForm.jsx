import "../blocks/ModalWithForm.css";

function ModalWithForm() {
    return ( 
        <div className="modal">
            <div className="modal__content">
                <h2 className="modal__title">New garmet</h2>
                <button className="modal__close" type="button"></button>
                <form className="modal__form">
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
                    <button type="submit" className="modal__submit-button">
                        Add garmet
                    </button>
                </form>
            </div>
        </div>
     );
}

export default ModalWithForm;