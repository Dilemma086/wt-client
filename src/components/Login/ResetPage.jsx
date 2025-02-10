import React  from "react";
import { resetAuthThunkCreator } from "../../redux/auth-reducer";
import style from "./Login.module.css";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from "react-redux";
import logo from './images/onlilogo.png'


const ResetPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.user.email)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    
    const onSubmit = (values) => {
        dispatch(resetAuthThunkCreator(email, values.password))
    };
    
    const validate = (values) => {
        const errors = {};
        if (values.password !== values.password1) {
          errors.password1 = 'Пароли не совпадают';
        }
        return errors;
    };

    // const errorToDisplay = props.error;
    if(isAuthenticated){navigate('/login')}
    
    return (
        <div className={style.login}>
            <div className={style.blockLogin}>
            <div className={style.logo}>
                    <img src={logo} alt='логотип'/>
                </div>
            <h1>Восстановить пароль</h1>
        <Form 
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, values, errors }) =>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span>{email}</span>
                    </div>
                    <div>
                        <Field name="password" component="input" type="password" placeholder="Пароль" />
                    </div>
                    <div>
                        <Field name="password1" component="input" type="password" placeholder="Повторить пароль"  />
                        {errors.password1 && (<div className={style.errorInfo}>{errors.password1}</div>)}
                    </div>
                    
                    <div>
                        <button type="submit" disabled={submitting}>Сменить пароль</button>
                    </div>
                    
                </form>
            }
        />
        <Link to='/login'>Назад</Link>
        </div>
        
        </div>
    );
};

export default ResetPage