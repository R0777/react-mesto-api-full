import React from 'react';
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'

const EditProfilePopup = (props) => {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if(props.isOpen) {
        setName('')
        setDescription('')
        setName(currentUser.name)
        setDescription(currentUser.about)
    }}, [currentUser, props.isOpen])

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name: name, 
          about: description
        });
    }

    return (
        <PopupWithForm
            title="Новое место"
            id={props.id}
            isOpen={props.isOpen}
            buttonText={props.buttonText}
            isClose={props.isClose}
            onSubmit={handleSubmit}>
            <label className="popup__field">
                <input
                    type="text"
                    className="popup__input popup__input_name"
                    id='name-input'
                    name={"name"}
                    placeholder="Ваше Имя"
                    onChange={handleChangeName}
                    value={name}
                    minLength="2"
                    maxLength="40"
                    required/>
                <span className='popup__input-error' id='name-input-error'></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    className="popup__input popup__input_job"
                    id='job-input'
                    name={"about"}
                    onChange={handleChangeDescription}
                    placeholder="О себе"
                    value={description}
                    minLength="2"
                    maxLength="200"
                    required/>
                <span className='popup__input-error' id='job-input-error'></span>
            </label>
        </PopupWithForm>
    )
}
export default EditProfilePopup;