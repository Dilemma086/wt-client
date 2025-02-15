import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})


export const eventDashBoarAPI ={
    getEvents(){ 
        return instance.get('/admin/events',{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    getEventById(eventId){
        return instance.get('/admin/events/event', {
            params: { eventId },
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        });
    },
    setImagesEvent(images, eventId){
        const formData = new FormData();
        images.forEach(img => {
            formData.append('image', img); 
        });
        formData.append('eventId', eventId);
        return instance.post('/admin/events/uploadImage', formData, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        });   
    },
    setNewImagesEvent(images) {
        const formData = new FormData();
        images.forEach((img) => {
            formData.append('images', img); 
        });
        return instance.post('/admin/events/newloadImage', formData, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        });
    },
    delImagesEvent(imageURL, eventId){
        return instance.delete('/admin/events/deleteImage', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            },
            data: {imageURL, eventId}

        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        });   

    },
    setEvents(name, acters, description, locationId, categoryId, date, time, imagesId){ 
        
        const data = {
            name: name,
            acters: acters,
            description: description,
            locationId: locationId,
            categoryId: categoryId,
            date: date,
            time: time,
            imagesId: imagesId
        };
               
        return instance.post('/admin/events', data, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        });            
    },
    updateEvents(name, acters, description, locationId, categoryId, date, time, image, id){ 
        const formData = new FormData(); 
        formData.append('name', name);
        formData.append('acters', acters);
        formData.append('description', description);
        formData.append('locationId', locationId);
        formData.append('categoryId', categoryId);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('image', image); 
        formData.append('id', id);
        
        return instance.put('/admin/events', formData ,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            }
        })
        .then(response => response.data.updatedEvent)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    deleteEvents(id){ 
        return instance.delete('/admin/events', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            },
            data: {id}
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    }
}