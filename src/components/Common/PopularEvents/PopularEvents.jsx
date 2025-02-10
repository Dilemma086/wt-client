import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import style from './../../Client/mainstyle.module.css'

const PopularEvents = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = useCallback(() => {
        const topItem = document.querySelector(`.${style.topItem}`);
        const rect = topItem.getBoundingClientRect();
        
        if (rect.top < window.innerHeight) {
            setIsVisible(true); // Устанавливаем состояние видимости
            window.removeEventListener('scroll', handleScroll); // Удаляем слушатель после появления
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Удаляем слушатель при размонтировании
        };
    }, [handleScroll]);

    const events = props.events.slice(0, 6)
    
    return(
        <div className={style.topItems}>
            <h3>Популярные мероприятия</h3>
            <div className={`${style.topItem} ${isVisible ? style.visible : ''}`}>
            {events.map(event =>(
                <div className={style.item}>
                    <Link to={`/events/${event.id}`}>
                    <img src={event.firstImagePath} alt={event.name} />
                    <h6 key={event.id}>{event.name}</h6>
                    <span>Стоимость от {event.minTicketPrice} руб</span>
                    </Link>
                </div>

            ))

            }
            </div>
        </div>
    )
}
export default PopularEvents