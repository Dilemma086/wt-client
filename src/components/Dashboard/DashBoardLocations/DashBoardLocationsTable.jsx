import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoardLocations.module.css';
import ModalWindow from './../../Common/Modal/modalWindow'
import ModalYesNo from './../../Common/Modal/modalYesNo'
import {getDashBoardLocalsThunkCreator, deleteDashBoardLocalsThunkCreator} from '../../../redux/dashboard/locationDBoard-reducer'
import Pagination from './../../Common/Pagination/pagination'

const DashBoardLocationsTable = ({ onEdit }) => {
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); // Состояние для видимости модального окна
    const [modalYesNo, setModalYesNo] = useState(false); // Состояние для видимости модального окна
    const [selectedLocation, setSelectedLocation] = useState(null); // Состояние для выбранной локации
    const locations = useSelector(state => state.locat.locatData); // Предполагается, что в вашем Redux хранилище есть locations
    const paginat = useSelector(state => state.settingDB.paginat);
    const totalLocals = useSelector(state => state.locat.totalLocals);

    const viewCart = (item) => {
        setSelectedLocation(item); // Установить выбранную локацию
        setModalOpen(true); // Открыть модальное окно
        document.body.classList.add('no-scroll'); // Add no-scroll class
    };
    
    const handleCloseModal = () => {
        setModalOpen(false);
        document.body.classList.remove('no-scroll'); // Remove no-scroll class
    };

    const delCart = (item) => {
        setSelectedLocation(item)
        setModalYesNo(true)
    }

    const handleDelete = async () => {
        if (selectedLocation) {
            await dispatch(deleteDashBoardLocalsThunkCreator(selectedLocation.id)); // Call the delete action
            setModalYesNo(false); // Close the modal
            // Optionally, you might want to refetch the locations or update the state
            await dispatch(getDashBoardLocalsThunkCreator());
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getDashBoardLocalsThunkCreator());
            setLoading(false); // Устанавливаем состояние загрузки в false после получения данных
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Показываем индикатор загрузки, пока данные загружаются
    }

    return(
        
        <div className={style.cardWrapper}>
            <h5>Список локаций </h5>
            <div className={style.tableResponsive}>
                <table className={style.tableBordered}>
                    <thead className={style.theadDark}>
                        <tr>
                            <th>Артикул</th>
                            <th>Изображение</th>
                            <th>Наименование</th>
                            <th>Адрес</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    {locations.map((location, index) => (
                    <tr key={index}>
                    <td>
                        <div className={style.dFlex}>
                            <input className={style.selectInput} type="checkbox" data-indeterminate="false" aria-label="Checkbox demo"/>
                            <span>#{location.id}</span>
                        </div>
                    </td>
                    <td>
                        <div className={style.imgCardShadow}>
                            <div className={style.imgWrapper}>
                                <img src={location.image ? location.image : '/uploads/no-image.png'} alt={location.Name} />
                            </div>
                        </div>
                    </td>
                    <td >
                        <div className={style.infoBlock}>
                            <div className={`${style.info} ${style.description}`}>
                                <h6>{location.name}</h6>
                                <p>{location.description}</p>
                            </div>
                        </div>
                    </td>
                    
                    <td>
                        <div className={style.infoBlock}>
                        <div className={style.info}>
                                <h6>{location.street}</h6>
                                <p>{location.dom}</p>
                                {location.metro && <p>Станция метро: <span>{location.metro}</span></p>}
                            </div>
                        </div>
                    </td>
                    <td>
                       <div className={style.dFlex}>
                        
                                <button className={`${style.MuiButtonBase} ${style.colorView}`} tabindex="0" type="button" onClick={()=>viewCart(location)}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                                </svg>
                                </button>
                            
                        
                        
                            <button className={`${style.MuiButtonBase} ${style.colorEdit}`} tabindex="0" type="button" onClick={()=>onEdit(location)}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path>
                            </svg>
                        </button>
                        
                        
                            <button className={`${style.MuiButtonBase} ${style.colorDel}`} tabindex="0" type="button" onClick={()=>delCart(location)}>
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
                <Pagination item={locations} paginat={paginat} totalItem={totalLocals}/>
            {modalOpen && (
                <ModalWindow 
                    item={selectedLocation} // Передаем выбранную локацию в модальное окно
                    onClose={handleCloseModal} 
                    
                />
            )}

            {modalYesNo && (
                <ModalYesNo
                    handleConfirm={handleDelete}
                    onClose={() => setModalYesNo(false)}
                />
            )

            }
        </div>
                
       
    )
}

export default DashBoardLocationsTable