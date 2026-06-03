import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <Link 
      to={`/project/${project.id}`}
      className={`group relative overflow-hidden bg-surface border border-stroke rounded-3xl block h-80 sm:h-96 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 ${className}`}
    >
      {/* Background Image */}
      <img 
        src={project.image} 
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Halftone Dot Overlay */}
      <div className="absolute inset-0 halftone-overlay opacity-[0.12] mix-blend-overlay pointer-events-none" />

      {/* Dark Ambient Vignette (Default state) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Card Info (Default view, bottom-aligned) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end transition-transform duration-500 group-hover:translate-y-8 group-hover:opacity-0">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] mb-2 font-mono font-medium">
          {project.category === 'completed' ? 'Completed Project' : project.category === 'ongoing' ? 'Ongoing Project' : 'Upcoming Concept'}
        </span>
        <h4 className="text-xl sm:text-2xl font-display italic text-text-primary">
          {project.title}
        </h4>
        <p className="text-xs sm:text-sm text-muted mt-2 font-light line-clamp-1">
          {project.location}
        </p>
      </div>

      {/* Hover Overlay Screen */}
      <div className="absolute inset-0 bg-bg/90 backdrop-blur-md opacity-0 group-hover:opacity-100 flex items-center justify-center p-6 transition-all duration-500">
        
        {/* Border Glow */}
        <div className="absolute inset-px rounded-[23px] border border-primary/20 pointer-events-none" />

        {/* Hover Pill Button */}
        <div className="relative p-[1.5px] rounded-full accent-gradient hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/10">
          <div className="px-6 py-2.5 rounded-full bg-surface text-xs font-semibold text-text-primary tracking-wider uppercase flex items-center gap-2">
            <span>View —</span>
            <span className="font-display italic normal-case text-sm text-secondary">
              {project.title}
            </span>
            <span className="text-xs text-primary">↗</span>
          </div>
        </div>

      </div>
    </Link>
  )
}
