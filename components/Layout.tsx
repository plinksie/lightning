import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  darkMode: boolean
}

export default function Layout({ children, darkMode }: LayoutProps) {
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </main>
    </div>
  )
}