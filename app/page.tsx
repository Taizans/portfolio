"use client"

import { motion, useInView, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import EmbeddingClusters from "./components/EmbeddingClusters"
import ClassifierDemo from "./components/ClassifierDemo"
import { Reveal, StaggerGroup, StaggerItem } from "./components/Reveal"

/* ----------------------------------------------------------------- *
 *  Animated count-up — used in the Hero stats row                    *
 * ----------------------------------------------------------------- */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 2.2,
}: {
  to: number
  decimals?: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  const formatted = val.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

/* ----------------------------------------------------------------- *
 *  Real ETR675 pipeline snippet — anonymized, illustrative only      *
 * ----------------------------------------------------------------- */
const ETR675_SNIPPET = `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.calibration import CalibratedClassifierCV

vec = TfidfVectorizer(
    ngram_range=(1, 2),
    max_features=30_000,
    sublinear_tf=True,
    stop_words=stopwords_it,
)
clf = OneVsRestClassifier(
    LogisticRegression(class_weight="balanced", solver="liblinear")
)
model = CalibratedClassifierCV(clf, cv=5, method="sigmoid")
model.fit(vec.fit_transform(X_train), y_train)`

/* ----------------------------------------------------------------- *
 *  Skills, grouped — rendered as monospace pill tags                  *
 * ----------------------------------------------------------------- */
const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "AI / Machine Learning",
    items: [
      "Python",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Jupyter",
      "TF-IDF",
      "Logistic Regression",
      "OneVsRest",
      "Calibrated CV",
      "Multi-task Classification",
      "NLP",
    ],
  },
  {
    title: "Microsoft Power Platform",
    items: ["Power BI", "Power Automate", "DAX", "Star Schema"],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "C", "SQL"],
  },
  {
    title: "Web & Tools",
    items: ["React", "Next.js", "Node.js", "Tailwind CSS", "Git", "PostgreSQL", "MongoDB"],
  },
]

/* ----------------------------------------------------------------- *
 *  Engineering log entries — "currently building"                    *
 * ----------------------------------------------------------------- */
const LOG_ENTRIES: { date: string; title: string; body: string; tags: string[] }[] = [
  {
    date: "2026 · in progress",
    title: "Root Cause Analysis with 5-Why chains",
    body: "Walking a chain of causal questions on top of the ETR675 classifier output. Exploring small transformer encoders fine-tuned on the maintenance corpus.",
    tags: ["transformers", "fine-tuning", "Python"],
  },
  {
    date: "2026 · ongoing",
    title: "Sharper English & ML reading list",
    body: "Pushing English from B2 toward C1 (technical interviews and EU job market run in English). Reading foundational ML papers and the scikit-learn / PyTorch source for the algorithms I actually ship.",
    tags: ["interviewing", "papers"],
  },
]

/* ================================================================= */
export default function Page() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <EmbeddingClusters />

      {/* ---------- Nav ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050505]/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="#home" className="font-mono text-sm tracking-tight text-teal-400">
            tjf<span className="text-zinc-500">.</span>dev
          </Link>
          <div className="hidden gap-7 text-sm text-zinc-400 md:flex">
            <Link href="#demo" className="transition-colors hover:text-zinc-100">
              Demo
            </Link>
            <Link href="#about" className="transition-colors hover:text-zinc-100">
              About
            </Link>
            <Link href="#projects" className="transition-colors hover:text-zinc-100">
              Projects
            </Link>
            <Link href="#skills" className="transition-colors hover:text-zinc-100">
              Skills
            </Link>
            <Link href="#log" className="transition-colors hover:text-zinc-100">
              Log
            </Link>
            <Link href="#contact" className="transition-colors hover:text-zinc-100">
              Contact
            </Link>
          </div>
          <Link
            href="mailto:tizianofloriddia16@gmail.com"
            className="group inline-flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-teal-400/60 hover:text-teal-400"
          >
            get in touch
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden bg-dot-grid px-6 pt-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-teal-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
                AI Engineer · Alstom Ferroviaria
              </p>
              <h1 className="text-5xl font-semibold tracking-tight text-zinc-100 md:text-7xl">
                Tiziano Jhonny <span className="text-zinc-500">Floriddia</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
                I build production ML systems on operational industrial data. From the research notebook to the
                desktop app shipped to the maintenance team.
              </p>

              {/* Stats row — animated count-up */}
              <div className="mt-14 grid gap-8 border-t border-white/5 pt-10 sm:grid-cols-3">
                <Stat
                  number={<CountUp to={58223} />}
                  label="labeled notifications in training set"
                />
                <Stat
                  number={<CountUp to={74.5} decimals={1} suffix="%" />}
                  label="auto-classified above confidence in production"
                />
                <Stat
                  number={<CountUp to={0.95} decimals={2} />}
                  label="F1 weighted on Root Cause subsystem (23 classes)"
                />
              </div>

              <div className="mt-12 flex items-center gap-3">
                <Link
                  href="https://github.com/Taizans"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="rounded-md border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-teal-400/60 hover:text-teal-400"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/tiziano-jhonny-floriddia-8478332b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="rounded-md border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-teal-400/60 hover:text-teal-400"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:tizianofloriddia16@gmail.com"
                  aria-label="Email"
                  className="rounded-md border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-teal-400/60 hover:text-teal-400"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------- Live demo ---------- */}
        <Section id="demo" eyebrow="01 / try it" title="Inference, in your browser.">
          <Reveal>
            <p className="mb-8 max-w-2xl text-zinc-400">
              A simplified surrogate of the production classifier I built at Alstom. Type a maintenance
              notification (or pick an example) and watch the pipeline route the text through TF-IDF, Logistic
              Regression, and probability calibration — then return its top predictions.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ClassifierDemo />
          </Reveal>
        </Section>

        {/* ---------- About ---------- */}
        <Section id="about" eyebrow="02 / about" title="A short walk through.">
          <div className="grid gap-12 md:grid-cols-5">
            <Reveal className="space-y-5 text-zinc-300 md:col-span-3">
              <p>
                I&apos;m an AI Engineer at <span className="text-zinc-100">Alstom Ferroviaria</span> in
                Savigliano, Italy. My day-to-day is a multi-task text classification system on{" "}
                <span className="font-mono text-teal-400">SAP PM</span> maintenance notifications for the ETR675
                high-speed fleet — trained on ~58k labeled records, deployed as a desktop app the team actually
                uses.
              </p>
              <p>
                I graduated in <span className="text-zinc-100">Computer Science at the University of Turin</span>{" "}
                in November 2025. My BSc thesis was a blockchain-based system for the validation and tokenization
                of agricultural environmental data — advised by Prof. Andrea Bracciali.
              </p>
              <p>
                Before going AI/ML, I worked across the stack — low-level systems in C, web in React/Next.js,
                relational and NoSQL databases, Microsoft Power Platform. That foundation now pays off whenever I
                need to ship a model into a Tkinter desktop app, generate Excel/HTML/PowerPoint reports, or wire
                production data into Power BI dashboards used daily by Engineering and management.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="md:col-span-2">
              <aside>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Education</p>
                  <div className="space-y-5 text-sm">
                    <div>
                      <p className="text-zinc-100">BSc Computer Science</p>
                      <p className="text-zinc-500">University of Turin · 2022 — 2025</p>
                      <p className="mt-1 text-zinc-400">
                        Thesis: blockchain for environmental data validation &amp; tokenization in agriculture
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-100">Scientific High School Diploma</p>
                      <p className="text-zinc-500">Liceo Scientifico Gaetano Curcio · Ispica (RG)</p>
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Section>

        {/* ---------- Featured projects ---------- */}
        <Section id="projects" eyebrow="03 / featured work" title="Things I&rsquo;ve shipped.">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              {/* ETR675 */}
              <article className="glow-card flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-400">
                    Production · Alstom
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                    AI Solution — ETR675 Maintenance
                  </h3>
                </div>
                <p className="mt-4 text-zinc-400">
                  End-to-end multi-task text classification on SAP PM maintenance notifications for the ETR675
                  high-speed fleet. Trained on{" "}
                  <span className="font-mono text-zinc-200">58,223</span> labeled notifications. In production:{" "}
                  auto-classifies <span className="font-mono text-zinc-200">74.5%</span> of new notifications above
                  confidence threshold, cutting triage time by{" "}
                  <span className="font-mono text-zinc-200">~85-95%</span>.
                </p>

                <pre className="mt-6 overflow-x-auto rounded-md border border-white/10 bg-black/40 p-4 font-mono text-[11.5px] leading-relaxed text-zinc-300">
                  <code>{ETR675_SNIPPET}</code>
                </pre>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Python",
                    "scikit-learn",
                    "TF-IDF",
                    "OneVsRest",
                    "5-fold StratifiedKFold",
                    "Tkinter",
                    "PyInstaller",
                  ].map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-xs italic text-zinc-500">
                  Codebase confidential (proprietary). Snippet above is illustrative.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              {/* Blockchain thesis */}
              <article className="glow-card flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-400">BSc Thesis · UniTo</p>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-100">
                    Blockchain for Environmental Data
                  </h3>
                </div>
                <p className="mt-4 text-zinc-400">
                  A system for the validation and tokenization of agricultural environmental data on a blockchain.
                  Designed to bring trust and traceability to IoT sensor measurements in farming contexts — from
                  the moisture probe on the field to the auditable token on-chain.
                </p>

                <div className="mt-6 rounded-md border border-white/10 bg-black/40 p-5">
                  <div className="grid grid-cols-3 items-center gap-3 font-mono text-xs text-zinc-400">
                    <div className="rounded border border-white/10 bg-white/[0.02] px-3 py-2 text-center">
                      <div className="text-teal-400">IoT sensor</div>
                      <div className="mt-1 text-[10px] text-zinc-500">field reading</div>
                    </div>
                    <div className="text-center text-zinc-600">
                      <div className="font-mono text-base">→</div>
                      <div className="text-[10px]">validate</div>
                    </div>
                    <div className="rounded border border-teal-400/40 bg-teal-400/5 px-3 py-2 text-center">
                      <div className="text-teal-400">on-chain token</div>
                      <div className="mt-1 text-[10px] text-zinc-500">auditable record</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Distributed Systems", "Blockchain", "Tokenization", "IoT data trust"].map((t) => (
                    <span key={t} className="pill">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-5 text-xs italic text-zinc-500">
                  University of Turin · November 2025 · Advisor: Prof. Andrea Bracciali
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <h3 className="mt-16 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Academic &amp; personal
            </h3>
          </Reveal>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Atom Fission Simulation",
                desc: "Numerical simulation of atomic fission with several initial-condition setups in a Unix environment.",
                stack: "C · Unix",
              },
              {
                title: "Food Delivery Database",
                desc: "ER modeling and advanced SQL for a food-delivery domain.",
                stack: "PostgreSQL · draw.io",
              },
              {
                title: "Radio Website Prototype",
                desc: "Persona-driven UI/UX for a radio station, with a focus on accessibility and responsiveness.",
                stack: "Figma",
              },
              {
                title: "Sorting & Path Algorithms",
                desc: "Implementation and analysis of Merge/Quick Sort, shortest-path algorithms and the Edit Distance problem.",
                stack: "C · Java",
              },
            ].map((p) => (
              <StaggerItem key={p.title}>
                <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                  <h4 className="text-sm font-semibold text-zinc-100">{p.title}</h4>
                  <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
                  <p className="mt-3 font-mono text-[11px] text-zinc-500">{p.stack}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>

        {/* ---------- Skills ---------- */}
        <Section id="skills" eyebrow="04 / skills" title="The toolkit.">
          <div className="space-y-10">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
                <Reveal>
                  <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-zinc-400">{g.title}</h3>
                </Reveal>
                <StaggerGroup className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <StaggerItem key={s}>
                      <span className="pill">{s}</span>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            ))}

            <div className="grid gap-4 border-t border-white/5 pt-6 md:grid-cols-[200px_1fr] md:gap-10">
              <Reveal>
                <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-zinc-400">Languages</h3>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="text-zinc-300">
                    Italian <span className="text-zinc-500">— native</span>
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-zinc-300">
                    English <span className="text-zinc-500">— B2 (working professionally in EN)</span>
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ---------- Log / currently building ---------- */}
        <Section id="log" eyebrow="05 / log" title="Currently building.">
          <div className="space-y-5">
            {LOG_ENTRIES.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <article className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 md:grid-cols-[180px_1fr]">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">{e.date}</p>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">{e.title}</h3>
                    <p className="mt-2 text-zinc-400">{e.body}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span key={t} className="pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------- Contact ---------- */}
        <Section id="contact" eyebrow="06 / contact" title="Let&rsquo;s talk.">
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal className="space-y-5 text-zinc-300">
              <p>
                Interested in talking about AI/ML roles, industrial ML, or just want to compare notes on shipping
                models? Drop a message — I&apos;ll be in touch.
              </p>
              <p className="text-zinc-400">
                The fastest way is email:{" "}
                <Link
                  href="mailto:tizianofloriddia16@gmail.com"
                  className="font-mono text-teal-400 hover:underline"
                >
                  tizianofloriddia16@gmail.com
                </Link>
                .
              </p>
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href="https://github.com/Taizans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-teal-400/60 hover:text-teal-400"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/tiziano-jhonny-floriddia-8478332b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/10 p-2.5 text-zinc-400 transition-colors hover:border-teal-400/60 hover:text-teal-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-teal-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400/40"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-teal-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400/40"
                />
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full resize-none rounded-md border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition-colors focus:border-teal-400/60 focus:outline-none focus:ring-1 focus:ring-teal-400/40"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-md border border-teal-400/60 px-5 py-2.5 text-sm text-teal-400 transition-colors hover:bg-teal-400 hover:text-black"
                >
                  Send message
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            </Reveal>
          </div>
        </Section>
      </main>

      <footer className="border-t border-white/5 py-10 text-center font-mono text-xs text-zinc-500">
        <p>
          © 2026 Tiziano Jhonny Floriddia · built with Next.js, Tailwind, framer-motion · deployed on Render
        </p>
      </footer>
    </div>
  )
}

/* ----------------------------------------------------------------- *
 *  Small layout primitives                                            *
 * ----------------------------------------------------------------- */
function Stat({ number, label }: { number: React.ReactNode; label: string }) {
  return (
    <div>
      <div className="text-3xl font-semibold text-zinc-100 md:text-4xl">{number}</div>
      <p className="mt-2 max-w-[28ch] text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</p>
    </div>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-teal-400">{eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 md:text-5xl">{title}</h2>
        </div>
      </Reveal>
      {children}
    </section>
  )
}
