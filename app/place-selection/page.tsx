'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PlaceSelectionPage() {
  const [selectedPlace, setSelectedPlace] = useState<string>('')
  const router = useRouter()

  const handleContinue = () => {
    if (!selectedPlace) {
      alert('لطفا یک مکان را انتخاب کنید')
      return
    }
    
    // Store the selected place in localStorage for now
    localStorage.setItem('selectedPlace', selectedPlace)
    router.push('/room-selection')
  }

  const places = [
    {
      id: 'planet1',
      name: 'پلنت ۱',
      description: 'دفتر مرکزی پلنت',
      address: 'تهران، خیابان ولیعصر',
      icon: '🌍'
    },
    {
      id: 'planet2', 
      name: 'پلنت ۲',
      description: 'شعبه دوم پلنت',
      address: 'تهران، خیابان پاسداران',
      icon: '🌎'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Step Indicator */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center ml-3">
                <div className="text-white text-sm font-bold">P</div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">انتخاب مکان</h1>
                <p className="text-sm text-gray-600">مرحله ۱ از ۴</p>
              </div>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              مرحله ۱
            </div>
          </div>
        </div>
      </div>

      {/* Place Selection Content */}
      <div className="px-4 py-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-800 mb-2">مکان مورد نظر خود را انتخاب کنید</h2>
            <p className="text-sm text-gray-600">یکی از دفاتر پلنت را انتخاب کنید</p>
          </div>

          <div className="space-y-3">
            {places.map((place) => (
              <Card 
                key={place.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                  selectedPlace === place.id 
                    ? 'border-primary-500 bg-primary-50 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-primary-300'
                }`}
                onClick={() => setSelectedPlace(place.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-2xl">{place.icon}</div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{place.name}</h3>
                          <p className="text-gray-600 text-sm mb-1">{place.description}</p>
                          <p className="text-xs text-gray-500">{place.address}</p>
                        </div>
                        
                        {/* Selection Indicator */}
                        <div className="flex-shrink-0">
                          {selectedPlace === place.id ? (
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
          disabled={!selectedPlace}
        >
          ادامه
        </Button>
      </div>
    </div>
  )
}
