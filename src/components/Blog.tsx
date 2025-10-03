'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { blogPosts, BlogPost } from '@/utils/blog-data'
import BlogCard from './BlogCard'

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && isMounted) {
      const container = scrollContainerRef.current
      const card = container.children[0] as HTMLElement
      const cardWidth = card.offsetWidth + 16
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    if (!isMounted) return
    const nextIndex = currentIndex + 1 >= Math.ceil(blogPosts.length / 2) ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }

  if (!isMounted) {
    return (
      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Stay Informed
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Latest insights and updates from our mental health advocacy work
            </p>
          </div>
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white h-[480px] animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Stay Informed
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Latest insights and updates from our mental health advocacy work
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pl-4"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {blogPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="flex-shrink-0 w-[calc(50%-8px)] snap-start"
                style={{ minWidth: 'calc(50% - 8px)' }}
              >
                <BlogCard post={post} />
              </div>
            ))}
            
            <div className="flex-shrink-0 w-[calc(50%-8px)] flex items-center justify-center">
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                aria-label="Next blog posts"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}