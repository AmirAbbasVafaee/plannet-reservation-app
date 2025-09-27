'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center ml-3">
                <div className="text-white text-sm font-bold">P</div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">صفحه یافت نشد</h1>
                <p className="text-sm text-gray-600">سیستم رزرو خدمات پلنت</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 404 Content */}
      <div className="px-4 py-6 lg:px-8 lg:py-12">
        <div className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          {/* 404 Animation */}
          <div className="text-center mb-8 lg:mb-12">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6 lg:mb-8 animate-pulse">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-6xl lg:text-8xl font-bold text-gray-800 mb-4">۴۰۴</h2>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">صفحه یافت نشد</h3>
            <p className="text-gray-600 text-sm lg:text-base">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد</p>
          </div>

          {/* Error Details Card */}
          <Card className="border-0 shadow-lg lg:shadow-xl mb-8">
            <CardContent className="p-6 lg:p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">چه اتفاقی افتاده؟</h4>
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  ممکن است آدرس صفحه اشتباه باشد، صفحه حذف شده باشد، یا شما دسترسی لازم را نداشته باشید.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 lg:space-y-4">
            <Button 
              onClick={handleGoHome}
              className="w-full h-12 lg:h-14 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base lg:text-lg"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              بازگشت به صفحه اصلی
            </Button>
            
            <Button 
              onClick={handleGoBack}
              variant="outline"
              className="w-full h-12 lg:h-14 border-primary-300 text-primary-600 hover:bg-primary-50 font-medium text-base lg:text-lg"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              بازگشت به صفحه قبل
            </Button>
          </div>

          {/* Help Section */}
          <div className="mt-8 lg:mt-12">
            <Card className="border border-primary-200 bg-primary-50">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-primary-800 mb-1">نیاز به کمک دارید؟</h5>
                    <p className="text-primary-700 text-sm lg:text-base">
                      اگر مشکل ادامه دارد، با تیم پشتیبانی تماس بگیرید
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 lg:mt-8">
            <p className="text-xs lg:text-sm text-gray-500">سیستم مدیریت رزرو اتاق‌های اداری پلنت</p>
          </div>
        </div>
      </div>
    </div>
  )
}

