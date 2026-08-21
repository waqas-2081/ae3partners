const P = process.env.PUBLIC_URL || '';
export const INSIGHTS_IMG = `${P}/assets/newimages/insights`;

export const ARTICLES = [
  {
    id: 'liberation-park',
    date: 'December 19, 2025',
    category: 'Projects',
    readTime: '4 min read',
    title: 'Liberation Park Project Takes Shape in East Oakland: A New Hub for Community Empowerment',
    excerpt:
      'A new community destination rooted in culture and opportunity — Liberation Park brings market hall energy, gathering space, and long-term empowerment to East Oakland.',
    image: `${INSIGHTS_IMG}/liberation-park.jpg`,
    body: [
      'Liberation Park is emerging as a defining community destination in East Oakland — a place designed to gather, celebrate, and grow. Rooted in culture and opportunity, the project brings together market hall energy, communal courtyard life, and long-term empowerment for local residents, entrepreneurs, and artists.',
      'AE3 Partners is proud to support a vision that puts people first. From early planning through design leadership, the work focuses on creating spaces that feel welcoming, durable, and deeply connected to the neighborhood’s identity.',
      'The market hall and courtyard are more than architectural features — they are catalysts for local business, cultural expression, and everyday connection. Thoughtful circulation, flexible gathering zones, and a strong sense of place help the project serve both daily use and community celebration.',
      'As Liberation Park continues to take shape, it stands as a reminder of what design can do when it listens: strengthen community, create opportunity, and leave a lasting imprint on the East Bay.',
    ],
  },
  {
    id: 'wlac',
    date: 'December 19, 2025',
    category: 'Education',
    readTime: '3 min read',
    title: 'Building the Future: WLAC Kicks Off Construction of New Facilities & Shops Complex',
    excerpt:
      'AE3 Partners joined LACCD and West Los Angeles College to break ground on the new Plant Facilities and Shops Replacement project supporting campus operations for generations.',
    image: `${INSIGHTS_IMG}/wlac-shops.jpg`,
    body: [
      'AE3 Partners joined the Los Angeles Community College District and West Los Angeles College to break ground on a new Plant Facilities and Shops Replacement project — infrastructure that will support the people who keep the campus running for generations to come.',
      'The facility is designed to equip students and staff with the tools, training environments, and operational capacity needed to maintain and improve the college. It is practical architecture with lasting purpose: efficient, resilient, and built around real campus workflows.',
      'From planning through construction kickoff, collaboration across AE3, LACCD, and WLAC has been central to delivering a project that balances budget, schedule, and long-term performance. The groundbreaking marks a clear step forward for campus operations and educational support spaces.',
      'Projects like this reinforce AE3’s commitment to education-sector design — spaces that quietly power learning every day.',
    ],
  },
  {
    id: 'lawa',
    date: 'December 19, 2025',
    category: 'Transportation',
    readTime: '4 min read',
    title:
      'AE3 Partners and Steinberg Hart Collaborate with LAWA to Enhance Traveler Experience Ahead of the Los Angeles Olympics',
    excerpt:
      'Working with LAWA and Steinberg Hart, AE3 is helping elevate the traveler experience as Los Angeles prepares for the global stage of the Olympic Games.',
    image: `${INSIGHTS_IMG}/lawa.jpg`,
    body: [
      'As Los Angeles prepares for the global stage of the Olympic Games, AE3 Partners is collaborating with Steinberg Hart and Los Angeles World Airports (LAWA) to enhance the traveler experience across key airport environments.',
      'Airport projects demand precision: clear wayfinding, durable materials, operational continuity, and design that supports millions of passengers without losing a sense of place. AE3’s architecture and construction management expertise help bridge vision and delivery on complex public infrastructure.',
      'Working alongside Steinberg Hart and LAWA, the team is focused on improvements that make journeys smoother, safer, and more memorable — from arrival sequences to corridor and amenity experiences that shape first and last impressions of the city.',
      'These collaborations reflect AE3’s strength in transportation and civic work: thoughtful design, coordinated delivery, and outcomes that serve the public at scale.',
    ],
  },
  {
    id: '18-years',
    date: 'December 19, 2025',
    category: 'Studio',
    readTime: '3 min read',
    title: '18 Years of Design That Connects Us',
    excerpt:
      'Looking back on nearly two decades of work that connects communities — through thoughtful design, trusted partnerships, and projects built to last.',
    image: `${INSIGHTS_IMG}/18-years.jpg`,
    body: [
      'Eighteen years of design that connects us — a milestone that celebrates people, partnerships, and projects built to strengthen communities across California.',
      'From civic campuses and education facilities to aviation and community-focused destinations, AE3’s work has always been about more than buildings. It is about places where people learn, gather, travel, and thrive.',
      'Looking back, the through-line is clear: collaborative process, client-centered delivery, and a belief that good design should serve both today’s needs and tomorrow’s possibilities. Looking ahead, that same purpose continues to guide every studio conversation and every project team.',
      'Thank you to the clients, partners, and team members who have shaped these eighteen years — and to the communities that inspire the next chapter.',
    ],
  },
  {
    id: '16-years',
    date: 'October 20, 2023',
    category: 'Studio',
    readTime: '3 min read',
    title: 'Celebrating 16 Years of Architectural Excellence',
    excerpt:
      'Sixteen years of architectural excellence — a milestone celebrating the people, projects, and purpose that continue to shape AE3 Partners.',
    image: `${INSIGHTS_IMG}/16-years.jpg`,
    body: [
      'Sixteen years of architectural excellence mark a meaningful milestone for AE3 Partners — a celebration of craft, collaboration, and the communities we serve.',
      'Over more than a decade and a half, the studio has grown through landmark projects and everyday dedication: listening closely, designing carefully, and delivering with integrity. Excellence, for AE3, is measured not only in form, but in trust earned over time.',
      'This anniversary is a moment to thank our team and partners, and to reaffirm the values that continue to shape our practice — thoughtful design, sustainable intent, and construction insight that keeps projects grounded in reality.',
      'As we look forward, we carry the same ambition that started it all: create spaces that endure, inspire, and belong to the people who use them.',
    ],
  },
  {
    id: 'merritt',
    date: 'September 26, 2023',
    category: 'Education',
    readTime: '3 min read',
    title: 'Merritt Child Development Center Breaks Ground',
    excerpt:
      'Groundbreaking for Merritt College Child Development Center marks another step forward for education-focused design that supports families and learning.',
    image: `${INSIGHTS_IMG}/merritt.jpg`,
    body: [
      'The Merritt College Child Development Center groundbreaking marks an important step forward for education-focused design that supports families, learning, and early childhood care on campus.',
      'Child development environments ask for a special kind of architecture — safe, bright, flexible, and calibrated to how young learners move, explore, and grow. AE3’s work on the project centers those needs while aligning with college operations and long-term campus planning.',
      'Breaking ground is both a celebration and a commitment: to deliver a facility that serves students training for careers in education, and the children and families who will experience the center every day.',
      'Projects like Merritt reinforce AE3’s dedication to educational environments that strengthen community at every scale.',
    ],
  },
];

export function getArticleById(id) {
  return ARTICLES.find((article) => article.id === id) || null;
}

export function getRelatedArticles(id, limit = 3) {
  return ARTICLES.filter((article) => article.id !== id).slice(0, limit);
}
