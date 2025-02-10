import style from  './DashBoardActers.module.css'

const DashBoardActerView = ({ item, onClose }) => {
    return (
        <div className={`${style.acterView} ${item ? style.visible : ''}`}>
            
                <div className={style.closeModal}><span  onClick={onClose}>&times;</span></div>
                <div className={style.rowImage}>
                    
                    <div className={style.imgBlock}>
                        <img src={item.image ? item.image : '/uploads/no-image.png'} alt={item.image}/>                  
                    </div>
                    
                </div> 
                <div className={style.nameBlock}>
                        <h4>{item.fierstname} {item.secondname}</h4>
                    </div>
                        
                
                <div className={style.descrBlock}>
                    
                    <div className={style.description}>
                        <h6>Описание</h6>
                        <p dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                    
                </div>
                
                
           
        </div>
    );
};
export default DashBoardActerView