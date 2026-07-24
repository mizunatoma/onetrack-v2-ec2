import z from 'zod'

export const createTodoListSchema = z.object({
  name: z.string().max(100),
})

export const reorderTodoListsSchema = z.object({
  orderedListIds: z.array(z.string().min(1)).min(1),
})

export const todoListFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'リスト名を入力してください')
    .max(100, '100文字以内で入力してください'),
})

export type CreateTodoListRequest = z.infer<typeof createTodoListSchema>
export type UpdateTodoListRequest = z.infer<typeof createTodoListSchema>
export type ReorderTodoListsRequest = z.infer<typeof reorderTodoListsSchema>
export type TodoListFormInput = z.infer<typeof todoListFormSchema>


export const createTodoItemSchema = z.object({
  title: z.string().max(100),
})

export const updateTodoItemSchema = z.object({
  title: z.string().max(100),
  isDone: z.boolean(),
})

export const todoItemFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'todoを入力してください')
    .max(100, '100文字以内で入力してください'),
})

export type CreateTodoItemRequest = z.infer<typeof createTodoItemSchema>
export type UpdateTodoItemRequest = z.infer<typeof updateTodoItemSchema>
export type TodoItemFormInput = z.infer<typeof todoItemFormSchema>
