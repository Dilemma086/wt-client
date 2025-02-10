import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from "react-redux";
import style from './DashBoardLocations.module.css'
import {setDashBoardLocalsThunkCreator, updateDashBoardLocalsThunkCreator, getDashBoardLocalsThunkCreator} from '../../../redux/dashboard/locationDBoard-reducer'
import DashBoardLocationsTable from './DashBoardLocationsTable'


const DashBoardLocations = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
    const [selectedLocation, setSelectedLocation] = useState(null); // Выбранная локация для редактирования
    const [mapUrl, setMapUrl] = useState('https://yandex.com/map-widget/v1/-/CCU0w5Yx'); // URL карты по умолчанию
    const dispatch = useDispatch()

    const onSubmit = (values, form) => {
        if (isEditing) {
            // Здесь вы можете добавить логику для обновления существующей локации
            dispatch(updateDashBoardLocalsThunkCreator(values.name, values.description, values.street, values.dom, values.metro, values.map, values.image, selectedLocation.id));
            setSuccessMessage('Данные обновлены!'); // Сообщение об обновлении
        } else {
            dispatch(setDashBoardLocalsThunkCreator(values.name, values.description, values.street, values.dom, values.metro, values.map, values.image));
            setSuccessMessage('Данные добавлены!'); // Сообщение о добавлении
        }
        dispatch(getDashBoardLocalsThunkCreator());
        form.reset(); // Сбрасываем форму
        setImagePreview(null); // Очищаем предварительный просмотр изображения
        setIsEditing(false); // Сбрасываем состояние редактирования
        setSelectedLocation(null); // Очищаем выбранную локацию
    };
    // Обработчик изменения изображения
    const handleImageChange = (event, input) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            input.onChange(file); // Передаем файл в состояние формы
        }
    };

    const handleEdit = (location) => {
       
        setSelectedLocation(location);
        setIsEditing(true);
        setImagePreview(location.image); // Устанавливаем предварительный просмотр изображения для редактирования
    };

    const handleInputChange = (event) => {
        const userInput = event.target.value;
        const newUrl = `https://yandex.com/map-widget/v1/-/${userInput}`;
        setMapUrl(newUrl);
    };

    return(
        <div className={style.dashBoardContent}>
        <div className={style.cardWrapper}>
            <h5>Локации </h5>
            {successMessage && <div className={style.successMessage}>{successMessage}</div>} 
            <Form 
                key={isEditing ? selectedLocation.ID : 'new'} 
                onSubmit={onSubmit}
                initialValues={isEditing ? {
                    name: selectedLocation.name,
                    description: selectedLocation.description,
                    street: selectedLocation.street,
                    dom: selectedLocation.dom,
                    metro: selectedLocation.metro,
                    map: selectedLocation.map,
                    image: selectedLocation.image || ''
                } : { name: '', description: '', street: '', dom: '', metro: '', map: '', image: '' }}
                
                render={({ handleSubmit, submitting }) =>
                
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h6>Название</h6>
                            <Field name="name" component="input" type="text" />
                        </div>
                        <div>
                            <h6>Описание</h6>
                            
                            <Field name="description" component="textarea"   />
                        </div>
                        <div>
                             <h6>Улица</h6>
                            <Field name='street' component="input" type="text"  />
                        
                        </div>
                        <div>
                             <h6>Дом</h6>
                            <Field name='dom' component="input" type="text"  />
                        
                        </div>
                        <div>
                             <h6>Метро</h6>
                            <Field name='metro' component="input" type="text"  />
                        
                        </div>
                        <div>
                            
                            <Field name='map'>
                                    {({ input }) => (
                                        <div>
                                            <h6>Карта</h6>
                                            <input
                                                {...input}
                                                type="text"
                                                placeholder="Введите адрес после https://yandex.com/map-widget/v1/-/"
                                                onChange={(event) => {
                                                    input.onChange(event); // Обновляем значение в форме
                                                    handleInputChange(event); // Вызываем ваш обработчик
                                                }}
                                            />
                                            <div style={{ width: '100%', height: '400px' }}>
                                                <iframe
                                                    src={mapUrl}
                                                    title={mapUrl}
                                                    width="100%"
                                                    height="100%"
                                                    frameBorder="0"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}
                            </Field>
                        </div>
                        <div className={style.blockImage}>
                            <h6>Изображение</h6>
                            <div className={style.uploadBox}>
                            <Field name='image'>
                                {({ input }) => (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => handleImageChange(event, input)} // Вызываем ваш обработчик
                                    />
                                )}
                            </Field>
                                <div className={style.info}>
                                    {imagePreview 
                                    ?   (
                                        <img
                                            src={imagePreview}
                                            alt="Предварительный просмотр"
                                            style={{ maxWidth: '100%', maxHeight: '150px' }} // Set image dimensions
                                        />
                                    ) : (
                                        <>
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"></path>
                                            </svg>
                                            <h5>добавить изображение</h5>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                                               
                        <div>
                            <button className={style.btnBlue} type="submit" disabled={submitting}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path>
                            </svg>
                                {isEditing ? 'Сохранить' : 'Добавить'}
                            </button>
                        </div>
                    </form>
                }
            />
             
        </div>
        
        <DashBoardLocationsTable onEdit={handleEdit} />
                
        </div>
    )
}

export default DashBoardLocations