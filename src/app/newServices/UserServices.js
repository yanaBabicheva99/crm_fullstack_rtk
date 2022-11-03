import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth/'
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    signUp: build.mutation({
     query: (content) => ({
       url: 'register',
       method: 'POST',
       body: content
     })
    }),
    signIn: build.mutation({
      query: (content) => ({
        url: 'login',
        method: 'POST',
        body: content
      })
    }),
    getUser: build.query({
      query: (id) => ({
        url: `get/${id}`,
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
          'content-type': 'text/plain',
        },
      }),
      providesTags: result => ['User']
    }),
    updateUserInfo: build.mutation({
      query: (data) => ({
        url: `update/${data.id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: data.content
      }),
      invalidatesTags: ['User']
    }),
    changeUserInfo: build.mutation({
      query: (data) => ({
        url: `change/${data.id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: data.content
      }),
      invalidatesTags: ['User']
    }),
  })
})
export const {
  useGetUserQuery,
  useUpdateUserInfoMutation,
  useChangeUserInfoMutation,
  useSignInMutation,
  useSignUpMutation
} = userAPI;