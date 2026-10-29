// /api/todos/[todoId]
import { getAuthUser } from '@/app/_utils/getAuthUser'
import { logger } from '@/lib/logger'
import { updateTodoItemSchema } from '@/schemas/todo'
import { todoItemService } from '@/services/todo.service'
import type { UpdateTodoItemResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) => {
  try {
    const { todoId } = await params
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const todo = await todoItemService.getTodo(todoId, user.id)
    if (!todo)
      return NextResponse.json({ error: 'No todo found' }, { status: 404 })

    const body = await request.json()
    const result = updateTodoItemSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 })
    }
    const updatedTodo = await todoItemService.updateTodo(
      todoId,
      result.data.title,
      result.data.isDone,
    )

    return NextResponse.json<UpdateTodoItemResponse>({ todo: updatedTodo })
  } catch (e) {
    logger.error('PUT /api/todos/[todoId]', {
      error: e instanceof Error ? e.stack : String(e),
    })
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (
  _request: NextRequest,
  { params }: { params: Promise<{ todoId: string }> },
) => {
  try {
    const { todoId } = await params
    const auth = await getAuthUser()
    if (auth instanceof NextResponse) return auth
    const user = auth.user

    const todo = await todoItemService.getTodo(todoId, user.id)
    if (!todo)
      return NextResponse.json({ error: 'No todo found' }, { status: 404 })

    await todoItemService.deleteTodo(todo.id)

    return new NextResponse(null, { status: 204 })
  } catch (e) {
    logger.error('DELETE /api/todos/[todoId]', {
      error: e instanceof Error ? e.stack : String(e),
    })
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
