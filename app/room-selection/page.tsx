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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Context */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center ml-3">
                <div className="text-white text-sm font-bold">P</div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">انتخاب نوع اتاق</h1>
                <p className="text-sm text-gray-600">{getPlaceName()} - مرحله ۲ از ۴</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              مرحله ۲
            </div>
          </div>
        </div>
      </div>

      {/* Room Selection Content */}
      <div className="px-4 py-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-2">نوع اتاق مورد نظر خود را انتخاب کنید</h2>
            <p className="text-sm text-gray-600">بر اساس نیاز خود یکی از گزینه‌ها را انتخاب کنید</p>
          </div>

          <div className="space-y-3">
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
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-2xl">{room.icon}</div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{room.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{room.description}</p>
                          
                          {/* Capacity Badge */}
                          <div className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium mb-3">
                            ظرفیت: {room.capacity}
                          </div>
                          
                          {/* Features */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-700 mb-1">امکانات:</h4>
                            <div className="flex flex-wrap gap-1">
                              {room.features.slice(0, 3).map((feature, index) => (
                                <div key={index} className="flex items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                  <div className="w-1 h-1 bg-primary-400 rounded-full mr-1"></div>
                                  {feature}
                                </div>
                              ))}
                              {room.features.length > 3 && (
                                <div className="text-xs text-gray-500 px-2 py-1">
                                  +{room.features.length - 3} بیشتر
                                </div>
                              )}
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
        </div>
      </div>

      {/* Pinned Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          onClick={handleContinue}
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
          disabled={!selectedRoom}
        >
          ادامه
        </Button>
      </div>
    </div>
  )
}
