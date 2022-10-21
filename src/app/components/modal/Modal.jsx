import React from 'react';

import {ReactComponent as IconClose} from '../../assets/img/action/delete.svg';

import style from './Modal.module.scss';

const Modal = ({children, visible, handleVisible}) => {
    const rootClasses = () => {
        return visible ? [style.modal, style.active].join(' ') : style.modal;
    };

    return (
        <div className={rootClasses()} onClick={handleVisible}>
            <div className={style.modal__content} onClick={(e) => e.stopPropagation()}>
                    {children}
                <button
                    className={style.modal__btn}
                    onClick={handleVisible}
                >
                    <IconClose className={style.modal__btn_close}/>
                </button>
            </div>
        </div>
    );
};
export default Modal;