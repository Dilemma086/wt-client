import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from "react-redux";
import style from './DashBoardActers.module.css'
import {setDashBoardActersThunkCreator, updateDashBoardActersThunkCreator, getDashBoardActersThunkCreator} from '../../../redux/dashboard/acterDBoard-reducer'
import DashBoardActersTable from './DashBoardActersTable'


const DashBoardActers = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Состояние редактирования
    const [selectedActer, setSelectedActer] = useState(null); // Выбранная локация для редактирования
    const dispatch = useDispatch()

    const onSubmit = (values, form) => {
        if (isEditing) {
            // Здесь вы можете добавить логику для обновления существующей локации
            dispatch(updateDashBoardActersThunkCreator(values.fierstname, values.secondname, values.description, values.image, selectedActer.id));
            setSuccessMessage('Данные обновлены!'); // Сообщение об обновлении
        } else {
            dispatch(setDashBoardActersThunkCreator(values.fierstname, values.secondname, values.description, values.image));
            setSuccessMessage('Данные добавлены!'); // Сообщение о добавлении
        }
        dispatch(getDashBoardActersThunkCreator());
        form.reset(); // Сбрасываем форму
        setImagePreview(null); // Очищаем предварительный просмотр изображения
        setIsEditing(false); // Сбрасываем состояние редактирования
        setSelectedActer(null); // Очищаем выбранную локацию
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

    const handleEdit = (acter) => {
       
        setSelectedActer(acter);
        setIsEditing(true);
        setImagePreview(acter.image); // Устанавливаем предварительный просмотр изображения для редактирования
    };

   
    return(
        <div className={style.dashBoardContent}>
        <div className={style.cardWrapper}>
            <h5>Актеры </h5>
            {successMessage && <div className={style.successMessage}>{successMessage}</div>} 
            <Form 
                key={isEditing ? selectedActer.ID : 'new'} 
                onSubmit={onSubmit}
                initialValues={isEditing ? {
                    fierstname: selectedActer.fierstname,
                    secondname: selectedActer.secondname,
                    description: selectedActer.description,
                    image: selectedActer.image || ''
                } : { fierstname: '', secondname: '', description: '', image: '' }}
                
                
                render={({ handleSubmit, submitting }) =>
                
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h6>Имя</h6>
                            <Field name="fierstname" component="input" type="text" />
                        </div>
                        <div>
                             <h6>Фамилия</h6>
                            <Field name='secondname' component="input" type="text"  />
                        
                        </div>
                        <div>
                            <h6>Описание</h6>
                            
                            <Field name="description" component="textarea"   />
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
        
        <DashBoardActersTable onEdit={handleEdit} />
                
        </div>
    )
}

export default DashBoardActers