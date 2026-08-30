'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

type Props = {
  open: boolean
  onComplete: () => void
}

export default function OnboardingModal({ open, onComplete }: Props) {
  const [page, setPage] = useState(0)

  return (
    <Dialog open={open} onOpenChange={() => onComplete()}>
      <DialogContent>
        <DialogHeader>
          {page === 0 ? (
            <div>
              <DialogTitle>まずは記録してみましょう</DialogTitle>
              <p>
                ① 新しいカテゴリを追加 —
                「Categories」の「追加」ボタンから、やりたい作業の種類を自分で作れます
              </p>
              <p>
                ② カテゴリを選ぶと記録スタート —
                「Categories」のカードをクリックするだけで、自動的に計測が始まります
              </p>
              <p>
                ③ 停止するには — 「Now
                Tracking」カードの「停止」ボタンを押すと記録が終わります
              </p>
            </div>
          ) : (
            <div>
              <DialogTitle>画面の見かた</DialogTitle>
              <p>Analytics — 記録した時間をグラフで確認</p>
              <p>Settings — カテゴリやプロフィールの設定</p>
              <p>
                Todos（左サイドバーのボタン） —
                クリックするとタスク一覧が右側に開きます
              </p>
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          {page === 0 ? (
            <Button onClick={() => setPage(1)}>次へ</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setPage(0)}>
                戻る
              </Button>
              <Button onClick={() => onComplete()}>はじめる</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
