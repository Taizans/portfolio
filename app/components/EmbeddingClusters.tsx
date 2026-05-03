"use client"

import { useEffect, useRef } from "react"

type Centroid = { x: number; y: number; vx: number; vy: number; color: string }
type Particle = { x: number; y: number; vx: number; vy: number; cluster: number }

const CLUSTER_COLORS = [
  "rgba(45, 212, 191,",  // teal-400
  "rgba(96, 165, 250,",  // blue-400
  "rgba(167, 139, 250,", // violet-400
  "rgba(244, 114, 182,", // pink-400
]

export default function EmbeddingClusters() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setSize()
    window.addEventListener("resize", setSize)

    const numClusters = 4
    const perCluster = window.innerWidth < 640 ? 14 : 26
    const total = numClusters * perCluster

    const centroids: Centroid[] = Array.from({ length: numClusters }, (_, i) => ({
      x: width * (0.2 + Math.random() * 0.6),
      y: height * (0.25 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      color: CLUSTER_COLORS[i],
    }))

    const particles: Particle[] = Array.from({ length: total }, (_, i) => {
      const cluster = i % numClusters
      const c = centroids[cluster]
      return {
        x: c.x + (Math.random() - 0.5) * 80,
        y: c.y + (Math.random() - 0.5) * 80,
        vx: 0,
        vy: 0,
        cluster,
      }
    })

    // Periodically reassign one particle to a different cluster — visual "leakage"
    const switchInterval = setInterval(() => {
      const idx = Math.floor(Math.random() * particles.length)
      const offset = 1 + Math.floor(Math.random() * (numClusters - 1))
      particles[idx].cluster = (particles[idx].cluster + offset) % numClusters
    }, 1100)

    const frame = () => {
      ctx.clearRect(0, 0, width, height)

      // Drift centroids slowly, bounce off margins
      for (const c of centroids) {
        c.x += c.vx
        c.y += c.vy
        if (c.x < width * 0.12 || c.x > width * 0.88) c.vx *= -1
        if (c.y < height * 0.18 || c.y > height * 0.82) c.vy *= -1
      }

      // Spring particles toward their centroid + brownian noise
      for (const p of particles) {
        const target = centroids[p.cluster]
        const dx = target.x - p.x
        const dy = target.y - p.y
        p.vx += dx * 0.0019
        p.vy += dy * 0.0019
        p.vx *= 0.93
        p.vy *= 0.93
        p.vx += (Math.random() - 0.5) * 0.06
        p.vy += (Math.random() - 0.5) * 0.06
        p.x += p.vx
        p.y += p.vy
      }

      // Faint connection lines from particle to its centroid
      for (const p of particles) {
        const target = centroids[p.cluster]
        const dx = target.x - p.x
        const dy = target.y - p.y
        const dist = Math.hypot(dx, dy)
        if (dist > 200) continue
        const alpha = 0.06 * (1 - dist / 200)
        ctx.strokeStyle = target.color + ` ${alpha})`
        ctx.lineWidth = 0.4
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(target.x, target.y)
        ctx.stroke()
      }

      // Draw particles
      for (const p of particles) {
        const color = centroids[p.cluster].color
        ctx.fillStyle = color + " 0.6)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw centroids — slightly larger, brighter, with halo
      for (const c of centroids) {
        ctx.fillStyle = c.color + " 0.9)"
        ctx.beginPath()
        ctx.arc(c.x, c.y, 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = c.color + " 0.15)"
        ctx.beginPath()
        ctx.arc(c.x, c.y, 9, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", setSize)
      clearInterval(switchInterval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
    />
  )
}
