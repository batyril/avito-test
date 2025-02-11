import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../model/posts.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'items',
      providesTags: ['post'],
    }),
    getPostById: builder.query<Post, any>({
      query: (id: string) => `items/${id}`,
    }),
    deletePost: builder.mutation({
      query: () => ({
        url: 'items',
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
      query: (newPost) => ({
        url: 'items',
        method: 'PUT',
        body: newPost,
      }),
      invalidatesTags: ['post'],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } =
  api;
