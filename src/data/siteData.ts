export const BRAND = {
  name: 'Let It Grow',
  tagline: 'Websites, SaaS Platforms & Custom Business Software',
  email: 'letitgrow.help@gmail.com',
  location: 'Bhopal, Madhya Pradesh, India',
  domain: 'https://www.letitgrow.in',
  foundedYear: 2023,
} as const

export interface ServiceItem {
  id: string
  title: string
  shortTitle: string
  description: string
  highlights: string[]
  tags: string[]
  icon: 'globe' | 'layers' | 'cpu' | 'sparkles'
  consultationValue: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'websites',
    title: 'Business Websites & Landing Pages',
    shortTitle: 'Website Building',
    description:
      'High-converting, mobile-first websites designed to build instant trust, rank on Google, and turn visitors into paying customers.',
    highlights: [
      'Custom responsive design & lightning-fast load speed',
      'SEO foundations, analytics & lead-capture forms',
      'Built for service businesses, brands & startups',
    ],
    tags: ['React', 'Next.js', 'SEO', 'Performance'],
    icon: 'globe',
    consultationValue: 'Website Development',
  },
  {
    id: 'saas',
    title: 'SaaS Platforms & Cloud Products',
    shortTitle: 'SaaS Platforms',
    description:
      'End-to-end multi-tenant SaaS products engineered for scale—from authentication, role-based access, and subscriptions to automated workflows.',
    highlights: [
      'Multi-tenant architecture & role-based dashboards',
      'Subscription billing, API integrations & automation',
      'Proven in production with Pathology Lab SaaS',
    ],
    tags: ['Multi-Tenant', 'Cloud APIs', 'Dashboards', 'Billing'],
    icon: 'layers',
    consultationValue: 'SaaS Platform Development',
  },
  {
    id: 'custom-software',
    title: 'Custom Business Software',
    shortTitle: 'Custom Software',
    description:
      'Tailor-made internal software built around your exact business workflow—eliminating spreadsheets, manual errors, and rigid off-the-shelf tools.',
    highlights: [
      'Custom CRM, ERP, billing, booking & inventory tools',
      'Built specifically for clinics, labs, retail & agencies',
      'Owned by your business with zero per-seat bloat',
    ],
    tags: ['Custom ERP/CRM', 'Automation', 'Reporting', 'RBAC'],
    icon: 'cpu',
    consultationValue: 'Custom Business Software',
  },
  {
    id: 'tech-services',
    title: 'UI/UX & End-to-End Tech Services',
    shortTitle: 'Tech Services',
    description:
      'Complete technical partnership covering product UI/UX design, web & mobile apps, cloud deployments, third-party integrations, and ongoing support.',
    highlights: [
      'Modern Figma UI/UX systems & interactive prototypes',
      'Payment gateways, WhatsApp/Email automation & APIs',
      'Cloud hosting, maintenance & speed optimization',
    ],
    tags: ['UI/UX Design', 'APIs', 'Cloud Hosting', 'Support'],
    icon: 'sparkles',
    consultationValue: 'Tech Services & UI/UX',
  },
]

export type ProjectCategory = 'all' | 'saas' | 'website'

export interface ProjectItem {
  id: string
  name: string
  category: 'saas' | 'website'
  categoryLabel: string
  badge: string
  tagline: string
  description: string
  highlights: string[]
  tech: string[]
  image: string
  liveUrl: string
  consultationService: string
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pathology-lab-saas',
    name: 'Pathology Lab SaaS',
    category: 'saas',
    categoryLabel: 'SaaS Platform',
    badge: 'Flagship SaaS',
    tagline: 'Diagnostic Laboratory Management Cloud',
    description:
      'A multi-tenant cloud platform purpose-built for pathology labs and diagnostic centers to manage patients, staff roles, test catalogs, billing, and print-ready reports with abnormal-value highlighting.',
    highlights: [
      'Multi-tenant lab onboarding with Owner & Receptionist RBAC',
      'Automated printable lab reports with abnormal-value flags',
      'Super-admin panel, billing tracking & zero-paper workflows',
    ],
    tech: ['React', 'Vite', 'Serverless API', 'Multi-Tenant Cloud'],
    image: '/images/pathology-lab.webp',
    liveUrl: 'https://pathology-lab-saas.netlify.app',
    consultationService: 'Custom Business Software',
  },
  {
    id: 'aryaflow',
    name: 'AryaFlow',
    category: 'website',
    categoryLabel: 'Business Website',
    badge: 'Client Website',
    tagline: 'Premium Online Yoga Platform for Professionals',
    description:
      'A conversion-focused wellness website designed for busy Indian professionals, combining calm visual hierarchy, transparent batch pricing, trust signals, and frictionless consultation booking.',
    highlights: [
      'High-converting landing layout with clear batch & pricing UX',
      'Mobile-responsive experience with fast page loads',
      'Direct consultation & enrollment funnel for online classes',
    ],
    tech: ['Responsive UI', 'Conversion UX', 'Fast Static Web', 'SEO'],
    image: '/images/aryaflow.jpg',
    liveUrl: 'https://aryaflow.netlify.app',
    consultationService: 'Website Development',
  },
]

export const STATS = [
  { value: '100', suffix: '%', label: 'Custom-Engineered', sublabel: 'Tailored to your workflow' },
  { value: 'SaaS', suffix: '', label: 'Production Cloud', sublabel: 'Pathology Lab SaaS live' },
  { value: '24', suffix: 'h', label: 'Response Time', sublabel: 'Direct founder communication' },
  { value: '99.9', suffix: '%', label: 'Cloud Uptime', sublabel: 'Modern edge infrastructure' },
] as const

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description:
      'We understand your business goals, operational bottlenecks, target customers, and define the exact scope.',
  },
  {
    step: '02',
    title: 'UI/UX & Architecture',
    description:
      'We craft clean interfaces and a scalable technical architecture before writing a single line of production code.',
  },
  {
    step: '03',
    title: 'Agile Development',
    description:
      'Rapid milestone builds with live preview links so you can test features, give feedback, and stay in control.',
  },
  {
    step: '04',
    title: 'Launch & Ongoing Growth',
    description:
      'Zero-downtime deployment, domain & email setup, analytics, and continuous technical support as you scale.',
  },
] as const

export const TECH_STACK = [
  {
    group: 'Frontend & Experience',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI/UX', 'Figma'],
  },
  {
    group: 'Backend, SaaS & Data',
    items: ['Node.js', 'Serverless Functions', 'PostgreSQL / Supabase', 'REST APIs', 'RBAC & Auth', 'Automated Workflows'],
  },
  {
    group: 'Cloud, Delivery & Growth',
    items: ['Netlify Edge', 'Git CI/CD', 'Resend Email', 'SEO & Core Web Vitals', 'Payment Integrations', 'Analytics'],
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Mohit Agrawal',
    role: 'Founder, BloomTech',
    initials: 'MA',
    quote:
      'Let It Grow brought a sharp product mindset to our launch. They delivered on time, stayed responsive at every step, and built a fast, clean platform we are proud to share with clients.',
    rating: 5,
  },
  {
    name: 'Rohit Jain',
    role: 'Business Owner, Bhopal',
    initials: 'RJ',
    quote:
      'What stood out was how carefully they understood our actual daily workflow before building. Everything feels simple for our staff to use, and support has been rock-solid.',
    rating: 5,
  },
  {
    name: 'Arya Wellness Team',
    role: 'Online Yoga & Coaching Brand',
    initials: 'AF',
    quote:
      'Our website clearly communicates our classes, schedule, and pricing right from the first screen. Prospective students can understand our offer and book in seconds.',
    rating: 5,
  },
] as const

export const CONSULTATION_FAQS = [
  {
    question: 'What happens during the free 30-minute consultation?',
    answer:
      'We walk through your business goals, current challenges, and target users. You leave with clear technical recommendations, a realistic timeline, and a transparent budget estimate—whether you need a business website, custom software, or a full SaaS platform.',
  },
  {
    question: 'Can you build custom software specifically for my business workflow?',
    answer:
      'Yes! Unlike rigid off-the-shelf subscriptions, we engineer custom dashboards, billing tools, lab/clinic systems, booking portals, and internal CRMs built around how your team actually operates—with room to grow as your business expands.',
  },
  {
    question: 'Can I license or customize your Pathology Lab SaaS platform?',
    answer:
      'Absolutely. Pathology Lab SaaS is an active cloud product built by Let It Grow. Reach out via the consultation form or email us to request a live walkthrough, onboarding, or custom lab workflow integration.',
  },
  {
    question: 'How long does it take to launch a website or custom software?',
    answer:
      'A high-converting business website typically launches in 1–2 weeks. Custom business tools and SaaS MVPs usually launch in 3–6 weeks with weekly live staging previews so you see steady progress.',
  },
  {
    question: 'Do you provide hosting, domain setup, and post-launch support?',
    answer:
      'Yes. We handle full deployment, custom domain SSL, business email/Resend setup, speed optimization, and ongoing support so you never have to worry about technical headaches.',
  },
] as const
