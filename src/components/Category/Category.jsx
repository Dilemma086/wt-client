import { NavLink } from "react-router-dom"
import { logoutThunkCreator } from './../../redux/auth-reducer'
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

export const Category = () => { 
    const dispatch = useDispatch()
    const navigate = useNavigate();
const logout = async () => {
    await dispatch(logoutThunkCreator());
    localStorage.removeItem('token');
    navigate('/login');
}

    return (
        <div>
            <h1>Категории</h1>
            <p><NavLink to="/" onClick={logout}>Выход</NavLink></p>
            
        </div>
    )
}
