'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { milestonesData } from '@/utils/milestone-data'

export default function Timeline() {
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [filledIndex, setFilledIndex] = useState<number>(-1)
  const [fillHeight, setFillHeight] = useState<number>(0)

  const yearRefs = useRef<Array<HTMLDivElement | null>>([])
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([])
  const baseLineRef = useRef<HTMLDivElement | null>(null)

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
      { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' }
    )
    itemRefs.current.filter(Boolean).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const updateFillHeight = () => {
      const base = baseLineRef.current
      if (!base) return

      if (filledIndex < 0) {
        setFillHeight(0)
        return
      }

      const targetNode = nodeRefs.current[filledIndex] ?? yearRefs.current[filledIndex]
      if (!targetNode) {
        setFillHeight(0)
        return
      }

      const baseRect = base.getBoundingClientRect()
      const nodeRect = targetNode.getBoundingClientRect()
      const height = Math.max(0, nodeRect.top + nodeRect.height / 2 - baseRect.top)
      setFillHeight(Math.ceil(height))
    }

    requestAnimationFrame(updateFillHeight)
    const t = setTimeout(updateFillHeight, 80)
    window.addEventListener('resize', updateFillHeight)

    let ro: ResizeObserver | null = null
    if (baseLineRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateFillHeight)
      ro.observe(baseLineRef.current)
    }

    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', updateFillHeight)
      if (ro) ro.disconnect()
    }
  }, [filledIndex])

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
          <div
            ref={baseLineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-[#E7E9F5] h-full top-0 z-0"
          />

          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-[2px] top-0 z-10 transition-all duration-500 ease-in-out"
            style={{
              height: `${fillHeight}px`,
              backgroundColor: fillHeight > 0 ? 'var(--color-primary, #30459D)' : 'transparent',
            }}
          />

          <div className="pt-40">
            {milestonesData.map((milestoneYear, yearIndex) => {
              const nodeFilled = filledIndex >= yearIndex
              const isActive = activeYear === milestoneYear.year
              const firstGlobalIndex = milestonesData
                .slice(0, yearIndex)
                .reduce((acc, y) => acc + y.items.length, 0)
              const firstItemSide = firstGlobalIndex % 2 === 0 ? 'right' : 'left'

              return (
                <div key={milestoneYear.year} className="relative mb-30 last:mb-0">
                  {isActive && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-36 -top-24 bg-white z-15" />
                  )}

                  <div
                    ref={(el) => {
                      nodeRefs.current[yearIndex] = el
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 -top-8 z-20 transition-all duration-300"
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-all duration-300 ${
                        nodeFilled ? 'bg-primary' : 'bg-[#E7E9F5]'
                      }`}
                    />
                  </div>

                  <div
                    ref={(el) => {
                      yearRefs.current[yearIndex] = el
                    }}
                    data-year={milestoneYear.year}
                    className={`hidden md:block absolute -top-9 z-30 ${
                      firstItemSide === 'right'
                       ? 'left-1/2 pl-13 text-left'
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
                            <div className={`${spacerColumnClass} hidden md:block`} />
                            <div className={`${contentColumnClass}`}>
                              <article className="rounded-md bg-white overflow-hidden">
                                <div className="px-4 py-4">
                                  <h4
                                    className="mb-2 font-plus-jakarta font-semibold text-2xl leading-[140%] transform transition-all duration-500 ease-out"
                                    style={{
                                      color: titleColors[globalIndex % titleColors.length],
                                      opacity: isVisible ? 1 : 0,
                                      transform: isVisible
                                        ? 'translateY(0)'
                                        : 'translateY(20px)',
                                      transitionDelay: isVisible ? '100ms' : '0ms',
                                    }}
                                  >
                                    {item.title}
                                  </h4>

                                  <p
                                    className="mb-4 text-text-secondary font-plus-jakarta font-bold text-xl leading-[130%] transform transition-all duration-500 ease-out"
                                    style={{
                                      opacity: isVisible ? 1 : 0,
                                      transform: isVisible
                                        ? 'translateY(0)'
                                        : 'translateY(20px)',
                                      transitionDelay: isVisible ? '200ms' : '0ms',
                                    }}
                                  >
                                    {item.description}
                                  </p>

                                  {item.image && (
                                    <div className="mb-4 w-full transform transition-all duration-500 ease-out"
                                      style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible
                                          ? 'translateY(0)'
                                          : 'translateY(20px)',
                                        transitionDelay: isVisible ? '300ms' : '0ms',
                                      }}
                                    >
                                      <Image
                                        src={item.image}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover rounded-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                        priority={itemIndex === 0}
                                      />
                                    </div>
                                  )}

                                  {item.link && (
                                    <a
                                      href={item.link}
                                      className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors group uppercase tracking-wide text-sm transform transition-all duration-500 ease-out"
                                      style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible
                                          ? 'translateY(0)'
                                          : 'translateY(20px)',
                                        transitionDelay: isVisible ? '400ms' : '0ms',
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