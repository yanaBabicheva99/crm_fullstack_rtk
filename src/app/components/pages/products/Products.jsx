import React, {useState} from 'react';
import ProductsTable from "../../table/productsTable/ProductsTable";
import {useProducts} from "../../../hooks/useProducts";
import Modal from "../../modal/Modal";
import ProductFormEdit from "../../form/productForm/ProductFormEdit";
import {useModal} from "../../../hooks/useModal";
import style from '../../../style/title/Title.module.scss';
import {Drawer, useMediaQuery} from "@mui/material";
import Pagination from "../../Pagination";
import {paginate} from "../../../utils/paginate";


const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProduct, setCurrentProduct] = useState(null);
    const {products, deleteProduct, loading} = useProducts();

    const allProducts = products.length ? products.filter(product => product.remains !== 0 && !product.delete) : [];
    const count = allProducts.length;

    const {visible, setVisible} = useModal();
    const isMobile = useMediaQuery('(max-width:599px)');
    const isTablet = useMediaQuery('(max-width:1199px)');

    const pageSize = isTablet ? 5 : 7;


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleOpen = () => {
        setVisible({edit: true});
    };
    const handleClose = () => {
        setVisible({edit: false})
    };

    const handleDelete = (id) => {
       deleteProduct(id);
    };

    const handleCurrentProduct = (data) => {
        setCurrentProduct(data);
    };

    const productsCrop = paginate(allProducts, currentPage, pageSize);

    if (loading) {
        return <h2>Loading...</h2>
    } else {
       return (
           <>
               {productsCrop.length === 0
                   ? <div className={style.title__wrapper}>
                       <h2 className={style.title}>Products not found</h2>
                   </div>
                   : <>
                       <ProductsTable
                           products={productsCrop}
                           handleDelete={handleDelete}
                           onCurrentProduct={handleCurrentProduct}
                           onVisibleEdit={handleOpen}
                       />
                       {
                           isMobile
                           ? <Drawer
                                   open={visible.edit}
                                   onClose={handleClose}
                               >
                                       <ProductFormEdit
                                           data={currentProduct}
                                           handleVisible={handleClose}
                                       />
                               </Drawer>
                           :   <Modal
                                   visible={visible.edit}
                                   handleVisible={handleClose}
                               >
                                   {currentProduct && (
                                       <ProductFormEdit
                                           data={currentProduct}
                                           handleVisible={handleClose}
                                       />)
                                   }
                               </Modal>
                       }
                       <Pagination
                           itemsCount={count}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onPageChange={handlePageChange}
                       />
                   </>
               }
           </>
       )
    }
};

export default Products;
