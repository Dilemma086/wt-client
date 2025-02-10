import style from './../Dashboard.module.css'
import { format } from "date-fns";

const DashBoardTicketView = ({ item,  events,  categories, locations, onClose }) => {
        console.log(categories)
    return (
        <div className={`${style.blockView} ${item ? style.visible : ''}`}>
            <div className={style.closeModal}><span  onClick={onClose}>&times;</span></div>
            <div className={style.rowImage}>
                <div className={style.imgBlock}>
                <img src={events.find((event) => event.Id === item.eventId)?.images.split(',')[0] || '/uploads/no-image.png'} alt={item.image}/>               
                </div>
            </div> 
            <div className={style.nameBlock}>
                <h4>{events.find((event) => event.Id === item.eventId)?.name}</h4>
            </div>
            <div className={style.locat_category}>
                {item.locatId && (
                    <div>
                        <p>Место проведения</p>
                        <ul>
                            {<li key={item.locatId}>{locations.find(locat => locat.id === item.locatId).name}</li>}
                        </ul>
                    </div>
                )}
                {item.date && (
                    <div>
                        <p>Дата</p>
                        <ul>
                            {<li key={item.locatId}>{format(new Date(item.date), "dd.MM.yyyy")}</li>}
                        </ul>
                    </div>
                )}
                {item.ticketCategoriesId && (
                    <div>
                        <p>Категория места</p>
                        <ul>
                            {item.ticketCategoriesId.split(',').map((id)=>{
                                const category = categories.find((category)=>category.id === parseInt(id))
                                return (
                                    <li key={id}>{category.name}</li>
                                )
                            })}
                        </ul>
                    </div>
                )}
                {item.price && (
                    <div>
                        <p>Стоимость</p>
                        <ul>
                            {<li key={item.price}>{item.price} руб</li>}
                        </ul>
                    </div>
                )}

            </div>

            <div className={style.descrBlock}>
                <div className={style.description}>
                    <h6>Описание</h6>
                    <p dangerouslySetInnerHTML={{ __html: events.find((event) => event.Id === item.eventId)?.description }} />
                </div>
            </div>
        </div>
    );
};
export default DashBoardTicketView