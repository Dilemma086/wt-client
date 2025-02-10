import React, { useState} from 'react';
import Header from './../Common/Header/Header'
import { Link } from 'react-router-dom';
import Footer from '../Common/Footer/Footer';
import {useDispatch, useSelector } from 'react-redux'
import { delCartThunkCreator, downCurrentCart, addCurrentCart } from './../../redux/dashboard/cart-reducer'
import { setOrderThunkCreator } from './../../redux/dashboard/order-reducer'
import { format, getDay } from "date-fns";
import style from './mainstyle.module.css'

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Cart = () => {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.cart.cartData);
    const current = useSelector(state => state.cart.currentCart);
    const userId = useSelector(state => state.auth.user[0].id);
    
    const [ticketQuantities, setTicketQuantities] = useState({});
           
    const downCurrentTicket = (ticket) => {
        const currentQuantity = ticketQuantities[ticket.id] || 1; 
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setTicketQuantities({ ...ticketQuantities, [ticket.id]: newQuantity });
            dispatch(downCurrentCart(ticket)); 
        }
    };
    const addCurrentTicket = (ticket) => {
        const currentQuantity = ticketQuantities[ticket.id] || 1; 
        
        if (currentQuantity < ticket.total) {
            const newQuantity = currentQuantity + 1;
            setTicketQuantities({ ...ticketQuantities, [ticket.id]: newQuantity });
            dispatch(addCurrentCart(ticket)); 
        }
    };
    const delCard = (ticket, ticketQuantities) => {
        dispatch(delCartThunkCreator(ticket, ticketQuantities))
    }

    const order = (tickets, userId) => {
        dispatch(setOrderThunkCreator(tickets, userId))
    }
    
    return (
        <div className={style.fullBlock}>
            <div className={style.nooneBlock}>
                <Header />
                <h3>Билеты</h3>
                <p className={style.pBlock}>Посмотрите и проверьте Ваши билеты.</p>
                <div className={style.ticketsList}>
                    <h4>Список выбранных билетов</h4>
                </div>
                    {tickets && tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <div className={style.cartList}>
                        <div key={ticket.id} className={style.cardTicket}>
                            <div className={style.image}>
                                <img src={ticket.firstImageUrl} alt={ticket.eventName} />  
                            </div>
                            <div className={style.inform}>
                                <h4>{ticket.eventName}</h4>
                                <h6>
                                    Дата: {format(new Date(ticket.date), "dd.MM")} {ticket.time.slice(0, -3)} {daysOfWeek[getDay(new Date(ticket.date))]}
                                </h6>
                                <h5>Место: {ticket.categoryName} / Доступно  - {ticket.total}</h5>
                                <h5>Стоимость: {ticket.price} руб.</h5>
                            </div>
                            <div className={style.currentTicket}>
                                <span className={style.downCurrentTicket} onClick={() => downCurrentTicket(ticket)}>
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="43" height="43" stroke="#858585"/>
                                    <path d="M15.25 21.25C14.8358 21.25 14.5 21.5858 14.5 22C14.5 22.4142 14.8358 22.75 15.25 22.75H29.25C29.6642 22.75 30 22.4142 30 22C30 21.5858 29.6642 21.25 29.25 21.25H15.25Z" fill="#505050"/>
                                    </svg>
                                </span>
                                    {ticket.quantity || 1} 
                                <span className={style.addCurrentTicket} onClick={() => addCurrentTicket(ticket)}>
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="43" height="43" stroke="#858585"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0313 14.25C22.4455 14.2505 22.7809 14.5868 22.7803 15.001L22.762 29.001C22.7614 29.4152 22.4252 29.7505 22.011 29.75C21.5968 29.7495 21.2614 29.4132 21.262 28.999L21.2803 14.999C21.2809 14.5848 21.6171 14.2495 22.0313 14.25Z" fill="#505050"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 22C14.25 21.5858 14.5858 21.25 15 21.25H29C29.4142 21.25 29.75 21.5858 29.75 22C29.75 22.4142 29.4142 22.75 29 22.75H15C14.5858 22.75 14.25 22.4142 14.25 22Z" fill="#505050"/>
                                    </svg>
                                </span>
                            </div>
                            <div className={style.delTicket}>
                                <span className={style.delCurrentTicket} onClick={() => delCard(ticket, ticketQuantities)}>
                                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.12435 3.66602C2.12435 3.32084 2.40417 3.04102 2.74935 3.04102H15.2493C15.5945 3.04102 15.8743 3.32084 15.8743 3.66602V17.8327C15.8743 18.1779 15.5945 18.4577 15.2493 18.4577H2.74935C2.40417 18.4577 2.12435 18.1779 2.12435 17.8327V3.66602ZM3.37435 4.29102V17.2077H14.6243V4.29102H3.37435Z" fill="#222222"/>
                                        <path d="M7.33268 7.20768C7.67786 7.20768 7.95768 7.4875 7.95768 7.83268V13.2493C7.95768 13.5945 7.67786 13.8743 7.33268 13.8743C6.9875 13.8743 6.70768 13.5945 6.70768 13.2493V7.83268C6.70768 7.4875 6.9875 7.20768 7.33268 7.20768Z" fill="#222222"/>
                                        <path d="M10.666 7.20768C11.0112 7.20768 11.291 7.4875 11.291 7.83268V13.2493C11.291 13.5945 11.0112 13.8743 10.666 13.8743C10.3208 13.8743 10.041 13.5945 10.041 13.2493V7.83268C10.041 7.4875 10.3208 7.20768 10.666 7.20768Z" fill="#222222"/>
                                        <path d="M0.0410156 3.66602C0.0410156 3.32084 0.320838 3.04102 0.666016 3.04102H17.3327C17.6779 3.04102 17.9577 3.32084 17.9577 3.66602C17.9577 4.01119 17.6779 4.29102 17.3327 4.29102H0.666016C0.320838 4.29102 0.0410156 4.01119 0.0410156 3.66602Z" fill="#222222"/>
                                        <path d="M6.48837 0.865588C6.59809 0.665439 6.80819 0.541016 7.03643 0.541016H10.9898C11.22 0.541016 11.4315 0.667508 11.5404 0.870263L12.8833 3.37026C12.9873 3.56396 12.9819 3.79808 12.8691 3.98678C12.7563 4.17548 12.5526 4.29102 12.3327 4.29102H5.66602C5.4452 4.29102 5.24077 4.17449 5.12825 3.98449C5.01572 3.7945 5.01181 3.55922 5.11796 3.36559L6.48837 0.865588ZM7.40657 1.79102L6.72136 3.04102H11.2875L10.6161 1.79102H7.40657Z" fill="#222222"/>
                                    </svg>
                                </span>
                            </div>  
                        </div>
                            <span className={style.line2px}></span>
                            
                        </div>
                        
                    ))
                    )
                    :
                        <h5>Список пуст</h5>       
                    }
                    {current > 0 ? (
                        (() => {
                            let totalPrice = 0;
                            tickets.forEach(item => {
                                totalPrice += item.quantity * parseInt(item.price, 10);
                            });
                            return (
                                <div className={style.totalTicket}>
                                    <h4>Сумма заказа</h4>
                                    <div className={style.table}>
                                        <h5>Количество билетов </h5>
                                        <h5><b>{current} </b></h5>
                                    </div>
                                    <div className={style.table}>
                                        <h5>Общая сумму</h5>
                                        <h5><b>{totalPrice} руб</b></h5>
                                    </div>
                                    <div className={style.table}>
                                        <h5>Сервисный сбор </h5>
                                        <h5><b>{current * 140} руб</b></h5>
                                    </div>
                                    <span className={style.line2px}></span>
                                    <div className={style.itogo}>
                                        <h5>Итого к оплате</h5> 
                                        <h5><b>{totalPrice + (current * 140)} руб</b></h5>
                                    </div>
                                    <div   className={style.btn}>
                                    <button className={style.btnCyanTicket} onClick={() => order(tickets, userId)}><Link to={`/orders/`}>Оформить заказ</Link></button>
                                    </div>
                                </div>
                            );
                        })()
                    ) : ''}
            </div>
            <Footer/>
        </div>
        
    )
}
export default Cart