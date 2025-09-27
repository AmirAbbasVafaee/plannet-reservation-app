'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toJalaali, toGregorian, jalaaliMonthLength, isLeapJalaaliYear } from 'jalaali-js'

export default function DateTimeSelectionPage() {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedDuration, setSelectedDuration] = useState<string>('')
  const [selectedPlace, setSelectedPlace] = useState<string>('')
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [selectedDateFormatted, setSelectedDateFormatted] = useState<string>('')
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null)
  const router = useRouter()

  // Convert numbers to Farsi numerals
  const toFarsiNumber = (num: number): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)])
  }

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
    
    // Set current month to current Jalali month
    const today = new Date()
    const currentJalali = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate())
    const currentJalaliMonthStart = toGregorian(currentJalali.jy, currentJalali.jm, 1)
    setCurrentMonth(new Date(currentJalaliMonthStart.gy, currentJalaliMonthStart.gm - 1, currentJalaliMonthStart.gd))
  }, [router])

  // Generate calendar dates for current Jalali month
  const generateCalendarDates = () => {
    const dates: Array<{
      date?: string;
      day?: number;
      farsiDay?: string;
      dayOfWeek?: string;
      isToday?: boolean;
      isPastDate?: boolean;
      isEmpty: boolean;
    }> = []
    
    // If currentMonth is not set yet, return empty array
    if (!currentMonth) return dates
    
    // Get current Jalali date
    const today = new Date()
    const currentJalali = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate())
    
    // Get the Jalali month we're displaying
    const displayJalali = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
    
    // Get number of days in the Jalali month
    const daysInMonth = jalaaliMonthLength(displayJalali.jy, displayJalali.jm)
    
    // Get first day of Jalali month and calculate starting day of week
    const firstDayGregorian = toGregorian(displayJalali.jy, displayJalali.jm, 1)
    const firstDayDate = new Date(firstDayGregorian.gy, firstDayGregorian.gm - 1, firstDayGregorian.gd)
    const gregorianDayOfWeek = firstDayDate.getDay() // 0 = Sunday, 6 = Saturday
    
    // Convert to Persian week format (Saturday = 0, Sunday = 1, ..., Friday = 6)
    const startingDayOfWeek = (gregorianDayOfWeek + 1) % 7
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push({ isEmpty: true })
    }
    
    // Add all days of the Jalali month
    for (let day = 1; day <= daysInMonth; day++) {
      const jalaliDate = { jy: displayJalali.jy, jm: displayJalali.jm, jd: day }
      const gregorianDate = toGregorian(jalaliDate.jy, jalaliDate.jm, jalaliDate.jd)
      const gregorianDateObj = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd)
      const isoString = gregorianDateObj.toISOString().split('T')[0]
      
      // Check if this is today
      const isToday = jalaliDate.jy === currentJalali.jy && 
                     jalaliDate.jm === currentJalali.jm && 
                     jalaliDate.jd === currentJalali.jd
      
      // Check if this is a past date (compare Jalali dates directly)
      const isPastDate = jalaliDate.jy < currentJalali.jy || 
                        (jalaliDate.jy === currentJalali.jy && jalaliDate.jm < currentJalali.jm) ||
                        (jalaliDate.jy === currentJalali.jy && jalaliDate.jm === currentJalali.jm && jalaliDate.jd < currentJalali.jd)
      
      // Get Persian weekday names
      const persianWeekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
      const weekdayIndex = gregorianDateObj.getDay() // 0 = Sunday, 6 = Saturday
      const persianWeekday = persianWeekdays[weekdayIndex]
      
      dates.push({
        date: isoString,
        day: day,
        farsiDay: toFarsiNumber(day),
        dayOfWeek: persianWeekday,
        isToday: isToday,
        isPastDate: isPastDate,
        isEmpty: false
      })
    }
    
    return dates
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    if (!currentMonth) return
    
    // Convert current month to Jalali
    const currentJalali = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
    
    // Go to previous Jalali month
    let prevJalaliMonth = currentJalali.jm - 1
    let prevJalaliYear = currentJalali.jy
    
    if (prevJalaliMonth < 1) {
      prevJalaliMonth = 12
      prevJalaliYear -= 1
    }
    
    // Check if we can go to previous month (don't allow past months)
    const today = new Date()
    const todayJalali = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate())
    
    if (prevJalaliYear > todayJalali.jy || 
        (prevJalaliYear === todayJalali.jy && prevJalaliMonth >= todayJalali.jm)) {
      // Convert back to Gregorian
      const prevJalaliMonthStart = toGregorian(prevJalaliYear, prevJalaliMonth, 1)
      setCurrentMonth(new Date(prevJalaliMonthStart.gy, prevJalaliMonthStart.gm - 1, prevJalaliMonthStart.gd))
    }
  }

  const goToNextMonth = () => {
    if (!currentMonth) return
    
    // Convert current month to Jalali
    const currentJalali = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
    
    // Go to next Jalali month
    let nextJalaliMonth = currentJalali.jm + 1
    let nextJalaliYear = currentJalali.jy
    
    if (nextJalaliMonth > 12) {
      nextJalaliMonth = 1
      nextJalaliYear += 1
    }
    
    // Convert back to Gregorian
    const nextJalaliMonthStart = toGregorian(nextJalaliYear, nextJalaliMonth, 1)
    setCurrentMonth(new Date(nextJalaliMonthStart.gy, nextJalaliMonthStart.gm - 1, nextJalaliMonthStart.gd))
  }

  // Get Jalali month and year display
  const getMonthYearDisplay = () => {
    if (!currentMonth) return 'در حال بارگذاری...'
    
    const jalaliDate = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
    const jalaliMonths = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ]
    
    return `${jalaliMonths[jalaliDate.jm - 1]} ${toFarsiNumber(jalaliDate.jy)}`
  }

  // Generate time slots (9 AM to 6 PM in 1-hour intervals for mobile)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 17; hour++) {
      const time24 = `${hour.toString().padStart(2, '0')}:00`
      const persianTime = `${toFarsiNumber(hour)}:۰۰`
      
      slots.push({
        value: time24,
        label: persianTime
      })
    }
    return slots
  }

  const durations = [
    { value: '1', label: `${toFarsiNumber(1)} ساعت` },
    { value: '2', label: `${toFarsiNumber(2)} ساعت` },
    { value: '3', label: `${toFarsiNumber(3)} ساعت` },
    { value: '4', label: `${toFarsiNumber(4)} ساعت` },
    { value: '6', label: `${toFarsiNumber(6)} ساعت` },
    { value: '8', label: `${toFarsiNumber(8)} ساعت` }
  ]

  const handleReserveClick = () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      alert('لطفا تاریخ، زمان و مدت رزرو را انتخاب کنید')
      return
    }
    setShowConfirmDialog(true)
    setIsClosing(false)
    setIsOpening(true)
    // Reset opening state after animation
    setTimeout(() => {
      setIsOpening(false)
    }, 300)
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowConfirmDialog(false)
      setIsClosing(false)
    }, 300) // Match the animation duration
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


  const calculateEndTime = () => {
    if (!selectedTime || !selectedDuration) return ''
    
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const durationHours = parseFloat(selectedDuration)
    const totalMinutes = hours * 60 + minutes + (durationHours * 60)
    
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    
    return `${endHours}:${endMinutes.toString().padStart(2, '0')}`
  }

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
                <h1 className="text-lg font-semibold text-gray-800">انتخاب تاریخ و زمان</h1>
                <p className="text-sm text-gray-600">{getPlaceName()} - {getRoomName()} - مرحله ۳ از ۴</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              مرحله ۳
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 pb-24 space-y-4">
        {/* Date Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-800">انتخاب تاریخ</h2>
            <div className="flex items-center space-x-3 space-x-reverse">
              <button 
                onClick={goToPreviousMonth}
                disabled={!currentMonth || (() => {
                  const today = new Date()
                  const currentJalali = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate())
                  const displayJalali = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
                  return displayJalali.jy === currentJalali.jy && displayJalali.jm === currentJalali.jm
                })()}
                className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                  !currentMonth || (() => {
                    const today = new Date()
                    const currentJalali = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate())
                    const displayJalali = toJalaali(currentMonth.getFullYear(), currentMonth.getMonth() + 1, currentMonth.getDate())
                    return displayJalali.jy === currentJalali.jy && displayJalali.jm === currentJalali.jm
                  })()
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">‹</span>
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                {getMonthYearDisplay()}
              </span>
              <button 
                onClick={goToNextMonth}
                disabled={!currentMonth}
                className={`w-7 h-7 rounded-full border flex items-center justify-center ${
                  !currentMonth 
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-gray-600 text-sm">›</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDates().map((dateObj, index) => (
              <button
                key={dateObj.isEmpty ? `empty-${index}` : dateObj.date}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all duration-200 ${
                  dateObj.isEmpty 
                    ? 'invisible'
                    : dateObj.isPastDate
                    ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                    : selectedDate === dateObj.date
                    ? 'bg-primary-500 text-white shadow-md'
                    : dateObj.isToday
                    ? 'bg-primary-100 text-primary-600 border border-primary-300'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => {
                  if (!dateObj.isEmpty && !dateObj.isPastDate && dateObj.date) {
                    setSelectedDate(dateObj.date)
                    // Use the exact same data that the calendar already calculated
                    const jalaliMonths = [
                      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
                      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
                    ]
                    // Get current Jalali year and month from the display
                    const displayJalali = toJalaali(currentMonth!.getFullYear(), currentMonth!.getMonth() + 1, currentMonth!.getDate())
                    const formattedDate = `${dateObj.dayOfWeek} ${dateObj.farsiDay} ${jalaliMonths[displayJalali.jm - 1]} ${toFarsiNumber(displayJalali.jy)}`
                    setSelectedDateFormatted(formattedDate)
                  }
                }}
                disabled={dateObj.isEmpty || dateObj.isPastDate}
              >
                <span className="font-medium">{dateObj.farsiDay}</span>
                {dateObj.isToday && selectedDate !== dateObj.date && (
                  <span className="text-[10px] leading-none">امروز</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">انتخاب زمان</h2>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedTime === slot.value
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                }`}
                onClick={() => setSelectedTime(slot.value)}
              >
                <span className="font-medium text-sm">{slot.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <h2 className="text-base font-semibold text-gray-800 mb-3">مدت زمان</h2>
          <div className="grid grid-cols-3 gap-2">
            {durations.map((duration) => (
              <button
                key={duration.value}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedDuration === duration.value
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                }`}
                onClick={() => setSelectedDuration(duration.value)}
              >
                <span className="font-medium text-sm">{duration.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={handleReserveClick}
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
          disabled={!selectedDate || !selectedTime || !selectedDuration}
        >
          رزرو اتاق
        </Button>
      </div>

      {/* Bottom Sliding Modal */}
      {showConfirmDialog && (
        <>
          {/* Backdrop with fade animation */}
          <div 
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : isOpening ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseModal}
          />
          
          {/* Bottom Modal with slide-up animation */}
          <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
            isClosing ? 'translate-y-full' : isOpening ? 'translate-y-full' : 'translate-y-0'
          }`}>
            {/* Modal Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            {/* Modal Content */}
            <div className="px-6 pb-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">تایید رزرو</h2>
                <p className="text-sm text-gray-600 mt-1">لطفاً اطلاعات رزرو را بررسی کنید</p>
              </div>
              
              {/* Reservation Summary Card */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6">
                <h3 className="font-medium text-primary-800 mb-4 text-center">خلاصه رزرو:</h3>
                <div className="space-y-3 text-sm text-primary-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">مکان:</span>
                    <span className="font-medium text-gray-800">{getPlaceName()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">نوع اتاق:</span>
                    <span className="font-medium text-gray-800">{getRoomName()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">تاریخ:</span>
                    <span className="font-medium text-gray-800">{selectedDateFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">زمان شروع:</span>
                    <span className="font-medium text-gray-800">{selectedTime.replace(/\d/g, (digit) => toFarsiNumber(parseInt(digit)))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">زمان پایان:</span>
                    <span className="font-medium text-gray-800">{calculateEndTime().replace(/\d/g, (digit) => toFarsiNumber(parseInt(digit)))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">مدت زمان:</span>
                    <span className="font-medium text-gray-800">{durations.find(d => d.value === selectedDuration)?.label}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 space-x-reverse">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 border-primary-300 text-primary-600 hover:bg-primary-50"
                  onClick={handleCloseModal}
                >
                  ویرایش
                </Button>
                <Button 
                  className="flex-1 h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium"
                  onClick={handleConfirmReservation}
                >
                  تایید نهایی
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}