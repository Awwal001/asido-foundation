'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion'
import { milestonesData } from '@/utils/milestone-data'
import LinkButton from "@/components/LinkButton";

const FadeInWhenVisible = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut", delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Timeline() {
  const [activeYear, setActiveYear] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set())
  const [filledIndex, setFilledIndex] = useState<number>(-1)
  const [fillHeight, setFillHeight] = useState<number>(0)
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  const yearRefs = useRef<Array<HTMLDivElement | null>>([])
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([])
  const baseLineRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScrollProgress = () => {
      if (!sectionRef.current) return
      const section = sectionRef.current
      const scrollTop = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight

      const progress = Math.max(0, Math.min(1,
        (scrollTop - sectionTop + windowHeight * 0.5) / (sectionHeight - windowHeight * 0.5)
      ))

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollProgress)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const year = entry.target.getAttribute('data-year')
            if (!year) return
            requestAnimationFrame(() => {
              setActiveYear(year)
              const idx = milestonesData.findIndex((y) => y.year === year)
              if (idx !== -1) setFilledIndex(idx)
            })
          }
        })
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -25% 0px',
      }
    )

    yearRefs.current.filter(Boolean).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = entry.target.getAttribute('data-item-id')
          if (!itemId) return
          if (entry.isIntersecting) {
            const delay = parseInt(itemId.split('-')[2]) * 80
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = new Set(prev)
                next.add(itemId)
                return next
              })
            }, delay)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '-30px 0px -30px 0px',
      }
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
      setFillHeight((prev) => prev + (height - prev) * 0.3)
    }

    const rafId = requestAnimationFrame(updateFillHeight)
    const t = setTimeout(updateFillHeight, 50)

    window.addEventListener('resize', updateFillHeight, { passive: true })
    window.addEventListener('scroll', updateFillHeight, { passive: true })

    let ro: ResizeObserver | null = null
    if (baseLineRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateFillHeight)
      ro.observe(baseLineRef.current)
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t)
      window.removeEventListener('resize', updateFillHeight)
      window.removeEventListener('scroll', updateFillHeight)
      if (ro) ro.disconnect()
    }
  }, [filledIndex])

  const titleColors = ['#00B191', '#F9AE0B', '#FD372C', '#4ABDCD']

  return (
    <section
      id="milestones"
      className="py-16 md:pt-[200px] md:pb-[120px] bg-white"
      ref={sectionRef}
    >
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
            className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#E7E9F5] via-[#E7E9F5] to-[#E7E9F5] h-full top-0 z-0"
          />
          <div
            className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-[2px] top-0 z-10 transition-all duration-700 ease-out"
            style={{
              height: `${fillHeight}px`,
              background: fillHeight > 0
                ? 'linear-gradient(to bottom, var(--color-primary, #30459D), var(--color-primary, #30459D))'
                : 'transparent',
              opacity: fillHeight > 0 ? 0.9 : 0,
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
                <div
                  key={milestoneYear.year}
                  className={`relative mb-30 last:mb-0 transition-all duration-500 ${isActive ? 'py-8 md:scale-105' : 'py-4 md:scale-100'}`}
                >
                  {isActive && (
                    <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-12 md:w-16 h-40 -top-20 bg-gradient-to-b from-white/90 to-transparent z-15 backdrop-blur-sm" />
                  )}

                  <div className="md:hidden flex items-center mb-8">
                    <div
                      ref={(el) => { nodeRefs.current[yearIndex] = el }}
                      className="relative z-20 flex-shrink-0 transition-all duration-500"
                    >
                      <div
                        className={`w-5 h-5 rounded-full transition-all duration-500 ease-out ${
                          nodeFilled ? 'bg-primary scale-110' : 'bg-[#E7E9F5]'
                        } ${isActive ? 'ring-4 ring-primary/20' : ''}`}
                      />
                    </div>

                    <div
                      ref={(el) => { yearRefs.current[yearIndex] = el }}
                      data-year={milestoneYear.year}
                      className="ml-4 z-30 transition-all duration-500"
                    >
                      <span className={`text-2xl font-bold ${isActive ? 'text-primary scale-110' : 'text-primary/70'}`}>
                        {milestoneYear.year}
                      </span>
                    </div>
                  </div>

                  <div
                    ref={(el) => { nodeRefs.current[yearIndex] = el }}
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -top-8 z-20 transition-all duration-500"
                  >
                    <div
                      className={`w-5 h-5 rounded-full transition-all duration-500 ease-out ${
                        nodeFilled ? 'bg-primary scale-110' : 'bg-[#E7E9F5]'
                      } ${isActive ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}
                    />
                  </div>

                  <div
                    ref={(el) => { yearRefs.current[yearIndex] = el }}
                    data-year={milestoneYear.year}
                    className={`hidden md:block absolute -top-9 z-30 transition-all duration-500 ${
                      firstItemSide === 'right' ? 'left-1/2 pl-13 text-left' : 'left-4 text-left'
                    }`}
                  >
                    <span className={`text-2xl font-bold ${isActive ? 'text-primary scale-110' : 'text-primary/70'}`}>
                      {milestoneYear.year}
                    </span>
                  </div>

                  <div className="space-y-16">
                    {milestoneYear.items.map((item, itemIndex) => {
                      const globalIndex = milestonesData
                        .slice(0, yearIndex)
                        .reduce((acc, y) => acc + y.items.length, 0) + itemIndex
                      const side = globalIndex % 2 === 0 ? 'right' : 'left'
                      const itemId = `${milestoneYear.year}-${yearIndex}-${itemIndex}`

                      const contentColumnClass =
                        side === 'left'
                          ? 'md:col-start-1 md:col-end-2 md:pr-6 text-left'
                          : 'md:col-start-2 md:col-end-3 md:pl-6 text-left'

                      const spacerColumnClass =
                        side === 'left'
                          ? 'md:col-start-2 md:col-end-3'
                          : 'md:col-start-1 md:col-end-2'

                      return (
                        <FadeInWhenVisible key={itemId} delay={itemIndex * 0.15}>
                          <div
                            ref={(el) => {
                              itemRefs.current[yearIndex * 20 + itemIndex] = el
                            }}
                            data-item-id={itemId}
                            className="relative transition-all duration-700 ease-out"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                              <div className={`${spacerColumnClass} hidden md:block`} />
                              <div className={`${contentColumnClass} ml-16 md:ml-0`}>
                                <article className="rounded-md bg-white overflow-hidden transition-all duration-500">
                                  <div className="px-4 py-4">
                                    <h4
                                      className="mb-3 font-plus-jakarta font-semibold text-base md:text-2xl leading-[140%]"
                                      style={{
                                        color: titleColors[globalIndex % titleColors.length],
                                      }}
                                    >
                                      {item.title}
                                    </h4>

                                    <p className="mb-4 text-text-secondary font-plus-jakarta font-bold text-lg md:text-xl leading-[130%]">
                                      {item.description}
                                    </p>

                                    {item.image && (
                                      <div className="mb-4 w-full overflow-hidden rounded-lg">
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
                                      <div className="mt-4 transition-all duration-700 ease-out">
                                        <LinkButton href={item.link} label="Learn More" />
                                      </div>
                                    )}
                                  </div>
                                </article>
                              </div>
                            </div>
                          </div>
                        </FadeInWhenVisible>
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