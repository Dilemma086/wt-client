import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const locatAPI ={
    getLocats(){ 
        return instance.get('/locats')
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
}