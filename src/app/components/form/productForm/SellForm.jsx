import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputForm from "../inputForm/InputForm";

import style from "../../modal/Modal.module.scss";
import styleForm from '../form.module.scss';
import {useProducts} from "../../../hooks/useProducts";

const SellForm = ({handleVisible, quantity, id}) => {
    const {updateProduct} = useProducts();

    const AddProductSchema = Yup.object().shape({
        quantity: Yup
            .string()
            .test('Number of products is incorrect', 'Number of products is incorrect', val => {
                if(val) return Number(val) <= Number(quantity)
            } )
            .required('Number of products is required')
            .matches(
                /^(0|[1-9]\d*)$/,
                'Number of products is incorrect'
            )
            .matches(
                /^[1-9]{1}[0-9]*$/,
                'Number of products is incorrect'
            ),


    });

    const options = [
        {value: 'Mon', label: 'Monday'},
        {value: 'Tue', label: 'Tuesday'},
        {value: 'Wed', label: 'Wednesday'},
        {value: 'Thu', label: 'Thursday'},
        {value: 'Fri', label: 'Friday'},
        {value: 'Sat', label: 'Saturday'},
        {value: 'Sun', label: 'Sunday'},
    ];

    const day = String(new Date().getDay());

    const days = {
        '1': 'Mon',
        '2': 'Tue',
        '3': 'Wed',
        '4': 'Thu',
        '5': 'Fri',
        '6': 'Sat',
        '0': 'Sun'
    };

    const initialValues = {
        quantity,
        day: days[day]
    };

    const sell = ({quantity, day}) => {
        const updateQuantity = Number(quantity);
        updateProduct(id, updateQuantity, day);
        handleVisible();
    };

    return (
        <>
            <header className={style.modal__header}>
                <h2 className={style.modal__title}>
                    Sell the product
                </h2>
            </header>
            <Formik
                initialValues={initialValues}
                validationSchema={AddProductSchema}
                enableReinitialize={true}
                onSubmit={sell}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleSubmit,
                      handleChange,
                      setFieldValue
                  }) => (
                    <form className={styleForm.form} onSubmit={handleSubmit}>
                        <InputForm
                            label='Number of products'
                            name='quantity'
                            value={values.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.quantity}
                            errors={errors.quantity}
                        />

                        <FormControl className={style.select}>
                            <InputLabel id="demo-simple-select-autowidth-label">Day</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={values.day}
                                onChange={({target}) => setFieldValue('day', target.value)}
                                autoWidth
                                label='Day'
                            >
                                {
                                    options.map(option => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <button
                            className={[styleForm.form__btn, styleForm.add].join(' ')}
                        >
                            Sell product
                        </button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SellForm;