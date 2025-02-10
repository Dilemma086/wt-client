import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { format, getDay } from "date-fns";
import { Preloader } from '../Common/Preloader/Preloader'
import { getSearchThunkCreator } from './../../redux/dashboard/search-reducer'
import style from './mainstyle.module.css'
import Header from './../Common/Header/Header'
import Footer from '../Common/Footer/Footer';

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Search = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const events = useSelector(state => state.search.searchData);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const query = useQuery();
    const date = query.get('date');
    const location = query.get('location');
    
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getSearchThunkCreator(date, location));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, date, location]);

    let eventsSearchs = [];
    let groupedEvents = []
    if (date && location) {
        const evs = events.filter(event => {
            return format(new Date(event.ticketDate), "dd.MM.yyyy") === format(new Date(date), "dd.MM.yyyy");
        });
        
        // Используем reduce для группировки событий по eventId
        groupedEvents = evs.reduce((acc, event) => {
            if (!acc[event.eventId]) {
                acc[event.eventId] = [];
                
            }
            acc[event.eventId].push(event);
            
            return acc; // Не забывайте возвращать аккумулятор
        }, {});
        eventsSearchs = Object.values(groupedEvents).flat();
    } else {
        // Если date или location не заданы, добавляем все события в eventsSearchs
        eventsSearchs = events; // Можно просто присвоить массив
    }
    
    if (loading) {return <Preloader />}

    return(
    <div className={style.fullBlock}>
        <div className={style.nooneBlock}>
        <Header/>
        <h4>{date && location ? `Результат поиска по - ${location} на ${format(new Date(date), "dd.MM.yyyy")}`  : ''}
            {date && !location ? `Результат поиска на ${format(new Date(date), "dd.MM.yyyy")}` : ''} 
            {location && !date ? `Результат поиска по - ${location}` : ''}
        
        </h4>
        {eventsSearchs && eventsSearchs.length > 0 ? (
                    eventsSearchs.map(ticket => (
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

export default Search