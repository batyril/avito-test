import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../model/posts.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5173/api',
  }),
  tagTypes: ['post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'items',
      providesTags: ['post'],
    }),
    getPostById: builder.query<Post, string>({
      query: (id: string) => `items/${id}`,
      providesTags: ['post'],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['post'],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: 'items',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['post'],
    }),
    updatePost: builder.mutation({
      query: ({ newPost, id }) => ({
        url: `items/${id}`,
        method: 'PUT',
        body: newPost,
      }),
      invalidatesTags: ['post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
} = api;
