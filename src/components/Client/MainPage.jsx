import React, { useState, useEffect,  useRef } from 'react';
import style from './mainstyle.module.css'
import {useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {getTicketsThunkCreator} from './../../redux/dashboard/ticketDBoard-reducer'
import {getEventsThunkCreator} from './../../redux/dashboard/eventDBoard-reducer'
import {Preloader} from './../Common/Preloader/Preloader'
import { format } from "date-fns";
import Footer from '../Common/Footer/Footer';
import Header from '../Common/Header/Header';
import MenuButtonSlider from '../Common/MenuButtonSlider/MenuButtonSlider';
import PopularEvents from '../Common/PopularEvents/PopularEvents';
import TomorrowEvents from '../Common/TomorrowEvents/TomorrowEvents';

const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    const [searchEvent, setSearchEvent] = useState({
        dateSearch: '',
        date: '',
        locationSearch: ''
    });
        
    const events = useSelector(state => state.event.eventData)
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);
       
    useEffect(() => {
        setLoading(true); // Показать прелоадер при монтировании компонента
        // Загрузка данных
        Promise.all([
            dispatch(getTicketsThunkCreator()),
            dispatch(getEventsThunkCreator())
        ]).finally(() => {
            setLoading(false); // Скрыть прелоадер после завершения загрузки данных
        });

    }, [dispatch]);

    const handleChange = (name) => (value) => {
        setSearchEvent(prev => ({ ...prev, [name]: value }));
        if (name === 'locationSearch') {
            setShowResults(true);
        }
    };

    const searchEventDataPlace = () => {
          
        if (searchEvent.date && searchEvent.locationSearch) {
            navigate(`/search?date=${searchEvent.date}&location=${searchEvent.locationSearch}`);
        } else if (searchEvent.date) {
            navigate(`/search?date=${searchEvent.date}`);
        } else if (searchEvent.locationSearch) {
            navigate(`/search?location=${searchEvent.locationSearch}`);
        }
    };
    // Slider
    const sliderRef = useRef(null);
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleTouchEnd = () => {
        isDown = false;
    };

    const handleTouchMove = (e) => {
        if (!isDown) return; // остановить выполнение, если не нажато
        e.preventDefault();
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // скорость прокрутки
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };
    // end

    if (loading) {return <Preloader />}

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchEvent.dateSearch.toLowerCase())
    );
    const filteredLocation = events.filter(event =>
        event.locationName.toLowerCase().includes(searchEvent.locationSearch.toLowerCase())
    );
    
    const uniqueLocations = [...new Set(filteredLocation.map(item => item.locationName))];
    return(
    <div className={style.fullBlock}>
        
        <div className={style.mainBlock}>
            <Header />
            
            <div className={style.mainTitle}>
                <h2>Забронируйте билеты на выступления <br />любимых артистов!</h2>
                <h4>Не пропустите предстоящие меропрития!</h4>
            </div>
            <div className={style.findTicket}>
                <span className={style.findName}>
                    <span className={style.man}>
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 1.75C8.20507 1.75 6.75 3.20507 6.75 5C6.75 6.79493 8.20507 8.25 10 8.25C11.7949 8.25 13.25 6.79493 13.25 5C13.25 3.20507 11.7949 1.75 10 1.75ZM5.25 5C5.25 2.37665 7.37665 0.25 10 0.25C12.6234 0.25 14.75 2.37665 14.75 5C14.75 7.62335 12.6234 9.75 10 9.75C7.37665 9.75 5.25 7.62335 5.25 5ZM0.25 21C0.25 15.6152 4.61524 11.25 10 11.25C15.3848 11.25 19.75 15.6152 19.75 21C19.75 21.4142 19.4142 21.75 19 21.75C18.5858 21.75 18.25 21.4142 18.25 21C18.25 16.7943 15.1029 13.3236 11.0353 12.8143L12.7168 18.2794C12.7898 18.5167 12.7407 18.7747 12.5857 18.9685L10.5857 21.4685C10.4433 21.6464 10.2278 21.75 10 21.75C9.77217 21.75 9.55669 21.6464 9.41436 21.4685L7.41436 18.9685C7.25929 18.7747 7.21017 18.5167 7.28317 18.2794L8.96475 12.8143C4.89706 13.3236 1.75 16.7943 1.75 21C1.75 21.4142 1.41421 21.75 1 21.75C0.585786 21.75 0.25 21.4142 0.25 21ZM10 19.7994L11.1665 18.3413L10 14.5503L8.83353 18.3413L10 19.7994Z" fill="#222222"/>
                        </svg>
                    </span>
                    <input
                            type="text"
                            placeholder='Найти по названию'
                            onChange={(e) => handleChange('dateSearch')(e.target.value)}
                            value={searchEvent.dateSearch}
                        />
                    <div className={style.resultSearch}>
                        {searchEvent.dateSearch.length > 0 && filteredEvents.map(item => (
                            <p><Link to={`/events/${item.id}`}>{item.name}</Link></p>
                        ))}
                        
                    </div>
                    <span className={style.manClose}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.833984 8.00065C0.833984 4.04261 4.04261 0.833984 8.00065 0.833984C11.9587 0.833984 15.1673 4.04261 15.1673 8.00065C15.1673 11.9587 11.9587 15.1673 8.00065 15.1673C4.04261 15.1673 0.833984 11.9587 0.833984 8.00065ZM8.00065 1.83398C4.59489 1.83398 1.83398 4.59489 1.83398 8.00065C1.83398 11.4064 4.59489 14.1673 8.00065 14.1673C11.4064 14.1673 14.1673 11.4064 14.1673 8.00065C14.1673 4.59489 11.4064 1.83398 8.00065 1.83398Z" fill="#505050"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2399 5.76148C10.4351 5.95674 10.4351 6.27332 10.2399 6.46858L6.46863 10.2398C6.27336 10.4351 5.95678 10.4351 5.76152 10.2398C5.56626 10.0446 5.56626 9.72797 5.76152 9.53271L9.53275 5.76148C9.72801 5.56622 10.0446 5.56622 10.2399 5.76148Z" fill="#505050"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.76152 5.76148C5.95678 5.56622 6.27336 5.56622 6.46863 5.76148L10.2399 9.53271C10.4351 9.72797 10.4351 10.0446 10.2399 10.2398C10.0446 10.4351 9.72801 10.4351 9.53275 10.2398L5.76152 6.46858C5.56626 6.27332 5.56626 5.95674 5.76152 5.76148Z" fill="#505050"/>
                    </svg>
                    </span>
                </span>
                <span className={style.manDate}>
                    <span className={style.iconDate}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 3C0.25 2.58579 0.585786 2.25 1 2.25H21C21.4142 2.25 21.75 2.58579 21.75 3V21C21.75 21.4142 21.4142 21.75 21 21.75H1C0.585786 21.75 0.25 21.4142 0.25 21V3ZM1.75 3.75V20.25H20.25V3.75H1.75Z" fill="#222222"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 9C12.25 8.58579 12.5858 8.25 13 8.25H17C17.4142 8.25 17.75 8.58579 17.75 9V16C17.75 16.4142 17.4142 16.75 17 16.75H13C12.5858 16.75 12.25 16.4142 12.25 16V9ZM13.75 9.75V15.25H16.25V9.75H13.75Z" fill="#222222"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.25C7.91421 0.25 8.25 0.585786 8.25 1V5C8.25 5.41421 7.91421 5.75 7.5 5.75C7.08579 5.75 6.75 5.41421 6.75 5V1C6.75 0.585786 7.08579 0.25 7.5 0.25Z" fill="#222222"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 0.25C14.9142 0.25 15.25 0.585786 15.25 1V5C15.25 5.41421 14.9142 5.75 14.5 5.75C14.0858 5.75 13.75 5.41421 13.75 5V1C13.75 0.585786 14.0858 0.25 14.5 0.25Z" fill="#222222"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 9C4.25 8.58579 4.58579 8.25 5 8.25H9C9.41421 8.25 9.75 8.58579 9.75 9V16C9.75 16.4142 9.41421 16.75 9 16.75H5C4.58579 16.75 4.25 16.4142 4.25 16C4.25 15.5858 4.58579 15.25 5 15.25H8.25V9.75H5C4.58579 9.75 4.25 9.41421 4.25 9Z" fill="#222222"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25 12.5C5.25 12.0858 5.58579 11.75 6 11.75H9C9.41421 11.75 9.75 12.0858 9.75 12.5C9.75 12.9142 9.41421 13.25 9 13.25H6C5.58579 13.25 5.25 12.9142 5.25 12.5Z" fill="#222222"/>
                    </svg>
                    </span>
                    <p className={style.selectData}>{searchEvent.date !== '' ? format(new Date(searchEvent.date), "dd.MM.yyyy") : 'Дата'}</p>
                    <input 
                        type="date" 
                        onChange={(e) => handleChange('date')(e.target.value)}
                        value={searchEvent.date}/>
                </span>
                <span className={style.findLocation}>
                    <span className={style.findLocationIcon}>
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.595785 0.36825C0.811228 0.230403 1.08207 0.21185 1.31429 0.319032L7.51129 3.17919L14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L21.3143 3.31903C21.5799 3.44162 21.75 3.70746 21.75 4V19C21.75 19.2558 21.6197 19.4939 21.4042 19.6318C21.1888 19.7696 20.9179 19.7882 20.6857 19.681L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L0.685706 16.681C0.420094 16.5584 0.25 16.2925 0.25 16V1C0.25 0.744233 0.380342 0.506097 0.595785 0.36825ZM14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L1.75 2.17218V15.5201L7.51129 18.1792L14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L20.25 17.8278V4.47988L14.4887 1.82082Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 0.25C14.9142 0.25 15.25 0.585786 15.25 1V16C15.25 16.4142 14.9142 16.75 14.5 16.75C14.0858 16.75 13.75 16.4142 13.75 16V1C13.75 0.585786 14.0858 0.25 14.5 0.25Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 3.25C7.91421 3.25 8.25 3.58579 8.25 4V19C8.25 19.4142 7.91421 19.75 7.5 19.75C7.08579 19.75 6.75 19.4142 6.75 19V4C6.75 3.58579 7.08579 3.25 7.5 3.25Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 0.310643C14.3998 0.22696 14.6214 0.230009 14.8143 0.319032L18.0645 1.81903C18.4406 1.99261 18.6047 2.4382 18.4312 2.81429C18.2576 3.19038 17.812 3.35455 17.4359 3.18097L14.4887 1.82082L7.79544 4.68936C7.60018 4.77304 7.37859 4.76999 7.18571 4.68097L3.93589 3.18097C3.5598 3.00739 3.39563 2.5618 3.56921 2.18571C3.74279 1.80962 4.18839 1.64545 4.56447 1.81903L7.51129 3.17919L14.2046 0.310643Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2046 15.3106C14.3998 15.227 14.6214 15.23 14.8143 15.319L18.0645 16.819C18.4406 16.9926 18.6047 17.4382 18.4312 17.8143C18.2576 18.1904 17.812 18.3545 17.4359 18.181L14.4887 16.8208L7.79544 19.6894C7.60018 19.773 7.37859 19.77 7.18571 19.681L3.93589 18.181C3.5598 18.0074 3.39563 17.5618 3.56921 17.1857C3.74279 16.8096 4.18839 16.6455 4.56447 16.819L7.51129 18.1792L14.2046 15.3106Z" fill="#222222"/>
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder='Место проведения' 
                        onChange={(e) => handleChange('locationSearch')(e.target.value)}
                        value={searchEvent.locationSearch}
                    />
                    <div className={`${style.resultSearch} ${style.resultLocation}`}>
                            {showResults && searchEvent.locationSearch.length > 0 && uniqueLocations.length > 0 && uniqueLocations.map((locationName, index) => (
                                <p 
                                    key={index}
                                    onClick={() => {
                                        handleChange('locationSearch')(locationName);
                                        setShowResults(false); 
                                    }} 
                                    
                                >
                                    {locationName}
                                </p>
                            ))}
                        </div>
                    <span className={style.findLocationSelect}>
                        <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L7.5 5.93934L12.9697 0.46967C13.2626 0.176777 13.7374 0.176777 14.0303 0.46967C14.3232 0.762563 14.3232 1.23744 14.0303 1.53033L8.03033 7.53033C7.73744 7.82322 7.26256 7.82322 6.96967 7.53033L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z" fill="#222222"/>
                        </svg>
                    </span>
                </span>
                
                <button className={style.btnSearch}  onClick={() => searchEventDataPlace()}>Найти билеты</button>
            </div>    
        </div>
        <div className={style.topSlider} 
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}>
            
                {events && events.map((event) => (
                <div className={style.blockSlider}>
                    <div className={style.blockImage}>
                        <img src={event.firstImagePath} alt={event.name} />
                    </div>
                    <div className={style.blockInfo}>
                    <span className={style.leftEllipse}></span>
                    <span className={style.rightEllipse}></span>
                        <div className={style.blockTitle}>
                           
                            <h6 key={event.id}>{event.name}</h6>
                            <p><b key={event.locatId}>{event.locationName}</b> {format(new Date(event.date), "dd.MM.yyyy")} </p>
                            
                            <span>От {event.minTicketPrice} руб</span>
                        </div>
                        <div className={style.blockBook}>
                            <Link to={`/events/${event.id}`}>Подробнее</Link>
                        </div>
                    </div>
                    
                </div>
                ))
                }
             
        </div>
        <MenuButtonSlider />
        <PopularEvents events={events}/>
        <TomorrowEvents events={events}/>

        <Footer/>
    </div>
    )
}

export default MainPage