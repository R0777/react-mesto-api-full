import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../images/svg/logo.svg';

const Header = (props) => {

    const checkLocation = () => {
        const location = window.location.pathname

        if (location === '/') {
            props.signOut();
        }
        else if (location === '/sign-up') {   
            props.handleText('Вход')
            props.handlePath('/sign-in')
        }
        else if (location === '/sign-in') {   
            props.handleText('Регистрация')
            props.handlePath('/sign-up')
        }
        else {
            props.handleText('Регистрация')
            props.handlePath('/sign-up')
        }
    } 

    return (
    <header className="header"><img src={logo} alt="логотип Mesto Russia" className="header__logo"/>
    <p className="header__login-email">{props.loggedIn ? props.userData.email : ''}</p>
    <p className="header__login-text" onClick={checkLocation}><Link className="login__link" to={props.loggedIn !== true ? `${props.path}`:'/'}>{props.loggedIn ? 'Выйти' : `${props.text}`}</Link></p></header>
    );
}

export default Header;

{/* <Link onClick={checkLocation} to={location === '/sign-in' ? '/sign-up' : (location === '/sign-up' && '/sign-up') } className="login__link">{location === '/sign-in' ? 'Регистрация' : (location === '/sign-up' ? 'Войти' : 'Регистрация')}  onClick={checkLocation}*/}