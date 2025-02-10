import React from "react";
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux';
import { regUserThunkCreator } from './../../redux/auth-reducer'
import { Link, useNavigate } from 'react-router-dom'
import logo from './images/onlilogo.png'
import style from './Login.module.css'

const RegistrPage = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const onSubmit = (values) => {
        dispatch(regUserThunkCreator(values.email, values.password))
        navigate('/', { replace: true });
    }
    const validate = (values) => {
        const errors = {};
        if (values.password !== values.password1) {
          errors.password1 = 'Пароли не совпадают';
        }
        return errors;
    };

    return(
        <div className={style.login}>
            <div className={`${style.blockLogin} ${style.height465}`}>
            <div className={style.logo}>
                    <img src={logo} alt='логотип'/>
                </div>
            <h1>Регистрация пользователя</h1>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting, form, values, errors}) =>  
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="email" component="input" type="email" placeholder="Электронная почта"/> 
                        </div>
                        
                        <div>
                            <Field name="password" component="input" type="password" placeholder="Пароль" /> 
                        </div>
                        <div>
                            <Field name="password1" component="input" type="password" placeholder="Повторите пароль" />
                            {errors.password1 && (<div className={style.errorInfo}>{errors.password1}</div>)}
                        </div>
                        <div>
                            <button type="submit" disabled={submitting}>Зарегистрироваться</button>
                        </div>
                    </form>
                }
            />
            <Link to='/login'>Назад</Link>
            </div>
        </div>
    )    
}

export default RegistrPage