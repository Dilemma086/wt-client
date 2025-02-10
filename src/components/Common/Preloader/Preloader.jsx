import style from './Preloader.module.css'
import preloader from './loading.gif'

export const Preloader = () => {
    
    return( 
    <div className={style.preload}>
        <img src={preloader} alt="preloader"/> 
    </div>
    )
}