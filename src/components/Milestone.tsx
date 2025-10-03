'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { milestonesData } from '@/utils/milestone-data'

export default function Timeline() {
  const [activeYear, setActiveYear] = useState<string>('2019')
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())

  const yearRefs = useRef<Array<HTMLDivElement | null>>([])
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year')
            if (year) setActiveYear(year)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-15% 0px -30% 0px' }
    )

    yearRefs.current.filter(Boolean).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id')
            if (!itemId) return
            const parts = itemId.split('-')
            const itemIndexNumeric = parseInt(parts[2] ?? '0', 10)
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = new Set(prev)
                next.add(itemId)
                return next
              })
            }, Math.min(400, 100 * itemIndexNumeric))
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -120px 0px' }
    )

    itemRefs.current.filter(Boolean).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="milestones" className="py-16 md:pt-20 md:pb-40 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-2xl md:text-4xl font-bold text-text-primary mx-auto max-w-4xl">
            Since inception in 2019, Asido Foundation has led bold advocacy for mental health reforms.
            These range from public awareness campaigns to the passing of the 2021 Mental Health Act.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-[#E7E9F5] h-full top-0 z-0" />

          {milestonesData.map((milestoneYear, yearIndex) => {
            const possibleSide = (milestoneYear as any).firstItemSide
            const baseSide = possibleSide === 'left' || possibleSide === 'right' ? possibleSide : 'right'

            return (
              <div key={milestoneYear.year} className="relative mb-20 last:mb-0">
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 -top-8 z-10 ${
                    activeYear === milestoneYear.year ? 'scale-110 transition-transform duration-300' : ''
                  }`}
                >
                  <div
                    className={`w-6 h-6 flex justify-center items-center rounded-full border-2 transition-all duration-500 ${
                      activeYear === milestoneYear.year ? 'bg-primary border-primary' : 'bg-white border-[#E7E9F5]'
                    }`}
                    aria-hidden
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeYear === milestoneYear.year ? 'bg-white' : 'bg-[#E7E9F5]'
                      }`}
                    />
                  </div>
                </div>

                <div
                  ref={(el) => {
                    yearRefs.current[yearIndex] = el
                  }}
                  data-year={milestoneYear.year}
                  className={`hidden md:block absolute -top-16 z-20 ${
                    baseSide === 'left' ? 'left-8 text-left' : 'right-8 text-right'
                  }`}
                >
                  <span
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      activeYear === milestoneYear.year ? 'text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {milestoneYear.year}
                  </span>
                </div>

                <div className="md:hidden text-center mb-8">
                  <span
                    className={`text-2xl font-bold transition-colors duration-500 ${
                      activeYear === milestoneYear.year ? 'text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {milestoneYear.year}
                  </span>
                </div>

                <div className="space-y-16">
                  {milestoneYear.items.map((item, itemIndex) => {
                    const side: 'left' | 'right' = itemIndex % 2 === 0 ? baseSide : baseSide === 'left' ? 'right' : 'left'
                    const itemId = `${milestoneYear.year}-${yearIndex}-${itemIndex}`
                    const isVisible = visibleItems.has(itemId)

                    const contentColumnClass = side === 'left' ? 'md:col-start-1 md:col-end-2' : 'md:col-start-2 md:col-end-3'
                    const spacerColumnClass = side === 'left' ? 'md:col-start-2 md:col-end-3' : 'md:col-start-1 md:col-end-2'

                    return (
                      <div
                        key={itemId}
                        ref={(el) => {
                          itemRefs.current[yearIndex * 20 + itemIndex] = el
                        }}
                        data-item-id={itemId}
                        className="relative"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                          <div className={`${spacerColumnClass} hidden md:block`} aria-hidden />

                          <div
                            className={`${contentColumnClass} transform transition-all duration-700 ease-out`}
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transform: isVisible ? 'translateY(0px)' : 'translateY(24px)',
                              transitionDelay: isVisible ? `${Math.min(400, itemIndex * 120)}ms` : '0ms',
                              willChange: 'transform, opacity',
                            }}
                          >
                            <article className="rounded-md bg-white overflow-hidden">
                              <div className="px-4 py-4">
                                <h4
                                  className="mb-2 text-lg font-semibold text-text-primary text-left"
                                  style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
                                    transition: 'opacity 420ms ease, transform 420ms ease',
                                    transitionDelay: isVisible ? `${Math.min(420, itemIndex * 120)}ms` : '0ms',
                                  }}
                                >
                                  {item.title}
                                </h4>

                                <p
                                  className="mb-4 text-text-secondary leading-relaxed text-left"
                                  style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
                                    transition: 'opacity 420ms ease, transform 420ms ease',
                                    transitionDelay: isVisible ? `${Math.min(500, itemIndex * 140)}ms` : '0ms',
                                  }}
                                >
                                  {item.description}
                                </p>

                                {item.link && (
                                  <div
                                    style={{
                                      opacity: isVisible ? 1 : 0,
                                      transform: isVisible ? 'translateY(0px)' : 'translateY(10px)',
                                      transition: 'opacity 420ms ease, transform 420ms ease',
                                      transitionDelay: isVisible ? `${Math.min(600, itemIndex * 160)}ms` : '0ms',
                                    }}
                                  >
                                    <a
                                      href={item.link}
                                      className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors group uppercase tracking-wide text-sm"
                                    >
                                      Learn More
                                      <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
                                    </a>
                                  </div>
                                )}
                              </div>

                              {item.image && (
                                <div className="mt-2 px-4 pb-4">
                                  <div className="w-full">
                                    <Image
                                      src={item.image}
                                      alt={item.title}
                                      width={1200}
                                      height={800}
                                      className="w-full h-auto object-contain"
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                      priority={itemIndex === 0}
                                    />
                                  </div>
                                </div>
                              )}
                            </article>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
              <div className="w-6 h-6 flex justify-center items-center rounded-full border-2 bg-white border-[#E7E9F5]">
                <div className="w-2 h-2 rounded-full bg-[#E7E9F5]" />
              </div>
            </div>

            <div className="flex justify-center pt-12">
              <span className="text-2xl font-bold text-text-secondary">Looking Ahead</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
