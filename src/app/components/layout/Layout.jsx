import React, {useState} from 'react';

import Menu from "../menu/Menu";
import Modal from "../modal/Modal";
import ProductFormAdd from "../form/productForm/ProductFormAdd";
import {ReactComponent as IconBtn} from '../../assets/img/layout/btn.svg';


import style from './Layout.module.scss';
import {useModal} from "../../hooks/useModal";
import Burger from "../Burger";


const Layout = ({children, title, subtitle}) => {
   const {visible, setVisible} = useModal();
   const [openBurger, setOpenBurger] = useState(false);

   const handleOpen = () => {
       setVisible({create: true});
   };
   const handleClose = () => {
       setVisible({create: false});
   }
   const handleOpenBurger = () => {
       setOpenBurger(!openBurger);
   }
    return (
        <div className={style.layout__wrapper}>
            <Menu open={openBurger}/>
            <div className={openBurger ? [style.layout, style.active].join(' ') : style.layout}>
                <Burger
                    open={openBurger}
                    onClick={handleOpenBurger}
                />
                <header className={style.layout__header}>
                    <div>
                        <h1 className={style.layout__title}>{title}</h1>
                        <p className={style.layout__subtitle}>{subtitle}</p>
                    </div>
                    <button
                        className={style.layout__btn}
                        onClick={handleOpen}
                    >
                        <IconBtn className={style.layout__btn_add}/>
                        <span>Create a product</span>
                    </button>
                </header>
                <section className={style.layout__page}>
                    {children}
                </section>
            </div>
            <Modal
                visible={visible.create}
                handleVisible={handleClose}
            >
                <ProductFormAdd
                    handleVisible={handleClose}
                />
            </Modal>
        </div>
    );
};

export default Layout;