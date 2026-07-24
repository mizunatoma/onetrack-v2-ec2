import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TodoItemFormInput } from '@/schemas/todo'
import {
  createTodoItemSchema,
  todoItemFormSchema,
  updateTodoItemSchema,
} from '@/schemas/todo'
import type { TodoItemDTO } from '@/types/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, SquarePen, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  selectedListId: string
  todos: TodoItemDTO[] | undefined
  isValidatingTodo: boolean
  mutateTodo: () => void
}

export default function TodoItemRow({
  selectedListId,
  todos,
  isValidatingTodo,
  mutateTodo,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null) // 編集中のtodo id
  const [editingTitle, setEditingTitle] = useState('') // 編集中のtodo title

  const {
    register: registerTodo,
    handleSubmit: handleSubmitTodo,
    formState: { errors: errorsTodo },
    reset: resetTodo,
  } = useForm<TodoItemFormInput>({ resolver: zodResolver(todoItemFormSchema) })

  // todoの追加
  const handleAddTodo = async (title: string) => {
    try {
      const result = createTodoItemSchema.safeParse({ title })
      if (!result.success) {
        console.error('バリデーション失敗', result.error)
        return
      }
      const res = await fetch(`/api/todo-lists/${selectedListId}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) {
        toast.error('todoの追加に失敗しました')
        console.error('todo追加失敗', await res.json())
        return
      }
      mutateTodo()
    } catch (e) {
      toast.error('エラーが発生しました')
      console.error('todo追加エラー：', e)
    }
  }

  // todoの編集
  const toggleTodoStatus = async (
    id: string,
    title: string,
    isDone: boolean,
  ) => {
    try {
      const result = updateTodoItemSchema.safeParse({ title, isDone })
      if (!result.success) {
        toast.error('100文字以内で入力してください')
        console.error('バリデーション失敗', result.error)
        return
      }
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) {
        toast.error('todoの編集に失敗しました')
        console.error('todo編集失敗', await res.json())
        return
      }
      mutateTodo()
    } catch (e) {
      toast.error('エラーが発生しました')
      console.error('todo編集エラー：', e)
    }
  }

  // todoの削除
  const handleDeleteTodo = async (id: string) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        toast.error('todoの削除に失敗しました')
        console.error('todo削除失敗', await res.json())
        return
      }
      toast.success('削除しました')
      mutateTodo()
    } catch (e) {
      toast.error('エラーが発生しました')
      console.error('todo削除エラー：', e)
    }
  }

  return (
    <>
      {/*todo追加フォーム*/}
      <form
        className="flex gap-2"
        onSubmit={handleSubmitTodo((data) => {
          handleAddTodo(data.title)
          resetTodo()
        })}
      >
        <div className="flex gap-2">
          <div>
            <Input placeholder="例）問 1~15 復習" {...registerTodo('title')} />
            {errorsTodo.title && (
              <p className="mt-1 text-sm text-red-400">
                {errorsTodo.title.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={isValidatingTodo}>
            作成
          </Button>
        </div>
      </form>

      {/*todo一覧*/}
      <ul className="space-y-2">
        {(todos || []).map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm"
          >
            {editingId !== todo.id ? (
              /* 通常モードの表示 */
              <>
                <label className="flex flex-1 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() =>
                      toggleTodoStatus(todo.id, todo.title, !todo.isDone)
                    }
                  />
                  <span
                    className={`${todo.isDone ? 'text-gray-400 line-through' : ''}`}
                  >
                    {todo.title}
                  </span>
                </label>
                <div className="flex justify-end gap-3 p-2 text-right">
                  {/* todo編集ボタン */}
                  <button
                    onClick={() => {
                      setEditingId(todo.id) // 編集モードにセット
                      setEditingTitle(todo.title) // 今のタイトル初期値をセット
                    }}
                    disabled={isValidatingTodo}
                  >
                    <SquarePen
                      size={16}
                      className="text-gray-500 hover:text-[#5A8B7D]/70"
                    />
                  </button>
                  {/* todo削除ボタン */}
                  <button
                    className="text-red-400"
                    onClick={() => handleDeleteTodo(todo.id)}
                    disabled={isValidatingTodo}
                  >
                    <Trash2
                      size={16}
                      className="text-gray-500 hover:text-red-400"
                    />
                  </button>
                </div>
              </>
            ) : (
              /* 編集モードの表示 */
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 rounded border px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#5A8B7D]"
                  autoFocus
                />
                {/* 編集完了ボタン */}
                <button
                  onClick={async () => {
                    await toggleTodoStatus(todo.id, editingTitle, todo.isDone)
                    setEditingId(null) // 編集モード終了
                  }}
                >
                  <Check size={16} className="text-[#5A8B7D]/70" />
                </button>
                {/* 編集中止ボタン */}
                <button onClick={() => setEditingId(null)}>
                  <X size={16} className="text-red-400" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
