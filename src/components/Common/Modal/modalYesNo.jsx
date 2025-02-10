import React from 'react';
import style from './modalWindow.module.css';

const ModalYesNo = ({ handleConfirm, onClose, modalYesNo }) => {
    return (
        <div className={`${style.modalWindow} ${modalYesNo ? style.visible : ''}`}>
            <div className={style.modalBlockYN}>
                <h6>Подтверждаете действие?</h6>
                <div className={style.rowBtnYN}>
                    <button onClick={onClose}>Нет</button>
                    <button onClick={() => { handleConfirm(); onClose(); }}>Да</button>
                </div>
            </div>
        </div>
    );
};

export default ModalYesNo;