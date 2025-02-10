import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import style from './footerstyle.module.css'

const Footer = () => {
    const currentCart = useSelector(state => state.cart.currentCart);
    return(
        <div className={style.footer}>
            <span className={style.footerLine} ></span>
           <div className={style.footerPadding}>
            <div className={style.footerLogo}>
                <span>
                <svg width="31" height="36" viewBox="0 0 31 36" fill="#222222" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.58464 1.33398C9.58464 0.643628 10.1443 0.0839844 10.8346 0.0839844H15.8346C16.525 0.0839844 17.0846 0.643628 17.0846 1.33398C17.0846 2.13646 18.0039 3.41732 20.0013 3.41732C21.9987 3.41732 22.918 2.13646 22.918 1.33398C22.918 0.643628 23.4776 0.0839844 24.168 0.0839844H29.168C29.8583 0.0839844 30.418 0.643628 30.418 1.33398V26.334C30.418 27.0243 29.8583 27.584 29.168 27.584H24.168C23.4776 27.584 22.918 27.0243 22.918 26.334C22.918 25.4536 22.0238 24.2507 20.0013 24.2507C19.3109 24.2507 18.7513 23.691 18.7513 23.0007C18.7513 22.3103 19.3109 21.7507 20.0013 21.7507C22.4868 21.7507 24.5971 23.0968 25.2267 25.084H27.918V2.58398H25.2148C24.5741 4.50751 22.4898 5.91732 20.0013 5.91732C17.5128 5.91732 15.4285 4.50751 14.7878 2.58398H12.0846V13.0007C12.0846 13.691 11.525 14.2507 10.8346 14.2507C10.1443 14.2507 9.58464 13.691 9.58464 13.0007V1.33398Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.417969 9.66732C0.417969 8.97696 0.977613 8.41732 1.66797 8.41732H6.66797C7.35833 8.41732 7.91797 8.97696 7.91797 9.66732C7.91797 10.4698 8.83727 11.7507 10.8346 11.7507C12.832 11.7507 13.7513 10.4698 13.7513 9.66732C13.7513 8.97696 14.3109 8.41732 15.0013 8.41732H20.0013C20.6917 8.41732 21.2513 8.97696 21.2513 9.66732V34.6673C21.2513 35.3577 20.6917 35.9173 20.0013 35.9173H15.0013C14.3109 35.9173 13.7513 35.3577 13.7513 34.6673C13.7513 33.7869 12.8571 32.584 10.8346 32.584C8.81213 32.584 7.91797 33.7869 7.91797 34.6673C7.91797 35.3577 7.35833 35.9173 6.66797 35.9173H1.66797C0.977613 35.9173 0.417969 35.3577 0.417969 34.6673V9.66732ZM2.91797 10.9173V33.4173H5.6092C6.23879 31.4302 8.34915 30.084 10.8346 30.084C13.3201 30.084 15.4305 31.4302 16.0601 33.4173H18.7513V10.9173H16.0482C15.4074 12.8408 13.3232 14.2507 10.8346 14.2507C8.3461 14.2507 6.26187 12.8408 5.62111 10.9173H2.91797Z" />
                    <path d="M6.66797 19.6673C7.58844 19.6673 8.33464 18.9211 8.33464 18.0007C8.33464 17.0802 7.58844 16.334 6.66797 16.334C5.74749 16.334 5.0013 17.0802 5.0013 18.0007C5.0013 18.9211 5.74749 19.6673 6.66797 19.6673Z" />
                    <path d="M10.8346 19.6673C11.7551 19.6673 12.5013 18.9211 12.5013 18.0007C12.5013 17.0802 11.7551 16.334 10.8346 16.334C9.91416 16.334 9.16797 17.0802 9.16797 18.0007C9.16797 18.9211 9.91416 19.6673 10.8346 19.6673Z"/>
                    <path d="M15.0013 19.6673C15.9218 19.6673 16.668 18.9211 16.668 18.0007C16.668 17.0802 15.9218 16.334 15.0013 16.334C14.0808 16.334 13.3346 17.0802 13.3346 18.0007C13.3346 18.9211 14.0808 19.6673 15.0013 19.6673Z" />
                </svg>
                </span>
                <h4><Link to="/">Волна билетов</Link></h4>
            </div>
            <div className={style.footerInfo}>
                <div className={style.left}>
                    <h4>Информация о нас.</h4>
                    <p>Волна билетов — глобальная платформа для продажи билетов в прямом эфире.
                    Опыт, который позволяет каждому создавать, делиться,
                    находить и посещать мероприятия, которые подогревают их страсть 
                    и обогатить свою жизнь.</p>
                    <h5>Контакты</h5>
                    <h6>wavetickets@gmail.com</h6>
                </div>
                <div className={style.right}>
                    <div className={style.column}>
                        <h4>БИЛЕТЫ</h4>
                        <ul>
                            <li><Link to='/'>О нас</Link></li>
                            <li><Link to='/'>Контакты</Link></li>
                            <li><Link to='/'>Частые вопросы</Link></li>
                        </ul>
                    </div>
                    <div className={style.column}>
                        <h4>ПОМОЩЬ</h4>
                        <ul>
                            <li><Link to='/'>Билеты на концерты</Link></li>
                            <li><Link to='/'>Поддержка аккаунта</Link></li>
                            <li><Link to='/'>Условия использования</Link></li>
                        </ul>
                    </div>
                    <div className={style.column}>
                        <h4>ИНФОРМАЦИЯ</h4>
                        <ul>
                            <li><Link to='/'>Условия</Link></li>
                            <li><Link to='/'>Политика конфиденциальности</Link></li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <span className={style.footerLine2x} ></span>
            <div className={style.footerEmail}>
                <div className={style.left}>
                    <p>Присоединяйтесь к нашему списку рассылки, чтобы оставаться в курсе наших
                    событий и концертов...</p>
                </div>
                <div className={style.right}>
                    <input type="email" placeholder='Введите Ваш E-mail' />
                    <span className={style.mail}>
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="#242B35" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0429688 1.25C0.0429688 0.904822 0.322791 0.625 0.667969 0.625H17.3346C17.6798 0.625 17.9596 0.904822 17.9596 1.25V13.75C17.9596 14.0952 17.6798 14.375 17.3346 14.375H0.667969C0.322791 14.375 0.0429688 14.0952 0.0429688 13.75V1.25ZM1.29297 1.875V13.125H16.7096V1.875H1.29297Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.168006 0.875037C0.375112 0.598894 0.766863 0.54293 1.04301 0.750037L9.00134 6.71879L16.9597 0.750037C17.2358 0.54293 17.6276 0.598894 17.8347 0.875037C18.0418 1.15118 17.9858 1.54293 17.7097 1.75004L9.37634 8.00004C9.15412 8.1667 8.84856 8.1667 8.62634 8.00004L0.293006 1.75004C0.0168632 1.54293 -0.0391013 1.15118 0.168006 0.875037Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0429688 1.25C0.0429688 0.904822 0.322791 0.625 0.667969 0.625H9.0013C9.34648 0.625 9.6263 0.904822 9.6263 1.25C9.6263 1.59518 9.34648 1.875 9.0013 1.875H1.29297V7.5C1.29297 7.84518 1.01315 8.125 0.667969 8.125C0.322791 8.125 0.0429688 7.84518 0.0429688 7.5V1.25Z"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.3763 1.25C8.3763 0.904822 8.65612 0.625 9.0013 0.625H17.3346C17.6798 0.625 17.9596 0.904822 17.9596 1.25V7.5C17.9596 7.84518 17.6798 8.125 17.3346 8.125C16.9895 8.125 16.7096 7.84518 16.7096 7.5V1.875H9.0013C8.65612 1.875 8.3763 1.59518 8.3763 1.25Z" />
                        </svg>
                    </span>
                    <span className={style.arrow}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="#242B35" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 12.5042C5.25 12.0899 5.58579 11.7542 6 11.7542H18C18.4142 11.7542 18.75 12.0899 18.75 12.5042C18.75 12.9184 18.4142 13.2542 18 13.2542H6C5.58579 13.2542 5.25 12.9184 5.25 12.5042Z" />
                            <path d="M11.4697 5.96967C11.7626 5.67678 12.2374 5.67678 12.5303 5.96967L18.5303 11.9697C18.8232 12.2626 18.8232 12.7374 18.5303 13.0303L12.5303 19.0303C12.2374 19.3232 11.7626 19.3232 11.4697 19.0303C11.1768 18.7374 11.1768 18.2626 11.4697 17.9697L16.9393 12.5L11.4697 7.03033C11.1768 6.73744 11.1768 6.26256 11.4697 5.96967Z" />
                        </svg>
                    </span>
                 </div>
                
            </div>
            <span className={style.footerLine2x} ></span>
            <div className={style.footersoc}>
                <div>@2025</div>
                <div><Link to='/'>Условия</Link>
                    <Link to='/'>Конфиденциальность</Link>
                    <Link to='/'>Coockies </Link>
                </div>
                <div>
                    <span>
                    <Link to='/'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill="#1877F2"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.68745 11.3049C9.3718 9.8937 11.1618 8.96333 12.0574 8.51383C14.6146 7.23039 15.146 7.00744 15.4923 7.00008C15.5685 6.99846 15.7388 7.02124 15.8491 7.12926C15.9423 7.22047 15.9679 7.34368 15.9802 7.43016C15.9924 7.51664 16.0077 7.71364 15.9956 7.86757C15.857 9.6245 15.2574 13.8881 14.9523 15.8559C14.8232 16.6885 14.5691 16.9677 14.323 16.995C13.7883 17.0544 13.3822 16.5686 12.8643 16.159C12.0539 15.5179 11.5961 15.1189 10.8094 14.4933C9.90027 13.7704 10.4896 13.3731 11.0077 12.7237C11.1433 12.5538 13.4994 9.96792 13.545 9.73334C13.5507 9.704 13.556 9.59464 13.5021 9.5369C13.4483 9.47915 13.3688 9.4989 13.3115 9.5146C13.2302 9.53687 11.9355 10.5695 9.42743 12.6124C9.05994 12.9169 8.72708 13.0652 8.42885 13.0574C8.10007 13.0489 7.46764 12.8331 6.99749 12.6487C6.42083 12.4225 5.96251 12.3029 6.00242 11.9188C6.02321 11.7187 6.25155 11.5141 6.68745 11.3049Z" fill="white"/>
                    </svg>
                    </Link>
                    </span>
                </div>
            </div>
            </div>
            <div className={style.footerbotton}>
                <span className={style.left}>
                <svg width="211" height="78" viewBox="0 0 211 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.11">
                    <rect y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="12" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="24" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="36" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="48" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="60" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="72" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="84" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="96" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="108" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="120" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="132" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="144" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="156" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="168" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="180" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="192" y="17" width="7" height="56" rx="3.5" fill="#5C5FCC"/>
                    <rect x="205" width="6" height="90" rx="3" fill="#8587D9"/>
                    </g>
                </svg>
                </span>
                <span className={style.right}>
                <svg width="211" height="78" viewBox="0 0 211 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.11">
                    <rect y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="12" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="24" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="36" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="48" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="60" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="72" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="84" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="96" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="108" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="120" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="132" y="17" width="6" height="56" rx="3" fill="#C2C3EC"/>
                    <rect x="144" width="6" height="90" rx="3" fill="#ADAFE5"/>
                    <rect x="156" width="6" height="90" rx="3" fill="#8587D9"/>
                    <rect x="168" y="17" width="6" height="56" rx="3" fill="#5C5FCC"/>
                    <rect x="180" y="29" width="6" height="32" rx="3" fill="#EBEBF9"/>
                    <rect x="192" y="17" width="7" height="56" rx="3.5" fill="#5C5FCC"/>
                    <rect x="205" width="6" height="90" rx="3" fill="#8587D9"/>
                    </g>
                </svg>
                </span>
            </div>
            <div className={style.quickNavigation}>
                <Link to='/'>
                    <span>
                    <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" ><path d="M29.707,15.793l-13-13c-0.391-0.391-1.023-0.391-1.414,0l-13,13c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0  L16,4.914l8.014,8.014C24.013,12.953,24,12.975,24,13v15H8V18c0-0.553-0.448-1-1-1s-1,0.447-1,1v11c0,0.553,0.448,1,1,1h18  c0.553,0,1-0.447,1-1V14.914l2.293,2.293C28.488,17.402,28.744,17.5,29,17.5s0.512-0.098,0.707-0.293  C30.098,16.816,30.098,16.184,29.707,15.793z"/></svg>
                    </span>
                    <p>Главная</p>
                </Link>
                <Link to='/cart'>
                    <span><svg width="38" height="31" viewBox="0 0 38 34" fill="#222222" xmlns="http://www.w3.org/2000/svg"><path d="M0.368028 1.46981C0.573753 1.03057 1.01499 0.75 1.50002 0.75H4.41668C4.99027 0.75 5.49025 1.14037 5.62936 1.69683L6.64265 5.75H37.2677L32.476 24.9167H8.85738L4.52335 7.58057L0.539739 2.80023C0.229235 2.42763 0.162304 1.90904 0.368028 1.46981ZM7.26765 8.25L10.8093 22.4167H30.524L34.0657 8.25H7.26765ZM9.83335 28.25C9.14299 28.25 8.58335 28.8096 8.58335 29.5C8.58335 30.1904 9.14299 30.75 9.83335 30.75C10.5237 30.75 11.0833 30.1904 11.0833 29.5C11.0833 28.8096 10.5237 28.25 9.83335 28.25ZM6.08335 29.5C6.08335 27.4289 7.76228 25.75 9.83335 25.75C11.9044 25.75 13.5833 27.4289 13.5833 29.5C13.5833 31.5711 11.9044 33.25 9.83335 33.25C7.76228 33.25 6.08335 31.5711 6.08335 29.5ZM31.5 28.25C30.8097 28.25 30.25 28.8096 30.25 29.5C30.25 30.1904 30.8097 30.75 31.5 30.75C32.1904 30.75 32.75 30.1904 32.75 29.5C32.75 28.8096 32.1904 28.25 31.5 28.25ZM27.75 29.5C27.75 27.4289 29.4289 25.75 31.5 25.75C33.5711 25.75 35.25 27.4289 35.25 29.5C35.25 31.5711 33.5711 33.25 31.5 33.25C29.4289 33.25 27.75 31.5711 27.75 29.5Z"></path></svg></span>
                    <p>Корзина</p>
                    {currentCart > 0 ? <span className={style.ButMenuCurrentCart}>{currentCart}</span> : ''}
                </Link>
                <Link to='/orders'>
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 1"
                            id="Layer_1"
                            viewBox="0 0 64 64"
                        >
                            <title />
                            <path
                                d="M46.922,15H41v1.141a.86.86,0,0,1-.859.859H24.859A.86.86,0,0,1,24,16.141V15H18.078A2.052,2.052,0,0,0,16,17.026V51.974A2.052,2.052,0,0,0,18.078,54H46.922A2.052,2.052,0,0,0,49,51.974V17.026A2.052,2.052,0,0,0,46.922,15Z"
                                style={{ fill: 'none', stroke: '#000', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <path
                                d="M39.984,13H35v-.372a2.529,2.529,0,0,0-1.88-2.488A2.491,2.491,0,0,0,30,12.511V13H25.016A1.016,1.016,0,0,0,24,14.016v1.968A1.016,1.016,0,0,0,25.016,17H39.984A1.016,1.016,0,0,0,41,15.984V14.016A1.016,1.016,0,0,0,39.984,13Z"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <path
                                d="M25,24H43"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <polyline
                                points="19 23 20 24 23 20"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <path
                                d="M25,32H43"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <polyline
                                points="19 31 20 32 23 28"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <path
                                d="M25,40H43"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <polyline
                                points="19 39 20 40 23 36"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <path
                                d="M25,48H43"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                            <polyline
                                points="19 47 20 48 23 44"
                                style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '2px' }}
                            />
                        </svg>
                    </span>
                    <p>Заказы</p>
                </Link>
                <Link to='/profile'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1" viewBox="0 0 128 128" ><g>
                        <path d="M30,49c0,18.7,15.3,34,34,34s34-15.3,34-34S82.7,15,64,15S30,30.3,30,49z M90,49c0,14.3-11.7,26-26,26S38,63.3,38,49   s11.7-26,26-26S90,34.7,90,49z"/>
                        <path d="M24.4,119.4C35,108.8,49,103,64,103s29,5.8,39.6,16.4l5.7-5.7C97.2,101.7,81.1,95,64,95s-33.2,6.7-45.3,18.7L24.4,119.4z"/></g>
                        </svg>
                    </span>
                    <p>Профиль</p>
                </Link>
            </div>
        </div>
    )
}
export default Footer