"use client"

import { useEffect, useRef } from "react"

/**
 * Soft teal glow that lerps toward the cursor.
 * Hidden on touch / no-hover devices via CSS (see globals.css).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let dx = mx
    let dy = my
    let rx = mx
    let ry = my

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    window.addEventListener("mousemove", onMove)

    let raf = 0
    const loop = () => {
      // Tight dot follows fast
      dx += (mx - dx) * 0.45
      dy += (my - dy) * 0.45
      // Soft glow ring trails behind
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[60] h-16 w-16 rounded-full"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[60] h-2 w-2 rounded-full bg-teal-400"
      />
    </>
  )
}
