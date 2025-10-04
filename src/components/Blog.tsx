'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { blogPosts } from '@/utils/blog-data'
import BlogCard from './BlogCard'

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && isMounted) {
      const container = scrollContainerRef.current
      const card = container.children[0] as HTMLElement
      const cardWidth = card.offsetWidth + 12
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const nextSlide = () => {
    if (!isMounted) return
    const nextIndex = currentIndex + 1 >= blogPosts.length ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }

  if (!isMounted) {
    return (
      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[40px] font-[600] text-[#00B191] mb-3">
              Stay Informed
            </h2>
            <p className="text-[18px] md:text-[31px] font-[700] text-[#202124] max-w-2xl">
              Through advocacy, education, and support, we're building a stigma-free future for mental health in Nigeria.
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
        <div className="mb-12">
          <h2 className="text-[14px] md:text-[24px] font-[600] text-secondary mb-3">
            Stay Informed
          </h2>
          <p className="text-[18px] md:text-[31px] font-[700] text-[#202124] max-w-3xl leading-snug">
            Through advocacy, education, and support, we're building a stigma-free future for mental health in Nigeria.
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
            className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pl-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="flex-shrink-0 snap-start relative"
                style={{
                  width: '48vw',
                }}
              >
                <BlogCard post={post} />
                {index === currentIndex && (
                  <button
                    onClick={nextSlide}
                    className="absolute top-45 right-4 w-10 h-10 bg-[#FFFFFF] rounded-full flex items-center justify-center hover:opacity-90 transition-all z-10 shadow-lg"
                    aria-label="Next blog post"
                  >
                    <ChevronRight className="w-5 h-5 text-[#354E70]" />
                  </button>
                )}
              </div>
            ))}
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