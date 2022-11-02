import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/auth/'
  }),
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
        }
      })
    }),
    updateUserInfo: build.mutation({
      query: (id, content) => ({
        url: `update/${id}`,
        method: 'PATCH',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    }),
    changeUserInfo: build.mutation({
      query: (id, content) => ({
        url: `change/${id}`,
        method: 'PUT',
        headers: {
          'authorization': JSON.parse(localStorage.getItem('userData')).token,
        },
        body: content
      })
    }),

  })
})
