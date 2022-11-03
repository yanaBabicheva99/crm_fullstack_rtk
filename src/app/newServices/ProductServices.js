import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/'
  }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: (id) => ({
        url: 'products',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
          'content-type': 'text/plain',
        }
      }),
      providesTags: (result) =>
        result ? result.map((id) => ({ type: 'Product', id })) : ['Product'],
    }),
    deleteProduct: build.mutation({
      query: (data) => ({
        url: `products/remove/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    }),
    addProduct: build.mutation({
      query: (content) => ({
        url: 'products',
        method: 'POST',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      }),
      invalidatesTags: ['Product']
    }),
    changeProduct: build.mutation({
      query: (data) => ({
        url: `products/change/${data.id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: build.mutation({
      query: (data) => ({
        url: `products/update/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: data.content
      }),
      invalidatesTags: ['Product']
    })
  })
});

export const {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useChangeProductMutation,
  useUpdateProductMutation
} = productsAPI;