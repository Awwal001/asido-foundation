'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAVIGATION } from '@/lib/constants'

type SecondaryHref = typeof NAVIGATION.secondary[number]['href']

export default function Bottombar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<SecondaryHref>(NAVIGATION.secondary[0].href)

  return (
    <section className="w-full relative bg-white">
      <div className="hidden md:block pt-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-28 py-4 relative">
            {NAVIGATION.secondary.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`font-bold text-button-s uppercase transition-colors ${
                  activeLink === item.href 
                    ? 'text-secondary' 
                    : 'text-primary hover:text-secondary'
                }`}
                onClick={() => setActiveLink(item.href)}
              >
                {item.label}
              </a>
            ))}
            <div className="absolute -bottom-4 left-0 right-0 border-b border-[#999999] mx-auto max-w-8xl"></div>          
            </div>
        </div>
      </div>

      <div className="md:hidden bg-[#F5F5FA]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex-1">
              <span className="text-primary font-bold text-button-s uppercase">
                {NAVIGATION.secondary.find(item => item.href === activeLink)?.label}
              </span>
            </div>

            <button 
              className="p-2 text-primary hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 space-y-3 px-4 z-50">
              {NAVIGATION.secondary.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`block text-center font-bold text-button-s uppercase transition-colors py-2 ${
                    activeLink === item.href 
                      ? 'text-secondary' 
                      : 'text-primary hover:text-secondary'
                  }`}
                  onClick={() => {
                    setActiveLink(item.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}