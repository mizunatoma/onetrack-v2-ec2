'use client'
import { useFetch } from '@/app/user/_hooks/useFetch'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { GetTodoItemsResponse, GetTodoListsResponse } from '@/types/api'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SubjectAddForm from './todo-panel/SubjectAddForm'
import SubjectListItem from './todo-panel/SubjectListItem'
import TodoItemRow from './todo-panel/TodoItemRow'

interface TodoPanelProps {
  isSideBarOpen: boolean
  isTodoPanelOpen: boolean
}

export default function TodoPanel({
  isSideBarOpen,
  isTodoPanelOpen,
}: TodoPanelProps) {
  const [selectedListId, setSelectedListId] = useState<string | null>(null) // 開いているlist
  const [isOpen, setIsOpen] = useState(false) // List追加ブロックの開閉

  const {
    data: list,
    mutate: mutateList,
    isValidating: isValidatingList,
    isLoading: isLoadingList,
  } = useFetch<GetTodoListsResponse>('/api/todo-lists')
  const {
    data: todos,
    mutate: mutateTodo,
    isValidating: isValidatingTodo,
    isLoading: isLoadingTodo,
  } = useFetch<GetTodoItemsResponse>(
    selectedListId ? `/api/todo-lists/${selectedListId}/todos` : null,
  )

  // listの削除
  const handleDeleteList = async () => {
    try {
      const res = await fetch(`/api/todo-lists/${selectedListId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        toast.error('リストの削除に失敗しました')
        console.error('リスト削除失敗', await res.json())
        return
      }
      toast.success('削除しました')
      mutateList()
    } catch (e) {
      toast.error('エラーが発生しました')
      console.error('リスト削除エラー：', e)
    }
  }

  useEffect(() => {
    if (!list) return // ロード中は何もしない
    const stillExists = list.todoLists.some((l) => l.id === selectedListId)
    // 今選択中のIDが、最新のリスト一覧の中にまだ存在するか確認
    // 未選択(null)の場合や、選択中リストが削除されて無くなった場合はfalseになる
    if (!stillExists) {
      // 存在しなければ先頭のリストを選び直す。0件なら null（未選択状態）に戻す
      setSelectedListId(list.todoLists[0]?.id ?? null)
    }
    // 存在していれば何もしない
  }, [list, selectedListId])

  if (isLoadingList || isLoadingTodo)
    return (
      <aside
        className={`fixed inset-y-0 z-20 space-y-2 overflow-auto bg-[#FCFAF7] transition-all duration-300 ${isSideBarOpen ? 'left-[160px]' : 'left-[80px]'} ${isTodoPanelOpen ? 'w-[300px] border border-[#e9e3cc] p-4' : 'w-0'}`}
      >
        <div className="flex justify-center py-2">
          <LoadingSpinner />
        </div>
      </aside>
    )

  return (
    <aside
      className={`fixed inset-y-0 z-20 space-y-2 overflow-auto bg-[#FCFAF7] transition-all duration-300 ${isSideBarOpen ? 'left-[160px]' : 'left-[80px]'} ${isTodoPanelOpen ? 'w-[300px] border border-[#e9e3cc] p-4' : 'w-0'}`}
    >
      {/* 科目リスト一覧と追加ボタン */}
      <SubjectListItem
        todoLists={list?.todoLists}
        selectedListId={selectedListId}
        onSelect={setSelectedListId}
        isValidatingList={isValidatingList}
        onAddClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      {/* 科目リスト追加フォーム */}
      {isOpen && (
        <SubjectAddForm
          onClose={() => setIsOpen(false)}
          onCreated={async (id) => {
            await mutateList()
            setSelectedListId(id)
          }}
        />
      )}
      {/* 選択したリストのTODO一覧 */}
      {selectedListId !== null && (
        <TodoItemRow
          selectedListId={selectedListId}
          todos={todos?.todos}
          isValidatingTodo={isValidatingTodo}
          mutateTodo={mutateTodo}
        />
      )}
      {/*科目リスト削除ボタン*/}
      {selectedListId !== null && (
        <button
          className="mt-auto flex w-full justify-end gap-1 p-2 text-right"
          onClick={handleDeleteList}
          disabled={isValidatingList}
        >
          <div className="flex items-center text-gray-500 hover:text-red-400">
            <Trash2 size={16} />
            <span>リストを削除</span>
          </div>
        </button>
      )}
    </aside>
  )
}
