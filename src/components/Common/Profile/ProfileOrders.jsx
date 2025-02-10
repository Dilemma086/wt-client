import style from './../../../components/Client/mainstyle.module.css'
import { useParams, Link } from 'react-router-dom';
import { format, getDay } from "date-fns";
const daysOfWeek = ['Вск', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const ProfileOrders = (orders) => {
    
    return(
        <div className={style.item}>
             <h4>Информация по заказам</h4>
            <span className={style.line}></span>
            {orders ? orders.orders.map((order) => (
                <div className={style.itemOrderL}>
                
                    <div className={style.info}>
                        <h4>Заказ №{order.orderId}</h4>
                        <h5><b>Название мероприятия:</b> {order.name}</h5> 
                        <h5><b>Локация:</b> {order.location_name}</h5>  
                        <h5><b>Дата:</b> {format(new Date(order.date), "dd.MM")} {order.time.slice(0, -3)} {daysOfWeek[getDay(new Date(order.date))]}</h5>
                        <h5><b>Место:</b> {order.category_name}</h5>
                        <h5><b>Количество билетов:</b> {order.quantity} шт</h5>
                        <h5><b>Стоимость:</b> {order.price} руб</h5>
                        <h5><b>Статус заказа:</b> {order.status}</h5>
                        <button><Link to={`/orders/${order.orderId}`}>Подробнее</Link></button>
                    </div>
                    <span className={style.lineL}></span>
                  
                </div>
               
            )):
            <h6>Список пуст.</h6>}
        </div>
    )
}
export default ProfileOrders