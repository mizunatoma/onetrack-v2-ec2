'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  label: string
  className: string
}

export default function GuestLogin({ label, className }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const GuestTryButton = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        toast.error('ログインに失敗しました')
        return
      }
      router.replace('/user/timeline')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={GuestTryButton}
      disabled={loading}
    >
      {label}
    </button>
  )
}
