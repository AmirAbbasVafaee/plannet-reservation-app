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
    <div className="min-h-screen bg-gray-50">
      {/* Header with User Info */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center ml-3">
                <div className="text-white text-sm font-bold">P</div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">مدیریت رزروها</h1>
                <p className="text-sm text-gray-600">پروفایل کاربر</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-2">
                <span className="text-gray-600 text-sm">👤</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-gray-800">مهدی فتحی</div>
                <div className="text-xs text-gray-500">اعتبار: ۸ ساعت</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Content */}
      <div className="px-4 py-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* User Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">مهدی فتحی</h3>
                  <p className="text-sm text-gray-600">اعتبار: ۸ ساعت</p>
                </div>
                <Button 
                  className="bg-primary-100 text-primary-700 hover:bg-primary-200 border-0 text-xs"
                  variant="outline"
                >
                  + خرید بسته
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Reservations Table */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">سفارش های من</CardTitle>
                <Button 
                  onClick={handleNewReservation}
                  className="bg-primary-500 hover:bg-primary-600 text-white text-sm"
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
                <div className="space-y-3">
                  {reservations.map((reservation, index) => (
                    <Card key={reservation.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 space-x-reverse mb-2">
                              <h4 className="font-medium text-gray-800">{getRoomName(reservation.room)}</h4>
                              {getStatusBadge(reservation.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600 text-xs">تاریخ:</span>
                                <div className="font-medium">{getFormattedDate(reservation.date)}</div>
                                <div className="text-gray-600 text-xs">
                                  {reservation.time} - {getDurationLabel(reservation.duration)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600 text-xs">مکان:</span>
                                <div className="font-medium">{getPlaceName(reservation.place)}</div>
                                <div className="text-gray-600 text-xs">
                                  {getFormattedDate(reservation.createdAt)}
                                </div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-xs text-primary-600 font-medium">
                                {reservation.id}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button 
                              size="sm"
                              variant="outline"
                              className="text-xs h-8 px-3 border-primary-300 text-primary-600 hover:bg-primary-50"
                            >
                              ویرایش
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pinned New Reservation Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={handleNewReservation}
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
        >
          رزرو جدید
        </Button>
      </div>
    </div>
  )
}
