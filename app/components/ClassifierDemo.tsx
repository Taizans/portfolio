"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

/* ---------- Surrogate classifier (browser-only, keyword-based) -------- */

type Class = {
  name: string
  keywords: string[]
  bias: number
}

const TAXONOMY: Class[] = [
  {
    name: "Doors",
    keywords: ["porta", "porte", "door", "chiude", "chiusura", "blocca", "hmi", "apertura", "anta"],
    bias: 0.18,
  },
  {
    name: "Brakes (DBR)",
    keywords: ["freno", "freni", "brake", "dbr", "frenata", "pneumatic", "pressione", "frenante"],
    bias: 0.14,
  },
  {
    name: "HVAC",
    keywords: ["hvac", "clima", "aria", "temperatura", "ventilazione", "riscalda", "raffredda"],
    bias: 0.11,
  },
  {
    name: "Bogie",
    keywords: ["carrello", "bogie", "asse", "ruota", "ruote", "sospension"],
    bias: 0.09,
  },
  {
    name: "Pantograph",
    keywords: ["pantografo", "pantograph", "alta tensione", "catenaria", "captatore"],
    bias: 0.07,
  },
  {
    name: "TCMS / Diagnostics",
    keywords: ["tcms", "control", "diagnostic", "errore", "alarm", "warning", "fault", "guasto"],
    bias: 0.13,
  },
  {
    name: "Other",
    keywords: [],
    bias: 0.06,
  },
]

const EXAMPLES = [
  "Porta C2 carrozza 4 non chiude completamente, segnale HMI rosso",
  "Pressione aria pneumatici DBR sotto soglia, freno bloccato",
  "Ventilazione HVAC carrozza 2 non funziona, temperatura alta",
]

type Prediction = { name: string; prob: number }

function classify(text: string): Prediction[] {
  const lower = text.toLowerCase()
  const scores = TAXONOMY.map((t) => {
    const matches = t.keywords.filter((k) => lower.includes(k)).length
    let s = t.bias
    s += matches * 0.45
    s += Math.random() * 0.04
    return { name: t.name, score: s }
  })
  // Softmax with sharper temperature
  const max = Math.max(...scores.map((s) => s.score))
  const exps = scores.map((s) => ({ ...s, score: Math.exp((s.score - max) * 4.5) }))
  const sum = exps.reduce((acc, e) => acc + e.score, 0)
  return exps
    .map((e) => ({ name: e.name, prob: e.score / sum }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 4)
}

/* ---------- Component ------------------------------------------------- */

type Stage = "idle" | "tfidf" | "logreg" | "calibrate" | "done"
const STAGE_ORDER: Record<Stage, number> = {
  idle: -1,
  tfidf: 0,
  logreg: 1,
  calibrate: 2,
  done: 3,
}

export default function ClassifierDemo() {
  const [input, setInput] = useState("")
  const [stage, setStage] = useState<Stage>("idle")
  const [result, setResult] = useState<Prediction[] | null>(null)

  const reset = () => {
    setStage("idle")
    setResult(null)
  }

  const run = () => {
    if (!input.trim() || stage !== "idle") return
    setResult(null)
    setStage("tfidf")
    setTimeout(() => setStage("logreg"), 380)
    setTimeout(() => setStage("calibrate"), 760)
    setTimeout(() => {
      setResult(classify(input))
      setStage("done")
    }, 1140)
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal-400">
        <Sparkles className="h-3.5 w-3.5" />
        live · simplified surrogate of the production classifier
      </div>

      {/* Quick examples */}
      <div className="mb-3 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setInput(ex)
              reset()
            }}
            className="pill max-w-full truncate text-left"
            title={ex}
          >
            {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
          </button>
        ))}
      </div>

      <textarea
        rows={3}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          if (stage === "done") reset()
        }}
        placeholder="Enter a maintenance notification..."
        className="w-full resize-none rounded-md border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-teal-400/60 focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={run}
          disabled={!input.trim() || stage !== "idle"}
          className="group inline-flex items-center gap-2 rounded-md border border-teal-400/60 px-4 py-2 text-sm text-teal-400 transition-colors hover:bg-teal-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-teal-400"
        >
          Classify
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Pipeline stages */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
          {(["tfidf", "logreg", "calibrate"] as const).map((s, i) => {
            const reached = STAGE_ORDER[stage] >= i
            const current = stage === s
            const label = s === "tfidf" ? "TF-IDF" : s === "logreg" ? "LogReg" : "Calibrate"
            return (
              <div key={s} className="flex items-center gap-2">
                <motion.div
                  animate={
                    current
                      ? { boxShadow: "0 0 0 0 rgba(45,212,191,0.4), 0 0 14px 2px rgba(45,212,191,0.35)" }
                      : { boxShadow: "0 0 0 0 rgba(45,212,191,0)" }
                  }
                  transition={{ duration: 0.3 }}
                  className={`rounded border px-2.5 py-1 transition-colors ${
                    current
                      ? "border-teal-400 bg-teal-400/10 text-teal-300"
                      : reached
                        ? "border-teal-400/30 text-teal-300/70"
                        : "border-white/10 text-zinc-500"
                  }`}
                >
                  {label}
                </motion.div>
                {i < 2 && <span className={reached ? "text-teal-400/40" : "text-zinc-700"}>→</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Result bars */}
      <AnimatePresence mode="wait">
        {result && stage === "done" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 space-y-2.5"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              top predictions
            </p>
            {result.map((r, idx) => (
              <div
                key={r.name}
                className="grid grid-cols-[140px_1fr_56px] items-center gap-3 md:grid-cols-[180px_1fr_60px]"
              >
                <span className={`font-mono text-sm ${idx === 0 ? "text-teal-400" : "text-zinc-300"}`}>
                  {r.name}
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={`h-full rounded-full ${idx === 0 ? "bg-teal-400" : "bg-teal-400/40"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.prob * 100}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="font-mono text-xs tabular-nums text-zinc-400">
                  {(r.prob * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-[11px] italic text-zinc-500">
        This demo runs a keyword-based surrogate locally in your browser — not the real production model.
      </p>
    </div>
  )
}
