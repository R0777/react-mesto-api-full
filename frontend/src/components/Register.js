import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ handlRegister, ...props }) => {

    const [data, setData] = useState( {
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        handlRegister(email, password);
      }

      const handleSignin = () => {            
          props.handleText('Регистрация')
          props.handlePath('/sign-up')
      }

    return (
        <section className="login">
            <form className="login__block" onSubmit={handleSubmit}>
                <h4 className="login__title">Регистрация</h4>
                <label className="login__field">
                <input
                    type="email"
                    className="login__input login__input_email"
                    id='login-input'
                    name="email"
                    placeholder="Email"
                    minLength="6"
                    maxLength="30"
                    required value={data.email} onChange={handleChange}/>
            </label>
            <label className="login__field">
                <input
                    className="login__input login__input_password"
                    id='password-input'
                    placeholder="Пароль" 
                    name="password"
                    minLength="3"
                    type="password"
                    required value={data.password} onChange={handleChange}/>
            </label>
                <button className="login__enter" type="submit">Зарегистрироваться</button>
                <p className="login__text" onClick={handleSignin} ><Link className="login__link" to={props.loggedIn !== true && `${props.path}`}>Уже зарегистрированы? Войти</Link></p>
            </form>
        </section>
    );
}

export default Register;