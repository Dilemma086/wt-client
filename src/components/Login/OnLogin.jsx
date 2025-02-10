import { Link } from 'react-router-dom';
import style from "./Login.module.css";
import logo from './images/onlilogo.png'

const OnLogin = () => {
    return (
        <div className={style.login}>
            <div className={`${style.blockLogin} ${style.onLogin}`}>
                <div className={style.logo}>
                    <img src={logo} alt='логотип'/>
                </div>
                <h1>Успешная авторизация</h1>
                <button><Link to='/'>На главную</Link></button>
            </div>
        </div>
    );
};

export default OnLogin;
