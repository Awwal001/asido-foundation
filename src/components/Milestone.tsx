'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { milestonesData } from '@/utils/milestone-data'

export default function Timeline() {
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [filledIndex, setFilledIndex] = useState<number>(-1)

  const yearRefs = useRef<Array<HTMLDivElement | null>>([])
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  // Track which year is active
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year')
            if (!year) return
            setActiveYear(year)
            const idx = milestonesData.findIndex((y) => y.year === year)
            if (idx !== -1) setFilledIndex(idx)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-15% 0px -30% 0px' }
    )
    yearRefs.current.filter(Boolean).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // Track visibility of items for animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = entry.target.getAttribute('data-item-id')
            if (!itemId) return
            setVisibleItems((prev) => {
              const next = new Set(prev)
              next.add(itemId)
              return next
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -120px 0px' }
    )
    itemRefs.current.filter(Boolean).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const titleColors = ['#00B191', '#F9AE0B', '#FD372C', '#4ABDCD']

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
          {/* Base vertical line - ALWAYS grey background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-[#E7E9F5] h-full top-0 z-0" />
          
          {/* Filled PRE-NODE vertical lines */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] top-0 z-0 h-full">
            {/* PRE-NODE lines for ALL nodes */}
            {milestonesData.map((_, yearIndex) => {
              // CORRECTED LOGIC: Each pre-node line should be filled only when
              // the current node OR any previous node is active
              const isFilled = filledIndex >= yearIndex
              
              return (
                <div
                  key={`pre-node-${yearIndex}`}
                  className={`absolute w-full transition-colors duration-300 ${
                    isFilled ? 'bg-primary' : 'bg-transparent'
                  }`}
                  style={{
                    top: yearIndex === 0 ? '0%' : `${80 + (yearIndex - 1) * 120}px`,
                    height: yearIndex === 0 ? '80px' : '120px',
                  }}
                />
              )
            })}
          </div>

          <div className="pt-20">
            {milestonesData.map((milestoneYear, yearIndex) => {
              // CORRECTED: Node should be filled when it's the active year OR any previous year
              const nodeFilled = filledIndex >= yearIndex
              const firstGlobalIndex = milestonesData
                .slice(0, yearIndex)
                .reduce((acc, y) => acc + y.items.length, 0)
              const firstItemSide = firstGlobalIndex % 2 === 0 ? 'right' : 'left'

              return (
                <div
                  key={milestoneYear.year}
                  className="relative mb-20 last:mb-0"
                >
                  {/* NODE - Takes primary color when this node or any previous node is active */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 z-10 transition-all duration-300">
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-colors duration-300 ${
                        nodeFilled ? 'bg-primary border-primary' : 'bg-white border-[#E7E9F5]'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          nodeFilled ? 'bg-white' : 'bg-[#E7E9F5]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* YEAR LABEL */}
                  <div
                    ref={(el) => {
                      yearRefs.current[yearIndex] = el
                    }}
                    data-year={milestoneYear.year}
                    className={`hidden md:block absolute -top-9 z-20 ${
                      firstItemSide === 'right'
                        ? 'left-1/2 pl-8 text-left'
                        : 'left-4 text-left'
                    }`}
                  >
                    <span
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        nodeFilled ? 'text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {milestoneYear.year}
                    </span>
                  </div>

                  <div className="md:hidden text-center mb-8">
                    <span
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        nodeFilled ? 'text-primary' : 'text-text-secondary'
                      }`}
                    >
                      {milestoneYear.year}
                    </span>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-16">
                    {milestoneYear.items.map((item, itemIndex) => {
                      const globalIndex =
                        milestonesData
                          .slice(0, yearIndex)
                          .reduce((acc, y) => acc + y.items.length, 0) + itemIndex
                      const side = globalIndex % 2 === 0 ? 'right' : 'left'
                      const itemId = `${milestoneYear.year}-${yearIndex}-${itemIndex}`
                      const isVisible = visibleItems.has(itemId)

                      const contentColumnClass =
                        side === 'left'
                          ? 'md:col-start-1 md:col-end-2 pr-6 text-left'
                          : 'md:col-start-2 md:col-end-3 pl-6 text-left'

                      const spacerColumnClass =
                        side === 'left'
                          ? 'md:col-start-2 md:col-end-3'
                          : 'md:col-start-1 md:col-end-2'

                      const animationClass = isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'

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
                            <div
                              className={`${spacerColumnClass} hidden md:block`}
                            />
                            <div
                              className={`${contentColumnClass} transform transition-all duration-300 ease-out ${animationClass}`}
                              style={{
                                transitionDelay: isVisible ? `${Math.min(320, itemIndex * 90)}ms` : '0ms',
                              }}
                            >
                              <article className="rounded-md bg-white overflow-hidden">
                                <div className="px-4 py-4">
                                  <h4
                                    className="mb-2 font-plus-jakarta font-semibold text-2xl leading-[140%]"
                                    style={{
                                      color:
                                        titleColors[
                                          globalIndex % titleColors.length
                                        ],
                                      opacity: isVisible ? 1 : 0,
                                      transform: isVisible
                                        ? 'translateY(0)'
                                        : 'translateY(8px)',
                                      transitionDelay: isVisible ? `${Math.min(320, itemIndex * 90)}ms` : '0ms',
                                    }}
                                  >
                                    {item.title}
                                  </h4>

                                  <p
                                    className="mb-4 text-text-secondary font-plus-jakarta font-bold text-xl leading-[130%]"
                                    style={{
                                      opacity: isVisible ? 1 : 0,
                                      transform: isVisible
                                        ? 'translateY(0)'
                                        : 'translateY(8px)',
                                      transitionDelay: isVisible ? `${Math.min(400, itemIndex * 100)}ms` : '0ms',
                                    }}
                                  >
                                    {item.description}
                                  </p>

                                  {item.image && (
                                    <div className="mb-4 w-full max-h-[400px] overflow-hidden">
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-contain max-h-[400px]"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority={itemIndex === 0}
                                      />
                                    </div>
                                  )}

                                  {item.link && (
                                    <a
                                      href={item.link}
                                      className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors group uppercase tracking-wide text-sm"
                                      style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible
                                          ? 'translateY(0)'
                                          : 'translateY(8px)',
                                        transitionDelay: isVisible ? `${Math.min(480, itemIndex * 120)}ms` : '0ms',
                                      }}
                                    >
                                      Learn More
                                      <span className="ml-1 group-hover:ml-2 transition-all duration-300">
                                        →
                                      </span>
                                    </a>
                                  )}
                                </div>
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
          </div>
        </div>
      </div>
    </section>
  )
}