import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


export const localDashBoarAPI ={
    getLocals(){ 
        return instance.get('/admin/locations',{
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
    setLocals(name, description, street, dom, metro, map, image){ 
        const formData = new FormData(); // Создаем новый объект FormData
        formData.append('name', name); // Добавляем текстовые поля
        formData.append('description', description);
        formData.append('street', street);
        formData.append('dom', dom);
        formData.append('metro', metro);
        formData.append('map', map);
        formData.append('image', image); // Добавляем файл

        return instance.post('/admin/locations', formData ,{
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
    updateLocals(name, description, street, dom, metro, map, image, id){ 
        const formData = new FormData(); // Создаем новый объект FormData
        formData.append('name', name); // Добавляем текстовые поля
        formData.append('description', description);
        formData.append('street', street);
        formData.append('dom', dom);
        formData.append('metro', metro);
        formData.append('map', map);
        formData.append('image', image); // Добавляем файл
        formData.append('id', id);
        
        return instance.put('/admin/locations', formData ,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            }
        })
        .then(response => response.data.updatedLocation)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    deleteLocals(id){ 
        return instance.delete('/admin/locations', {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            },
            data: { id }
        })
        .then(response => response.data)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    }
}