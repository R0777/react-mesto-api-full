import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {

    const [place,
        setPlace] = React.useState('');
    const [link,
        setLink] = React.useState('');

    const handleChangePlace = (e) => {
        e.preventDefault();
        setPlace(e.target.value)
    }

    const handleChangeLink = (e) => {
        e.preventDefault();
        setLink(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onAddPlace({place, link});
    }

    return (
        <PopupWithForm
            title={props.title}
            id={props.id}
            isOpen={props.isOpen}
            buttonText={props.buttonText}
            isClose={props.isClose}
            onSubmit={handleSubmit}>
            <label className="popup__field">
                <input
                    type="text"
                    className="popup__input popup__input_place"
                    id='place-input'
                    name="place"
                    value={place}
                    placeholder="Название"
                    onChange={handleChangePlace}
                    minLength="1"
                    maxLength="30"
                    required/>
                <span className='popup__input-error' id='place-input-error'></span>
            </label>
            <label className="popup__field">
                <input
                    className="popup__input popup__input_pic"
                    id='pic-input'
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleChangeLink}
                    name="link"
                    type="url"
                    required/>
                <span className='popup__input-error' id='pic-input-error'></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup
