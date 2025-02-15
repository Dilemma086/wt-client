import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})


export const ticketDashBoarAPI ={
    getTickets(){ 
        return instance.get('/admin/tickets',{
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
    getTicketById(ticketId){
        return instance.get('/admin/tickets/ticket', {
            params: { ticketId },
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
    getTicketCategories(){
        return instance.get('/admin/tickets/categories',{
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
    setTickets(eventId, date, time, categoriesId, total, price) {
        const data = {
            eventId: eventId,
            date: date,
            time: time,
            categoriesId: categoriesId,
            total: total,
            price: price
        };
        return instance.post('/admin/tickets', data, {
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
    updateTickets(id, eventId, price, total, date, time, categoriesId){ 
        const data = {
            id: id,
            eventId: eventId,
            price: price,
            total: total,
            date: date,
            time: time,
            ticketCategoriesId: categoriesId
        };       
        return instance.put('/admin/tickets', data ,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.data.updatedTicket)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
     deleteTickets(id){ 
        return instance.delete('/admin/tickets', {
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