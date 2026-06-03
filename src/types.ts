export interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  category: 'completed' | 'ongoing' | 'upcoming'
  location: string
  year: string
  client: string
  area: string
  image: string
  gallery: string[]
}

export interface JournalEntry {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  image: string
}
