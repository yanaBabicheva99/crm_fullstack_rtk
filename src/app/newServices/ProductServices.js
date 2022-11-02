import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/'
  }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => ({
        url: 'products',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
          'content-type': 'text/plain',
        }
      })
    }),
    deleteProduct: build.mutation({
      query: (id, content) => ({
        url: `products/remove/${id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    }),
    addProduct: build.mutation({
      query: (content) => ({
        url: 'products',
        method: 'POST',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    }),
    changeProduct: build.mutation({
      query: (id, content) => ({
        url: `products/change/${id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    }),
    updateProduct: build.mutation({
      query: (id, content) => ({
        url: `products/update/${id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    })
  })


})