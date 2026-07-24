import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { TodoListFormInput } from '@/schemas/todo'
import { createTodoListSchema, todoListFormSchema } from '@/schemas/todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  onClose: () => void
  onCreated: (id: string) => void
}

export default function SubjectAddForm({ onClose, onCreated }: Props) {
  const {
    register: registerList,
    handleSubmit: handleSubmitList,
    formState: { errors: errorsList, isSubmitting },
  } = useForm<TodoListFormInput>({ resolver: zodResolver(todoListFormSchema) })

  // listの追加
  const handleAddList = async (name: string) => {
    try {
      const result = createTodoListSchema.safeParse({ name })
      if (!result.success) {
        console.error('バリデーション失敗', result.error)
        return
      }
      const res = await fetch(`/api/todo-lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) {
        toast.error('リストの追加に失敗しました')
        console.error('リスト追加失敗', await res.json())
        return
      }
      const data = await res.json()
      onCreated(data.todoList.id)
      onClose()
    } catch (e) {
      toast.error('エラーが発生しました')
      console.error('リスト作成エラー：', e)
    }
  }

  return (
    <form
      className="flex gap-2"
      onSubmit={handleSubmitList((data) => {
        handleAddList(data.name)
      })}
    >
      <div>
        <div className="rounded-lg border border-dashed border-[#5A8B7D]/50 bg-[#5A8B7D]/5 p-3">
          <p className="mb-1.5 text-xs font-semibold text-gray-500">
            新しい科目名
          </p>
          <div className="flex gap-2">
            <div>
              <Input placeholder="例）過去問" {...registerList('name')} />
              {errorsList.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errorsList.name.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              作成
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
