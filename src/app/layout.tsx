import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  isDarkMode: boolean
}

export default function Layout({ children, isDarkMode }: LayoutProps) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <main className="bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </main>
    </div>
  )
}