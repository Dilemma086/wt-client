import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoardEvents.module.css';
import { format } from "date-fns";
import DashBoardEventView from './DashBoardEventView'
import ModalYesNo from '../../Common/Modal/modalYesNo'
import {getDashBoardEventsThunkCreator, deleteDashBoardEventsThunkCreator} from '../../../redux/dashboard/eventDBoard-reducer'
import Pagination from '../../Common/Pagination/pagination'

const DashBoardEventsTable = ({ onEdit }) => {
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [eventView, setEventView] = useState(false); // Состояние для видимости модального окна
    const [modalYesNo, setModalYesNo] = useState(false); // Состояние для видимости модального окна
    const [selectedEvent, setSelectedEvent] = useState(null); // Состояние для выбранной локации
    const events = useSelector(state => state.event.eventData); // Предполагается, что в вашем Redux хранилище есть events
    const paginat = useSelector(state => state.settingDB.paginat);
    const acters = useSelector(state => state.acter.acterData);
    const locations = useSelector(state => state.locat.locatData);
    const categories = useSelector(state => state.categor.categData)
    const pageSize = useSelector(state => state.settingDB.pageSize);

    const viewCart = (item) => {
        setSelectedEvent(item); // Установить выбранную локацию
        setEventView(true); // Открыть модальное окно
        document.body.classList.add('no-scroll'); // Add no-scroll class
    };
    
    const handleCloseModal = () => {
        setEventView(false);
        document.body.classList.remove('no-scroll'); // Remove no-scroll class
    };

    const delCart = (item) => {
        setSelectedEvent(item)
        setModalYesNo(true)
    }

    const handleDelete = async () => {
        
        if (selectedEvent) {
            await dispatch(deleteDashBoardEventsThunkCreator(selectedEvent.Id)); // Call the delete action
            setModalYesNo(false); // Close the modal
            // Optionally, you might want to refetch the events or update the state
            await dispatch(getDashBoardEventsThunkCreator());
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getDashBoardEventsThunkCreator());
            setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
        };

        fetchData();
    }, [dispatch]);

    const getPaginated = () => {
        const start = (paginat - 1) * pageSize;
        const end = start + pageSize;
        return events.slice(start, end);
    };

    if (loading) {
        return <div>Loading...</div>; // Показываем индикатор загрузки, пока данные загружаются
    }

    
    return(
        
        <div className={style.cardWrapper}>
            <h5>Список актеров </h5>
            <div className={style.tableResponsive}>
                <table className={style.tableBordered}>
                    <thead className={style.theadDark}>
                        <tr>
                            <th>Артикул</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Актеры</th>
                            <th>Локация</th>
                            <th>Категория</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {getPaginated().map((event, index) => (
                        <tr key={index}>
                        <td>
                            <div className={style.dFlex}>
                                <input className={style.selectInput} type="checkbox" data-indeterminate="false" aria-label="Checkbox demo"/>
                                <span>#{event.Id}</span>
                            </div>
                        </td>
                        <td>
                            <div className={style.imgCardShadow}>
                                <div className={style.imgWrapper}>
                                    <img src={event.images ? event.images.split(',')[0] : '/uploads/no-image.png'} alt={event.Name} />
                                </div>
                            </div>
                        </td>
                        <td >
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    <h6>{event.name}</h6>
                                    
                                </div>
                            </div>
                        </td>
                        
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    {event.acters && event.acters.split(',').map((acterId) => {
                                        const acter = acters.find((acter) => acter.id === parseInt(acterId));
                                        return (
                                            <p key={acterId}>{`${acter.fierstname} ${acter.secondname}`}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    {event.locations && event.locations.split(',').map((locatId)=>{
                                        const locat = locations.find((locat)=>locat.id === parseInt(locatId))
                                        return (
                                            <p key={locatId}>{locat.name}</p>
                                        )
                                    })}
                                   
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    <p>{event.category && event.category.split(',').map((categorId)=>{
                                        const category = categories.find((category) => category.id === parseInt(categorId))
                                        return (
                                            <p key={categorId}>{category.name}</p>
                                        )
                                    })}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    <p>{format(new Date(event.date), "dd.MM.yyyy")}</p>
                                    <p>{event.time}</p> 
                                </div>
                            </div>
                        </td>
                        <td>
                        <div className={style.dFlex}>
                            
                                    <button className={`${style.MuiButtonBase} ${style.colorView}`} tabindex="0" type="button" onClick={()=>viewCart(event)}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                                    </svg>
                                    </button>
                                
                            
                            
                                <button className={`${style.MuiButtonBase} ${style.colorEdit}`} tabindex="0" type="button" onClick={()=>onEdit(event)}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
                                </svg>
                            </button>
                            
                            
                                <button className={`${style.MuiButtonBase} ${style.colorDel}`} tabindex="0" type="button" onClick={()=>delCart(event)}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                    </svg>
                                </button>
                            
                            </div>
                                </td>
                            </tr>
                    ))}
                        </tbody>
                    </table>

            </div>
                
                <Pagination totalItem={events.length} pageSize={pageSize} />
            {eventView && (
                <DashBoardEventView 
                    item={selectedEvent} 
                    onClose={handleCloseModal} 
                    acters = {acters} locations = {locations} categories = {categories}
                />
            )}

            {modalYesNo && (
                <ModalYesNo
                    modalYesNo = {modalYesNo}
                    handleConfirm={handleDelete}
                    onClose={() => setModalYesNo(false)}
                />
            )

            }
        </div>
                
       
    )
}

export default DashBoardEventsTable