import React from 'react';
import UserProfile from './UserProfile';
import Card from './Card';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CurrentCardContext} from '../contexts/CurrentCardContext'

const Main = (props) => {

    const currentUserContext = React.useContext(CurrentUserContext);
    const currentCardContext = React.useContext(CurrentCardContext);

    const items = currentCardContext.map(item => ({
        
        src: item.link,
        _id: item._id,
        owner: item.owner,
        alt: item.name,
        likes: item.likes,
        title: item.name,
        like: item.likes.length,
        cardLiked: item.likes.find((elem) => elem === currentUserContext._id)
    }))

    return (
        <main>
            <UserProfile
                avatar={props.onEditAvatar}
                profile={props.onEditProfile}
                addPlace={props.onAddPlace}
                userName={currentUserContext.name}
                userDescription={currentUserContext.about}
                userAvatar={currentUserContext.avatar}/>

            <section className="places">
                {items.map(card => <Card key={card._id} myId={currentUserContext._id} {...card} {...props}/>)}
            </section>

            <ImagePopup card={props.card} onClose={props.onClose}/>
        </main>
    );
}

export default Main;