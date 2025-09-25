'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RoomSelectionPage() {
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [selectedPlace, setSelectedPlace] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Get the selected place from localStorage
    const place = localStorage.getItem('selectedPlace')
    if (place) {
      setSelectedPlace(place)
    } else {
      // If no place selected, redirect back
      router.push('/place-selection')
    }
  }, [router])

  const handleContinue = () => {
    if (!selectedRoom) {
      alert('لطفا یک نوع اتاق را انتخاب کنید')
      return
    }
    
    // Store the selected room in localStorage
    localStorage.setItem('selectedRoom', selectedRoom)
    router.push('/date-time-selection')
  }

  const roomTypes = [
    {
      id: 'meeting-room',
      name: 'اتاق جلسه',
      description: 'مناسب برای جلسات تیمی و ارائه',
      capacity: '۸-۱۲ نفر',
      features: ['پروژکتور', 'وایت برد', 'میز کنفرانس', 'صندلی راحت'],
      icon: '👥'
    },
    {
      id: 'phone-booth',
      name: 'باکس تماس تلفنی',
      description: 'فضای خصوصی برای تماس‌های مهم',
      capacity: '۱ نفر',
      features: ['ساکت و خصوصی', 'صندلی راحت', 'میز کار', 'اتصال برق'],
      icon: '📞'
    },
    {
      id: 'amphitheater',
      name: 'آمفی تئاتر',
      description: 'مناسب برای ارائه‌های بزرگ و رویدادها',
      capacity: '۵۰-۱۰۰ نفر',
      features: ['سیستم صوتی', 'پروژکتور بزرگ', 'میکروفن', 'نورپردازی'],
      icon: '🎭'
    }
  ]

  const getPlaceName = () => {
    return selectedPlace === 'planet1' ? 'پلنت ۱' : 'پلنت ۲'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 mx-auto bg-primary-500 rounded-xl flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <div className="text-primary-500 text-xl font-bold">P</div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">سیستم رزرو خدمات پلنت</h1>
          <p className="text-gray-600">مکان انتخابی: <span className="font-semibold text-primary-600">{getPlaceName()}</span></p>
        </div>

        {/* Room Selection */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">نوع اتاق مورد نظر خود را انتخاب کنید</h2>
          </div>

          <div className="space-y-4 mb-8">
            {roomTypes.map((room) => (
              <Card 
                key={room.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                  selectedRoom === room.id 
                    ? 'border-primary-500 bg-primary-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6 space-x-reverse">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                        <div className="text-3xl">{room.icon}</div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                          
                          {/* Capacity Badge */}
                          <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                            ظرفیت: {room.capacity}
                          </div>
                          
                          {/* Features */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">امکانات:</h4>
                            <div className="flex flex-wrap gap-2">
                              {room.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                  <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection Indicator */}
                        <div className="flex-shrink-0">
                          {selectedRoom === room.id ? (
                            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={handleContinue}
              className="w-full max-w-md h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
              disabled={!selectedRoom}
            >
              ادامه
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
