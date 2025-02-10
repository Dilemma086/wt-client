import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {getOrdersThunkCreator } from '../../redux/dashboard/order-reducer'
import { Preloader } from '../Common/Preloader/Preloader'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { format, getDay } from "date-fns";
import style from './mainstyle.module.css'

const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const Orders = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const userId = useSelector(state => state.auth.user[0].id);
    const orders = useSelector(state => state.order.ordersData);

    useEffect(() => {
        dispatch(getOrdersThunkCreator(userId))
        setLoading(false)
    }, [dispatch, userId]);

    if (loading) {return <Preloader />}
    return (
        <div className={style.fullBlock}>
            <div className={style.nooneBlock}>
                <Header />
                <h3>Заказы</h3>
                <p className={style.pBlock}>Необходимая информация по заказам.</p>
                {orders.length > 0 ? <div className={style.item}>
                    <h4>Список приобретенных билетов.</h4>
                    
                </div>
                : <p>Список пуст.</p>}
                {orders.map(order => (
                
                <div className={style.itemOrder}>
                    <Link to={`/orders/${order.orderId}`}>
                    <div className={style.images}>
                        <img src={order.image_url} alt={order.name}/>
                    </div>
                    <div className={style.info}>
                        <h3>Заказ №{order.orderId}</h3>
                        <div className={style.name}><h4>{order.name}</h4>  <span>({order.location_name})</span></div>
                        <h5>Дата: {format(new Date(order.date), "dd.MM")} {order.time.slice(0, -3)} {daysOfWeek[getDay(new Date(order.date))]}</h5>
                        <h6>Место: {order.category_name} - {order.quantity} шт.</h6>
                        <h6>Стоимость: {order.price} руб</h6>
                        <p>Статус заказа: {order.status}</p>

                    </div>
                    </Link>
                    <span className={style.lineorders}></span>    
                </div>
                    
                
                )
                )}
            </div>
            <Footer />
        </div>

    )
}
export default Orders