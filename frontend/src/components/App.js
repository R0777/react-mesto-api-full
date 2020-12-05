import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header.js';
import Main from './Main.js';
import Login from './Login';
import Register from './Register';
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup'
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer.js';
import * as auth from '../utils/auth.js';
import { getToken, setToken } from '../utils/token';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {CurrentCardContext} from '../contexts/CurrentCardContext'

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({ email: '', password: ''});
    const [path, setPath] = useState('/sign-up');
    const [text, setText] = useState('Регистрация');
    const history = useHistory();

    const handlePath = (path) => {
        setPath(path);
    }

    const handleText = (text) => {
        setText(text);
    }

    const handleLogin = (userData) => {
        setUserData(userData);
        setLoggedIn(true);
        handleTooltip()
    }
    
    const tokenCheck = () => {
        const jwt = getToken();
        if (!jwt) {
        return;
        }
        auth.getContent(jwt).then((res) => {
            
        if (res.email) {
            const userData = { 
            email: res.email,
            }
            setLoggedIn(true);
            setUserData(userData);
            history.push('/')

                Promise.all([
                    api.getProfile(),
                    api.getInitialCards()
                ]).then(res => {
                    const [profile, card] = res
                    setCurrentUser(profile)
                    setCurrentCards(card)
                }).catch((err) => {
                    console.log(err);
                })

        }
        })

        .catch((err) => {
            console.log(err);
        })
    }

    const signOut = () => {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        history.push('/sign-in');
    }
    
        useEffect(() => {

                tokenCheck();

    }, []);

    const [isEditProfilePopupOpen,
        setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen,
        setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen,
        setIsEditAvatarPopupOpen] = React.useState(false);
    const [isTrashOpen,
        setIsTrashOpen] = React.useState(false);
    const [isTooltipOpen,
            setTooltipOpen] = React.useState(false);
    const [isSelectedCard,
        setIsSelectedCard] = React.useState()
    const [currentUser,
        setCurrentUser] = React.useState({})
    const [currentCards,
        setCurrentCards] = React.useState([])


    
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {
                    const newCards = currentCards.map(c => c._id === card._id
                        ? newCard
                        : c);
                    setCurrentCards(newCards);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.unLike(card._id)
                .then((newCard) => {
                    
                    const newCards = currentCards.map(c => c._id === card._id
                        ? newCard
                        : c);
                    setCurrentCards(newCards);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleDeleteCard = (card) => {

        api
            .deleteCard(card._id)
            .then(res => {
                const deletedCard = currentCards.filter(el => el._id !== card._id)
                setCurrentCards(deletedCard);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleTrashClick() {
        setIsTrashOpen(true)
    }

    const handleCardClick = (card) => {
        setIsSelectedCard(card)
    }

    function handleTooltip() {
        setTooltipOpen(true)
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsTrashOpen(false)
        setTooltipOpen(false)
        setIsSelectedCard()
    }

    function handleUpdateUser({name, about}) {
        api.setProfile(name, about)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUpdateAvatar = ({avatar}) => {
        api.profileAvatar(avatar)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleAddPlaceSubmit = ({place, link}) => {
        api.setCard(place, link )
            .then(res => {
                setCurrentCards([
                    res, ...currentCards
                ])
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
        
    }

    const handlRegister = (email, password) => {

        auth.register(email, password)
            .then((res) => {

                if ((res.status !== 401) && (res.status !== 400 ) && (res.status !== 409 )) {
                    history.push('/sign-in') 
                } else handleTooltip();
            })
            .catch((err) => {
                console.log(err)
                handleTooltip();
                history.push('/sign-up');
            });
    }

    const handlAuthorize = (data) => {
        const { email, password } = data;

        if (!email || !password){
            handleTooltip()
            return;
        }

        auth.authorize(email, password)
            .then((res) => {
                if (!res){
                    handleTooltip()
                }
    
                if (res.token) {
                setToken(res.token);
                //setData({ email: '', password: ''});
                handleLogin(data);
                history.push('/');
                }
                else handleTooltip()
            })
            .then(() => tokenCheck())
            .catch(err => {
                handleTooltip()
                console.log(err)
            });
    }

    return (
        <CurrentCardContext.Provider value={currentCards}>
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <InfoTooltip 
                        loggedIn={loggedIn}
                        onClose={closeAllPopups} 
                        isTooltipOpen={isTooltipOpen} />
                    <Header
                        text={text}
                        path={path}
                        handlePath={handlePath}
                        handleText={handleText}
                        loggedIn={loggedIn}
                        signOut={signOut} 
                        userData={userData} />
                    <Switch>

                    <Route path="/sign-in">                    
                    <Login 
                        handlAuthorize={handlAuthorize}
                        handleLogin={handleLogin} 
                        handleTooltip={handleTooltip} />
                    </Route>

                    <Route 
                        path="/sign-up"> 
                    <Register 
                        handleTooltip={handleTooltip} 
                        handlRegister={handlRegister}
                        text={text}
                        path={path}
                        handlePath={handlePath}
                        handleText={handleText}
                        />
                    </Route>

                    <ProtectedRoute 
                        path="/" 
                        loginText="Выйти" 
                        userData={userData} 
                        link=""
                        currentCards={currentCards}
                        handleTooltip={handleTooltip}
                        isTooltipOpen={isTooltipOpen}
                        loggedIn={loggedIn}
                        component={Main}
                        onCardLike={handleCardLike}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onTrash={handleTrashClick}
                        onEditAvatar={handleEditAvatarClick}
                        onClose={closeAllPopups}
                        card={isSelectedCard}
                        onCardClick={handleCardClick}
                        onCardDelete={handleDeleteCard} />

                    <Route>
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>

                    </Switch>
                    <EditProfilePopup
                        title="Редактировать профиль"
                        id="profile"
                        isOpen={isEditProfilePopupOpen}
                        buttonText={'Сохранить'}
                        isClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}/>
                    <AddPlacePopup
                        title="Новое место"
                        id="add-card"
                        isOpen={isAddPlacePopupOpen}
                        buttonText={'Сохранить'}
                        isClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}/>

                    <EditAvatarPopup
                        title="Обновить аватар"
                        id="new-avatar"
                        buttonText={'Обновить'}
                        isOpen={isEditAvatarPopupOpen}
                        isClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}/>

                    <PopupWithForm
                        title="Вы уверены?"
                        id="remove-card"
                        buttonText={'Удалить'}
                        isOpen={isTrashOpen}
                        isClose={closeAllPopups}/>
                        <Footer />
                </div>
            </CurrentUserContext.Provider>
        </CurrentCardContext.Provider>

    );
}

export default App;
