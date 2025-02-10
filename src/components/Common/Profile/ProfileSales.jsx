import style from './../../../components/Client/mainstyle.module.css'

const ProfileSales = () => {
    return(
        <div className={style.item}>
            <h4>Информация по бонусам</h4>
            <span className={style.line}></span>
            <div className={style.child}>
                <p>Бонусы не начислены.</p>

            </div>
        </div>
    )
}
export default ProfileSales