import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const ticketAPI ={
    getTickets(){ 
        return instance.get('/tickets')
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    getTicket(id){ 
        return instance.get(`/tickets/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    }
}