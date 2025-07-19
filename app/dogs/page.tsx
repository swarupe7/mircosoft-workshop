
'use client'
import { useState, useEffect } from 'react'

interface Dog {
  id: string;
  name: string;
  breed: string;
  available: boolean;
}

export default function Dogs() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('all')
  const [showAvailable, setShowAvailable] = useState(false)

  useEffect(() => {
    fetchDogs()
    fetchBreeds()
  }, [selectedBreed, showAvailable])

  const fetchBreeds = async () => {
    const response = await fetch('/api/dogs/breeds')
    const breeds = await response.json()
    setBreeds(breeds)
  }

  const fetchDogs = async () => {
    const params = new URLSearchParams()
    if (selectedBreed !== 'all') params.append('breed', selectedBreed)
    if (showAvailable) params.append('available', 'true')
    
    const response = await fetch(`/api/dogs?${params.toString()}`)
    const dogs = await response.json()
    setDogs(dogs)
  }

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center">
        <select 
          value={selectedBreed} 
          onChange={(e) => setSelectedBreed(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Breeds</option>
          {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showAvailable}
            onChange={(e) => setShowAvailable(e.target.checked)}
          />
          Show available dogs only
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <div key={dog.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{dog.name}</h2>
            <p className="text-gray-700">{dog.breed}</p>
            <p className="text-gray-500">{dog.available ? 'Available' : 'Not available'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
