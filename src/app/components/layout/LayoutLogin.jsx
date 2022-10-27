import React from 'react';
import style from './LayoutLogin.module.scss';
import loginImg from '../../assets/img/layout/login.jpg';
import Login from "../pages/login/Login";

const LayoutLogin = ({children}) => {
    return (
        <div className={style.layout__wrapper}>
            {children}
            <div className={style.layout__img}>
                <img src={loginImg} alt="Justice CRM"/>
            </div>
        </div>
    );
};

export default LayoutLogin;