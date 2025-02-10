import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoardTicket.module.css';
import Select from 'react-select';
import DashBoardTicketsTable from './DashBoardTicketsTable';
import { setDashBoardTicketsThunkCreator,
         updateDashBoardTicketsThunkCreator,
         getDashBoardTicketCategories,
         getDashBoardTicketsThunkCreator
        } from './../../../redux/dashboard/ticketDBoard-reducer';
import { getDashBoardEventsThunkCreator } from '../../../redux/dashboard/eventDBoard-reducer';    
import { format } from "date-fns";
import { Preloader } from './../../Common/Preloader/Preloader'

const DashBoardTicket = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [inputField, setInputField] = useState({
        id: '',
        eventId: [],
        date: '',
        time: '',
        ticket_categories: [],
        total: '',
        price: ''
    });
    
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true); // Показать прелоадер при монтировании компонента

        // Загрузка данных
        Promise.all([
            dispatch(getDashBoardTicketsThunkCreator()),
            dispatch(getDashBoardEventsThunkCreator()),
            dispatch(getDashBoardTicketCategories())
        ]).finally(() => {
            setLoading(false); // Скрыть прелоадер после завершения загрузки данных
        });

    }, [dispatch]);


    const events = useSelector(state => state.event.eventData);
    const ticketCategories = useSelector(state => state.ticket.ticketCategories);
    
    const onSubmit  = async () =>{
        if (isEditing) {
            setLoading(true)
            try{
                const ticketCategoriesIds = inputField.ticket_categories.map(ticketCategory => ticketCategory.value);
                await dispatch(updateDashBoardTicketsThunkCreator(
                    selectedTicket.id, inputField.eventId.value, inputField.price,inputField.total, inputField.date, inputField.time, ticketCategoriesIds
                ));
                await dispatch(getDashBoardTicketsThunkCreator());
                await setSuccessMessage('Данные обновлены!')
            }
            catch(error){
                console.error('Ошибка при обновлении:', error);
            }
            finally{
                setLoading(false)
            }
        } else {
            setLoading(true)
            try{
                const eventIds = inputField.eventId.map(event => event.value);
                const ticketCategoriesIds = inputField.ticket_categories.map(ticketCategory => ticketCategory.value);
                await dispatch(setDashBoardTicketsThunkCreator(
                    eventIds, inputField.date, inputField.time, ticketCategoriesIds, inputField.total, inputField.price
                ));
                await dispatch(getDashBoardTicketsThunkCreator());
                await setSuccessMessage('Данные добавлены!');
            }
            catch(error){
                console.error('Ошибка при добавлении:', error);
            }
            finally{
                setLoading(false)
            }
        }

        setIsEditing(false);
        setSelectedTicket(null);
        setInputField({
            id: '',
            eventId: [],
            date: '',
            time: '',
            ticket_categories: [],
            total: '',
            price: ''
        });
    };

    const handleChange = (name) => (value) => {
        setInputField(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (ticket) => {
        setSelectedTicket(ticket);
        setIsEditing(true);
        const event = events.find((event) => event.Id === parseInt(ticket.eventId))
        setInputField({
            id: ticket.id,
            eventId: {value: event.Id, label: event.name},
            date: format(new Date(ticket.date), "yyyy-MM-dd"),
            time: ticket.time,
            ticket_categories: ticket.ticketCategoriesId.split(',').map(ticketId => {
                 const ticketCategory = ticketCategories.find((category) => category.id === parseInt(ticketId, 10));
                 if (!ticketCategory) {
                     console.error(`Ticket category with ID ${ticketId} not found`);
                 }
                 return { value: ticketCategory.id, label: ticketCategory.name };
             }),
             total: ticket.total,
             price: ticket.price
         });
    };

    const eventOptions = events.map(event => ({ value: event.Id, label: event.name }));
    const ticketCategoriesOptions = ticketCategories.map(ticketCategory => ({ value: ticketCategory.id, label: ticketCategory.name }));

    return (
        
        
        <div className={style.ticketCart}>
            {loading && <Preloader />}
            <div className={style.cardWrapper}>
                <h5>Билеты</h5>
                {successMessage && <div className={style.successMessage}>{successMessage}</div>}
                <div className={style.blockInp}>
                    <h6>Мероприятие</h6>
                    <Select 
                        name="eventId"
                        isMulti 
                        options={eventOptions} 
                        value={inputField.eventId} 
                        onChange={handleChange('eventId')} 
                        placeholder="Выберите мероприятие..." 
                    />
                </div>
                <div className={style.blockInp}>
                    <h6>Дата</h6>
                    <input 
                        name="date" 
                        type="date" 
                        onChange={(e) => handleChange('date')(e.target.value)} 
                        value={inputField.date}
                    />
                </div>
                <div className={style.blockInp}>
                    <h6>Время</h6>
                    <input 
                        name="time" 
                        onChange={(e) => handleChange('time')(e.target.value)} 
                        value={inputField.time}
                    />
                </div>
                <div className={style.blockInp}>
                    <h6>Категория места</h6>
                    <Select 
                        name="ticket_categories"
                        isMulti 
                        options={ticketCategoriesOptions} 
                        value={inputField.ticket_categories} 
                        onChange={handleChange('ticket_categories')} 
                        placeholder="Выберите категорию..." 
                    />
                </div>
                <div className={style.blockInp}>
                    <h6>Количество билетов</h6>
                    <input 
                        name="total" 
                        onChange={(e) => handleChange('total')(e.target.value)} 
                        value={inputField.total}
                    />
                </div>
                <div className={style.blockInp}>
                    <h6>Цена</h6>
                    <input 
                        name="price" 
                        onChange={(e) => handleChange('price')(e.target.value)} 
                        value={inputField.price}
                    />
                </div>
                <div>
                    <button className={style.btnBlue} onClick={onSubmit}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                        </svg>
                        {isEditing ? 'Сохранить' : 'Добавить'}
                    </button>
                </div>
            </div>
            <DashBoardTicketsTable onEdit={handleEdit} ticketCategories={ticketCategories}/>
        </div>
        
    );
};

export default DashBoardTicket;
