'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function DateTimeSelectionPage() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [selectedPlace, setSelectedPlace] = useState<string>('')
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get the selected place and room from localStorage
    const place = localStorage.getItem('selectedPlace')
    const room = localStorage.getItem('selectedRoom')
    
    if (!place || !room) {
      router.push('/place-selection')
      return
    }
    
    setSelectedPlace(place)
    setSelectedRoom(room)
  }, [router])

  // Generate next 14 days for mobile-friendly display
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      
      const persianDate = date.toLocaleDateString('fa-IR', {
        month: 'short',
        day: 'numeric'
      })
      
      const isoString = date.toISOString().split('T')[0]
      
      dates.push({
        date: isoString,
        persianDate: persianDate,
        dayOfWeek: date.toLocaleDateString('fa-IR', { weekday: 'short' }),
        day: date.getDate(),
        isToday: i === 0
      })
    }
    
    return dates
  }

  // Generate time slots (9 AM to 6 PM in 1-hour intervals for mobile)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      const time24 = `${hour.toString().padStart(2, '0')}:00`
      const persianTime = `${hour}:00`
      
      slots.push({
        value: time24,
        label: persianTime
      })
    }
    return slots
  }

  const durations = [
    { value: '1', label: '۱ ساعت' },
    { value: '2', label: '۲ ساعت' },
    { value: '3', label: '۳ ساعت' },
    { value: '4', label: '۴ ساعت' },
    { value: '6', label: '۶ ساعت' },
    { value: '8', label: '۸ ساعت' }
  ]

  const handleReserveClick = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      alert('لطفا تاریخ، زمان و مدت رزرو را انتخاب کنید')
      return
    }
    setShowConfirmDialog(true)
  }

  const handleConfirmReservation = () => {
    // Calculate end time
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const durationHours = parseFloat(selectedDuration)
    const totalMinutes = hours * 60 + minutes + (durationHours * 60)
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    const endTime = `${endHours}:${endMinutes.toString().padStart(2, '0')}`
    
    // Store all data
    localStorage.setItem('selectedDate', selectedDate)
    localStorage.setItem('selectedTime', selectedTime)
    localStorage.setItem('selectedDuration', selectedDuration)
    localStorage.setItem('endTime', endTime)
    
    console.log('Storing reservation data:', {
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      endTime: endTime,
      place: selectedPlace,
      room: selectedRoom
    })
    
    setShowConfirmDialog(false)
    router.push('/success')
  }

  const getPlaceName = () => {
    return selectedPlace === 'planet1' ? 'پلنت ۱' : 'پلنت ۲'
  }

  const getRoomName = () => {
    const roomNames = {
      'meeting-room': 'اتاق جلسه',
      'phone-booth': 'باکس تماس تلفنی',
      'amphitheater': 'آمفی تئاتر'
    }
    return roomNames[selectedRoom as keyof typeof roomNames] || selectedRoom
  }

  const getFormattedDate = () => {
    if (!selectedDate) return ''
    const date = new Date(selectedDate)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  const calculateEndTime = () => {
    if (!selectedTime || !selectedDuration) return ''
    
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const durationHours = parseFloat(selectedDuration)
    const totalMinutes = hours * 60 + minutes + (durationHours * 60)
    
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    
    return `${endHours}:${endMinutes.toString().padStart(2, '0')}`
  }

  const dates = generateDates()
  const timeSlots = generateTimeSlots()

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
                <h1 className="text-lg font-semibold text-gray-800">رزرو اتاق</h1>
                <p className="text-sm text-gray-600">{getPlaceName()} - {getRoomName()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Date Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">انتخاب تاریخ</h2>
            <div className="flex space-x-2 space-x-reverse">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-gray-600">‹</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-gray-600">›</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
              <div key={day} className="text-center text-sm text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {dates.map((dateObj) => (
              <button
                key={dateObj.date}
                className={`aspect-square rounded-full flex flex-col items-center justify-center text-sm transition-all duration-200 ${
                  selectedDate === dateObj.date
                    ? 'bg-primary-500 text-white shadow-lg'
                    : dateObj.isToday
                    ? 'bg-primary-100 text-primary-600 border border-primary-300'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => setSelectedDate(dateObj.date)}
              >
                <span className="font-medium">{dateObj.day}</span>
                {dateObj.isToday && selectedDate !== dateObj.date && (
                  <span className="text-xs">امروز</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">انتخاب زمان</h2>
            <div className="flex space-x-2 space-x-reverse">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-gray-600">‹</span>
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-gray-600">›</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedTime === slot.value
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                }`}
                onClick={() => setSelectedTime(slot.value)}
              >
                <span className="font-medium">{slot.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">مدت زمان</h2>
          <div className="grid grid-cols-2 gap-3">
            {durations.map((duration) => (
              <button
                key={duration.value}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedDuration === duration.value
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                }`}
                onClick={() => setSelectedDuration(duration.value)}
              >
                <span className="font-medium">{duration.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600">💬</span>
          </button>
          <Button 
            onClick={handleReserveClick}
            className="flex-1 max-w-xs h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
            disabled={!selectedDate || !selectedTime || !selectedDuration}
          >
            رزرو اتاق
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">تایید رزرو</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Reservation Summary Card */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h3 className="font-medium text-primary-800 mb-3 text-center">خلاصه رزرو:</h3>
              <div className="space-y-2 text-sm text-primary-700">
                <div className="flex justify-between">
                  <span>مکان:</span>
                  <span className="font-medium">{getPlaceName()}</span>
                </div>
                <div className="flex justify-between">
                  <span>نوع اتاق:</span>
                  <span className="font-medium">{getRoomName()}</span>
                </div>
                <div className="flex justify-between">
                  <span>تاریخ:</span>
                  <span className="font-medium">{getFormattedDate()}</span>
                </div>
                <div className="flex justify-between">
                  <span>زمان شروع:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>زمان پایان:</span>
                  <span className="font-medium">{calculateEndTime()}</span>
                </div>
                <div className="flex justify-between">
                  <span>مدت زمان:</span>
                  <span className="font-medium">{durations.find(d => d.value === selectedDuration)?.label}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 space-x-reverse">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowConfirmDialog(false)}
              >
                ویرایش
              </Button>
              <Button 
                className="flex-1 bg-primary-500 hover:bg-primary-600"
                onClick={handleConfirmReservation}
              >
                تایید نهایی
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}