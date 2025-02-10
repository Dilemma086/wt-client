import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {loginAuthThunkCreator } from "./../../redux/auth-reducer";
import style from "./Login.module.css";
import { Form, Field } from 'react-final-form';
import logo from './images/onlilogo.png'


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
   
    const isAuth = useSelector(state => state.auth.isAuth)
    const errorToDisplay = useSelector(state => state.auth.error)

    const onSubmit = (values) => {
        dispatch(loginAuthThunkCreator(values.email, values.password));
    };

    useEffect(() => {
        if (isAuth) {
                navigate('/'); 
               
            }

    }, [isAuth, navigate]);

    
     
    return (
        <div className={style.login}>
            <div className={style.blockLogin}>
                <div className={style.logo}>
                    <img src={logo} alt='логотип'/>
                </div>

                <h1>Вход</h1>
                <Form onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, values }) =>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field name="email" component="input" type="email" placeholder="Электронная почта" />
                            </div>
                            <div>
                                <Field name="password" component="input" type="password" placeholder="Пароль"  />
                            </div>
                            <div>
                            {errorToDisplay && (<div className={style.errorInfo}>
                                {errorToDisplay}
                                {errorToDisplay === 'Неверный пароль' && <span onClick={() => navigate('/reset')}>Восстановить пароль?</span>}
                                {errorToDisplay === 'Неверное имя пользователя' && <span onClick={() => navigate('/registr')}> Зарегистрироваться?</span>}
                                </div>)
                            }   
                            </div>
                            <div>
                                <button type="submit" disabled={submitting}>Войти</button>
                            </div>
                        </form>
                    }
                />
                <Link to='/registr'>Зарегистрироваться</Link>
            </div>
        </div>
    );
};

export default LoginPage;
