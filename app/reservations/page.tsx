'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Reservation {
  place: string
  room: string
  date: string
  time: string
  duration: string
  id: string
  createdAt: string
  status: string
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get reservations from localStorage
    const savedReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(savedReservations)
    setLoading(false)
  }, [])

  const handleNewReservation = () => {
    router.push('/place-selection')
  }

  const getPlaceName = (place: string) => {
    return place === 'planet1' ? 'پلنت ۱' : 'پلنت ۲'
  }

  const getRoomName = (room: string) => {
    const roomNames = {
      'meeting-room': 'اتاق جلسه',
      'phone-booth': 'باکس تماس تلفنی',
      'amphitheater': 'آمفی تئاتر'
    }
    return roomNames[room as keyof typeof roomNames] || room
  }

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  const getDurationLabel = (duration: string) => {
    const durations: { [key: string]: string } = {
      '0.5': '۳۰ دقیقه',
      '1': '۱ ساعت',
      '1.5': '۱.۵ ساعت',
      '2': '۲ ساعت',
      '2.5': '۲.۵ ساعت',
      '3': '۳ ساعت',
      '4': '۴ ساعت',
      '5': '۵ ساعت',
      '6': '۶ ساعت',
      '8': '۸ ساعت'
    }
    return durations[duration] || duration
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'confirmed': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'cancelled': 'bg-red-100 text-red-700'
    }
    
    const statusLabels = {
      'confirmed': 'تایید شده',
      'pending': 'در انتظار',
      'cancelled': 'لغو شده'
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'}`}>
        {statusLabels[status as keyof typeof statusLabels] || status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center ml-4">
              <div className="text-white text-lg font-bold">پ</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">سیستم رزرو خدمات پلنت</h1>
              <p className="text-gray-600">پروفایل کاربر</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center ml-2">
              <span className="text-gray-600 text-sm">👤</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-800">پروفایل</div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="font-semibold text-gray-800">مهدی فتحی</h3>
                <p className="text-sm text-gray-600">اعتبار: ۸ ساعت</p>
              </div>
              <div className="space-y-3 text-sm">
                <Button 
                  className="w-full bg-primary-100 text-primary-700 hover:bg-primary-200 border-0"
                  variant="outline"
                >
                  + خرید بسته
                </Button>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="p-2 bg-gray-50 rounded flex items-center justify-between">
                    <span>سفارش های من</span>
                    <span>📋</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex items-center justify-between">
                    <span>پرداخت های من</span>
                    <span>💳</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex items-center justify-between">
                    <span>رزرو</span>
                    <span>📅</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded flex items-center justify-between">
                    <span>خروج</span>
                    <span>🚪</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservations Table */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">سفارش های من:</CardTitle>
                <Button 
                  onClick={handleNewReservation}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  رزرو جدید
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">هیچ رزروی وجود ندارد</h3>
                  <p className="text-gray-600 mb-6">اولین رزرو خود را ایجاد کنید</p>
                  <Button 
                    onClick={handleNewReservation}
                    className="bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    رزرو جدید
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">عملیات</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">تاریخ رزرو شده</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">بخش رزرو شده</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">زمان ثبت سفارش</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-700">شماره رزرو</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((reservation, index) => (
                        <tr key={reservation.id} className="border-b border-gray-100">
                          <td className="py-4 px-2">
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                className="text-xs h-8 px-3 border-primary-300 text-primary-600 hover:bg-primary-50"
                              >
                                ویرایش
                              </Button>
                              {getStatusBadge(reservation.status)}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="text-sm">
                              <div className="font-medium">{getFormattedDate(reservation.date)}</div>
                              <div className="text-gray-600 text-xs">
                                {reservation.time} - {getDurationLabel(reservation.duration)}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="text-sm">
                              <div className="font-medium">{getRoomName(reservation.room)}</div>
                              <div className="text-gray-600 text-xs">{getPlaceName(reservation.place)}</div>
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="text-sm text-gray-600">
                              {getFormattedDate(reservation.createdAt)}
                            </div>
                          </td>
                          <td className="py-4 px-2">
                            <div className="text-sm font-medium text-primary-600">
                              {reservation.id}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
