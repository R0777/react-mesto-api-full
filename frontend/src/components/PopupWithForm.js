import React from 'react';

const PopupWithForm = (props) => {

    return (
        <section className={`popup ${props.isOpen && 'active'}`} id={props.id}>
            <form className="popup__block" noValidate onSubmit={props.onSubmit}>
                <button className="popup__close" type="button" onClick={props.isClose}></button>
                <h4 className="popup__title">{props.title}</h4>
                {props.children}
                <button className="popup__save" type="submit">{props.buttonText}</button>
            </form>
        </section>
    );
}

export default PopupWithForm;