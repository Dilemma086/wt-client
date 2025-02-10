import { Link } from 'react-router-dom'
import style from './../../../components/Client/mainstyle.module.css'

const ProfileAccont = (props) => {
    return(
        <div className={style.item}>
            <h4>Аккаунт</h4>
            <span className={style.line}></span>
            <div className={style.childblock}>
                <div className={style.name}>
                    <h4>Заказы</h4>
                    <Link to='/orders/'>Все заказы</Link>
                </div>
                <p>Информация по запланированным предстоящим мероприятиям.</p>

            </div>
            <div className={style.childblock}>
                <div className={style.name}>
                    <h4>Бонусы</h4>
                </div>
                <p>У Вас пока нет начисленных бонусов.</p>
            </div>
            <div className={style.childblock}>
                <div className={style.name}>
                    <h4>Платежи</h4>
                </div>
                <p>У Вас пока нет информации по платежам.</p>
            </div>
            <div className={style.childblock}>
                <div className={style.name}>
                    <h4>Контактная информация</h4>
                </div>
                <p>{props.account.phone}</p>
            </div>
        </div>
    )
}
export default ProfileAccont