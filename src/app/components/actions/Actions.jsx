import React from 'react';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as IconEdit} from '../../assets/img/action/edit.svg';
import {ReactComponent as IconDelete} from '../../assets/img/action/delete.svg';

import style from './Actions.module.scss';


const Actions = ({element, handleDelete, onCurrentProduct, onVisibleEdit}) => {

    const navigate = useNavigate();

    const handleClickChange = () => {
        onCurrentProduct(element);
        onVisibleEdit();
    }
    const handleClickSell = (element) => {
        navigate('/', {
                state: {
                    id: element.id,
                    remains: element.remains

            }
        })
    }
    return (
        <div className={style.actions}>
            <button
                className={style.action}
                onClick={() => handleClickSell(element)}
            >
                Sell
            </button>
            <button
                className={style.action}
                onClick={handleClickChange}
            >
                <IconEdit />
            </button>
            <button
                className={style.delete}
                onClick={() => handleDelete(element.id)}
            >
                <IconDelete />
            </button>
        </div>
    );
};

export default Actions;