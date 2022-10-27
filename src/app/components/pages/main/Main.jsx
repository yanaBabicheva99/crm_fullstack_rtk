import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SellForm from '../../form/productForm/SellForm';
import Modal from '../../modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { Pie } from '../../Charts/Pie/Pie';

import style from './Main.module.scss'
import { Bar } from '../../Charts/Bar/Bar';
import { Line } from '../../Charts/Line/Line';
import { useProducts } from '../../../hooks/useProducts';
import { Drawer, useMediaQuery } from '@mui/material';
import styleTitle from '../../../style/title/Title.module.scss'
import { usePie } from '../../Charts/Pie/usePie';

const Main = () => {
  const lacationState = useLocation();
  const { visible, setVisible } = useModal();
  const { products, loading } = useProducts();


  const soldProducts = products.length ? products.filter(product => product.quantity) : [];

  const { id, remains } = lacationState.state || { id: null, remains: null };
  const isMobile = useMediaQuery('(max-width:599px)');

  const handleOpen = () => {
    setVisible({ sell: true });
  };
  const handleClose = () => {
    setVisible({ sell: false });
  };

  useEffect(() => {
    if (id !== null) {
      handleOpen();
    }
  }, []);

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (<>
      {soldProducts.length === 0
        ? <div className={styleTitle.title__wrapper}>
          <h2 className={styleTitle.title}>Sales not found</h2>
        </div>
        : <div className={style.statistics}>
          <div className={style.statistics__column}>
            <Pie arrOptions={soldProducts}/>
            <Line arrOptions={soldProducts}/>
          </div>
          <div className={style.statistics__overview}>
            <Bar arrOptions={soldProducts}/>
          </div>
        </div>
      }
      {
        id !== null && isMobile
          ? <Drawer
            anchor="bottom"
            open={visible.sell}
            onClose={handleClose}
          >
            <SellForm
              id={id}
              quantity={remains}
              handleVisible={handleClose}
            />
          </Drawer>

          : id !== null && (
          <Modal
            sell={true}
            visible={visible.sell}
            handleVisible={handleClose}
          >
            <SellForm
              id={id}
              quantity={remains}
              handleVisible={handleClose}
            />
          </Modal>)
      }
    </>
  );
};

export default Main;