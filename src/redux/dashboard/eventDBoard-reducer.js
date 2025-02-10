import { eventDashBoarAPI } from '../../api/apiEvent'
import { eventAPI } from '../../api/apiEventClient'

const GET_EVENT_DATA = 'GET_EVENT_DATA';
const SET_EVENT_DATA = 'SET_EVENT_DATA';
const SET_EVENT_TOTAL = 'SET_EVENT_TOTAL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_EVENT_IMAGES = 'SET_EVENT_IMAGES';
const SET_NEW_IMAGES_ID = 'SET_NEW_IMAGES_ID'
const DEL_EVENT = 'DEL_EVENT'

let initialState = {
    eventData: [],
    currentPage: 1,
    totalEvents: 0,
    imagesEvent: [],
    imagesId: []
}

const eventDBoardReducer = (state = initialState, action) => {
    switch(action.type){
            case GET_EVENT_DATA:{
                return {...state, 
                    eventData:  action.data
                }
            }
            case SET_EVENT_DATA:
                return { ...state, eventData: [...state.eventData, action.data] };
            case SET_EVENT_TOTAL:{
                    return {...state, 
                        totalEvents:  action.total
                    }
                }
            case SET_CURRENT_PAGE:{   
                return {...state, 
                    currentPage: action.currentPage
                }
            }
            case SET_EVENT_IMAGES:
                return{ ...state, imagesEvent: [...state.imagesEvent, action.imagesEvent]}
            case SET_NEW_IMAGES_ID:
                return{ ...state, imagesId: action.imagesId
                }
            case DEL_EVENT: {
                const { id } = action.id;
                const updatedEventData = state.eventData.filter(event => event.id !== id);
                return { ...state, eventData: updatedEventData };
            }
            default:
                return state 
    }
}

export const getDashBoardEventsActionCreater = (data) => ({ type: GET_EVENT_DATA, data })
export const getDashBoardEventActionCreater = (data) => ({ type: GET_EVENT_DATA, data })
export const setDashBoardEventsActionCreater = (data) => ({ type: SET_EVENT_DATA, data })
export const setTotalEvents = (total) => ({ type: SET_EVENT_TOTAL, total })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setImagesEvent = (images) => ({ type: SET_EVENT_IMAGES, images})
export const setNewImagesEvent = (imagesId) => ({ type: SET_NEW_IMAGES_ID, imagesId}) 
export const delImagesEvent = (images) => ({ type: SET_EVENT_IMAGES, images})
export const deleteEvents = (id) => ({ type: DEL_EVENT, id})

// Client
//All
export const getEventsThunkCreator = ()  => async (dispatch)=>{
    try{
        const data = await eventAPI.getEvents()
        dispatch(getDashBoardEventsActionCreater(data));
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
}
//One
export const getEventThunkCreator = (id)  => async (dispatch) => {
    try{
        const data = await eventAPI.getEvent(id)
        dispatch(getDashBoardEventActionCreater(data));
    }
    catch (error) {
        console.error('Ошибка получения билетов:', error);
        return { success: false, error: error.message };
    }
}
// END

export const getDashBoardEventsThunkCreator = (currentPage = 1)  =>(dispatch)=>{
    dispatch(setCurrentPage(currentPage))
    eventDashBoarAPI.getEvents()
        .then(data =>{
            dispatch(setTotalEvents(data.length))
            dispatch(getDashBoardEventsActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}
export const setDashBoardImagesEventThunkCreator = (images, eventId) => async (dispatch) => {
    if(eventId===''){
        //если мы добавляем фото в новое мероприятие, то у нас нет ID этого мероприятия, поэтому мы добавляем фото на сервер и возвращаем ID фото, так же это может быть сразу несколько ID изображений
        try {
            const data = await eventDashBoarAPI.setNewImagesEvent(images);
            dispatch(setNewImagesEvent(data));
            return { imagesId: true, data };
        } catch (error) {
            console.error('Failed to new images:', error);
            return { imagesId: false, error: error.message };
        }
    }else{
        //Если есть eventId, значить происходит добавление фото в уже существующее мероприятие
        try {
            const data = await eventDashBoarAPI.setImagesEvent(images, eventId);
            dispatch(setImagesEvent(data));
            
            return { success: true, data };
        } catch (error) {
            console.error('Failed to upload images:', error);
            return { success: false, error: error.message };
        }
    }
};

export const delDashBoardImagesEventThunkCreator = (imageURL, eventId) => async (dispatch) => {
    try {
        const data = await eventDashBoarAPI.delImagesEvent(imageURL, eventId);
        dispatch(delImagesEvent(data));
        return { success: true, data };
    } catch (error) {
        console.error('Failed to upload images:', error);
        return { success: false, error: error.message };
    }
};


export const setDashBoardEventsThunkCreator = (name, acters, description, locationId, categoryId, date, time, imagesId) => (dispatch) => {
    eventDashBoarAPI.setEvents(name, acters, description, locationId, categoryId, date, time, imagesId)
        .then((response) => {
            
            const eventId = response.eventId;
           
            // Выполняем дополнительный запрос для получения полных данных о созданном событии
            eventDashBoarAPI.getEventById(eventId)
                .then((fullEventData) => {
                    dispatch(setDashBoardEventsActionCreater(fullEventData));
                })
                .catch((error) => {
                    console.error(`Произошла ошибка при получении данных о событии: ${error.message}`);
                });
        })
        .catch((error) => {
            
            console.error(`Произошла ошибка при создании события: ${error.message}`);
        });
};


export const updateDashBoardEventsThunkCreator = (name, acters, description, locationId, categoryId, date, time, image, id)  => (dispatch) =>{
    
    eventDashBoarAPI.updateEvents(name, acters, description, locationId, categoryId, date, time, image, id)
        .then(data =>{
            
            dispatch(setDashBoardEventsActionCreater(data))
        })
        .catch(error => {
            console.log(error);
        })
}

export const deleteDashBoardEventsThunkCreator = (id)  => (dispatch) =>{
    
    eventDashBoarAPI.deleteEvents(id)
        .then(data =>{
            dispatch(deleteEvents(data.id))
        })
        .catch(error => {
            console.log(error);
        })
}

export default eventDBoardReducer