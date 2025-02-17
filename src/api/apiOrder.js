import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})


export const orderAPI ={
    getAllOrders(){ 
        return instance.get(`/orders/`, {
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
    updateOrder(orderId, newStatus, quantity){ 
        return instance.put(`/orders`, {
            orderId: orderId,
            newStatus: newStatus,
            quantity: quantity
        }, {
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
    getOrders(userId){ 
        return instance.get(`/orders/${userId}`, {
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
    setOrder(tickets, userId) {
        return instance.post('/orders', {
            userId,
            tickets 
        }, {
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
    getOrder(userId, orderId){ 
        return instance.get(`/orders/${userId}/${orderId}`,{
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
     deleteOrder(id){ 
        return instance.delete('/orders/order', {
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