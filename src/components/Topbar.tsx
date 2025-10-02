'use client'

import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { NAVIGATION } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Asido Foundation"
            width={213}
            height={68}
            className="hidden md:block py-3 px-6"
            priority
          />
          <Image
            src="/logo.svg"
            alt="Asido Foundation"
            width={125}
            height={40}
            className="block md:hidden py-2 px-4"
            priority
          />
        </Link>

        <div className="flex items-center space-x-6">
          <button className="hidden md:flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity">
            <Image
              src="/SearchIcon.svg"
              alt="Search"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </button>

          <button className="md:hidden flex items-center justify-center w-6 h-6 text-primary hover:text-secondary transition-colors">
            <Search className="w-4 h-4" strokeWidth={1.2} />
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>
      </div>

      <nav>
        <div className="container mx-auto px-4">
          <div className="hidden md:flex space-x-8 pb-4 justify-between items-center">
            <div className="flex space-x-8">
              {NAVIGATION.main.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-primary hover:text-secondary font-bold text-button-s uppercase transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-8">
              <a
                href="#take-the-pledge"
                className="text-primary hover:text-secondary font-bold text-button-s uppercase transition-colors"
              >
                Take the Pledge
              </a>
              <a
                href="#donate"
                className="bg-secondary text-white px-6 py-4 font-bold text-button-s uppercase hover:bg-secondary-dark transition-colors rounded-lg min-w-[115px] text-center"
              >
                Donate
              </a>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 bg-white">
              {NAVIGATION.main.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-primary hover:text-secondary font-bold text-button-s uppercase transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <a
                  href="#take-the-pledge"
                  className="block text-primary hover:text-secondary font-bold text-button-s uppercase transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Take the Pledge
                </a>
                <a
                  href="#donate"
                  className="block bg-secondary text-white px-6 py-4 font-bold text-button-s uppercase hover:bg-secondary-dark transition-colors rounded-lg text-center"
            
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}