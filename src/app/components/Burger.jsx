import style from './Burger.module.scss'
import React from "react";

const Burger = ({open, onClick}) => {
    return (
            <nav className={open ? [style.burger__wrapper, style.active].join(' ') : style.burger__wrapper}>
                <div className={open ? [style.burger, style.active].join(' ') : style.burger} onClick={onClick}>
                    <span className={open ? [style.burger__bar, style.active].join(' ') : style.burger__bar}></span>
                    <span className={open ? [style.burger__bar, style.active].join(' ') : style.burger__bar}></span>
                    <span className={open ? [style.burger__bar, style.active].join(' ') : style.burger__bar}></span>
                </div>
            </nav>
    );
};

export default Burger;
