import type { TodoListDTO } from '@/types/api'
import { Plus, X } from 'lucide-react'

type Props = {
  todoLists: TodoListDTO[] | undefined
  selectedListId: string | null
  onSelect: (id: string) => void
  isValidatingList: boolean
  onAddClick: () => void
  isOpen: boolean
}

export default function SubjectListItem({
  todoLists,
  selectedListId,
  onSelect,
  isValidatingList,
  onAddClick,
  isOpen,
}: Props) {
  return (
    <>
      {/*listが1件もない場合の案内*/}
      {todoLists?.length === 0 && (
        <p className="text-right text-sm text-gray-500">
          まずは 科目リストを追加 ✍🏻 ↓
        </p>
      )}
      {/*科目リスト一覧*/}
      <div className="grid grid-cols-2 gap-1.5">
        {todoLists?.map((todoList) => (
          <button
            key={todoList.id}
            className={`flex w-full items-center gap-2 rounded-lg border py-2 pl-2.5 pr-3 text-left text-sm font-medium transition-colors ${todoList.id === selectedListId ? 'border-l-4 border-[#5A8B7D] bg-[#5A8B7D]/10 text-[#3D5E4E]' : 'border-gray-200 text-gray-500 hover:bg-gray-100'}`}
            onClick={() => onSelect(todoList.id)}
          >
            {todoList.name}
          </button>
        ))}
      </div>

      {/*科目リスト追加ボタン*/}
      <div className="flex justify-end">
        <button
          className={`flex items-center gap-1.5 rounded-lg border border-gray-200 text-sm font-medium text-[#5A8B7D] transition-colors hover:border-[#5A8B7D]/70 hover:bg-[#5A8B7D]/10 ${isOpen ? 'size-8 justify-center' : 'px-3 py-1.5'}`}
          onClick={onAddClick}
          disabled={isValidatingList}
        >
          {isOpen ? (
            <X size={16} />
          ) : (
            <>
              <Plus size={16} />
              <span>リストを追加する</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
