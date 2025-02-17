import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})


export const categDashBoarAPI ={
    getCategs(){ 
        return instance.get('/admin/category',{
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
    
}