import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})


export const acterDashBoarAPI ={
    getActers(){ 
        return instance.get('/admin/acters',{
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
    getActerById(){
        return instance.get('/admin/acters/acter', {
            
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
    setActers(fierstname,	secondname,	description, image){ 
        const formData = new FormData(); // Создаем новый объект FormData
        formData.append('fierstname', fierstname); // Добавляем текстовые поля
        formData.append('secondname', secondname);
        formData.append('description', description);
        formData.append('image', image); // Добавляем файл

        return instance.post('/admin/acters', formData ,{
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
    updateActers(fierstname,	secondname,	description, image, id){ 
        const formData = new FormData(); 
        formData.append('fierstname', fierstname); 
        formData.append('secondname', secondname);
        formData.append('description', description);
        formData.append('image', image); 
        formData.append('id', id);
        
        return instance.put('/admin/acters', formData ,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
                
            }
        })
        .then(response => response.data.updatedActer)
        .catch(error => {
            console.error(`Произошла ошибка: ${error.message}`);
            throw error;
        })            
    },
    deleteActers(id){ 
        return instance.delete('/admin/acters', {
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