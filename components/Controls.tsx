// import { useState } from 'react'
// import * as ToggleGroup from '@radix-ui/react-toggle-group'
// import * as Switch from '@radix-ui/react-switch'

// interface ControlsProps {
//   darkMode: boolean
//   setDarkMode: (value: boolean) => void
//   showLightning: boolean
//   setShowLightning: (value: boolean) => void
//   showAurora: boolean
//   setShowAurora: (value: boolean) => void
//   mapType: string
//   setMapType: (value: string) => void
//   setSelectedLocation: (value: string) => void
// }

// export default function Controls({
//   darkMode,
//   setDarkMode,
//   showLightning,
//   setShowLightning,
//   showAurora,
//   setShowAurora,
//   mapType,
//   setMapType,
//   setSelectedLocation,
// }: ControlsProps) {
//   const [location, setLocation] = useState('')

//   const handleLocationSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     setSelectedLocation(location)
//     setLocation('')
//   }

//   return (
//     <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
//       <div className="flex flex-col space-y-4">
//         <div className="flex items-center justify-between">
//           <label htmlFor="dark-mode" className="text-sm font-medium">
//             Dark Mode
//           </label>
//           <Switch.Root
//             id="dark-mode"
//             checked={darkMode}
//             onCheckedChange={setDarkMode}
//             className="w-11 h-6 bg-gray-200 rounded-full relative dark:bg-gray-700 transition-colors duration-300"
//           >
//             <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
//           </Switch.Root>
//         </div>
//         <ToggleGroup.Root
//           type="multiple"
//           className="flex space-x-2"
//           value={[showLightning ? 'lightning' : '', showAurora ? 'aurora' : '']}
//           onValueChange={(value) => {
//             setShowLightning(value.includes('lightning'))
//             setShowAurora(value.includes('aurora'))
//           }}
//         >
//           <ToggleGroup.Item
//             value="lightning"
//             className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium"
//           >
//             Lightning
//           </ToggleGroup.Item>
//           <ToggleGroup.Item
//             value="aurora"
//             className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium"
//           >
//             Aurora
//           </ToggleGroup.Item>
//         </ToggleGroup.Root>
//         <ToggleGroup.Root
//           type="single"
//           value={mapType}
//           onValueChange={(value) => value && setMapType(value)}
//           className="flex space-x-2"
//         >
//           <ToggleGroup.Item
//             value="standard"
//             className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium"
//           >
//             Standard
//           </ToggleGroup.Item>
//           <ToggleGroup.Item
//             value="satellite"
//             className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium"
//           >
//             Satellite
//           </ToggleGroup.Item>
//         </ToggleGroup.Root>
//         <form onSubmit={handleLocationSubmit} className="flex space-x-2">
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Enter location"
//             className="flex-grow px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm"
//           />
//           <button
//             type="submit"
//             className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium"
//           >
//             Go
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

import { Dispatch, SetStateAction } from 'react'

interface LocationData {
  name: string
  lat: number
  lon: number
}

interface ControlsProps {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
  showLightning: boolean
  setShowLightning: Dispatch<SetStateAction<boolean>>
  showAurora: boolean
  setShowAurora: Dispatch<SetStateAction<boolean>>
  mapType: string
  setMapType: Dispatch<SetStateAction<string>>
  onLocationSelect: (location: LocationData) => void
}

export default function Controls({
  darkMode,
  setDarkMode,
  showLightning,
  setShowLightning,
  showAurora,
  setShowAurora,
  mapType,
  setMapType,
  onLocationSelect
}: ControlsProps) {
  // Control component implementation
  return (
    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      {/* Add control elements here */}
    </div>
  )
}