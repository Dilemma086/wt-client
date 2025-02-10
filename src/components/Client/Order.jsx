import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import {getOrderThunkCreator } from '../../redux/dashboard/order-reducer'
import { Preloader } from '../Common/Preloader/Preloader'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { format, getDay } from "date-fns";
import style from './mainstyle.module.css'

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const Order = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.auth.user[0].id);
    const auth = useSelector(state => state.auth.user[0]);
    const { id } = useParams();
    const order = useSelector(state => state.order.orderData[0]);
  
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getOrderThunkCreator(userId, +id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, userId, id]);

    if (loading) {return <Preloader />}
    return (
        <div className={style.fullBlock}>
            <div className={style.nooneBlock}>
                <Header />
                <h3>Заказ</h3>
                <p className={style.pBlock}>Информация по заказу.</p>
                {order ? 
                
                    <div className={style.oneOrder}>
                        
                        <div className={style.itemOrderL}>
                            <h4>Поздравляем!</h4>
                            <h5>Вы успешно приобрели билет на:</h5>
                            <h3>{order.name}</h3>
                            <span className={style.lineL}></span>
                            <div className={style.info}>
                                <h4>Детали заказа</h4>
                                <h5>Заказ №{order.orderId}</h5>
                                <h5><b>Название мероприятия:</b> {order.name}</h5> 
                                <h5><b>Локация:</b> {order.location_name}</h5>  
                                <h5><b>Дата:</b> {format(new Date(order.date), "dd.MM")} {order.time.slice(0, -3)} {daysOfWeek[getDay(new Date(order.date))]}</h5>
                                <h5><b>Место:</b> {order.category_name}</h5>
                                <h5><b>Количество билетов:</b> {order.quantity} шт</h5>
                                <h5><b>Стоимость:</b> {order.price} руб</h5>
                                <h5><b>Статус заказа:</b> {order.status}</h5>
                            </div>
                            <span className={style.lineL}></span>
                            <div className={style.info}>
                                <h4>Подробности Ваших данных</h4>
                                <h5><b>ФИО:</b> {auth.firstname}</h5> 
                                <h5><b>Телефон:</b> {auth.phone}</h5>
                                <h5><b>E-Mail:</b> {auth.email}</h5>
                            </div>
                            <span className={style.lineL}></span>
                            <div className={style.info}>
                                <p>Благодарим Вас за использование сервиса Волна Билетов!</p>
                                
                            </div>
                        </div>    
                        <div className={style.itemOrderR}>
                            <div className={style.image}>
                                <div className={style.namiTicket}>
                                    <h4>{order.name}</h4>
                                </div>
                                <img src={order.image_url} alt={order.name}/>
                                <div className={style.btnInfo}>
                                    <div className={style.left}>
                                        <p>Дата: {format(new Date(order.date), "dd.MM")}</p>
                                        <p>Количество билетов: {order.quantity}</p>
                                        <p>Место: {order.category_name}</p>
                                        
                                    </div>
                                    <div className={style.right}>
                                        <p>Время: {order.time.slice(0, -3)}</p>
                                    </div>
                                </div>

                                <span className={style.curtain}></span>
                            </div>
                            <div className={style.downloadTicket}>
                                <button><Link to=''>
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 6.5C12.7761 6.5 13 6.72386 13 7V13C13 13.2761 12.7761 13.5 12.5 13.5H0.5C0.223858 13.5 0 13.2761 0 13V7.00277C0 6.72662 0.223858 6.50277 0.5 6.50277C0.776142 6.50277 1 6.72662 1 7.00277V12.5H12V7C12 6.72386 12.2239 6.5 12.5 6.5Z" />
                                <path d="M3.14645 6.31311C3.34171 6.11785 3.65829 6.11785 3.85355 6.31311L6.5 8.95956L9.14645 6.31311C9.34171 6.11785 9.65829 6.11785 9.85355 6.31311C10.0488 6.50838 10.0488 6.82496 9.85355 7.02022L6.85355 10.0202C6.65829 10.2155 6.34171 10.2155 6.14645 10.0202L3.14645 7.02022C2.95118 6.82496 2.95118 6.50838 3.14645 6.31311Z" />
                                <path d="M6.49723 0.5C6.77338 0.5 6.99723 0.723858 6.99723 1V9.66667C6.99723 9.94281 6.77338 10.1667 6.49723 10.1667C6.22109 10.1667 5.99723 9.94281 5.99723 9.66667V1C5.99723 0.723858 6.22109 0.5 6.49723 0.5Z" />
                                </svg>

                                    Скачать билет</Link></button>
                                <button><Link to=''>
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.0013 2.66667C8.0013 1.47005 8.97136 0.5 10.168 0.5C11.3646 0.5 12.3346 1.47005 12.3346 2.66667C12.3346 3.86328 11.3646 4.83333 10.168 4.83333C8.97136 4.83333 8.0013 3.86328 8.0013 2.66667ZM10.168 1.5C9.52364 1.5 9.0013 2.02234 9.0013 2.66667C9.0013 3.31099 9.52364 3.83333 10.168 3.83333C10.8123 3.83333 11.3346 3.31099 11.3346 2.66667C11.3346 2.02234 10.8123 1.5 10.168 1.5Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.667969 7C0.667969 5.80339 1.63803 4.83333 2.83464 4.83333C4.03124 4.83333 5.0013 5.80339 5.0013 7C5.0013 8.19661 4.03124 9.16667 2.83464 9.16667C1.63803 9.16667 0.667969 8.19661 0.667969 7ZM2.83464 5.83333C2.19031 5.83333 1.66797 6.35568 1.66797 7C1.66797 7.64432 2.19031 8.16667 2.83464 8.16667C3.47896 8.16667 4.0013 7.64432 4.0013 7C4.0013 6.35568 3.47896 5.83333 2.83464 5.83333Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.929 3.26572C9.07209 3.5019 8.99663 3.80936 8.76045 3.95245L4.54009 6.50942C4.30391 6.65251 3.99645 6.57705 3.85336 6.34087C3.71027 6.10469 3.78573 5.79723 4.02191 5.65414L8.24227 3.09718C8.47845 2.95409 8.78591 3.02955 8.929 3.26572Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.85054 7.60029C3.99102 7.36255 4.29763 7.28371 4.53537 7.42419L8.98217 10.0519C9.21991 10.1923 9.29875 10.4989 9.15826 10.7367C9.01778 10.9744 8.71117 11.0533 8.47344 10.9128L4.02664 8.28512C3.7889 8.14463 3.71006 7.83802 3.85054 7.60029Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.168 10.1667C9.52364 10.1667 9.0013 10.689 9.0013 11.3333C9.0013 11.9777 9.52364 12.5 10.168 12.5C10.8123 12.5 11.3346 11.9777 11.3346 11.3333C11.3346 10.689 10.8123 10.1667 10.168 10.1667ZM8.0013 11.3333C8.0013 10.1367 8.97136 9.16667 10.168 9.16667C11.3646 9.16667 12.3346 10.1367 12.3346 11.3333C12.3346 12.5299 11.3646 13.5 10.168 13.5C8.97136 13.5 8.0013 12.5299 8.0013 11.3333Z"/>
                                </svg>

                                    Отправить</Link></button>
                            </div>
                        </div>
                       
                    </div>
                    : 
                    <p>Список пуст.</p>
                }
            </div>
            <Footer />
        </div>

    )
}
export default Order