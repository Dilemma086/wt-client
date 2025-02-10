import style from  './DashBoardEvents.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const DashBoardEventView = ({ item, onClose, acters, locations, categories }) => {
    const images = item.images.split(',')
    
    return (
        <div className={`${style.acterView} ${item ? style.visible : ''}`}>
            
                <div className={style.closeModal}><span  onClick={onClose}>&times;</span></div>
                <div className={style.rowImage}>
                    <Carousel>
                        {images.map(image => (
                            <div className={style.imgBlock}>
                                <img src={image} alt={image}/>                  
                            </div>
                        ))
                        
                        }
                    </Carousel>
                </div> 
                <div className={style.nameBlock}>
                        <h4>{item.name}</h4>
                </div>
                <div className={style.actorBlock}>
                    <h6>Творческая группа</h6>
                    <div className={style.actors}>
                        {item.acters && item.acters.split(',').map((acterId) => {
                            const acter = acters.find((acter) => acter.id === parseInt(acterId));
                            return (
                                <div className={style.actor} key={acterId}>
                                    <span>
                                        <img src={acter.image} alt={acter.secondname}/>
                                    </span>
                                    <p key={acterId}>{`${acter.fierstname} ${acter.secondname}`}</p>
                                </div>
                            );
                        })}
                                        
                    </div>
                </div> 
                <div className={style.locat_category} >
                    {item.locations && 
                        <div>
                            <p>Место проведение</p>
                            <ul>
                                {item.locations.split(',').map(locatId => {
                                    const locat = locations.find((locat) => locat.id === parseInt(locatId))
                                        return <li key={locatId}>{locat.name}</li>    
                                    }    
                                )}
                            </ul>
                        </div>
                    }
                    {item.category && 
                        <div>
                            <p>Жанр</p>
                            <ul>
                                {item.category.split(',').map(categoryId => {
                                    const locat = categories.find((category) => category.id === parseInt(categoryId))
                                        return <li key={categoryId}>{locat.name}</li>    
                                    }    
                                )}
                            </ul>
                        </div>
                    }
                </div>
                <div className={style.descrBlock}>
                    
                    <div className={style.actordescription}>
                        <h6>Описание</h6>
                        <p dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                    
                </div>
                
                
           
        </div>
    );
};
export default DashBoardEventView