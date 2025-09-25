import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'سیستم رزرو خدمات پلنت',
  description: 'سیستم مدیریت رزرو اتاق‌ها و خدمات اداری',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="kalameh-text bg-gray-50 min-h-screen">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
