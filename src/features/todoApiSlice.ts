import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Todo {
  id: number
  title: string
  completed: boolean
  userId: number
}

export const todoApiSlice = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/todos',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { limit?: number, page?: number, filter?: boolean }>({
      query: ({ limit = 10, page = 1, filter }) => {
        let query = `?_sort=id&_order=desc&_limit=${limit}&_page=${page}`
        if (filter !== undefined) {
          query += `&completed=${filter}`
        }
        return query
      },
      transformResponse: (res: Todo[]) => res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos']
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: '/',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo) => ({
        url: `/${todo.id}`,
        method: 'DELETE',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
  })
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApiSlice
