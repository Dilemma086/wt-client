import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import style from './mainstyle.module.css'
import { useParams, Link, useLocation } from 'react-router-dom';
import { Preloader } from '../Common/Preloader/Preloader'
import { getCategoryThunkCreator, resetCategory } from './../../redux/dashboard/category-reducer'
import { format, getDay } from "date-fns";
import Header from './../Common/Header/Header'
import Footer from '../Common/Footer/Footer';

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Category = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const category =useSelector(state => state.category.categoryData)
    const { id } = useParams();
    const location = useLocation();

     useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCategoryThunkCreator(id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        return () => {
            dispatch(resetCategory());
        };
    }, [location]);


    if (loading) {return <Preloader />}

    return(<div className={style.fullBlock}>
        <div className={style.nooneBlock}>
        <Header/>
        
        {category && category.length > 0 ? (
                    category.map(ticket => (
                        <Link to={`/events/${ticket.eventId}`}><div className={style.cartList}>
                        <div key={ticket.id} className={style.cardTicket}>
                            <div className={style.image}>
                                <img src={ticket.firstImageUrl} alt={ticket.eventName} />  
                            </div>
                            <div className={style.inform}>
                                <h4>{ticket.eventName}</h4>
                                <h6>
                                    Дата: {format(new Date(ticket.ticketDate), "dd.MM")} {ticket.ticketTime.slice(0, -3)} {daysOfWeek[getDay(new Date(ticket.date))]}
                                </h6>
                                <h5>Доступно  - {ticket.total}</h5>
                                <h5>Стоимость: от {ticket.price} руб.</h5>
                            </div>
                            
                        </div>
                            <span className={style.line2px}></span>
                            
                        </div>
                        </Link>
                    ))
                    )
                    :
                        <h5>Список пуст</h5>       
                    }
        </div>
        <Footer />
    </div>
)}

export default Category