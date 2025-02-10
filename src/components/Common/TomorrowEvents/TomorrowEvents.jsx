import React, { useState, useEffect , useRef, useCallback } from 'react';
import { Link } from 'react-router-dom'
import style from './../../Client/mainstyle.module.css'

const TomorrowEvents = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const tomorrowRef = useRef(null); // Используем ref для доступа к элементу

    const handleScroll = useCallback(() => {
        const tomorrow = tomorrowRef.current; // Получаем текущий элемент из ref
        if (tomorrow) { // Проверяем, что элемент существует
            const recttomor = tomorrow.getBoundingClientRect();
            
            if (recttomor.top < window.innerHeight) {
                setIsVisible(true); // Устанавливаем состояние видимости
                window.removeEventListener('scroll', handleScroll); // Удаляем слушатель после появления
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);


    const events = props.events.slice(6, 12)
    
    return(
    <div className={style.topItems}>
                <h3>Уже завтра</h3>
                <div className={`${style.tomorrow} ${isVisible ? style.visible : ''}`} ref={tomorrowRef}>
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
export default TomorrowEvents