'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ReservationData {
  place: string
  room: string
  date: string
  time: string
  duration: string
  endTime: string
  id: string
}

export default function SuccessPage() {
  const [reservationData, setReservationData] = useState<ReservationData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)
  const router = useRouter()

  useEffect(() => {
    // Only run this effect once
    if (hasInitialized.current) return
    hasInitialized.current = true

    // Get all reservation data from localStorage FIRST
    const place = localStorage.getItem('selectedPlace')
    const room = localStorage.getItem('selectedRoom')
    const date = localStorage.getItem('selectedDate')
    const time = localStorage.getItem('selectedTime')
    const duration = localStorage.getItem('selectedDuration')
    const endTime = localStorage.getItem('endTime')

    console.log('Success page - localStorage data:', {
      place, room, date, time, duration, endTime
    })

    if (!place || !room || !date || !time || !duration) {
      console.log('Missing data, redirecting to place-selection')
      router.push('/place-selection')
      return
    }

    // Generate a simple reservation ID
    const reservationId = '#' + Math.random().toString(36).substr(2, 6).toUpperCase()

    const reservation = {
      place,
      room,
      date,
      time,
      duration,
      endTime: endTime || calculateEndTime(time, duration),
      id: reservationId
    }

    // Set the reservation data FIRST
    setReservationData(reservation)
    setIsLoading(false)

    // Save the reservation to localStorage reservations
    const existingReservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const fullReservation = {
      ...reservation,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    }
    existingReservations.push(fullReservation)
    localStorage.setItem('reservations', JSON.stringify(existingReservations))

    console.log('Reservation saved successfully:', fullReservation)

    // DON'T clear localStorage here - let the user see the success page first
    // We'll clear it when they navigate away or start a new reservation
  }, [])

  // Cleanup effect to clear localStorage when component unmounts
  useEffect(() => {
    return () => {
      // Clear localStorage when leaving the success page
      localStorage.removeItem('selectedPlace')
      localStorage.removeItem('selectedRoom')
      localStorage.removeItem('selectedDate')
      localStorage.removeItem('selectedTime')
      localStorage.removeItem('selectedDuration')
      localStorage.removeItem('endTime')
    }
  }, [])

  const handleViewReservations = () => {
    router.push('/reservations')
  }

  const handleNewReservation = () => {
    // Clear the individual selections when starting a new reservation
    localStorage.removeItem('selectedPlace')
    localStorage.removeItem('selectedRoom')
    localStorage.removeItem('selectedDate')
    localStorage.removeItem('selectedTime')
    localStorage.removeItem('selectedDuration')
    localStorage.removeItem('endTime')
    router.push('/place-selection')
  }

  const getPlaceName = () => {
    return reservationData?.place === 'planet1' ? 'پلنت ۱' : 'پلنت ۲'
  }

  const getRoomName = () => {
    const roomNames = {
      'meeting-room': 'اتاق جلسه',
      'phone-booth': 'باکس تماس تلفنی',
      'amphitheater': 'آمفی تئاتر'
    }
    return roomNames[reservationData?.room as keyof typeof roomNames] || reservationData?.room
  }

  const getFormattedDate = () => {
    if (!reservationData?.date) return ''
    const date = new Date(reservationData.date)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  const getDurationLabel = () => {
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
    return durations[reservationData?.duration || ''] || reservationData?.duration
  }

  const calculateEndTime = (time: string, duration: string) => {
    if (!time || !duration) return ''
    
    const [hours, minutes] = time.split(':').map(Number)
    const durationHours = parseFloat(duration)
    const totalMinutes = hours * 60 + minutes + (durationHours * 60)
    
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    
    return `${endHours}:${endMinutes.toString().padStart(2, '0')}`
  }

  if (isLoading || !reservationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال پردازش...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center ml-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">رزرو موفقیت‌آمیز</h1>
                <p className="text-sm text-gray-600">رزرو شما با موفقیت ثبت شد</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Content */}
      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">تبریک!</h2>
            <p className="text-gray-600 text-sm">رزرو شما با موفقیت ثبت شد</p>
          </div>

          {/* Reservation Details */}
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2">جزئیات رزرو</h3>
                <div className="text-xs text-primary-600 font-medium bg-primary-50 inline-block px-2 py-1 rounded-full">
                  شماره رزرو: {reservationData.id}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600 text-xs">مکان:</span>
                  <span className="font-medium text-gray-800 text-xs">{getPlaceName()}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600 text-xs">نوع اتاق:</span>
                  <span className="font-medium text-gray-800 text-xs">{getRoomName()}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600 text-xs">تاریخ:</span>
                  <span className="font-medium text-gray-800 text-xs">{getFormattedDate()}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600 text-xs">زمان:</span>
                  <span className="font-medium text-gray-800 text-xs">
                    {reservationData.time} - {reservationData.endTime}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600 text-xs">مدت زمان:</span>
                  <span className="font-medium text-gray-800 text-xs">{getDurationLabel()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pinned Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3">
        <Button 
          onClick={handleViewReservations}
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium"
        >
          مشاهده تمام رزروها
        </Button>
        
        <Button 
          onClick={handleNewReservation}
          variant="outline"
          className="w-full h-12 border-primary-300 text-primary-600 hover:bg-primary-50"
        >
          رزرو جدید
        </Button>
      </div>
    </div>
  )
}
