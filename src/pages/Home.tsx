import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hls from 'hls.js'
import { projects, journalEntries } from '../data'
import ProjectCard from '../components/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const roles = [
  "Building Commercial Hubs",
  "Crafting Luxury Villas",
  "Innovating Eco Smart Homes",
  "Executing Climate Resilience"
]
const videoSrc = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"

// Explorations images - first one is the user's provided project work image
const explorationImages = [
  "/works/v8671.jpg",
  "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80"
]

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const footerVideoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  
  // Parallax Gallery Refs
  const parallaxContainerRef = useRef<HTMLDivElement>(null)
  const pinnedContentRef = useRef<HTMLDivElement>(null)
  const colLeftRef = useRef<HTMLDivElement>(null)
  const colRightRef = useRef<HTMLDivElement>(null)

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hls video streams loading
  useEffect(() => {
    const loadHls = (video: HTMLVideoElement | null) => {
      if (!video) return
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(videoSrc)
        hls.attachMedia(video)
        return hls
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc
      }
      return null
    }

    const heroHls = loadHls(heroVideoRef.current)
    const footerHls = loadHls(footerVideoRef.current)

    return () => {
      if (heroHls) heroHls.destroy()
      if (footerHls) footerHls.destroy()
    }
  }, [])

  // Dynamic role line cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // GSAP Entrance Animations for Hero
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.to('.name-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1
      })
      .to('.blur-in', {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.0,
        stagger: 0.1
      }, '-=1.0')
    })

    return () => ctx.revert()
  }, [])

  // GSAP Parallax scroll gallery pinning and column movement (Only on desktop >= 768px)
  useEffect(() => {
    const container = parallaxContainerRef.current
    const pinned = pinnedContentRef.current
    const colLeft = colLeftRef.current
    const colRight = colRightRef.current

    if (!container || !pinned || !colLeft || !colRight) return

    const mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: false
      })

      // Move left column upwards
      gsap.fromTo(colLeft, 
        { y: "5%" },
        {
          y: "-35%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      )

      // Move right column downwards
      gsap.fromTo(colRight, 
        { y: "-15%" },
        {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      )
    })

    return () => mm.revert()
  }, [])

  // GSAP Marquee scroll/animation
  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const animation = gsap.to(marquee, {
      xPercent: -50,
      ease: 'none',
      duration: 35,
      repeat: -1
    })

    return () => {
      animation.kill()
    }
  }, [])

  return (
    <div className="relative">
      
      {/* Lightbox for Parallax Gallery */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage} 
              alt="Work Detail view" 
              className="max-w-full max-h-[85vh] rounded-3xl object-contain border border-stroke"
            />
            <span className="absolute top-6 right-6 text-xs text-muted tracking-widest uppercase bg-surface/90 border border-stroke px-4 py-2 rounded-full">
              Click anywhere to close
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Pill Navbar (Perfectly scaled for small screens) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-6 px-3 sm:px-4">
        <div className={`inline-flex items-center rounded-full glass-panel px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-300 ${scrollY > 50 ? 'shadow-xl shadow-black/60 border-primary/25 bg-surface/90' : ''}`}>
          
          {/* Logo */}
          <a href="#home" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full relative flex items-center justify-center overflow-hidden group hover:scale-105 transition-transform duration-300 mr-1 sm:mr-1.5">
            <div className="absolute inset-0 rounded-full border border-transparent group-hover:accent-gradient group-hover:rotate-180 transition-transform duration-700 pointer-events-none" />
            <div className="absolute inset-[1.5px] rounded-full bg-bg flex items-center justify-center overflow-hidden">
              <img src="/logo/vlogo.png" alt="VPZ Logo" className="w-full h-full object-cover p-0.5 bg-white/5" />
            </div>
          </a>

          <div className="w-px h-4 bg-stroke mx-1 hidden xs:block" />

          {/* Links */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <a href="#home" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3 py-1 text-text-primary hover:bg-stroke/40 transition-all">Home</a>
            <a href="#work" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3 py-1 text-muted hover:text-text-primary hover:bg-stroke/30 transition-all">Work</a>
            <a href="#journal" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3 py-1 text-muted hover:text-text-primary hover:bg-stroke/30 transition-all">Journal</a>
            <a href="#explorations" className="text-[10px] sm:text-xs md:text-sm font-medium rounded-full px-2 sm:px-3 py-1 text-muted hover:text-text-primary hover:bg-stroke/30 transition-all">Gallery</a>
          </div>

          <div className="w-px h-4 bg-stroke mx-1 sm:mx-2" />

          {/* "Say hi" CTA Button */}
          <a 
            href="#contact" 
            className="relative overflow-hidden rounded-full group p-[1px] text-[10px] sm:text-xs font-semibold flex items-center justify-center text-text-primary shrink-0"
          >
            <span className="absolute inset-0 rounded-full bg-stroke/60 group-hover:accent-gradient transition-all duration-300 pointer-events-none" />
            <span className="relative z-10 px-2.5 sm:px-4 py-1 bg-surface rounded-full flex items-center gap-1 border border-transparent">
              Contact <span className="text-[8px] text-primary">↗</span>
            </span>
          </a>

        </div>
      </nav>

      {/* Hero Section (Includes responsive text scaling and wrap-safe cycler) */}
      <section id="home" className="relative h-screen overflow-hidden flex items-center justify-center bg-[#07090A]">
        {/* Background HLS Video */}
        <div className="absolute inset-0 z-0 bg-[#07090A]/95">
          <video 
            ref={heroVideoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-35"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#07090A] to-transparent z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 text-center flex flex-col items-center">
          <span className="blur-in text-[9px] sm:text-xs text-primary uppercase tracking-[0.4em] mb-4 sm:mb-6 font-semibold inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            "we build best"
          </span>
          
          <h1 className="name-reveal text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-display font-bold leading-none tracking-tight text-white mb-4 sm:mb-6">
            VPZ <span className="font-display italic font-light text-primary">Builders</span>
          </h1>

          <div className="blur-in text-xs xs:text-sm sm:text-xl md:text-2xl text-slate-300 font-light mb-6 max-w-2xl px-2 leading-relaxed">
            A premium <span className="text-secondary font-medium font-display italic inline-block">{roles[roleIndex]}</span> team headed by Musthafa Thrundikkal.
          </div>

          <p className="blur-in text-xs sm:text-base text-slate-400 max-w-lg mb-8 sm:mb-10 leading-relaxed font-light px-2">
            With over 15 years of construction excellence in Vallapuzha, Palakkad, Kerala, we engineer state-of-the-art residences and commercial structures built to endure.
          </p>

          <div className="blur-in flex items-center gap-3 sm:gap-4 w-full justify-center px-4">
            <a 
              href="#work"
              className="w-1/2 xs:w-auto px-5 sm:px-7 py-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-primary text-bg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 hover:bg-secondary hover:text-bg text-center"
            >
              See Works
            </a>
            <a 
              href="#contact"
              className="w-1/2 xs:w-auto px-5 sm:px-7 py-3 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:border-primary/40 hover:bg-white/10 text-center"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 sm:gap-3">
          <span className="text-[8px] text-slate-400 uppercase tracking-[0.25em] font-light">SCROLL</span>
          <div className="w-[1px] h-8 sm:h-10 bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-primary animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section id="work" className="bg-bg py-16 sm:py-24 border-t border-stroke/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary/40" />
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-[0.3em] font-medium font-mono">Selected Work</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Featured <span className="font-display italic text-secondary">projects</span>
              </h2>
              <p className="text-xs sm:text-base text-muted font-light max-w-md leading-relaxed">
                A premium selection of buildings and residential homes we have executed, from engineering blueprint to final brick.
              </p>
            </div>
            
            <a 
              href="#footer-works"
              className="inline-flex md:inline-flex px-5 py-2.5 rounded-full border border-stroke text-[10px] sm:text-xs font-semibold uppercase tracking-wider hover:border-primary/40 hover:bg-surface/55 transition-colors duration-300 gap-2 items-center text-text-primary self-start md:self-end"
            >
              View all work <span>→</span>
            </a>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
            {projects.map((project, idx) => {
              // Dynamic column spans: 7/5/5/7
              let colSpan = "md:col-span-7"
              if (idx === 1 || idx === 2) {
                colSpan = "md:col-span-5"
              }
              return (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  className={colSpan}
                />
              )
            })}
          </div>

        </div>
      </section>

      {/* Journal Section */}
      <section id="journal" className="bg-bg py-16 sm:py-24 border-t border-stroke/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16"
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-primary/40" />
                <span className="text-[10px] sm:text-xs text-primary uppercase tracking-[0.3em] font-medium font-mono">Expert Insights</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
                Recent <span className="font-display italic text-secondary">thoughts</span>
              </h2>
              <p className="text-xs sm:text-base text-muted font-light max-w-md leading-relaxed">
                Technical logs, building guidelines, and architecture articles written by Musthafa Thrundikkal.
              </p>
            </div>
            
            <a 
              href="#contact"
              className="inline-flex md:hidden text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              Ask an Inquiry
            </a>
          </motion.div>

          {/* Horizontal Pills list */}
          <div className="space-y-3 sm:space-y-4">
            {journalEntries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-3xl sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke hover:border-primary/20 transition-all duration-300 group cursor-pointer"
              >
                {/* Image */}
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-stroke/40">
                  <img 
                    src={entry.image} 
                    alt={entry.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-grow text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[9px] sm:text-[10px] text-muted font-mono">{entry.date}</span>
                    <span className="text-muted/40 text-xs hidden sm:inline">•</span>
                    <span className="text-[9px] sm:text-[10px] text-secondary font-mono">{entry.readTime}</span>
                  </div>
                  <h4 className="text-xs sm:text-base font-medium text-text-primary group-hover:text-primary transition-colors">
                    {entry.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-muted line-clamp-1 max-w-xl font-light">
                    {entry.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-bg/50 border border-stroke items-center justify-center text-muted group-hover:text-primary group-hover:border-primary/30 transition-colors mr-2">
                  <span className="text-sm transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Explorations (Parallax Gallery - Responsive height and flow logic) */}
      <section id="explorations" ref={parallaxContainerRef} className="relative bg-bg min-h-fit md:min-h-[300vh] border-t border-stroke/20 py-16 md:py-0">
        
        {/* Layer 1: Pinned Center (Behaves relative on mobile, pinned absolute on desktop) */}
        <div ref={pinnedContentRef} className="relative md:absolute md:inset-0 md:h-screen z-10 flex items-center justify-center md:pointer-events-none pb-12 md:pb-0">
          <div className="max-w-md mx-auto px-6 text-center space-y-4 sm:space-y-6 select-none md:pointer-events-auto">
            <span className="text-[10px] sm:text-xs text-primary uppercase tracking-[0.3em] font-medium font-mono">Gallery Overview</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-text-primary">
              Visual playground
            </h2>
            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
              Snapshots of active construction projects, structural concrete tests, and behind-the-scenes building views in Vallapuzha.
            </p>
            <a 
              href="#contact" 
              className="inline-flex px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-surface border border-stroke text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-text-primary hover:border-primary/40 hover:bg-surface-hover transition-colors"
            >
              Inquire About Gallery
            </a>
          </div>
        </div>

        {/* Layer 2: Parallax/Grid Columns (Responsive side-by-side grids or parallax columns) */}
        <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8 md:gap-40 py-6 md:py-24">
          
          {/* Left Column (moving up on desktop, flex grid on mobile) */}
          <div ref={colLeftRef} className="w-full md:flex-1 flex flex-row md:flex-col gap-4 sm:gap-6 md:gap-24 md:pt-48 items-center md:items-end justify-center flex-wrap sm:flex-nowrap">
            {explorationImages.slice(0, 3).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="w-[45%] xs:w-[30%] sm:w-full aspect-square max-w-[240px] md:max-w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border border-stroke hover:border-primary/30 cursor-zoom-in group shadow-2xl relative rotate-[-2deg] md:rotate-[-2deg] bg-surface"
              >
                <img 
                  src={img} 
                  alt="Construction view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Right Column (moving down on desktop, flex grid on mobile) */}
          <div ref={colRightRef} className="w-full md:flex-1 flex flex-row md:flex-col gap-4 sm:gap-6 md:gap-24 items-center md:items-start justify-center flex-wrap sm:flex-nowrap">
            {explorationImages.slice(3, 6).map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxImage(img)}
                className="w-[45%] xs:w-[30%] sm:w-full aspect-square max-w-[240px] md:max-w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border border-stroke hover:border-primary/30 cursor-zoom-in group shadow-2xl relative rotate-[3deg] md:rotate-[3deg] bg-surface"
              >
                <img 
                  src={img} 
                  alt="Construction view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Stats Section */}
      <section className="bg-bg py-16 sm:py-24 border-y border-stroke/20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-3xl sm:text-5xl font-bold text-text-primary font-mono tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                15+
              </span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-muted font-medium">Years Experience</span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-3xl sm:text-5xl font-bold text-text-primary font-mono tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                120+
              </span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-muted font-medium">Projects Done</span>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-3xl sm:text-5xl font-bold text-text-primary font-mono tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                100%
              </span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-muted font-medium">Client Satisfaction</span>
            </div>

          </div>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <section id="contact" className="relative bg-[#07090A] pt-16 sm:pt-20 pb-12 overflow-hidden min-h-[90vh] flex flex-col justify-between text-white">
        
        {/* Background HLS Video (Flipped Vertically) */}
        <div className="absolute inset-0 z-0 bg-[#07090A]">
          <video 
            ref={footerVideoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-25"
          />
          {/* Heavy Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>

        {/* Marquee Text */}
        <div className="w-full relative overflow-hidden py-3 sm:py-4 z-10 border-y border-stroke/20 bg-bg/30 backdrop-blur-sm">
          <div ref={marqueeRef} className="whitespace-nowrap inline-flex gap-8 text-[24px] sm:text-5xl md:text-6xl font-bold tracking-widest uppercase text-primary/10 select-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i}>WE BUILD BEST • VPZ BUILDERS •</span>
            ))}
          </div>
        </div>

        {/* Contact CTA Area */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 my-12 sm:my-16 space-y-8 sm:space-y-12 w-full">
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xs font-semibold text-primary tracking-[0.3em] uppercase">"we build best"</h2>
            <h3 className="text-3xl sm:text-6xl font-display font-medium text-white leading-tight">
              Let's engineer your <span className="font-display italic text-secondary">vision</span>
            </h3>
            <p className="text-xs sm:text-base text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
              Ready to design or execute your commercial space or premium residential home? Reach out to Musthafa Thrundikkal and the VPZ team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left max-w-4xl mx-auto">
            {/* Call card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-white/10 hover:border-primary/45 transition-all duration-300 group bg-white/5">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 sm:mb-6">
                  <span className="text-sm">📞</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-white mb-2">Direct Call</h4>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">Available for site consults, structural inquiries, and project estimates.</p>
              </div>
              <div className="space-y-2">
                <a href="tel:+919746222916" className="block text-sm font-semibold text-secondary hover:text-primary hover:underline transition-colors font-mono">
                  +91 97462 22916
                </a>
                <a href="tel:+919747561111" className="block text-sm font-semibold text-secondary hover:text-primary hover:underline transition-colors font-mono">
                  +91 97475 61111
                </a>
              </div>
            </div>

            {/* WhatsApp card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-white/10 hover:border-primary/45 transition-all duration-300 group bg-white/5">
              <div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 sm:mb-6">
                  <span className="text-sm">💬</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-white mb-2">WhatsApp Chat</h4>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">Send us details of your building site or project designs for rapid response.</p>
              </div>
              <div className="space-y-2 flex flex-col gap-1.5">
                <a href="https://wa.me/919746222916" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 transition-all">
                  Chat +91 97462 22916
                </a>
                <a href="https://wa.me/919747561111" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 transition-all">
                  Chat +91 97475 61111
                </a>
              </div>
            </div>

            {/* Address card */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Vallapuzha,+Palakkad,+Kerala,+India"
              target="_blank"
              rel="noreferrer"
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-white/10 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group cursor-pointer block bg-white/5"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-5 sm:mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-sm">📍</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-primary transition-colors">Office Location</h4>
                <p className="text-xs text-slate-400 mb-4 font-light leading-relaxed">Visit our headquarters in Palakkad. Click for live Google Maps navigation & directions.</p>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed font-mono flex items-center justify-between border-t border-white/10 pt-4">
                <span>
                  VPZ Builders<br />
                  Valappuzha, 679336<br />
                  Palakkad, Kerala
                </span>
                <span className="text-xs text-primary group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>
        </div>

        {/* Clickable Projects / Works in Footer Section */}
        <div id="footer-works" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full border-t border-white/10 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left bg-white/5 backdrop-blur-md rounded-3xl p-5 sm:p-8">
          
          {/* Completed Works */}
          <div>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4 font-mono">Completed Works</h4>
            <ul className="space-y-2">
              {projects.filter(p => p.category === 'completed').map(p => (
                <li key={p.id}>
                  <Link to={`/project/${p.id}`} className="text-xs text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                    <span>•</span> {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ongoing Works */}
          <div>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4 font-mono">Ongoing Works</h4>
            <ul className="space-y-2">
              {projects.filter(p => p.category === 'ongoing').map(p => (
                <li key={p.id}>
                  <Link to={`/project/${p.id}`} className="text-xs text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                    <span>•</span> {p.title}
                  </Link>
                </li>
              ))}
              {projects.filter(p => p.category === 'ongoing').length === 0 && (
                <span className="text-xs text-slate-500 font-light">None at the moment</span>
              )}
            </ul>
          </div>

          {/* Upcoming Works */}
          <div>
            <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 sm:mb-4 font-mono">Upcoming Works</h4>
            <ul className="space-y-2">
              {projects.filter(p => p.category === 'upcoming').map(p => (
                <li key={p.id}>
                  <Link to={`/project/${p.id}`} className="text-xs text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                    <span>•</span> {p.title}
                  </Link>
                </li>
              ))}
              {projects.filter(p => p.category === 'upcoming').length === 0 && (
                <span className="text-xs text-slate-500 font-light">Planning phase</span>
              )}
            </ul>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-center sm:text-left">
          
          {/* Availability badge & Logo */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-stroke bg-surface flex items-center justify-center shrink-0">
              <img src="/logo/vlogo.png" alt="VPZ Logo" className="w-full h-full object-cover p-1 bg-white/5" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Available for projects in Kerala</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-5 sm:gap-6">
            <a href="tel:+919746222916" className="text-xs text-slate-400 hover:text-primary transition-colors">Call Main</a>
            <a href="https://wa.me/919747561111" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-primary transition-colors">WhatsApp</a>
            <a href="mailto:musthafa@vpzbuilders.com" className="text-xs text-slate-400 hover:text-primary transition-colors">Email</a>
          </div>

          {/* Legal */}
          <div className="text-[10px] text-muted/50 font-mono">
            © 2026 VPZ Builders • Vallapuzha
          </div>

        </div>

      </section>

      {/* Floating Action Buttons (WhatsApp & Call) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/919746222916" 
          target="_blank" 
          rel="noreferrer"
          aria-label="WhatsApp Chat"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-surface text-xs font-semibold text-text-primary border border-stroke whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            WhatsApp Chat
          </span>
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.66.986 3.284 1.489 4.974 1.49 5.485.001 9.948-4.463 9.95-9.95.001-2.657-1.02-5.155-2.877-7.015-1.856-1.86-4.353-2.883-7.017-2.884-5.488 0-9.953 4.466-9.955 9.953-.001 1.93.535 3.542 1.442 5.12L1.139 21.053l4.508-1.899zm12.39-4.839c-.3-.149-1.772-.874-2.046-.973-.274-.1-.474-.149-.674.15-.2.299-.773.973-.948 1.171-.174.199-.349.224-.649.075-.3-.149-1.266-.467-2.41-1.485-.89-.794-1.49-1.773-1.665-2.072-.174-.3-.019-.462.13-.611.135-.134.3-.349.449-.523.15-.174.2-.299.3-.498.1-.2.05-.374-.025-.523-.075-.15-.674-1.62-.923-2.219-.242-.58-.488-.5-.674-.51-.174-.007-.374-.008-.574-.008-.2 0-.524.075-.798.374-.274.299-1.047 1.022-1.047 2.493 0 1.47 1.072 2.89 1.222 3.09.15.199 2.11 3.22 5.11 4.516.714.308 1.272.492 1.707.63.715.228 1.365.196 1.878.119.571-.085 1.772-.723 2.022-1.42.25-.697.25-1.294.174-1.42-.075-.125-.274-.199-.574-.349z"/>
          </svg>
        </a>

        {/* Call Button */}
        <a 
          href="tel:+919746222916" 
          aria-label="Call Us"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary hover:bg-secondary text-bg flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-surface text-xs font-semibold text-text-primary border border-stroke whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Direct Call
          </span>
          <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
            <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.779-7.78-4.541-8.866.079-.039 2.048-1.007 2.048-1.007l-3.52-6.795-.008.004c-1.085.534-3.4 1.87-4.14 3.738-1.44 3.633 4.291 14.157 8.52 18.28 3.86 3.767 7.76 2.451 9.24.977.72-.717 2.02-3.018 2.02-3.018l-.034-.031z"/>
          </svg>
        </a>

      </div>

    </div>
  )
}
