import style from './../../../components/Client/mainstyle.module.css'

const ProfilePay = () => {
    return (
        <div className={style.item}>
            <h4>Информация по оплате</h4>
            <span className={style.line}></span>
            <div className={style.child}>
                <p>Оплаты не проводились.</p>

            </div>
        </div>
    )

}
export default ProfilePay