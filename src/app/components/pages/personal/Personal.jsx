import React from 'react';
import {useUser} from "../../../hooks/useUser";
import {Formik} from "formik";

import InputForm from "../../form/inputForm/InputForm";
import style from './Personal.module.scss'
import * as Yup from "yup";

const PersonalSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name is too short!')
        .max(10, 'Name is too long!')
        .required('Name is required'),
    lastName: Yup.string()
        .min(2, 'Last name is too short!')
        .max(10, 'Last name is too long!')
        .required('Last name is required'),
    companyName: Yup.string()
        .min(2, 'Company name is too short!')
        .max(10, 'Company name is too long!')
        .required('Company name is required'),

    email: Yup.string().email('Invalid email').required('Email is required'),
    oldPassword: Yup.string(),
        // .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    newPassword: Yup.string()
        .matches(
            /(?=.*[A-Z])/,
            'The new password must have at least one capital letter'
        )
        .matches(
            /(?=.*[0-9])/,
            'The new password must have at least one figure'
        )
        .matches(
            /(?=.*[!@#$%^&*])/,
            'The new password must have at least one special symbol !@#$%^&*'
        )
        .matches(
            /(?=.{8,})/,
            'The new password must consist of at least 8 symbols'
        ),
});
const Personal = () => {
    const {user} = useUser();
    const initialValues = {oldPassword: '', newPassword: '', ...user};
    const {changeUserInfo} = useUser();

    const handleChange = (data) => {
       changeUserInfo(data);
    }
     return (
         <>
           <Formik
               initialValues={initialValues}
               validationSchema={PersonalSchema}
               onSubmit={handleChange}
           >{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
               <form className={style.personal_form} onSubmit={handleSubmit}>
              <div className={style.personal_form__wrapper}>
                  <InputForm
                      label='First Name'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched.name}
                      errors={errors.name}
                  />
                  <InputForm
                      label='Last name'
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      touched={touched.lastName}
                      errors={errors.lastName}
                  />
              </div>
                   <div className={style.personal_form__wrapper}>
                       <InputForm
                           label='Company name'
                           name='companyName'
                           value={values.companyName}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           touched={touched.companyName}
                           errors={errors.companyName}
                       />
                       <InputForm
                           label='Email'
                           name='email'
                           value={values.email}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           touched={touched.email}
                           errors={errors.email}
                       />
                   </div>
                   <div className={style.personal_form__wrapper_single}>
                       <InputForm
                           label='Address'
                           name='address'
                           value={values.address}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           touched={touched.address}
                           errors={errors.address}
                       />
                   </div>
                   <div className={style.personal_form__wrapper}>
                       <InputForm
                           label='Enter old password'
                           type='password'
                           name='oldPassword'
                           value={values.oldPassword}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           touched={touched.oldPassword}
                           errors={errors.oldPassword}
                       />
                       <InputForm
                           label='Enter a new password'
                           type='password'
                           name='newPassword'
                           value={values.newPassword}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           touched={touched.newPassword}
                           errors={errors.newPassword}
                       />
                   </div>
                 <button
                     className={style.personal_form__btn}
                     type='submit'
                 >
                     Save changes
                 </button>
               </form>
           )}
           </Formik>
         </>)
};

export default Personal;

