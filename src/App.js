import React, { useEffect} from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clientMiddleWare } from './hoc/clientMiddleWare';
import { useSelector } from 'react-redux';
import LoginPage from './components/Login/Login'
import RegistrPage from './components/Login/RegistrPage'
import ResetPage from './components/Login/ResetPage'
import Dashboard from './components/Dashboard/Dashboard'
import MainPage from './components/Client/MainPage';
import Ticket from './components/Client/Ticket';
import Event from './components/Client/Event';
import Cart from './components/Client/Cart'
import Orders from './components/Client/Orders'
import Order from './components/Client/Order'
import Search from './components/Client/Search'
import OnLogin from './components/Login/OnLogin'
import Category from './components/Client/Category'
import Profile from './components/Common/Profile/Profile';

const NavigationHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clientMiddleWare(navigate)); // загружаем данные в store, если токен действующий
  }, [dispatch, navigate]);
  return null; // Этот компонент ничего не рендерит
};

function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavigationHandler /> 
        <Routes>
            {isAuth ? (
                    <>
                        <Route path="/admin/*" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} /> 
                        <Route path="/orders/:id" element={<Order />} /> 
                        <Route path="/" element={<MainPage />} />   
                        <Route path="/tickets/:id" element={<Ticket />} />
                        <Route path="/events/:id" element={<Event />} />
                        <Route path="/cart" element={<Cart />} /> 
                        <Route path="/search" element={<Search />} />
                        <Route path="/login" element={<OnLogin />} />
                        <Route path="/category/:id" element={<Category />} />   
                        <Route path="/profile" element={<Profile />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/registr" element={<RegistrPage />} />
                        <Route path="/reset" element={<ResetPage />} />
                        <Route path="/" element={<MainPage />} />
                        <Route path="/tickets/:id" element={<Ticket />} />
                        <Route path="/events/:id" element={<Event />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/category/:id" element={<Category />} />
                        <Route path="/admin" element={<Navigate to="/login" replace />} />
                        
                    </>
                )}
            
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App