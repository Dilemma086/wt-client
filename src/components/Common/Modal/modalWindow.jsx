import style from  './modalWindow.module.css'

const ModalWindow = ({ item, onClose }) => {
    return (
        <div className={`${style.modalWindow} ${item ? style.visible : ''}`}>
            
                <div className={style.closeModal}><span  onClick={onClose}>&times;</span></div>
                < div className={style.rowModal}>
                    <div className={style.imgBlock}>
                        <img src={item.image ? item.image : '/uploads/no-image.png'} alt={item.image}/>
                    </div>
                    <div className={style.detailsSEction}>
                        <h4>{item.name}</h4>
                        <div className={style.productInfo}>
                            <div className={style.rowProductInfo}>
                                <div  className={style.titelInfo}>
                                    <span className={style.icon}>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 652.42 980.42" width="24px" height="24px">
                                        
                                            
                                                <path fill="#5e5d72" d="M326.21,192.6V0c175.21,0,315,142.56,325.29,298.76,9.82,149.14-61.72,216-84.63,265.56L326.21,980.42V449.76h1.52c67,0,121.33-54.95,121.33-122.73S394.74,204.32,327.73,204.32h-1.52V192.6"/>
                                                <path fill="#5e5d72" d="M326.21,192.6V0C151,0,11.2,142.56.92,298.76c-9.82,149.14,61.72,216,84.63,265.56l240.66,416.1V449.76h-1.52c-67,0-121.33-54.95-121.33-122.73s54.32-122.72,121.33-122.72h1.52V192.6"/>
                                                           
                                                   
                                    </svg>
                                    </span>
                                    <span className={style.name}>Улица</span>
                                </div>
                                <div  className={style.descInfo}>
                                    {item.street}
                                </div>
                            </div>
                            <div className={style.rowProductInfo}>
                                <div  className={style.titelInfo}>
                                    <span className={style.icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    
                                        <path fill="#5e5d72" d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"/>
                                    </svg>
                                    </span>
                                    <span className={style.name}>Дом</span>
                                </div>
                                <div  className={style.descInfo}>
                                    {item.dom}
                                </div>
                            </div>
                            <div className={style.rowProductInfo}>
                                <div  className={style.titelInfo}>
                                    <span className={style.icon}>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        xmlnsXlink="http://www.w3.org/1999/xlink" 
                                        version="1.1" 
                                        width="22px" 
                                        height="auto" 
                                        viewBox="337.5 232.3 125 85.9" 
                                        xmlSpace="preserve"
                                    >
                                        <polygon 
                                            fill="#5e5d72" 
                                            points="453.9,306.2 424.7,232.3 400,275.5 375.4,232.3 346.1,306.2 337.5,306.2 337.5,317.4 381.7,317.4 381.7,306.2 375.1,306.2 381.5,287.8 400,318.2 418.5,287.8 424.9,306.2 418.3,306.2 418.3,317.4 462.5,317.4 462.5,306.2"
                                        />
                                    </svg>
                                    </span>
                                    <span className={style.name}>Метро</span>
                                </div>
                                <div  className={style.descInfo}>
                                    {item.metro}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {item.map &&
                <div className={style.mapBlock}>
                    
                    <iframe
                        src={`https://yandex.com/map-widget/v1/-/${item.map}`}
                        title={item.map}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
               </div>
                }
                <div className={style.descrBlock}>
                    <h6>Описание</h6>
                    <div className={style.description}>
                        <p dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                    
                </div>
                
                
           
        </div>
    );
};
export default ModalWindow