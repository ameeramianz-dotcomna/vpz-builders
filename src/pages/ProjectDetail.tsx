import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen bg-transparent text-text-primary flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-display italic mb-4">Project not found</h2>
        <p className="text-muted text-sm mb-6 max-w-sm">We couldn&apos;t find a project with the identifier &quot;{id}&quot;.</p>
        <Link 
          to="/" 
          className="px-6 py-3 rounded-full bg-surface border border-stroke hover:border-slate-600 transition-colors text-sm font-medium"
        >
          Return to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent text-text-primary font-sans relative pb-24 overflow-x-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-bg/70 border-b border-stroke/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted hover:text-primary transition-colors duration-200 font-mono"
          >
            <span>←</span> Back to Home
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-muted uppercase tracking-widest">
              {project.category}
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-[0.25em] font-mono">
            VPZ Builders
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display italic text-text-primary tracking-tight font-medium">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-muted font-light max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Project Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden mt-10 border border-stroke"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 halftone-overlay opacity-10 pointer-events-none" />
        </motion.div>
      </section>

      {/* Project Meta Information and Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Metadata Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 space-y-6 bg-surface/50 border border-stroke hover:border-primary/20 transition-all p-6 sm:p-8 rounded-3xl backdrop-blur-xl h-fit"
          >
            <h3 className="text-xs font-semibold text-muted uppercase tracking-[0.25em] pb-4 border-b border-stroke">
              Project Specification
            </h3>
            
            <div className="space-y-4 pt-2">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-wider block">Location</span>
                <span className="text-sm font-medium text-text-primary block mt-1">{project.location}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted uppercase tracking-wider block">Client</span>
                <span className="text-sm font-medium text-text-primary block mt-1">{project.client}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted uppercase tracking-wider block">Year Completed</span>
                <span className="text-sm font-medium text-text-primary block mt-1">{project.year}</span>
              </div>
              <div>
                <span className="text-[10px] text-muted uppercase tracking-wider block">Total Area</span>
                <span className="text-sm font-medium text-text-primary block mt-1">{project.area}</span>
              </div>
            </div>
          </motion.div>

          {/* Full Description & Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-display italic text-text-primary">
                Executive Overview
              </h2>
              <p className="text-base text-muted font-light leading-relaxed whitespace-pre-line">
                {project.fullDescription}
              </p>
            </div>

            {/* In-Depth Engineering Details */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface/20 border border-primary/20 space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary">
                Project Highlights & Curing Standards
              </h4>
              <ul className="list-disc list-inside text-sm text-muted font-light space-y-2 leading-relaxed">
                <li>Strict compression checks on M-sand, laterite foundation and standard grade reinforcement steel.</li>
                <li>Climate-adaptive passive natural cooling design systems utilizing double-height roofs.</li>
                <li>Integrated local rainwater drainage infrastructure to withstand severe Kerala monsoons.</li>
                <li>Custom architectural woodwork created by regional Kerala craftsmen.</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-32">
          <div className="space-y-8">
            <div className="border-b border-stroke pb-6">
              <h2 className="text-3xl font-display italic text-text-primary">Project Gallery</h2>
              <p className="text-xs text-muted mt-2 tracking-widest uppercase">Interior & Architectural snapshots</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((imgUrl, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="relative rounded-3xl overflow-hidden border border-stroke aspect-[4/3] group"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${project.title} gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Footer Wrapper */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-32 text-center">
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-surface/50 border border-stroke hover:border-primary/20 relative overflow-hidden flex flex-col items-center gap-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-text-primary">
            Looking for something <span className="font-display italic text-secondary">similar?</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-lg font-light leading-relaxed">
            Consult with head of team Musthafa Thrundikkal about your building site, estimate requirements, or custom architectural designs in Kerala.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2 w-full sm:w-auto">
            <a 
              href="tel:+919746222916" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-bg font-semibold hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/25 text-xs uppercase tracking-wider"
            >
              Call +91 97462 22916
            </a>
            <a 
              href="https://wa.me/919747561111" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface border border-stroke hover:border-primary/40 text-text-primary font-semibold hover:scale-105 transition-transform duration-300 text-xs uppercase tracking-wider"
            >
              WhatsApp Details
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
