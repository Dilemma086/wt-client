import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const searchAPI ={
    getSearch(date, location){ 
        return instance.get(`/search/${date}/${location}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    
}