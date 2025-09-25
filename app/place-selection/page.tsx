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
          <p className="text-gray-600 text-lg">لطفا نوع سرویس خود را انتخاب کنید</p>
        </div>

        {/* Place Selection */}
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">مکان مورد نظر خود را انتخاب کنید</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{place.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{place.name}</h3>
                  <p className="text-gray-600 mb-2">{place.description}</p>
                  <p className="text-sm text-gray-500">{place.address}</p>
                  
                  {selectedPlace === place.id && (
                    <div className="mt-4">
                      <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={handleContinue}
              className="w-full max-w-md h-12 bg-primary-500 hover:bg-primary-600 text-white font-medium text-base"
              disabled={!selectedPlace}
            >
              ادامه
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
