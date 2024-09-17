import "../blocks/ModalWithForm.css";

function ModalWithForm() {
    return ( 
        <div className="modal">
            <form className="modal__form form">
                <h3 className="form__title">New garmet</h3>
                <label htmlFor="name" className="form__label">
                    Name
                    <input 
                        type="text" 
                        className="form__input" 
                        name="name" 
                        placeholder="Name" 
                        required
                    />
                </label>
                <label htmlFor="image" className="form__label">
                    Image
                    <input 
                        type="url" 
                        className="form__input" 
                        name="image" 
                        placeholder="Image URL" 
                        required
                    />
                </label>
                <fieldset className="form__fieldset">
                    <legend className="form__legend">Select the weather type:</legend>
                    
                </fieldset>
            </form>
        </div>
     );
}

export default ModalWithForm;