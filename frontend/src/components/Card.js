import React from 'react';

const Card = (props) => {


    function handleCardClick() {
        props.onCardClick(props)
    }

    function handleLikeClick() {
        props.onCardLike(props)
    }

    function handleDeleteClick() {
        props.onCardDelete(props)
    }

    return (

        <div className="template__place">
            <figure className="card">
                <img
                    src={props.src}
                    alt={props.alt}
                    className="card__pic"
                    onClick={handleCardClick}/>
                <button
                    className={`card__trash ${ (props.owner === props.myId) && 'active'}`}
                    onClick={handleDeleteClick}></button>
                <figcaption className="card__text">
                    <h4 className="card__name">{props.title}</h4>
                    <div className="card__like-block">
                        <button
                            type="button"
                            onClick={handleLikeClick}
                            className={`card__like ${ (props.cardLiked !== undefined) && 'card__like card__like_active'}`}></button>
                        <p className="card__like-number">{props.like}</p>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default Card;