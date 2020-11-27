import React from 'react';
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = (props) => {

    const avatarLink = React.useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar({avatar: avatarLink.current.value});
    }

    return (
        <PopupWithForm
            title={props.title}
            id={props.id}
            buttonText={props.buttonText}
            isOpen={props.isOpen}
            isClose={props.isClose}
            onSubmit={handleSubmit}>
            <label className="popup__field">
                <input
                    ref={avatarLink}
                    type="url"
                    className="popup__input popup__input_place"
                    id='avatar-input'
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    required/>
                <span className='popup__input-error' id='avatar-input-error'></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup