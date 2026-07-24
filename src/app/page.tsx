import {
  AlarmClock,
  BarChart2,
  Flame,
  FolderPlus,
  MessageCircle,
  Play,
  UserPlus,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image' // 自動で最適化・遅延読み込み。 width と height が必須
import Link from 'next/link'
import GuestLogin from './_components/GuestLogin'

export const metadata: Metadata = {
  title: 'OneTrack | 資格学習のためのタイムトラッキング',
  description:
    '記録・予定・振り返りをひとつに。資格学習の積み上げを、毎日見える形に。',
  openGraph: {
    title: 'OneTrack | 資格学習のためのタイムトラッキング',
    description:
      '記録・予定・振り返りをひとつに。資格学習の積み上げを、毎日見える形に。',
    url: 'https://learning-track.com',
    siteName: 'OneTrack',
    images: [
      {
        url: 'https://learning-track.com/images/auth-illustration.png',
        width: 1918,
        height: 941,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
}

// LPヒーロー画像
const heroScreenshot = {
  src: '/images/screenshot-timeline.png',
  alt: 'OneTrackの学習記録ダッシュボード',
}

const forPeople = [
  {
    icon: AlarmClock,
    iconColor: 'text-[#5A6745]',
    bgColor: 'bg-[#D7E5BB]',
    title: '仕事と両立で時間がない',
    context:
      '働きながらの資格勉強。限られた時間を、どこに使えているか把握したい。',
  },
  {
    icon: BarChart2,
    iconColor: 'text-[#173324]',
    bgColor: 'bg-[#C9EAD4]',
    title: '勉強量が見えない',
    context: '勉強したつもりでも、実際に何時間積めたのか分からず不安になる。',
  },
  {
    icon: Flame,
    iconColor: 'text-[#442427]',
    bgColor: 'bg-[#FFDADB]',
    title: '独学を続けたい',
    context:
      'ひとりの勉強は孤独。積み上げが見える仕組みを、続ける力に変えたい。',
  },
]

// スクショを実際の画面らしく見せる ブラウザ風フレーム
const BrowserFrame = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden rounded-xl border-4 border-white bg-white shadow-[0_24px_60px_rgba(23,51,36,0.3)] ring-1 ring-black/10">
    <div className="flex gap-1.5 border-b border-[#E2E6E4] bg-[#F0F3F1] px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-[#CBD3CE]" />
      <span className="size-2.5 rounded-full bg-[#CBD3CE]" />
      <span className="size-2.5 rounded-full bg-[#CBD3CE]" />
    </div>
    <Image className="w-full" src={src} alt={alt} width={1918} height={1068} />
  </div>
)

// 「主な機能」セクション
const features = [
  {
    code: '01 — TRACK',
    title: '学習時間トラッキング',
    description:
      '科目を選んでスタートを押すだけ。記録の手間を最小限に、学習の実態を残します。',
    screenshot: {
      src: '/images/screenshot-timeline.png',
      alt: '学習時間トラッキング画面',
    },
  },
  {
    code: '02 — ANALYZE & GOAL',
    title: '学習の可視化と目標管理',
    description:
      '月次グラフで学習時間のクセを可視化。資格名・試験日・月間目標時間を設定すれば、残り日数と進捗、連続学習日数（ストリーク）もひとつの画面で確認できます。',
    screenshot: {
      src: '/images/screenshot-analytics.png',
      alt: '学習アナリティクス・目標カウントダウン・ストリーク表示画面',
    },
  },
  {
    code: '03 — ORGANIZE',
    title: '科目別Todo',
    description:
      '科目ごとにやることを整理。次に解く問題集が明確になり、迷わず学習に入れます。',
    screenshot: {
      src: '/images/screenshot-todopanel-full.png',
      alt: '科目別Todoリストの画面',
    },
  },
  {
    code: '04 — NOTIFY',
    title: 'LINE通知',
    description:
      '毎晩、その日の学習サマリがLINEに届く。記録を振り返る習慣が、自然と身につきます。',
    screenshot: {
      src: '/images/screenshot-settings-line.png',
      alt: 'LINEに届く学習サマリ通知の画面',
    },
  },
]

const usageSteps = [
  {
    icon: UserPlus,
    iconColor: 'text-[#5A6745]',
    bgColor: 'bg-[#D7E5BB]',
    title: 'はじめる',
    context:
      '新規登録、またはゲストログインならアカウント作成なしですぐに試せます。',
  },
  {
    icon: FolderPlus,
    iconColor: 'text-[#173324]',
    bgColor: 'bg-[#C9EAD4]',
    title: '科目を追加する',
    context: '勉強する科目をカテゴリとして登録します。',
  },
  {
    icon: Play,
    iconColor: 'text-[#442427]',
    bgColor: 'bg-[#FFDADB]',
    title: '記録する',
    context: '科目を選んでスタート。終了を押すだけで学習時間が積み上がります。',
  },
]

export default function Home() {
  return (
    <>
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 border-b border-[#E0DCCE] bg-[#F2F0E9]/90 px-5 py-4 backdrop-blur md:px-12">
        <nav className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#3D5E4E]">
            OneTrack
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/signin"
              className="text-[#4B4B4B] transition-colors duration-300 hover:text-[#3D5E4E]"
            >
              ログイン
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#3D5E4E] px-7 py-3 text-white transition-all duration-300 hover:bg-[#2E4A3D]"
            >
              新規登録
            </Link>
          </div>
        </nav>
      </header>

      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-12 md:flex-row md:px-16 md:py-24">
          <div className="flex flex-1 flex-col gap-5">
            <h1 className="text-4xl font-bold leading-normal md:text-5xl">
              合格までの距離を、
              <br />
              <span className="text-[#5A8B7D]">時間で測る。</span>
            </h1>
            <p className="text-lg text-[#4B4B4B]">
              記録・予定・振り返りをひとつに。資格学習の積み上げを、毎日見える形に。
            </p>
            <div className="mt-4 flex items-center gap-6">
              <Link
                href="/signup"
                className="rounded-full bg-[#3D5E4E] px-10 py-4 text-base text-white transition-all duration-300 hover:bg-[#2E4A3D]"
              >
                無料で始める
              </Link>
              <GuestLogin
                label={'ゲストで試す'}
                className={
                  'text-[#4B4B4B] underline underline-offset-4 transition-colors duration-300 hover:text-[#3D5E4E]'
                }
              />
            </div>
          </div>
          <div className="w-full flex-1 md:w-auto md:flex-[1.2]">
            <BrowserFrame {...heroScreenshot} />
          </div>
        </section>

        {/* こんな方に */}
        <section className="border-y border-[#C6D8C0] bg-[#DCE8D7] px-6 py-16 md:px-16 md:py-24">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">こんな方に</h2>
            <p className="text-[#4B4B4B]">
              OneTrack は「合格したい人」のための学習記録ツールです
            </p>
          </div>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {forPeople.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 rounded-xl bg-white p-7 shadow-md"
              >
                <div
                  className={`inline-flex w-fit items-center rounded-xl p-3 ${item.bgColor}`}
                >
                  <item.icon className={item.iconColor} size={22} />
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-[#4B4B4B]">{item.context}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 主な機能 */}
        <section className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:gap-24 md:px-16 md:py-24">
          {features.map((feature, index) => (
            <div
              key={feature.code}
              className={`flex flex-col items-center gap-8 md:gap-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full md:flex-[1.2]">
                <BrowserFrame {...feature.screenshot} />
              </div>
              <div className="md:flex-1">
                <p className="mb-3 font-mono text-sm font-bold tracking-[0.2em] text-[#3D5E4E]">
                  {feature.code}
                </p>
                <h2 className="mb-3 text-2xl font-semibold">{feature.title}</h2>
                <p className="text-[#4B4B4B]">{feature.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 使い方 */}
        <section className="bg-[#5A8B7D] px-6 py-10 md:px-16 md:py-14">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold text-white">
              使い方は3ステップ
            </h2>
            <p className="text-white/80">
              むずかしい設定はありません。今日から始められます
            </p>
          </div>
          <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {usageSteps.map((item, index) => (
              <li
                key={item.title}
                className="flex flex-col gap-3 rounded-xl bg-white p-7 shadow-lg"
              >
                <div
                  className={`inline-flex w-fit items-center rounded-xl p-3 ${item.bgColor}`}
                >
                  <item.icon className={item.iconColor} size={22} />
                </div>
                <h3 className="font-bold">
                  <span className="mr-1.5 font-mono text-xs font-bold text-[#3D5E4E]">
                    STEP {index + 1}
                  </span>
                  {item.title}
                </h3>
                <p className="text-[#4B4B4B]">{item.context}</p>
              </li>
            ))}
          </ul>

          {/* 振り返る */}
          <div className="mx-auto mt-6 flex max-w-5xl items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-6 py-4">
            <BarChart2 className="shrink-0 text-white" size={20} />
            <span className="shrink-0 text-white/60">→</span>
            <MessageCircle className="shrink-0 text-white" size={20} />
            <p className="text-white">
              アナリティクスで振り返り、LINE通知が次の一歩を後押しします。
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center bg-[#173324] px-6 py-16 text-center text-white md:py-24">
          <h2 className="mb-3 text-3xl font-bold">まずは、今日の1時間から。</h2>
          <p className="mb-9 text-white/80">
            合格までの積み上げは、最初の記録から始まります。
          </p>
          <GuestLogin
            label={'ゲストで試してみる'}
            className={
              'rounded-full bg-white px-10 py-4 text-base text-[#3D5E4E] transition-all duration-300 hover:bg-[#D8E8C2]'
            }
          />
        </section>
      </main>

      <footer className="flex flex-col gap-2 border-t border-[#E0DCCE] bg-[#F2F0E9] px-6 py-7 text-sm text-gray-500 md:flex-row md:items-center md:justify-between md:px-12">
        <span>© 2026 OneTrack</span>
        <a
          href="https://github.com/mizunatoma/TimeTrackVer2"
          className="text-[#3D5E4E] hover:underline"
        >
          GitHub（ソースコード）
        </a>
      </footer>
    </>
  )
}
