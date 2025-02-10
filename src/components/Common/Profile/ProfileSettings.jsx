import style from './../../../components/Client/mainstyle.module.css'

const ProfileSettings = (props) => {
    return(
        <div className={style.item}>
            <h4>Настройки аккаунта</h4>
            <span className={style.line}></span>
            <div className={style.settinglock}>
                <div className={style.item}>
                    <h4>Полное имя</h4>
                    <div className={style.info}>
                       <p>{props.account.firstname} {props.account.secondname}</p> 
                       <span>
                       <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="32" height="32" rx="16" fill="#EBEBF9"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7908 9.44723C19.986 9.25197 20.3026 9.25197 20.4979 9.44723L23.3263 12.2756C23.4201 12.3694 23.4728 12.4966 23.4728 12.6292C23.4728 12.7618 23.4201 12.889 23.3263 12.9828L12.9554 23.3537C12.8617 23.4474 12.7345 23.5001 12.6019 23.5001L9.77351 23.5C9.49738 23.5 9.27353 23.2762 9.27352 23.0001L9.27344 20.1717C9.27343 20.0391 9.32611 19.9119 9.41988 19.8181L19.7908 9.44723ZM20.1443 10.5079L10.2734 20.3788L10.2735 22.5L12.3948 22.5001L22.2657 12.6292L20.1443 10.5079Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9622 12.2756C17.1575 12.0803 17.474 12.0803 17.6693 12.2756L20.4977 15.104C20.693 15.2993 20.693 15.6159 20.4977 15.8111C20.3025 16.0064 19.9859 16.0064 19.7906 15.8111L16.9622 12.9827C16.7669 12.7874 16.7669 12.4709 16.9622 12.2756Z" fill="#222222"/>
                        </svg>
                       </span>
                    </div>
                </div>
                <div className={style.item}>
                    <h4>E-mail адрес</h4>
                    <div className={style.info}>
                       <p>{props.account.firstname} {props.account.secondname}</p> 
                       <span>
                       <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="32" height="32" rx="16" fill="#EBEBF9"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7908 9.44723C19.986 9.25197 20.3026 9.25197 20.4979 9.44723L23.3263 12.2756C23.4201 12.3694 23.4728 12.4966 23.4728 12.6292C23.4728 12.7618 23.4201 12.889 23.3263 12.9828L12.9554 23.3537C12.8617 23.4474 12.7345 23.5001 12.6019 23.5001L9.77351 23.5C9.49738 23.5 9.27353 23.2762 9.27352 23.0001L9.27344 20.1717C9.27343 20.0391 9.32611 19.9119 9.41988 19.8181L19.7908 9.44723ZM20.1443 10.5079L10.2734 20.3788L10.2735 22.5L12.3948 22.5001L22.2657 12.6292L20.1443 10.5079Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9622 12.2756C17.1575 12.0803 17.474 12.0803 17.6693 12.2756L20.4977 15.104C20.693 15.2993 20.693 15.6159 20.4977 15.8111C20.3025 16.0064 19.9859 16.0064 19.7906 15.8111L16.9622 12.9827C16.7669 12.7874 16.7669 12.4709 16.9622 12.2756Z" fill="#222222"/>
                        </svg>
                       </span>
                    </div>
                </div>
                <div className={style.item}>
                    <h4>Пароль</h4>
                    <div className={style.info}>
                       <p><input 
                            type="password" 
                            id="password" 
                            value="password" 
                             
                        /></p> 
                       <span>
                       <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="32" height="32" rx="16" fill="#EBEBF9"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7908 9.44723C19.986 9.25197 20.3026 9.25197 20.4979 9.44723L23.3263 12.2756C23.4201 12.3694 23.4728 12.4966 23.4728 12.6292C23.4728 12.7618 23.4201 12.889 23.3263 12.9828L12.9554 23.3537C12.8617 23.4474 12.7345 23.5001 12.6019 23.5001L9.77351 23.5C9.49738 23.5 9.27353 23.2762 9.27352 23.0001L9.27344 20.1717C9.27343 20.0391 9.32611 19.9119 9.41988 19.8181L19.7908 9.44723ZM20.1443 10.5079L10.2734 20.3788L10.2735 22.5L12.3948 22.5001L22.2657 12.6292L20.1443 10.5079Z" fill="#222222"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9622 12.2756C17.1575 12.0803 17.474 12.0803 17.6693 12.2756L20.4977 15.104C20.693 15.2993 20.693 15.6159 20.4977 15.8111C20.3025 16.0064 19.9859 16.0064 19.7906 15.8111L16.9622 12.9827C16.7669 12.7874 16.7669 12.4709 16.9622 12.2756Z" fill="#222222"/>
                        </svg>
                       </span>
                    </div>
                </div>
                <div className={style.item}>
                    <button>Удалить аккаунт</button>
                </div>
            </div>
        </div>
    )
}
export default ProfileSettings