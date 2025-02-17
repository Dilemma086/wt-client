import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL
})
console.log('API URL:', process.env.REACT_APP_API_URL);
//логирование
export const authAPI={
    loginAuth(email, password){
        return instance.post('/login', {email, password})
            .then(response => {
                const token = response.data.token; // предполагая, что токен находится в данных ответа
                localStorage.setItem('token', token);
                return response.data;
            })
            .catch(error => {
                if (error.response && error.response.status ===401) {
                    throw error.response.data; // бросаем весь объект ошибки 
                } else {
                        // Обработка других ошибок 
                        throw new Error('Произошла ошибка при попытке входа');
                }
            });
    },
    infoAuth(userId){
        return instance.get('/login', { params: { userId }} )
            .then(response => {
                return response.data;
            })
            .catch(error => {
                if (error.response && error.response.status ===401) {
                    throw error.response.data; // бросаем весь объект ошибки 
                } else {
                    throw new Error('Произошла ошибка при попытке входа');
                }
            });
    },
    
    postRegUser(email, password){
        return instance.post('/registr', {email, password})
            .then(response => response)
            .catch(error => {
                console.error(`Произошла ошибка регистрации пользователя: ${error.message}`);
                throw error;
            });
    },

    postResetAuth(email, password){
        return instance.post('/reset', {email, password})
            .then(response => response)
            .catch(error => {
                console.error(`Произошла ошибка сброса пароля: ${error.message}`);
                throw error;
            })
    }
}