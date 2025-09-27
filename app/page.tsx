'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      alert('لطفا نام کاربری و رمز عبور را وارد کنید')
      return
    }
    
    setLoading(true)
    // Simulate login process
    setTimeout(() => {
      setLoading(false)
      // For now, accept any credentials
      router.push('/place-selection')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-24 h-24 mx-auto bg-primary-500 rounded-2xl flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <div className="text-primary-500 text-2xl font-bold">P</div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">سیستم رزرو خدمات پلنت</h1>
          <p className="text-gray-600">برای ورود به سیستم، اطلاعات خود را وارد کنید</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">ورود به سیستم</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="نام کاربری خود را وارد کنید"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 text-right"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-right"
                  dir="rtl"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base mt-6"
                disabled={loading}
              >
                {loading ? 'در حال ورود...' : 'ورود'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          سیستم مدیریت رزرو اتاق‌های اداری پلنت
        </div>
      </div>
    </div>
  )
}