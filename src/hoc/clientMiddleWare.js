import {jwtDecode} from 'jwt-decode';
import { infoAuthThunkCreator } from './../redux/auth-reducer'; // Импортируйте ваши action creators

// Функция для проверки токена и инициализации состояния
export const clientMiddleWare = (navigate) => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        const userId = decodedToken.userId
        dispatch(infoAuthThunkCreator(userId));
        
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      
      localStorage.removeItem('token');
      
    }
  }
  
};
