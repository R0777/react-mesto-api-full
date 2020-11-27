import React, { useState } from 'react';

    const Login = ({ handlAuthorize }) => {

    const [data, setData] = useState({
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
        handlAuthorize(data)
    }
    
    return (
        <section className="login">
            <form className="login__block" onSubmit={handleSubmit}>
                <h4 className="login__title">Вход</h4>
                <label className="login__field">
                <input value={data.email} onChange={handleChange}
                    type="email"
                    className="login__input login__input_email"
                    id='login-input'
                    name="email"
                    placeholder="Email"
                    minLength="5"
                    maxLength="30"
                    required/>
                
            </label>
            <label className="login__field">
                <input value={data.password} onChange={handleChange}
                    className="login__input login__input_password"
                    id='password-input'
                    placeholder="Пароль" 
                    name="password"
                    type="password"
                    required/>
                
            </label>
                <button className="login__enter" type="submit">Войти</button>
            </form>
        </section>
    );
}

export default Login;