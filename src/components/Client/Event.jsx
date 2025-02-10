import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import style from './mainstyle.module.css'
import { Preloader } from '../Common/Preloader/Preloader'
import {getEventThunkCreator} from './../../redux/dashboard/eventDBoard-reducer'
import { format, getDay } from "date-fns";
import Header from './../Common/Header/Header'
import Footer from '../Common/Footer/Footer';

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const Event = () =>{
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const event = useSelector(state => state.event.eventData);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(currentIndex);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    dispatch(getEventThunkCreator(id))
                ]);
            } finally {
                setLoading(false); // Скрыть прелоадер после завершения загрузки данных
            }
        };
        fetchData();
    }, [dispatch, id]);

    if (loading) {return <Preloader />}

    const imageLeft = () => {
        setNextIndex((prevIndex) => (prevIndex === 0 ? event.images.length - 1 : prevIndex - 1));
        setIsTransitioning(true);
    };

    const imageRight = () => {
        setNextIndex((prevIndex) => (prevIndex === event.images.length - 1 ? 0 : prevIndex + 1));
        setIsTransitioning(true);
    };

    const handleTransitionEnd = () => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
    };

    const ticketDates = Array.from(new Set(
        event.tickets.map(ticket => format(new Date(ticket.date), "dd.MM.yyyy"))
    )).join(' / ');
    const ticketTimes = Array.from(new Set(
        event.tickets.map(ticket => ticket.time.slice(0, -3))
    )).join(' / ');
    

    return (
        <div className={style.fullBlock}>
            
            <div className={style.nooneBlock}>
                <Header/>
            <h4>{event.name}</h4>
            <div className={style.imageContainer}>
                <span className={style.imageLeft} onClick={imageLeft}>
                <svg fill="#fff" height="50px" width="100px" version="1.1" id="Layer_1"  
                    viewBox="0 0 330 330" >
                <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
                    l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
                    C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/>
                </svg>
                </span>
                <div className={`${style.imageBlock} ${isTransitioning ? style.transitioning : ''}`} onTransitionEnd={handleTransitionEnd}>
                    <img src={event.images[currentIndex].image} alt={event.images[currentIndex].id} />
                 </div>
                <span className={style.imageRight} onClick={imageRight} >
                <svg fill="#fff" height="50px" width="100px" version="1.1" id="Layer_1" viewBox="0 0 330 330" transform="rotate(180)">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <path id="XMLID_92_" d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001 l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996 C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"/> </g>
                </svg>

                </span>
            </div>
            <div className={style.infoBlock}>
                <div className={style.line}>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 3C0.25 2.58579 0.585786 2.25 1 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V21C21.75 21.4142 21.4142 21.75 21 21.75H1C0.585786 21.75 0.25 21.4142 0.25 21V3ZM1.75 3.75V20.25H20.25V3.75H1.75Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 9C12.25 8.58579 12.5858 8.25 13 8.25H17C17.4142 8.25 17.75 8.58579 17.75 9V16C17.75 16.4142 17.4142 16.75 17 16.75H13C12.5858 16.75 12.25 16.4142 12.25 16V9ZM13.75 9.75V15.25H16.25V9.75H13.75Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.25C7.91421 0.25 8.25 0.585786 8.25 1V5C8.25 5.41421 7.91421 5.75 7.5 5.75C7.08579 5.75 6.75 5.41421 6.75 5V1C6.75 0.585786 7.08579 0.25 7.5 0.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 0.25C14.9142 0.25 15.25 0.585786 15.25 1V5C15.25 5.41421 14.9142 5.75 14.5 5.75C14.0858 5.75 13.75 5.41421 13.75 5V1C13.75 0.585786 14.0858 0.25 14.5 0.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 9C4.25 8.58579 4.58579 8.25 5 8.25H9C9.41421 8.25 9.75 8.58579 9.75 9V16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H8.25V9.75H5C4.58579 9.75 4.25 9.41421 4.25 9Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 12.5C5.25 12.0858 5.58579 11.75 6 11.75H9C9.41421 11.75 9.75 12.0858 9.75 12.5C9.75 12.9142 9.41421 13.25 9 13.25H6C5.58579 13.25 5.25 12.9142 5.25 12.5Z" fill="#222222"></path></svg>
                        </span>
                        
                        <p>Даты: {ticketDates}</p>
                    </div>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.595785 0.36825C0.811228 0.230403 1.08207 0.21185 1.31429 0.319032L7.51129 3.17919L14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L21.3143 3.31903C21.5799 3.44162 21.75 3.70746 21.75 4V19C21.75 19.2558 21.6197 19.4939 21.4042 19.6318C21.1888 19.7696 20.9179 19.7882 20.6857 19.681L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L0.685706 16.681C0.420094 16.5584 0.25 16.2925 0.25 16V1C0.25 0.744233 0.380342 0.506097 0.595785 0.36825ZM14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L1.75 2.17218V15.5201L7.51129 18.1792L14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L20.25 17.8278V4.47988L14.4887 1.82082Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 0.25C14.9142 0.25 15.25 0.585786 15.25 1V16C15.25 16.4142 14.9142 16.75 14.5 16.75C14.0858 16.75 13.75 16.4142 13.75 16V1C13.75 0.585786 14.0858 0.25 14.5 0.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.25C7.91421 3.25 8.25 3.58579 8.25 4V19C8.25 19.4142 7.91421 19.75 7.5 19.75C7.08579 19.75 6.75 19.4142 6.75 19V4C6.75 3.58579 7.08579 3.25 7.5 3.25Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L18.0645 1.81903C18.4406 1.99261 18.6047 2.4382 18.4312 2.81429C18.2576 3.19038 17.812 3.35455 17.4359 3.18097L14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L3.93589 3.18097C3.5598 3.00739 3.39563 2.5618 3.56921 2.18571C3.74279 1.80962 4.18839 1.64545 4.56447 1.81903L7.51129 3.17919L14.2046 0.310643Z" fill="#222222"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L18.0645 16.819C18.4406 16.9926 18.6047 17.4382 18.4312 17.8143C18.2576 18.1904 17.812 18.3545 17.4359 18.181L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L3.93589 18.181C3.5598 18.0074 3.39563 17.5618 3.56921 17.1857C3.74279 16.8096 4.18839 16.6455 4.56447 16.819L7.51129 18.1792L14.2046 15.3106Z" fill="#222222"></path></svg>
                        </span>
                        <p>Локация: {event.locations[0].name}</p>
                    </div>
                </div>
                <div className={style.line}>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 10.957C0.25 5.01997 5.06294 0.207031 11 0.207031C16.9371 0.207031 21.75 5.01997 21.75 10.957C21.75 16.8941 16.9371 21.707 11 21.707C5.06294 21.707 0.25 16.8941 0.25 10.957ZM11 1.70703C5.89136 1.70703 1.75 5.84839 1.75 10.957C1.75 16.0657 5.89136 20.207 11 20.207C16.1086 20.207 20.25 16.0657 20.25 10.957C20.25 5.84839 16.1086 1.70703 11 1.70703Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0041 4.20703C11.4183 4.20707 11.7541 4.54289 11.754 4.95711L11.7534 10.6508L15.7734 14.6708C16.0663 14.9637 16.0663 15.4386 15.7734 15.7315C15.4806 16.0244 15.0057 16.0244 14.7128 15.7315L10.4731 11.4918C10.3324 11.3511 10.2534 11.1603 10.2534 10.9614L10.254 4.95696C10.2541 4.54274 10.5899 4.20699 11.0041 4.20703Z" fill="#222222"/>
                        </svg>
                        </span>
                        <p>Время: {ticketTimes}</p>
                    </div>
                    <div className={style.information}>
                        <span className={style.svgIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="-0.5 0 25 25" fill="none">
                            <path d="M17 3.32007H7C4.79086 3.32007 3 5.11093 3 7.32007V17.3201C3 19.5292 4.79086 21.3201 7 21.3201H17C19.2091 21.3201 21 19.5292 21 17.3201V7.32007C21 5.11093 19.2091 3.32007 17 3.32007Z" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M21.0003 14.0701L3.82031 4.89014" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58008 20.5101L10.9001 8.68005" stroke="#222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                       </span>
                        <p>Адрес: {event.locations[0].street}, {event.locations[0].dom}</p>
                    </div>
                </div>

            </div>
            
            <h3>Выбор Даты И Времени</h3>
            <p className={style.pBlock}>Все доступные билеты здесь.</p>
            <div className={style.frameTickets}>
                {event.tickets.map(ticket => (
                    <div className={style.frameTicket}>
                        <div className={style.frameDate}>
                            <p>{format(new Date(ticket.date), "dd.MM")}</p>
                            <p>{daysOfWeek[getDay(new Date(ticket.date))]}</p>
                            <p>{ticket.time.slice(0, -3)}</p>
                        </div>
                        <div className={style.frameInfo}>
                            <div className={style.frameLeft}>
                                <p className={style.name}>{event.name}</p>
                                <p className={style.locat}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 200">
                                        <g id="Слой_2" data-name="Слой 2">
                                            <g id="Слой_1-2" data-name="Слой 1">
                                                <circle cx="211.24" cy="183.98" r="44" fill="#1d1d1b"/>
                                                <circle cx="211.24" cy="93.74" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="211.24" cy="23.75" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="287.24" cy="117.98" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="289.24" cy="38.95" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="322.16" cy="186.83" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="352.24" cy="82.45" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="388.24" cy="140.48" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="398.74" cy="205.58" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="135.24" cy="117.63" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="133.24" cy="38.6" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="100.33" cy="186.49" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="70.24" cy="82.1" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="34.24" cy="140.13" r="23.75" fill="#1d1d1b"/>
                                                <circle cx="23.75" cy="205.23" r="23.75" fill="#1d1d1b"/>
                                            </g>
                                        </g>
                                        </svg>
                                    </span>
                                    {ticket.categories.length === 1 
                                        ? ticket.categories[0].name 
                                        : ticket.categories.map(category => category.name).join(' / ')}
                                    </p>
                                
                                <p className={style.available}>
                                    <span>
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.08268 5.91732V6.75065M6.08268 9.25065V10.084M9.41602 6.75065H13.9993M9.41602 9.25065H13.9993M0.666016 1.33398H3.58268C3.58268 1.33398 3.99935 3.41732 6.08268 3.41732C8.16602 3.41732 8.58268 1.33398 8.58268 1.33398H17.3327V14.6673H8.58268C8.58268 14.6673 8.16602 12.584 6.08268 12.584C3.99935 12.584 3.58268 14.6673 3.58268 14.6673H0.666016V1.33398Z" stroke="#222222" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>Билетов в наличии - {ticket.total}</p>
                            </div>
                            <div className={style.frameRight}>
                                <p className={style.price}> {ticket.price} руб / за билет</p>
                                <buttom><Link to={`/tickets/${ticket.id}`}>Купить сейчас</Link></buttom>
                            </div>
                        </div>
                    </div>
                    )
                )}
            </div>
            <h3>Группа</h3>
            <p className={style.pBlock}>В данном мероприяти примут участие.</p>
            <div className={style.actors}>
                {event.actors.map(actor=>(
                    <div className={style.item}>
                            <div className={style.image}>
                            <img src={actor.images[0]} alt={actor.secondName}/>
                            </div>
                            <p>{actor.fierstname} {actor.secondName}</p>
                    </div>
                    )
                )}
            </div>
            <h3>Описание</h3>
            <p className={style.pBlock}>Краткая информация о мероприятии.</p>
            <div className={style.eventDescr}>
                <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
            

            </div>
            <Footer />
        </div>
    )
}
export default Event