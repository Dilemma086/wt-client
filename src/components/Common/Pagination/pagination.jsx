import { useDispatch, useSelector } from "react-redux";
import style from './pagination.module.css'
import {paginatDashBoardThunkCreator} from './../../../redux/dashboard/settingDBoard-reducer'

const Pagination = ({ totalItem, pageSize }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.settingDB.paginat);

    let pageCount = Math.ceil(totalItem / pageSize);
    let pages = [];

    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    const onPageChange = (e) => {
        const page = parseInt(e.target.dataset.page, 10);
        dispatch(paginatDashBoardThunkCreator(page));
    };

    const onNextPage = () => {
        if (currentPage < pageCount) {
            const nextPage = currentPage + 1;
            dispatch(paginatDashBoardThunkCreator(nextPage));
        }
    };

    const onPrevPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            dispatch(paginatDashBoardThunkCreator(prevPage));
        }
    };

    const onFirstPage = () => {
        if (currentPage !== 1) {
            dispatch(paginatDashBoardThunkCreator(1));
        }
    };

    const onLastPage = () => {
        if (currentPage !== pageCount) {
            dispatch(paginatDashBoardThunkCreator(pageCount));
        }
    }
    
    return(
        <div className={style.paginatBlock}>
            <p className={style.pPagination}>
                Показано <span>{totalItem > 10 ? 10 : totalItem}</span> из <span>{totalItem}</span>
            </p>
            <ul className={style.ulPagination}>
                <li>
                    <button className={`${style.arrowPagination} ${currentPage !== 1 ?  style.active : ''}`} onClick={onFirstPage}>
                        <svg className={style.svgIcon} >
                            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                        </svg>
                    </button>
                </li>
                <li>
                    <button className={`${style.arrowPagination} ${currentPage !== 1 ?  style.active : ''}`} onClick={onPrevPage}>
                        <svg className={style.svgIcon}>
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
                        </svg>
                    </button>
                </li>
                <li>
                    {pages.map((p) => (
                        <button 
                            className={`${style.paginationItem} ${currentPage === p ? style.active : ''}`} 
                            key={p} 
                            data-page={p} 
                            onClick={onPageChange}
                        >
                            {p}
                        </button>
                    ))}
                </li>
                <li>
                    <button className={`${style.arrowPagination} ${currentPage === 1 ?  style.active : ''}`} onClick={onNextPage}>
                        <svg className={style.svgIcon} >
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                        </svg>
                    </button>
                    <button className={`${style.arrowPagination} ${currentPage === 1 ?  style.active : ''}`} onClick={onLastPage}>
                        <svg className={style.svgIcon} >
                            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>

    )
}

export default Pagination