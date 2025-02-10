import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
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