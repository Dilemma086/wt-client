import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoardEvents.module.css';
import Select from 'react-select';
import { 
    setDashBoardEventsThunkCreator, 
    updateDashBoardEventsThunkCreator, 
    getDashBoardEventsThunkCreator,
    setDashBoardImagesEventThunkCreator,
    delDashBoardImagesEventThunkCreator 
} from '../../../redux/dashboard/eventDBoard-reducer';
import { getDashBoardActersThunkCreator } from '../../../redux/dashboard/acterDBoard-reducer';
import { getDashBoardLocalsThunkCreator } from '../../../redux/dashboard/locationDBoard-reducer';
import { getDashBoardCategThunkCreator } from '../../../redux/dashboard/categDashBoard-reducer';
import DashBoardEventsTable from './DashBoardEventsTable';
import { format } from "date-fns";

const DashBoardEvents = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [inputField, setInputField] = useState({
        id: '',
        name: '',
        description: '',
        date: '',
        time: '',
        image: [],
        imagesId: [],
        acters: [],
        locationId: [],
        categoryId: []
    });
    
    const dispatch = useDispatch();
    const acters = useSelector(state => state.acter.acterData);
    const locations = useSelector(state => state.locat.locatData);
    const categories = useSelector(state => state.categor.categData);

    useEffect(() => {
        dispatch(getDashBoardEventsThunkCreator());
        dispatch(getDashBoardActersThunkCreator());
        dispatch(getDashBoardLocalsThunkCreator());
        dispatch(getDashBoardCategThunkCreator());
    }, [dispatch]);

    const onSubmit = () => {
       
        const acterIds = inputField.acters.map(acter => acter.value);
        const locationIds = inputField.locationId.map(locat => locat.value);
        const categoryIds = inputField.categoryId.map(categor => categor.value);

            // Создаем FormData для отправки на сервер
            const formData = new FormData();
            formData.append('name', inputField.name);
            formData.append('description', inputField.description);
            formData.append('date', inputField.date);
            formData.append('acters', JSON.stringify(acterIds)); // Предполагаем, что бэкенд может это обработать
            formData.append('locationId', JSON.stringify(locationIds));
            formData.append('categoryId', JSON.stringify(categoryIds));

            // Добавляем изображения в FormData
            inputField.image.forEach(image => {
                formData.append('image', image);
            });


        if (isEditing) {
            dispatch(updateDashBoardEventsThunkCreator(
                inputField.name, acterIds, inputField.description, 
                locationIds, categoryIds, inputField.date, inputField.time, inputField.image, 
                selectedEvent.id
            ));
            setSuccessMessage('Данные обновлены!');
        } else {
            dispatch(setDashBoardEventsThunkCreator(
                inputField.name, acterIds, inputField.description, 
                locationIds, categoryIds, inputField.date, inputField.time, inputField.imagesId
            ));
            setSuccessMessage('Данные добавлены!');
            
        }

        setIsEditing(false);
        setSelectedEvent(null);
        setInputField({
            id: '',
            name: '',
            description: '',
            date: '',
            time: '',
            image: [],
            imagesId: [],
            acters: [],
            locationId: [],
            categoryId: []
        });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        dispatch(setDashBoardImagesEventThunkCreator(files, inputField.id)).then((response) => {
            
            if (response && response.success) {
                const fileUrls = files.map(file => URL.createObjectURL(file));
                setInputField(prev => ({ ...prev, image: [...prev.image, ...fileUrls] }));
            }
            if (response.imagesId && Array.isArray(response.data.imageIds)) {
                const fileUrls = files.map(file => URL.createObjectURL(file));
                setInputField(prev => ({ 
                    ...prev, 
                    image: [...prev.image, ...fileUrls], 
                    imagesId: [...prev.imagesId, ...response.data.imageIds] 
                }));
                
            }
        }).catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
        });
    };
    
    const handleChange = (name) => (value) => {
        
        setInputField(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (event) => {
        
        setSelectedEvent(event);
        setIsEditing(true);
        setInputField({
            id:  event.Id,
            name: event.name,
            description: event.description,
            date: format(new Date(event.date), "yyyy-MM-dd"),
            time: event.time,
            image: event.images.split(','),
            acters: event.acters.split(',').map(acterId =>{
                const acter = acters.find((acter) => acter.id === parseInt(acterId))
                return ({value: acter.id, label: acter.secondname});
            }), 
            locationId: event.locations.split(',').map(locatId =>{
                const location = locations.find((location) => location.id === parseInt(locatId))
                return ({value: location.id, label: location.name});
            }), 
            categoryId: event.category.split(',').map(categId =>{
                const category = categories.find((category) => category.id === parseInt(categId))
                return ({value: category.id, label: category.name});
            })
        });
    };
    
    
    const acterOptions = acters.map(acter => ({ value: acter.id, label: acter.secondname }));
    const locatOptions = locations.map(location => ({ value: location.id, label: location.name }));
    const categOptions = categories.map(categor => ({ value: categor.id, label: categor.name }));
    
    const renderImages = () => {
        const delImage = (index, img) => {
            const newImages = [...inputField.image];
            newImages.splice(index, 1);
            dispatch(delDashBoardImagesEventThunkCreator(img, inputField.id))
            setInputField({ ...inputField, image: newImages });
        };
        
        return inputField.image.map((img, index) => (
            
            <div className={style.oneImage} key={index}>
                <span onClick={() => delImage(index, img)}>&times;</span>
                <img src={img} alt={img} />
            </div>
        ));
    };
     

    return (
        <div className={style.eventCart}>
            <div className={style.cardWrapper}>
                <h5>Мероприятие</h5>
                {successMessage && <div className={style.successMessage}>{successMessage}</div>}
                
                <div>
                    <h6>Название</h6>
                    <input  
                        name="name" 
                        type="text" 
                        onChange={(e) => handleChange('name')(e.target.value)} 
                        value={inputField.name}
                    />
                </div>
                <div>
                    <h6>Актеры</h6>
                    <Select 
                        name="acters"
                        isMulti 
                        options={acterOptions} 
                        value={inputField.acters} 
                        onChange={handleChange('acters')} 
                        placeholder="Введите имя или фамилию актера..." 
                    />
                </div>
                <div>
                    <h6>Описание</h6>
                    <textarea  
                        name="description" 
                        onChange={(e) => handleChange('description')(e.target.value)} 
                        value={inputField.description}
                    />
                </div>
                <div>
                    <h6>Локация</h6>
                    <Select 
                        name="locationId"
                        isMulti 
                        options={locatOptions} 
                        value={inputField.locationId} 
                        onChange={handleChange('locationId')} 
                        placeholder="Введите место проведения" 
                    />
                </div>
                <div>
                    <h6>Категория</h6>
                    <Select 
                        name="categoryId"
                        isMulti 
                        options={categOptions} 
                        value={inputField.categoryId} 
                        onChange={handleChange('categoryId')} 
                        placeholder="Выберите категорию" 
                    />
                </div>
                <div>
                    <h6>Дата</h6>
                    <input 
                        name="date" 
                        type="date" 
                        onChange={(e) => handleChange('date')(e.target.value)} 
                        value={inputField.date}
                    />
                </div>
                <div>
                    <h6>Время</h6>
                    <input 
                        name="time" 
                        onChange={(e) => handleChange('time')(e.target.value)} 
                        value={inputField.time}
                    />
                </div>
                <div className={style.blockImage}>
                    <h6>Изображения</h6>
                    <div className={style.uploadBox}>
                        <input
                            name="image"
                            multiple 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </div>
                    <div className={style.imagePreview}>
                        {renderImages()}
                    </div>
                    
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
            <DashBoardEventsTable onEdit={handleEdit} />
        </div>
    );
};

export default DashBoardEvents;
