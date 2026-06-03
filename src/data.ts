import type { Project, JournalEntry } from './types'

export const projects: Project[] = [
  {
    id: 'thirundikal-residence',
    title: 'Thrundikkal Villa',
    description: 'A luxurious, modern tropical residence built with sustainable local materials in Vallapuzha.',
    fullDescription: 'Designed by expert local architects and built under the guidance of Musthafa Thrundikkal, this tropical modernist home seamlessly integrates the indoor and outdoor environments. The project utilizes natural stones, clay roofs, and native wooden finishes to offer high-end comfort while staying true to the architectural heritage of Kerala.',
    category: 'completed',
    location: 'Vallapuzha, Palakkad, Kerala',
    year: '2025',
    client: 'Musthafa Thrundikkal Family',
    area: '4,200 sq. ft.',
    image: '/works/v8671.jpg',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'vallapuzha-plaza',
    title: 'Vallapuzha Commercial Plaza',
    description: 'A contemporary 4-story retail and office complex incorporating smart energy management.',
    fullDescription: 'The Vallapuzha Commercial Plaza is a state-of-the-art commercial hub. It offers modular retail shops on the ground and first floor, with premium office workspaces on the upper levels. Structurally engineered to sustain heavy footfall, it features high-efficiency rainwater harvesting, solar power integration, and smart glass facades that reduce heating.',
    category: 'completed',
    location: 'Main Road, Vallapuzha, Kerala',
    year: '2024',
    client: 'VPZ Builders Group',
    area: '18,500 sq. ft.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'kerala-smart-villas',
    title: 'Kerala Eco Smart Residences',
    description: 'An ongoing community of 12 luxury smart-home villas engineered for climate resilience.',
    fullDescription: 'Currently under active construction in the scenic outskirt hills of Vallapuzha, this residential community combines automation with passive thermal design. The homes are engineered with custom high-strength clay hollow blocks that cool naturally, complete with home control servers, greywater recycling loops, and dedicated EV charging docks.',
    category: 'ongoing',
    location: 'Cherukode Road, Vallapuzha, Kerala',
    year: '2026 (Est.)',
    client: 'Joint Venture Development',
    area: '32,000 sq. ft. Total',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'palakkad-heights',
    title: 'Palakkad Heights Apartments',
    description: 'An upcoming high-rise residential complex featuring vertical gardens and an infinity pool.',
    fullDescription: 'An ambitious upcoming project led by Musthafa Thrundikkal, Palakkad Heights will be a landmark luxury high-rise in the district. It will offer panoramic views of the Western Ghats, complete with advanced structural dampers for wind and seismic stability, low-carbon concrete framing, automated parking towers, and a sky terrace pool.',
    category: 'upcoming',
    location: 'Palakkad Bypass, Kerala',
    year: '2028 (Planning)',
    client: 'Skyline Ventures India',
    area: '75,000 sq. ft.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ]
  }
]

export const journalEntries: JournalEntry[] = [
  {
    id: 'sustainable-building-kerala',
    title: 'Eco-Friendly Construction in Monsoon-Heavy Climates',
    excerpt: 'How local materials like laterite and clay tiles withstand torrential rain while keeping buildings cool.',
    content: 'Kerala is famous for its heavy monsoon rains. Building here requires materials that not only resist moisture infiltration but also keep indoor spaces ventilated and cool during the hot and humid summer months. Musthafa Thrundikkal discusses the benefits of laterite bricks, lime-plastering techniques, and double-layered terra-cotta clay roof setups that naturally regulate indoor ambient temperature.',
    date: 'May 12, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'smart-home-integration',
    title: 'The Rise of Smart Home Automation in Rural Kerala',
    excerpt: 'Exploring how remote villas in Palakkad integrate modern IoT systems with solar energy loops.',
    content: 'Smart homes are no longer exclusive to metropolitan areas. Increasingly, residential clients in Vallapuzha are requesting integrated solar microgrids, automated shade controls, and greywater recycling logic. Integrating these systems requires careful coordination from the early concrete-pouring stages to build secure conduits and dedicated machinery rooms.',
    date: 'April 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'concrete-safety-standards',
    title: 'Testing Concrete Strength: Best QA Practices for High-Rises',
    excerpt: 'A detailed lookup at concrete compression testing, slump checks, and proper curing protocols.',
    content: 'Structural safety is paramount. At VPZ Builders, every batch of concrete undergoes slump flow testing and cube compression tests at 7-day and 28-day intervals. Ensuring high curing standards through continuous water spraying or modern curing compounds guarantees that the building structural skeleton exceeds Indian Standard (IS) codes.',
    date: 'March 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'traditional-modern-blend',
    title: 'Blending Traditional Kerala Architecture with Modern minimalism',
    excerpt: 'A look at how we integrate open central courtyards (Nalukettu) into compact modernist floor plans.',
    content: 'The traditional Nalukettu courtyard provides beautiful natural light and ventilation, but it takes up a significant footprint. We walk through architectural strategies to include a mini-courtyard with glass framing in a modern 3-bedroom villa, giving you all the breeze and natural lighting without compromising precious interior floor space.',
    date: 'Feb 10, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
  }
]
