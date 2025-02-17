import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})

export const categoryAPI ={
    getCategory(category){ 
        return instance.get(`/category/${category}`)
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    
}