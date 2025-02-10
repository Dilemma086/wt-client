import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from './DashBoardOrder.module.css';
import { updateOrderStatus, resetOrders } from './../../../redux/dashboard/order-reducer'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import Pagination from '../../Common/Pagination/pagination'

const DashBoardOrders = () => {
    const dispatch = useDispatch();
    const [localStatuses, setLocalStatuses] = useState({});
    const [activeOrderId, setActiveOrderId] = useState(null);
    const [upOrder, setUpOrder] = useState({}); // Состояние для отслеживания измененных заказов
    // const [updatedOrderIds, setUpdatedOrderIds] = useState({});
    const paginat = useSelector(state => state.settingDB.paginat);
    const pageSize = useSelector(state => state.settingDB.pageSize);
    const orders = useSelector(state => state.order.ordersData);

    const location = useLocation();

    useEffect(() => {
        return () => {
            dispatch(resetOrders());
        };
    }, [dispatch, location]);

    const getPaginated = () => {
        const start = (paginat - 1) * pageSize;
        const end = start + pageSize;
        return orders.slice(start, end);
    };

    const handleStatusClick = (orderId, newStatus) => {
        // Обновляем upOrder только для конкретного заказа
        setUpOrder(prev => ({ ...prev, [orderId]: true }));
        // setUpdatedOrderIds(prev => ({ ...prev, [orderId]: true }));
        setLocalStatuses(prev => ({ ...prev, [orderId]: newStatus }));
        setActiveOrderId(null);
    };

    const updateStatusClick = (orderId, quantity) => {
        const status = localStatuses[orderId];
        if (status) {
            dispatch(updateOrderStatus(orderId, status, quantity));
            // Сбрасываем upOrder для конкретного заказа после обновления
            setUpOrder(prev => ({ ...prev, [orderId]: false }));
            // setUpdatedOrderIds(prev => ({ ...prev, [orderId]: false }));
        }
    };

    const statuses = ["В обработке", "Принят", "Выполнен", "Отменен"];

    return (
        <div className={style.cardOrders}>
            <div className={style.cardWrapper}>
                <h3 className={style.hd}>Список заказов</h3>

                <div className={style.tableResponsive}>
                    <table className={style.tableBordered}>
                        <thead className={style.theadDark}>
                            <tr>
                                <th>№ заказа</th>
                                <th>Изображение</th>
                                <th>Название</th>
                                <th>Локация</th>
                                <th>Покупатель</th>
                                <th>Заказано билетов</th>
                                <th>Доступно билетов</th>
                                <th>Статус заказа</th>
                                <th>Документ</th>
                                <th>Дата и время</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getPaginated().map((order, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={style.dFlex}>
                                            <input className={style.selectInput} type="checkbox" data-indeterminate="false" aria-label="Checkbox demo" />
                                            <span>#{order.orderId}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.imgCardShadow}>
                                            <div className={style.imgWrapper}>
                                                <img src={order.image_url ? order.image_url : '/uploads/no-image.png'} alt={order.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={style.info}>
                                                <Link to={`/tickets/${order.ticketId}`}>{order.name}</Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={style.info}>
                                                {order.location_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={style.info}>
                                                {order.firstname} {order.secondname}
                                                <p>{order.phone && order.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`${style.infoBlock} ${style.center}`}>
                                            <div className={style.info}>
                                                {order.quantity}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`${style.infoBlock} ${style.center}`}>
                                            <div className={style.info}>
                                                {order.total}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={`${style.info} ${style.status}`} onClick={() => setActiveOrderId(activeOrderId === order.orderId ? null : order.orderId)}>
                                                {localStatuses[order.orderId] || order.status}
                                                <span>
                                                    <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L7.5 5.93934L12.9697 0.46967C13.2626 0.176777 13.7374 0.176777 14.0303 0.46967C14.3232 0.762563 14.3232 1.23744 14.0303 1.53033L8.03033 7.53033C7.73744 7.82322 7.26256 7.82322 6.96967 7.53033L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z" fill="#222222"></path></svg>
                                                </span>
                                                {activeOrderId === order.orderId && (
                                                    <div className={style.listStatus}>
                                                        <ul>
                                                            {statuses.map((status, idx) => (
                                                                <li key={idx} onClick={() => handleStatusClick(order.orderId, status)}>
                                                                    {status}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={style.info}>
                                                <input
                                                    name="document"
                                                    multiple
                                                    type="file"
                                                    accept="doc/*"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.infoBlock}>
                                            <div className={style.info}>
                                                {format(new Date(order.date), "dd.MM.yyyy")}
                                                <p className={style.textRight}>{order.time.slice(0, -3)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={style.dFlex}>
                                            <button
                                                className={`${style.MuiButtonBase} ${style.colorDel}`}
                                                tabIndex="0"
                                                type="button"
                                                onClick={() => updateStatusClick(order.orderId, order.quantity)}
                                                data-set='update'
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill={upOrder[order.orderId] ? "#ff0000" : "currentColor"} // Цвет меняется только для конкретного заказа
                                                    viewBox="0 0 30 30"
                                                    height="1.5em"
                                                    width="1.5em"
                                                >
                                                    <path d="M22,4h-2v6c0,0.552-0.448,1-1,1h-9c-0.552,0-1-0.448-1-1V4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V8L22,4z M22,24H8v-6c0-1.105,0.895-2,2-2h10c1.105,0,2,0.895,2,2V24z" />
                                                </svg>
                                            </button>
                                            <button className={`${style.MuiButtonBase} ${style.colorDel}`} tabIndex="0" type="button">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 24 24"
                                                    height="1.2em"
                                                    width="1.2em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination totalItem={orders.length} pageSize={pageSize} />
            </div>
        </div>
    );
};

export default DashBoardOrders;