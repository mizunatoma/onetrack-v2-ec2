'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  BarChart2,
  ClipboardList,
  Play,
  Plus,
  Settings,
  Square,
} from 'lucide-react'
import { useState } from 'react'

type Props = {
  open: boolean
  onComplete: () => void
}

const PAGE1_ITEMS = [
  {
    icon: Plus,
    title: '① 新しいカテゴリを追加',
    desc: '「Categories」の「追加」ボタンから、やりたい作業の種類を自分で作れます',
  },
  {
    icon: Play,
    title: '② カテゴリを選ぶと記録スタート',
    desc: '「Categories」のカードをクリックするだけで、自動的に計測が始まります',
  },
  {
    icon: Square,
    title: '③ 停止するには',
    desc: '「Now Tracking」カードの「停止」ボタンを押すと記録が終わります',
  },
]

const PAGE2_ITEMS = [
  { icon: BarChart2, title: 'Analytics', desc: '記録した時間をグラフで確認' },
  { icon: Settings, title: 'Settings', desc: 'カテゴリやプロフィールの設定' },
  {
    icon: ClipboardList,
    title: 'Todos（左サイドバーのボタン）',
    desc: 'クリックするとタスク一覧が右側に開きます',
  },
]

export default function OnboardingModal({ open, onComplete }: Props) {
  const [page, setPage] = useState(0)

  return (
    <Dialog open={open} onOpenChange={() => onComplete()}>
      <DialogContent>
        {page === 0 ? (
          // 1 ページ目
          <>
            <DialogHeader>
              <p className="text-xs text-gray-400">{page + 1} / 2</p>
              <DialogTitle className="mb-2">まずは記録してみよう！</DialogTitle>
              <div className="flex flex-col gap-4">
                {PAGE1_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5D866C]/10">
                        <Icon size={16} className="text-[#5D866C]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogHeader>
            <div>
              <Button className="w-full" onClick={() => setPage(1)}>
                次へ
              </Button>
            </div>
          </>
        ) : (
          // 2 ページ目
          <>
            <DialogHeader>
              <p className="text-xs text-gray-400">{page + 1} / 2</p>
              <DialogTitle className="mb-2">画面の見かた</DialogTitle>
              <div className="flex flex-col gap-4">
                {PAGE2_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#5D866C]/10">
                        <Icon size={16} className="text-[#5D866C]" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.title}</p>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogHeader>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setPage(0)}>
                戻る
              </Button>
              <Button className="flex-1" onClick={() => onComplete()}>
                はじめる
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
