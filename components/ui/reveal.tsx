"use client"

import { useEffect, useRef, useState } from "react"
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"

const REVEAL_ROOT_MARGIN = "0px 0px -10% 0px"

type RevealDirection = "up" | "down" | "none"

type RevealProps<T extends ElementType = "div"> = {
  as?: T
  children: ReactNode
  className?: string
  delayMs?: number
  direction?: RevealDirection
  once?: boolean
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className">

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delayMs = 0,
  direction = "up",
  once = true,
  ...rest
}: RevealProps<T>) {
  const Component = as ?? "div"
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.2, rootMargin: REVEAL_ROOT_MARGIN }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [once])

  const hiddenTransform =
    direction === "up" ? "translate-y-6" : direction === "down" ? "-translate-y-6" : ""

  return (
    <Component
      ref={ref as ComponentPropsWithRef<T>["ref"]}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform will-change-opacity",
        isVisible ? "opacity-100 translate-y-0" : cn("opacity-0", hiddenTransform),
        "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}

type StaggerItemProps<T extends ElementType = "div"> = {
  as?: T
  children: ReactNode
  className?: string
  index: number
  stepMs?: number
  baseDelayMs?: number
  direction?: RevealDirection
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className">

export function StaggerItem<T extends ElementType = "div">({
  as,
  children,
  className,
  index,
  stepMs = 70,
  baseDelayMs = 0,
  direction = "up",
  ...rest
}: StaggerItemProps<T>) {
  return (
    <Reveal
      as={as}
      className={className}
      delayMs={baseDelayMs + index * stepMs}
      direction={direction}
      {...rest}
    >
      {children}
    </Reveal>
  )
}
