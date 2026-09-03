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
      <DialogContent className="rounded-[16px] px-[26px] pt-[26px] pb-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.25)] ring-0 sm:max-w-[360px]">
        {page === 0 ? (
          // 1 ページ目
          <>
            <DialogHeader className="gap-0">
              <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-[#a49d8e]">
                {page + 1} / 2
              </p>
              <DialogTitle className="mb-4 text-[17px] leading-normal font-bold text-[#2b2b28]">
                まずは記録してみよう！
              </DialogTitle>
              <div className="flex flex-col gap-4">
                {PAGE1_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-[#5D866C]/10">
                        <Icon size={16} className="text-[#5D866C]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#2b2b28]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[12.5px] text-[#77756c]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogHeader>
            <div>
              <Button
                className="h-auto w-full rounded-[10px] bg-[#5d866c] p-[11px] text-sm font-bold text-white hover:bg-[#517558]"
                onClick={() => setPage(1)}
              >
                次へ
              </Button>
            </div>
          </>
        ) : (
          // 2 ページ目
          <>
            <DialogHeader className="gap-0">
              <p className="mb-1.5 text-[11px] font-medium tracking-[0.08em] text-[#a49d8e]">
                {page + 1} / 2
              </p>
              <DialogTitle className="mb-4 text-[17px] leading-normal font-bold text-[#2b2b28]">
                画面の見かた
              </DialogTitle>
              <div className="flex flex-col gap-4">
                {PAGE2_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-[#5D866C]/10">
                        <Icon size={16} className="text-[#5D866C]" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-[#2b2b28]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-[12.5px] text-[#77756c]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogHeader>
            <div className="flex gap-2.5">
              <Button
                variant="outline"
                className="h-auto rounded-[10px] border-[#e4ddcf] px-4 py-[11px] text-[13px] text-[#77756c]"
                onClick={() => setPage(0)}
              >
                戻る
              </Button>
              <Button
                className="h-auto flex-1 rounded-[10px] bg-[#5d866c] p-[11px] text-sm font-bold text-white hover:bg-[#517558]"
                onClick={() => onComplete()}
              >
                はじめる
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
