import {useState, useEffect} from 'react'
import style from './../../Client/mainstyle.module.css'
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Preloader } from './../../Common/Preloader/Preloader'
import ProfileAccont from './ProfileAccont'
import ProfileOrders from './ProfileOrders'
import ProfileSales from './ProfileSales'
import ProfilePay from './ProfilePay'
import ProfileSettings from './ProfileSettings'
import { getOrdersThunkCreator, resetOrders } from './../../../redux/dashboard/order-reducer'


const Profile = () => {
    const dispatch = useDispatch();
    const account = useSelector(state => state.auth.user[0])
    const orders = useSelector(state => state.order.ordersData)
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState('account');
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getOrdersThunkCreator(account.id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, account.id]);

    useEffect(() => {
        return () => {
            dispatch(resetOrders());
        };
    }, [dispatch, location]);
    

    const handleMenuClick = (component) => {
        setActiveComponent(component);
    };
    if (loading) {return <Preloader />}
    return(
        <div className={style.fullBlock}>
            <div className={style.nooneBlock}>
                <Header/>
                <h4>Профиль</h4>
                <div className={style.profile}>
                    <div className={style.left}>
                        <div className={style.acccount}>
                            <div className={style.image}>
                                <img src={account.avatar} alt={account.secondname}/>
                            </div>
                            <h5>{account.firstname} {account.secondname}</h5>
                        </div>
                        <div className={style.menu}>
                            <div className={`${style.menuitem} ${activeComponent === 'account' ? style.active : ''}`} onClick={() => handleMenuClick('account')}>
                                <span>
                                    <svg width="20" height="22" viewBox="0 0 20 22"fill="#222222" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75 5C6.75 3.20507 8.20507 1.75 10 1.75C11.7949 1.75 13.25 3.20507 13.25 5C13.25 6.79493 11.7949 8.25 10 8.25C8.20507 8.25 6.75 6.79493 6.75 5ZM10 0.25C7.37665 0.25 5.25 2.37665 5.25 5C5.25 7.62335 7.37665 9.75 10 9.75C12.6234 9.75 14.75 7.62335 14.75 5C14.75 2.37665 12.6234 0.25 10 0.25ZM10 11.25C4.61524 11.25 0.25 15.6152 0.25 21C0.25 21.4142 0.585786 21.75 1 21.75C1.41421 21.75 1.75 21.4142 1.75 21C1.75 16.4437 5.44366 12.75 10 12.75C14.5563 12.75 18.25 16.4437 18.25 21C18.25 21.4142 18.5858 21.75 19 21.75C19.4142 21.75 19.75 21.4142 19.75 21C19.75 15.6152 15.3848 11.25 10 11.25Z" />
                                    </svg>
                                </span>
                                <h6>Аккаунт</h6>
                            </div>
                            <div className={style.menuitem} >
                                <span>
                                <svg stroke="#222222" fill="#222222" stroke-width="0" viewBox="0 0 24 24" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                                </svg>
                                </span>
                                <Link to='/admin'><h6>Dashboard</h6></Link>
                            </div>
                            <div className={`${style.menuitem} ${activeComponent === 'orders' ? style.active : ''}`} onClick={() => handleMenuClick('orders')}>
                                <span>
                                <svg width="18" height="22" viewBox="0 0 18 22" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 3.25H4.75V4C4.75 4.41421 5.08579 4.75 5.5 4.75H12.5C12.9142 4.75 13.25 4.41421 13.25 4V3.25H16C16.1381 3.25 16.25 3.36192 16.25 3.5V20C16.25 20.1381 16.1381 20.25 16 20.25H2C1.86192 20.25 1.75 20.1381 1.75 20V3.5C1.75 3.36193 1.86193 3.25 2 3.25ZM6.25 3.25V2.5C6.25 2.08579 5.91421 1.75 5.5 1.75H2C1.0335 1.75 0.25 2.5335 0.25 3.5V20C0.25 20.9665 1.03351 21.75 2 21.75H16C16.9665 21.75 17.75 20.9665 17.75 20V3.5C17.75 2.53351 16.9665 1.75 16 1.75H12.5C12.0858 1.75 11.75 2.08579 11.75 2.5V3.25H6.25Z" />
                                        <path d="M4.75 1C4.75 0.585786 5.08579 0.25 5.5 0.25H12.5C12.9142 0.25 13.25 0.585786 13.25 1V4C13.25 4.41421 12.9142 4.75 12.5 4.75H5.5C5.08579 4.75 4.75 4.41421 4.75 4V1ZM6.25 1.75V3.25H11.75V1.75H6.25Z" />
                                        <path d="M11.0301 7.96962C11.323 8.26248 11.3231 8.73735 11.0302 9.03028L8.31043 11.7506H11.502C11.8054 11.7506 12.0789 11.9334 12.195 12.2137C12.311 12.4939 12.2468 12.8166 12.0322 13.031L8.0304 17.0313C7.73745 17.3242 7.26258 17.3241 6.96974 17.0311C6.6769 16.7382 6.67699 16.2633 6.96994 15.9705L9.69087 13.2506H6.50002C6.19669 13.2506 5.92322 13.0679 5.80713 12.7876C5.69103 12.5074 5.75517 12.1848 5.96964 11.9703L9.96944 7.96972C10.2623 7.6768 10.7372 7.67675 11.0301 7.96962Z" />
                                    </svg>
                                </span>
                                <h6>Заказы</h6>
                            </div>
                            <div className={`${style.menuitem} ${activeComponent === 'bonuses' ? style.active : ''}`} onClick={() => handleMenuClick('bonuses')}>
                                <span>
                                <svg width="12" height="12" viewBox="0 0 12 12"fill="#222222" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5303 1.46967C10.8232 1.76256 10.8232 2.23744 10.5303 2.53033L2.03033 11.0303C1.73744 11.3232 1.26256 11.3232 0.96967 11.0303C0.676777 10.7374 0.676777 10.2626 0.96967 9.96967L9.46967 1.46967C9.76256 1.17678 10.2374 1.17678 10.5303 1.46967Z" />
                                    <path d="M1.5 0.75C1.91421 0.75 2.25 1.08579 2.25 1.5V9.75H10.5C10.9142 9.75 11.25 10.0858 11.25 10.5C11.25 10.9142 10.9142 11.25 10.5 11.25H1.5C1.08579 11.25 0.75 10.9142 0.75 10.5V1.5C0.75 1.08579 1.08579 0.75 1.5 0.75Z" />
                                    </svg>

                                </span>
                                <h6>Бонусы</h6>
                            </div>
                            <div className={`${style.menuitem} ${activeComponent === 'payments' ? style.active : ''}`} onClick={() => handleMenuClick('payments')}>
                                <span>
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1.75C1.86193 1.75 1.75 1.86193 1.75 2V16C1.75 16.1381 1.86192 16.25 2 16.25H20C20.1381 16.25 20.25 16.1381 20.25 16V2C20.25 1.86192 20.1381 1.75 20 1.75H2ZM0.25 2C0.25 1.0335 1.0335 0.25 2 0.25H20C20.9665 0.25 21.75 1.03351 21.75 2V16C21.75 16.9665 20.9665 17.75 20 17.75H2C1.03351 17.75 0.25 16.9665 0.25 16V2Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 5C0.25 4.58579 0.585786 4.25 1 4.25H21C21.4142 4.25 21.75 4.58579 21.75 5C21.75 5.41421 21.4142 5.75 21 5.75H1C0.585786 5.75 0.25 5.41421 0.25 5Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.75 13C11.75 12.5858 12.0858 12.25 12.5 12.25H17C17.4142 12.25 17.75 12.5858 17.75 13C17.75 13.4142 17.4142 13.75 17 13.75H12.5C12.0858 13.75 11.75 13.4142 11.75 13Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21 1.25C21.4142 1.25 21.75 1.58579 21.75 2V10C21.75 10.4142 21.4142 10.75 21 10.75C20.5858 10.75 20.25 10.4142 20.25 10V2C20.25 1.58579 20.5858 1.25 21 1.25Z" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.25C1.41421 1.25 1.75 1.58579 1.75 2V10C1.75 10.4142 1.41421 10.75 1 10.75C0.585786 10.75 0.25 10.4142 0.25 10V2C0.25 1.58579 0.585786 1.25 1 1.25Z" />
                                </svg>

                                </span>
                                <h6>Платежи</h6>
                            </div>
                            <div className={`${style.menuitem} ${activeComponent === 'settings' ? style.active : ''}`} onClick={() => handleMenuClick('settings')}>
                                <span>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.12596 0.638599C8.46935 0.543544 8.83221 0.703201 8.99413 1.02058C9.36718 1.75182 10.1261 2.24991 11 2.24991C11.8739 2.24991 12.6328 1.75182 13.0059 1.02058C13.1678 0.703201 13.5307 0.543544 13.874 0.638599C15.5585 1.10488 17.0759 1.97031 18.3184 3.12565C18.5611 3.35128 18.6269 3.70939 18.4804 4.00657C18.3331 4.30525 18.25 4.64181 18.25 4.99991C18.25 6.24254 19.2574 7.24991 20.5 7.24991L20.5314 7.24968C20.8629 7.24495 21.1583 7.4585 21.2576 7.77486C21.5777 8.79388 21.75 9.87748 21.75 10.9999C21.75 11.7407 21.6749 12.4648 21.5318 13.1647C21.4548 13.541 21.1059 13.7984 20.7237 13.7608C20.6504 13.7536 20.5758 13.7499 20.5 13.7499C19.2574 13.7499 18.25 14.7573 18.25 15.9999C18.25 16.553 18.4486 17.0578 18.7793 17.4497C19.027 17.7433 19.0128 18.1766 18.7465 18.4534C17.4777 19.7718 15.8745 20.7677 14.0721 21.3043C13.6807 21.4208 13.2681 21.2028 13.1437 20.8139C12.8535 19.9059 12.0024 19.2499 11 19.2499C9.99764 19.2499 9.14655 19.9059 8.85629 20.8139C8.73195 21.2028 8.31927 21.4208 7.92789 21.3043C6.12545 20.7677 4.52229 19.7718 3.25353 18.4534C2.98716 18.1766 2.97299 17.7433 3.22072 17.4497C3.55139 17.0578 3.75 16.553 3.75 15.9999C3.75 14.7573 2.74264 13.7499 1.5 13.7499C1.42423 13.7499 1.34963 13.7536 1.27634 13.7608C0.894056 13.7984 0.545187 13.541 0.468209 13.1647C0.325049 12.4648 0.25 11.7407 0.25 10.9999C0.25 9.87749 0.422274 8.79389 0.742364 7.77485C0.841733 7.4585 1.13705 7.24495 1.4686 7.24968L1.5 7.24991C2.74264 7.24991 3.75 6.24254 3.75 4.99991C3.75 4.64181 3.66689 4.30526 3.51962 4.00657C3.3731 3.70939 3.43894 3.35128 3.68159 3.12565C4.92411 1.97031 6.44153 1.10488 8.12596 0.638599ZM5.08277 3.88982C5.19152 4.24114 5.25 4.61415 5.25 4.99991C5.25 6.88936 3.85261 8.45244 2.03493 8.71204C1.84898 9.44309 1.75 10.2095 1.75 10.9999C1.75 11.4293 1.77921 11.8515 1.83567 12.2647C3.74948 12.4345 5.25 14.042 5.25 15.9999C5.25 16.6668 5.0754 17.294 4.76971 17.8371C5.62645 18.6183 6.63002 19.2403 7.73362 19.6569C8.37706 18.5189 9.59804 17.7499 11 17.7499C12.402 17.7499 13.6229 18.5189 14.2664 19.6569C15.37 19.2403 16.3735 18.6183 17.2303 17.8371C16.9246 17.294 16.75 16.6668 16.75 15.9999C16.75 14.042 18.2505 12.4345 20.1643 12.2647C20.2208 11.8515 20.25 11.4293 20.25 10.9999C20.25 10.2095 20.151 9.44309 19.9651 8.71204C18.1474 8.45243 16.75 6.88935 16.75 4.99991C16.75 4.61415 16.8085 4.24114 16.9172 3.88982C16.0618 3.17701 15.0762 2.61605 14.0018 2.24766C13.3184 3.15887 12.2287 3.74991 11 3.74991C9.77133 3.74991 8.68158 3.15887 7.99819 2.24766C6.92382 2.61605 5.93823 3.17701 5.08277 3.88982Z"/>
                                    <path d="M6.75 10.9999C6.75 8.65269 8.65279 6.74991 11 6.74991C13.3472 6.74991 15.25 8.65269 15.25 10.9999C15.25 13.3471 13.3472 15.2499 11 15.2499C8.65279 15.2499 6.75 13.3471 6.75 10.9999ZM11 8.24991C9.48121 8.24991 8.25 9.48112 8.25 10.9999C8.25 12.5187 9.48121 13.7499 11 13.7499C12.5188 13.7499 13.75 12.5187 13.75 10.9999C13.75 9.48112 12.5188 8.24991 11 8.24991Z" />
                                </svg>

                                </span>
                                <h6>Настройки</h6>
                            </div>
                        </div>

                    </div>
                    <div className={style.right}>
                    {activeComponent === 'account' && <ProfileAccont account={account} />}
                        {activeComponent === 'orders' && <ProfileOrders orders={orders}/>}
                        {activeComponent === 'bonuses' && <ProfileSales />}
                        {activeComponent === 'payments' && <ProfilePay />}
                        {activeComponent === 'settings' && <ProfileSettings account={account}/>}
                    </div>
                </div>
            </div>
                <Footer />
        </div>
    )
}

export default Profile