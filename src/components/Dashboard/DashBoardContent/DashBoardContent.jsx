import React, { useEffect } from 'react';
import { PieChart, Pie,  Cell, ResponsiveContainer } from 'recharts';
import { resetOrders } from './../../../redux/dashboard/order-reducer'
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux'
import style from './DashBoardContent.module.css'
import Pagination from '../../Common/Pagination/pagination'
import { format } from "date-fns";

// const options = [
//      'Категория 1', 'Категория 2', 'Категория 3','Категория 4'
// ]

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


const DashBoardContent = () => { 
    const dispatch = useDispatch();
    const paginat = useSelector(state => state.settingDB.paginat);
    const pageSize = useSelector(state => state.settingDB.pageSize);
    const totalEvents = useSelector(state => state.event.totalEvents);
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

    return (
        <div className={style.dashBoardContent}>
           <div className={style.dashboardBoxWrapperRow}>
                <div className={style.boxWrapper}>
                    <button className={`${style.dashboardBox} ${style.dashboardBox1}`}>
                        <span className={style.chart}>
                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TrendingUpIcon">
                                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                            </svg>
                        </span>
                        <div className={style.w100}>
                            <div className={style.col1}>
                                <h4 className={style.textWhite}>Всего пользователей</h4>
                                <span  className={style.textWhite}>277</span>
                            </div>
                            <div className={style.mlAuto}>
                                <span className={style.icon}>
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className={style.w100bottom}>
                            <h6 className={style.textWhite}>За месяц</h6>
                            <div className={style.mlAuto}>
                                <button className={style.toggleIcon} tabindex="0" type="button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                    
                                </button>
                            </div>
                        </div>
                        
                    </button>
                    <button className={`${style.dashboardBox} ${style.dashboardBox2}`}>
                        <span className={style.chart}>
                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TrendingUpIcon">
                                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                            </svg>
                        </span>
                        <div className={style.w100}>
                            <div className={style.col1}>
                                <h4 className={style.textWhite}>Всего заказов</h4>
                                <span  className={style.textWhite}>43</span>
                            </div>
                            <div className={style.mlAuto}>
                                <span className={style.icon}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H69.5c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H199.7c-11.5 0-21.4-8.2-23.6-19.5L170.7 288H459.2c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32H360V134.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V32H120.1C111 12.8 91.6 0 69.5 0H24zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"></path>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className={style.w100bottom}>
                            <h6 className={style.textWhite}>За месяц</h6>
                            <div className={style.mlAuto}>
                                <button className={style.toggleIcon} tabindex="0" type="button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                    
                                </button>
                            </div>
                        </div>
                        
                    </button>
                    <button className={`${style.dashboardBox} ${style.dashboardBox3}`}>
                        <span className={style.chart}>
                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TrendingUpIcon">
                                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                            </svg>
                        </span>
                        <div className={style.w100}>
                            <div className={style.col1}>
                                <h4 className={style.textWhite}>Всего мероприятий</h4>
                                <span  className={style.textWhite}>{totalEvents.length}</span>
                            </div>
                            <div className={style.mlAuto}>
                                <span className={style.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"></path><path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className={style.w100bottom}>
                            <h6 className={style.textWhite}>За месяц</h6>
                            <div className={style.mlAuto}>
                                <button className={style.toggleIcon} tabindex="0" type="button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                    
                                </button>
                            </div>
                        </div>
                        
                    </button>
                    <button className={`${style.dashboardBox} ${style.dashboardBox4}`}>
                        <span className={style.chart}>
                            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TrendingUpIcon">
                                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                            </svg>
                        </span>
                        <div className={style.w100}>
                            <div className={style.col1}>
                                <h4 className={style.textWhite}>Всего билетов</h4>
                                <span  className={style.textWhite}>751</span>
                            </div>
                            <div className={style.mlAuto}>
                                <span className={style.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd"></path>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className={style.w100bottom}>
                            <h6 className={style.textWhite}>За месяц</h6>
                            <div className={style.mlAuto}>
                                <button className={style.toggleIcon} tabindex="0" type="button">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                    </svg>
                                    
                                </button>
                            </div>
                        </div>
                        
                    </button>
                </div>
                <div className={style.boxGraph}>
                    <div className={style.w100bottom}>
                        <h6 className={style.textWhite}>Total Sales</h6>
                        <div className={style.mlAuto}>
                            <button className={style.toggleIcon} tabindex="0" type="button">                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <h3 className={style.textWhiteFontBold}>$3,787,681.00</h3>
                    <p className={style.textWhiteP}>$3,578.90 in last month</p>
                    <div className={style.recharts}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={300} height={300}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className={style.cardEvents}>
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
                                <input className={style.selectInput} type="checkbox" data-indeterminate="false" aria-label="Checkbox demo"/>
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
                        <td >
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    {order.name}
                                    
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
                                <div className={style.info}>
                                    {order.status}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info} >
                                <input
                                    name="document"
                                    multiple 
                                    type="file" 
                                    accept="doc/*" 
                                    // onChange={handleImageChange} 
                                />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.infoBlock}>
                                <div className={style.info}>
                                    {format(new Date(order.date), "dd.MM.yyyy")}
                                    <p className={style.textRight}>{order.time.slice(0, -3)} </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={style.dFlex}>
                                    <button className={`${style.MuiButtonBase} ${style.colorDel}`} tabindex="0" type="button" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#1866ee" viewBox="0 0 30 30" height="1.5em" width="1.5em" >
                                        <path d="M22,4h-2v6c0,0.552-0.448,1-1,1h-9c-0.552,0-1-0.448-1-1V4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18  c1.105,0,2-0.895,2-2V8L22,4z M22,24H8v-6c0-1.105,0.895-2,2-2h10c1.105,0,2,0.895,2,2V24z"/>
                                    </svg>
                                    </button>
                                    <button className={`${style.MuiButtonBase} ${style.colorDel}`} tabindex="0" type="button" >
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="none" d="M0 0h24v24H0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
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
    )
}
export default DashBoardContent