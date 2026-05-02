"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <header className="fixed w-full top-0 z-50 bg-gray-900/80 backdrop-blur-sm">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-teal-400">
            TJF
          </Link>
          <div className="space-x-8">
            <Link href="#home" className="hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-teal-400 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-teal-400 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-teal-400 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-24 px-6">
        <section id="home" className="min-h-[calc(100vh-6rem)] flex items-center">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-teal-400 font-mono mb-4">Hi, my name is</p>
              <h1 className="text-6xl font-bold text-white mb-3">Tiziano Jhonny Floriddia</h1>
              <h2 className="text-5xl font-bold text-gray-300 mb-6">
                Machine Learning for real industrial problems.
              </h2>
              <p className="text-gray-400 max-w-2xl mb-8">
                I&apos;m an AI Engineer at Alstom Ferroviaria. I build end-to-end ML systems on operational data and
                automate enterprise processes — from research notebook to desktop app shipped to the team. Currently
                exploring more verticality on AI/ML in tech-first contexts.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/Taizans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors p-2 rounded-full hover:bg-gray-800"
                >
                  <Github className="w-8 h-8" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/tiziano-jhonny-floriddia-8478332b6/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors p-2 rounded-full hover:bg-gray-800"
                >
                  <Linkedin className="w-8 h-8" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:tizianofloriddia16@gmail.com"
                  className="text-teal-400 hover:text-teal-300 transition-colors p-2 rounded-full hover:bg-gray-800"
                >
                  <Mail className="w-8 h-8" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-white">About Me</h2>
            <div className="space-y-6 text-gray-300">
              <p>
                I&apos;m an AI Engineer at Alstom Ferroviaria in Savigliano (Italy), where I build production ML
                systems on operational railway data and automate enterprise processes. My current focus is a
                multi-task text classification system on SAP PM maintenance notifications for the ETR675 high-speed
                fleet — trained on ~58k labeled records, deployed as a desktop app that auto-classifies 74,5% of new
                notifications above confidence threshold.
              </p>
              <p>
                I graduated in Computer Science at the University of Turin in November 2025 with a thesis on a
                blockchain-based system for the validation and tokenization of agricultural environmental data
                (advisor: Prof. Andrea Bracciali).
              </p>
              <p>
                Before going AI/ML, I worked across the stack — low-level systems (C), web (React/Next.js), databases
                (PostgreSQL/MongoDB), Microsoft Power Platform — which now pays off whenever I need to ship a model
                into a Tkinter desktop app, generate colored Excel / interactive HTML / PowerPoint reports, or wire
                production data into Power BI dashboards used daily by Engineering and management.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row justify-between mt-10">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-4">
                <h4 className="text-lg font-semibold text-teal-400 mb-4">Education</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-white font-medium">BSc in Computer Science</p>
                    <p className="text-gray-400">University of Turin · 2022 — 2025</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Thesis: blockchain for environmental data validation & tokenization in agriculture
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Scientific High School Diploma</p>
                    <p className="text-gray-400">
                      Liceo Scientifico Gaetano Curcio
                      <br />
                      Ispica (RG)
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-4 md:border-l border-gray-700">
                <h4 className="text-lg font-semibold text-teal-400 mb-4">Focus Areas</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Machine Learning on industrial data</li>
                  <li>Process automation</li>
                  <li>Microsoft Power Platform</li>
                  <li>Distributed systems & blockchain</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-8 text-teal-400">AI / Machine Learning</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="flex flex-col items-center">
                  <img src="/Python_icon.png" alt="Python" className="w-16 h-16 mb-2" />
                  <span className="text-gray-300">Python</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg"
                    alt="scikit-learn"
                    className="w-16 h-16 mb-2 bg-white rounded p-1"
                  />
                  <span className="text-gray-300">scikit-learn</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_mark.svg"
                    alt="pandas"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">pandas</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg"
                    alt="NumPy"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">NumPy</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.svgrepo.com/show/353949/jupyter.svg"
                    alt="Jupyter"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">Jupyter</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-8 text-teal-400">Microsoft Power Platform</h3>
              <div className="flex justify-center gap-16">
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"
                    alt="Power BI"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">Power BI</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Microsoft_Power_Automate.svg"
                    alt="Power Automate"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">Power Automate</span>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-8 text-teal-400">Languages</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.svgrepo.com/show/303206/javascript-logo.svg"
                    alt="JavaScript"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">JavaScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
                    alt="TypeScript"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">TypeScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/javaicon.png" alt="Java" className="w-16 h-16 mb-2" />
                  <span className="text-gray-300">Java</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/C_icon.png" alt="C" className="w-16 h-16 mb-2" />
                  <span className="text-gray-300">C</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.svgrepo.com/show/331760/sql-database-generic.svg"
                    alt="SQL"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">SQL</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-8 text-teal-400">Web & Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                    alt="React"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">React</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                    alt="Next.js"
                    className="w-16 h-16 mb-2 bg-white rounded p-1"
                  />
                  <span className="text-gray-300">Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/Git_icon.svg.png" alt="Git" className="w-16 h-16 mb-2" />
                  <span className="text-gray-300">Git</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/Postgresql_elephant.svg.png" alt="PostgreSQL" className="w-16 h-16 mb-2" />
                  <span className="text-gray-300">PostgreSQL</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://www.svgrepo.com/show/331488/mongodb.svg"
                    alt="MongoDB"
                    className="w-16 h-16 mb-2"
                  />
                  <span className="text-gray-300">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Selected Projects</h2>

            <h3 className="text-2xl font-semibold mb-6 text-teal-400">Featured</h3>
            <div className="grid gap-8 md:grid-cols-2 mb-16">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-teal-400/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-teal-400">AI Solution — ETR675 Maintenance</h3>
                  <span className="text-xs px-2 py-1 rounded bg-teal-400/10 text-teal-300 border border-teal-400/30">
                    Production · Alstom
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  End-to-end multi-task text classification system on SAP PM maintenance notifications for the ETR675
                  high-speed fleet. Trained on 58.223 labeled notifications. In production: auto-classifies 74,5% of
                  new notifications above confidence threshold, cutting triage time by ~85-95%.
                </p>
                <p className="text-sm text-gray-400">
                  Stack: Python · scikit-learn · TF-IDF · Logistic Regression + OneVsRest · CalibratedClassifierCV ·
                  StratifiedKFold · Tkinter · PyInstaller
                </p>
                <p className="text-xs text-gray-500 mt-3 italic">Codebase confidential (proprietary).</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-teal-400/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-teal-400">Blockchain for Environmental Data</h3>
                  <span className="text-xs px-2 py-1 rounded bg-teal-400/10 text-teal-300 border border-teal-400/30">
                    BSc Thesis · UniTo
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  System for the validation and tokenization of agricultural environmental data on a blockchain.
                  Designed to bring trust and traceability to IoT sensor measurements deployed in farming contexts.
                </p>
                <p className="text-sm text-gray-400">
                  Topic: distributed systems · blockchain · data validation · tokenization
                </p>
                <p className="text-xs text-gray-500 mt-3 italic">
                  University of Turin · November 2025 · Advisor: Prof. Andrea Bracciali
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 text-teal-400">Academic & Personal</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-800/60 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-2 text-white">Atom Fission Simulation</h3>
                <p className="text-gray-400 mb-3 text-sm">
                  Simulated atomic fission with various initial conditions in a Unix environment.
                </p>
                <p className="text-xs text-gray-500">C · Unix</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-2 text-white">Food Delivery Database</h3>
                <p className="text-gray-400 mb-3 text-sm">
                  Designed and implemented the database for a food-delivery application — full ER modeling and
                  advanced SQL queries.
                </p>
                <p className="text-xs text-gray-500">PostgreSQL · draw.io</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-2 text-white">Radio Website Prototype</h3>
                <p className="text-gray-400 mb-3 text-sm">
                  UI/UX prototype for a radio station, built around persona-driven accessibility and responsive
                  design.
                </p>
                <p className="text-xs text-gray-500">Figma</p>
              </div>
              <div className="bg-gray-800/60 rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold mb-2 text-white">Sorting & Path Algorithms</h3>
                <p className="text-gray-400 mb-3 text-sm">
                  Implementation and analysis of Merge Sort, Quick Sort, shortest-path algorithms and the Edit
                  Distance problem.
                </p>
                <p className="text-xs text-gray-500">C · Java</p>
              </div>
            </div>
          </div>
        </section>

        <section id="working-on" className="py-20 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Currently Building</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-400">
                  Root Cause Analysis with &quot;5 Why&quot; chains
                </h3>
                <p className="text-gray-300 mb-4">
                  Prototype on top of the ETR675 classifier: instead of just labeling a notification, walk a chain
                  of &quot;why&quot; questions to surface plausible root causes from historical patterns. Exploring
                  small transformer encoders fine-tuned on the maintenance corpus.
                </p>
                <p className="text-sm text-gray-400">PyTorch · transformers · Python</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-teal-400">Sharper English &amp; ML reading list</h3>
                <p className="text-gray-300 mb-4">
                  Pushing English from B2 toward C1 (technical interviews and EU job market are in English by
                  default), and going through foundational ML papers and the scikit-learn / PyTorch source for the
                  algorithms I actually ship.
                </p>
                <p className="text-sm text-gray-400">Reading · writing · interviewing</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-900">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="text-4xl font-bold mb-8 text-center">What&apos;s Next?</h3>
            <h2 className="text-5xl font-bold mb-6 text-center text-teal-400 text-transparent bg-clip-text">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-center mb-12">
              Interested in talking about AI/ML roles, industrial ML, or just want to compare notes on shipping
              models? I&apos;m always happy to hear from you. Drop a message and I&apos;ll be in touch.
            </p>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 rounded-lg bg-white/5 border border-gray-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors text-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 rounded-lg bg-white/5 border border-gray-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors text-white"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full p-4 rounded-lg bg-white/5 border border-gray-800 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-colors text-white resize-none"
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-center py-6">
        <p>&copy; 2026 Tiziano Jhonny Floriddia. All rights reserved.</p>
      </footer>
    </div>
  )
}
