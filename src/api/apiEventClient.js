import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const eventAPI ={
    getEvents(){ 
        return instance.get('/events')
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    getEvent(id){ 
        return instance.get(`/events/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
}