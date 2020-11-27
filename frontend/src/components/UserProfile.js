import React from 'react';

const UserProfile = (props) => {
    return (
        <section className="profile">
            <div className="profile__avatar"><img
                src={props.userAvatar}
                alt="Ваше фото"
                className="profile__avatar-img"
                onClick={props.avatar}/></div>
            <div className="profile__info">
                <h1 className="profile__name" title={props.userName}>{props.userName}</h1>
                <button className="profile__edit" type="button" onClick={props.profile}></button>
                <p className="profile__job" title={props.userDescription}>{props.userDescription}</p>
            </div>
            <button className="profile__button" type="button" onClick={props.addPlace}></button>
        </section>
    );
}

export default UserProfile;