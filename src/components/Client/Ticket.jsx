import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import style from './mainstyle.module.css'
import { Preloader } from '../Common/Preloader/Preloader'
import {getTicketThunkCreator} from './../../redux/dashboard/ticketDBoard-reducer'
import {getCartThunkCreator} from './../../redux/dashboard/cart-reducer'
import { format, getDay } from "date-fns";
import Header from './../Common/Header/Header'
import Footer from '../Common/Footer/Footer';

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Ticket = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const ticket = useSelector(state => state.ticket.ticketData);
    const currentCart = useSelector(state => state.cart.currentCart);
    const auth = useSelector(state => state.auth.isAuth);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getTicketThunkCreator(id))
                    
                ]);
            } finally {
                setLoading(false); // Скрыть прелоадер после завершения загрузки данных
            }
        };

        fetchData();
    }, [dispatch, id]);

    const addCart = () => {
        dispatch(getCartThunkCreator(ticket))
    }

    if (loading) {return <Preloader />}

    
    return (
        <div className={style.fullBlock}>
            <div className={style.nooneBlock}>
                <Header />
            <h4>{ticket.eventName}</h4>
            <div className={style.imageBlock}>
                  <img src={ticket.firstImageUrl} alt={id}/>  
            </div>
            <div className={style.infoBlock}>
                <div className={style.line}>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.595785 0.36825C0.811228 0.230403 1.08207 0.21185 1.31429 0.319032L7.51129 3.17919L14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L21.3143 3.31903C21.5799 3.44162 21.75 3.70746 21.75 4V19C21.75 19.2558 21.6197 19.4939 21.4042 19.6318C21.1888 19.7696 20.9179 19.7882 20.6857 19.681L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L0.685706 16.681C0.420094 16.5584 0.25 16.2925 0.25 16V1C0.25 0.744233 0.380342 0.506097 0.595785 0.36825ZM14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L1.75 2.17218V15.5201L7.51129 18.1792L14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L20.25 17.8278V4.47988L14.4887 1.82082Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 0.25C14.9142 0.25 15.25 0.585786 15.25 1V16C15.25 16.4142 14.9142 16.75 14.5 16.75C14.0858 16.75 13.75 16.4142 13.75 16V1C13.75 0.585786 14.0858 0.25 14.5 0.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.25C7.91421 3.25 8.25 3.58579 8.25 4V19C8.25 19.4142 7.91421 19.75 7.5 19.75C7.08579 19.75 6.75 19.4142 6.75 19V4C6.75 3.58579 7.08579 3.25 7.5 3.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L18.0645 1.81903C18.4406 1.99261 18.6047 2.4382 18.4312 2.81429C18.2576 3.19038 17.812 3.35455 17.4359 3.18097L14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L3.93589 3.18097C3.5598 3.00739 3.39563 2.5618 3.56921 2.18571C3.74279 1.80962 4.18839 1.64545 4.56447 1.81903L7.51129 3.17919L14.2046 0.310643Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L18.0645 16.819C18.4406 16.9926 18.6047 17.4382 18.4312 17.8143C18.2576 18.1904 17.812 18.3545 17.4359 18.181L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L3.93589 18.181C3.5598 18.0074 3.39563 17.5618 3.56921 17.1857C3.74279 16.8096 4.18839 16.6455 4.56447 16.819L7.51129 18.1792L14.2046 15.3106Z" fill="#222222"></path></svg>
                        </span>
                        <p>Локация: {ticket.location.name}</p>
                    </div>
                    <div className={style.information}>
                        <button><Link to={`/events/${ticket.eventId}`}>Подробнее о меропиятии <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 4.9598C0 4.68366 0.223858 4.4598 0.5 4.4598H8.5C8.77614 4.4598 9 4.68366 9 4.9598C9 5.23594 8.77614 5.4598 8.5 5.4598H0.5C0.223858 5.4598 0 5.23594 0 4.9598Z" fill="#3337BF"/>
                                <path d="M4.14645 0.603478C4.34171 0.408216 4.65829 0.408216 4.85355 0.603478L8.85355 4.60348C9.04882 4.79874 9.04882 5.11532 8.85355 5.31059L4.85355 9.31059C4.65829 9.50585 4.34171 9.50585 4.14645 9.31059C3.95118 9.11532 3.95118 8.79874 4.14645 8.60348L7.79289 4.95703L4.14645 1.31058C3.95118 1.11532 3.95118 0.79874 4.14645 0.603478Z" fill="#3337BF"/>
                                </svg></Link>
                        </button>
                    </div>
                </div>
                <div className={style.line}>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none">
                            <path d="M17 3.32007H7C4.79086 3.32007 3 5.11093 3 7.32007V17.3201C3 19.5292 4.79086 21.3201 7 21.3201H17C19.2091 21.3201 21 19.5292 21 17.3201V7.32007C21 5.11093 19.2091 3.32007 17 3.32007Z" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.0003 14.0701L3.82031 4.89014" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58008 20.5101L10.9001 8.68005" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                       </span>
                        <p>Адрес: {ticket.location.street}, {ticket.location.dom}</p>
                    </div>
                </div>

            </div>
            <h3>Информация</h3>
            <p className={style.pBlock}>Подробные данные о билете.</p>
            <div className={style.itemTicket}>
                <div className={style.image}>
                    <img src={ticket.firstImageUrl} alt={id}/>  
                </div>
                <div className={style.inform}>
                    <h4>{ticket.eventName}</h4>
                    <h6>Дата: {format(new Date(ticket.date), "dd.MM")} {ticket.time.slice(0, -3)} {daysOfWeek[getDay(new Date(ticket.date))]}</h6>
                    <h5>Место: {ticket.categoryName}</h5>
                    <h5>Стоимость: {ticket.price} руб.</h5>
                </div>

            </div>
            <span className={style.line2px}></span>
            {auth ?
            <div className={style.btnTicket}>

                <button className={style.btnCyanTicket} onClick={addCart}>Добавить в корзину</button> 
                {currentCart > 0 ?
                    <button className={style.btnWhiteTicket}><Link to="/cart">Перейти в корзину</Link></button> : ''}
            </div>
            :
            <div className={style.authorization}>
                <Link to='/login'>
                <span> Авторизироваться </span>
                <span>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="#3337BF" xmlns="http://www.w3.org/2000/svg"><path d="M5.25 12.5042C5.25 12.0899 5.58579 11.7542 6 11.7542H18C18.4142 11.7542 18.75 12.0899 18.75 12.5042C18.75 12.9184 18.4142 13.2542 18 13.2542H6C5.58579 13.2542 5.25 12.9184 5.25 12.5042Z"></path><path d="M11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967L18.5303 11.9697C18.8232 12.2626 18.8232 12.7374 18.5303 13.0303L12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303C11.1768 18.7374 11.1768 18.2626 11.4697 17.9697L16.9393 12.5L11.4697 7.03033C11.1768 6.73744 11.1768 6.26256 11.4697 5.96967Z"></path></svg>
                </span>
                </Link>
            </div>
            }
            </div>
            <Footer/>
        </div>
    )
}

export default Ticket